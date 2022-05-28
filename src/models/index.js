'use strict';

const mongoose = require('mongoose');
const Collection = require('./lib/collection');
const tableModel = require('./collections/tableModel');
const barModel = require('./collections/barModel');

const db = mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const table = tableModel(mongoose);
const bar = barModel(mongoose);

module.exports = {
  mongoose,
  db,
  TableCollection: new Collection(table),
  BarCollection: new Collection(bar)
}