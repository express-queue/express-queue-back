'use strict';

const customerSchema = require('../lib/customerSchema');

const tableModel = (mongoose) => mongoose.model('bar', customerSchema(mongoose));

module.exports = tableModel;