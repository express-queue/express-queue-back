'use strict';

const customerSchema = (mongoose) => new mongoose.Schema({
  prev: {},
  value: { name: { type: String, required: true } },
  next: {}
});

module.exports = customerSchema;