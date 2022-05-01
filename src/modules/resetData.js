'use strict';

// const CustomerModel = require('../models/CustomerModel');
const { TableCollection, BarCollection } = require('../models/index');

async function resetData() {
  await TableCollection.resetData();
  await BarCollection.resetData();
  // await CustomerModel.deleteMany({
  //   value: { $exists: true }
  // });
}

module.exports = resetData;