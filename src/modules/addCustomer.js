'use strict';

const CustomerModel = require('../models/CustomerModel');
const getHeadID = require('./getHeadID');
const getTailID = require('./getTailID');
const setHead = require('./setHead');
const setTail = require('./setTail');

async function addCustomer(obj) {
  const newCust = new CustomerModel(obj);
  const newNode = await newCust.save();
  const insertedId = newNode.id;
  const head = await getHeadID(CustomerModel);

  if (head === null) {
    await setHead(CustomerModel, insertedId)
  } else {
    const tail = await getTailID(CustomerModel);
    await CustomerModel.updateOne({_id: tail}, { $set: { next: insertedId } });
  }

  await setTail(CustomerModel, insertedId);

  return newNode
}

module.exports = addCustomer;