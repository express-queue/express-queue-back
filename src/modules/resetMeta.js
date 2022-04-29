// 'use strict';

const CustomerModel = require('../models/CustomerModel');

async function resetMeta() {
  await CustomerModel.findOneAndUpdate(
    { meta: true },
    { head: null, tail: null},
    {
      upsert: true,
      strict: false
    }
  );
  console.log('Meta cleared');
}

module.exports = resetMeta;