'use strict';

const customerSchema = require('../lib/customerSchema');

const tableModel = (mongoose) => mongoose.model('table', customerSchema(mongoose));

module.exports = tableModel;