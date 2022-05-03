'use strict';
const { TableCollection, BarCollection } = require('../models/index');

async function addToQueue(req, res) {
  try {
    let { value, queue, area } = req.body;
    let customer = { value, next: null, prev: null };

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
    }
    res.status(200).send(newCustomer);
  } catch (err) {
    res.status(500).send('Something went wrong adding a customer. Please try again');
    console.log(err.message);
  }
};

module.exports = addToQueue;
