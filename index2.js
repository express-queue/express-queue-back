require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.post('/addCustomer', addToQueue);

const customerSchema = new mongoose.Schema({
  value: { name: { type: String, required: true } },
  next: {}
});
const table = mongoose.model('table', customerSchema);
const bar = mongoose.model('bar', customerSchema);
const TableCollection = new Collection(table);
const BarCollection = new Collection(bar);

async function addToQueue(req, res) {
  let { value, queue, area } = req.body;
  let customer = { value, next: null };
  try {
    let collection;
    switch (area) {
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
    switch (queue) {
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

class Collection {
  constructor(model) {
    this.model = model;
  }

  async append(obj) {
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

  async prepend(obj) {
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

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to the database');
  app.listen(PORT, () => {
    console.log('Server running on port', PORT)
  });
})

