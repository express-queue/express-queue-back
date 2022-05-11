'use strict';

const customerSchema = require('../lib/customerSchema');

const barModel = (mongoose) => mongoose.model('bar', customerSchema(mongoose));

module.exports = barModel;