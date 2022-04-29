'use strict'

const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  value: { name: { type: String, required: true } },
  next: {}
});

const customerModel = mongoose.model('customer', customerSchema);

module.exports = customerModel;
