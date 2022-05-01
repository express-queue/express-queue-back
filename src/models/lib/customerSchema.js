'use strict';

const customerSchema = (mongoose) => new mongoose.Schema({
  value: { name: { type: String, required: true } },
  next: {},
  next: {}
});

module.exports = customerSchema;