'use strict';

// const CustomerModel = require('../models/CustomerModel');
const { TableCollection } = require('../models/index');
const getHeadID = require('./getHeadID');
const setHead = require('./setHead');
const setTail = require('./setTail');

async function prependCustomer(obj) {
  const newCust = new TableCollection(obj);
  const newNode = await newCust.save();
  const insertedId = newNode.id;
  const head = await getHeadID(TableCollection);

  if (head === null) {
    await setTail(TableCollection, insertedId);
  } else {
    await TableCollection.updateOne({ _id: insertedId }, { $set: { next: head } });
  }


  await setHead(TableCollection, insertedId);


  return newNode
}

module.exports = prependCustomer;