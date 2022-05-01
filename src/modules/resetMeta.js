'use strict';

// const CustomerModel = require('../models/CustomerModel');
const { TableCollection, BarCollection } = require('../models/index');

async function resetMeta() {
  await TableCollection.resetMeta();
  await BarCollection.resetMeta();

  // await CustomerModel.findOneAndUpdate(
  //   { meta: true },
  //   { head: null, tail: null },
  //   {
  //     upsert: true,
  //     strict: false
  //   }
  // );
}

module.exports = resetMeta;