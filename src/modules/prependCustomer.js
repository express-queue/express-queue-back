'use strict';

const CustomerModel = require('../models/CustomerModel');
const getHeadID = require('./getHeadID');
const setHead = require('./setHead');

async function prependCustomer(obj) {
  const newCust = new CustomerModel(obj);
  const newNode = await newCust.save();
  const insertedId = newNode.id;
  const head = await getHeadID(CustomerModel);

  if (head !== null) {
    await CustomerModel.updateOne({_id: insertedId}, { $set: { next: head } });
  }
  await setHead(CustomerModel, insertedId);
  return newNode
}

module.exports = prependCustomer;