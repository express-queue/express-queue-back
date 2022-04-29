'use strict'

const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {type: String, required: true}
});

const customerModel = mongoose.model('customer', customerSchema);

module.exports = customerModel;
