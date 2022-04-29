'use strict';

const CustomerModel = require('../models/CustomerModel');

async function resetData() {
  await CustomerModel.deleteMany({
    value: { $exists: true }
  });
  console.log('Data cleared')
}

module.exports = resetData;