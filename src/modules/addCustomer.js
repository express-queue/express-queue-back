'use strict';

// const CustomerModel = require('../models/CustomerModel');
const { TableCollection } = require('../models/index');
const getHeadID = require('./getHeadID');
const getTailID = require('./getTailID');
const setHead = require('./setHead');
const setTail = require('./setTail');

async function addCustomer(obj) {
  const newCust = new TableCollection(obj);
  const newNode = await newCust.save();
  const insertedId = newNode.id;
  const head = await getHeadID(TableCollection);

  if (head === null) {
    await setHead(TableCollection, insertedId)
  } else {
    const tail = await getTailID(TableCollection);
    await TableCollection.updateOne({_id: tail}, { $set: { next: insertedId } });
  }

  await setTail(TableCollection, insertedId);

  return newNode
}

module.exports = addCustomer;