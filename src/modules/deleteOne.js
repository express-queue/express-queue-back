'use strict';

const res = require('express/lib/response');
// const CustomerModel = require('../models/CustomerModel');
const { TableCollection, BarCollection } = require('../models/index');
const getMeta = require('./getMeta');
const setHead = require('./setHead');
const setTail = require('./setTail');

async function deleteOne(req, res) {
  let id = req.params.id;
  let area = req.params.area;
  let collection;
  if(area === 'table') collection = TableCollection;
  if(area === 'bar') collection = BarCollection;

  try {
    let targetNode = await collection.model.findOneAndDelete({ _id: id });
    let meta = await getMeta(collection.model);

    if (meta.head === targetNode.id) {
      await setHead(collection.model, targetNode.next)
      if (meta.tail === targetNode.id) {
        await setTail(collection.model, null)
      }
    } else {
      let prev = await collection.model.findOneAndUpdate({ next: targetNode.id }, { next: targetNode.next });
      if (meta.tail === targetNode.id) {
        await setTail(collection.model, prev.id);
      }
    }
    res.status(200).send('Success deleting')
  }
  catch (e) {
    console.log(e.message);
    res.status(500).send('Error deleting')
  }
}


module.exports = deleteOne;