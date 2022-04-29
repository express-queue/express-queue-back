'use strict';

const CustomerModel = require('../models/CustomerModel');

async function addCustomer (obj){
  const newCust = new CustomerModel(obj)
  return await newCust.save();
}

module.exports = addCustomer;