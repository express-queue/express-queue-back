// https://github.com/express-queue/express-queue-back/blob/main/README.md

require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// demonstarting a single POST request that adds a customer to MongoDB
app.post('/addCustomer', addToQueue); 

// connect to MongoDB and start listening for requests
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to the database');
  app.listen(PORT, () => {
    console.log('Server running on port', PORT)
  });
}).catch((e) => {
  console.log(e.message)
})

// creating two collections ("bar" and "table"), that share the same customer schema
const customerSchema = new mongoose.Schema({
  value: { name: { type: String, required: true } },
  next: {}
});
const table = mongoose.model('table', customerSchema);
const bar = mongoose.model('bar', customerSchema);

// create a class that can be instantiated by any of the two models and share the same methods
class Collection {
  constructor(model) {
    this.model = model;
  }

  async append(obj) { // O(1) time complexity
    const newCust = new this.model(obj);
    const newNode = await newCust.save();
    const insertedId = newNode.id;
    const head = await getHeadID(this.model);
    if (head === null) {
      await setHead(this.model, insertedId)
    } else {
      const tail = await getTailID(this.model);
      await this.model.updateOne({ _id: tail }, { $set: { next: insertedId } });
    }
    await setTail(this.model, insertedId);
    return newNode
  }

  async prepend(obj) { // O(1) time complexity
    const newCust = new this.model(obj);
    const newNode = await newCust.save();
    const insertedId = newNode.id;
    const head = await getHeadID(this.model);
    if (head === null) {
      await setTail(this.model, insertedId);
    } else {
      await this.model.updateOne({ _id: insertedId }, { $set: { next: head } });
    }
    await setHead(this.model, insertedId);
    return newNode
  }
}

// creating two instances
const TableCollection = new Collection(table);
const BarCollection = new Collection(bar);

// a function to handle the POST request to append or prepend a customer to the linked list
async function addToQueue(req, res) {
  let { value, queue, area } = req.body;
  let customer = { value, next: null };
  try {
    let collection;
    switch (area) { // deciding which collection to update based on POST request data
      case 'table':
        collection = TableCollection;
        break;
      case 'bar':
        collection = BarCollection;
        break;
      default:
        collection = TableCollection;
    }

    let newCustomer; 
    switch (queue) { // deciding either to prepend or append to linked list based on POST request data
      case 'back':
        newCustomer = await collection.append(customer);
        break;
      case 'front':
        newCustomer = await collection.prepend(customer);
        break;
      default:
        newCustomer = await collection.append(customer);
    }
    res.status(200).send(newCustomer);
  } catch (err) {
    res.status(500).send('Something went wrong adding a customer. Please try again');
    console.log(err.message);
  }
};

// helper functions to find/update head and tail node (document) of a chosen linked list in MongoDB
async function getMeta(model) {
  try {
    const meta = await model.findOne({ meta: true }).lean();
    return meta
  } catch (e) {
    console.log('error getting meta')
  }
}

async function getHeadID(model) {
    let meta = await getMeta(model);
    return meta.head;
};

async function getTailID(model) {
    const meta = await getMeta(model);
    return meta.tail;
};

async function setHead(model, id) {
  try {
    await model.findOneAndUpdate(
      { meta: true },
      { head: id },
      {
        upsert: true,
        strict: false
      }
    )
  } catch (e) {
    console.log('error updating head')
  }
}

async function setTail(model, id) {
  try {
    await model.findOneAndUpdate(
      { meta: true },
      { tail: id },
      {
        upsert: true,
        strict: false
      }
    )
  } catch (e) {
    console.log('error updating tail')
  }
}