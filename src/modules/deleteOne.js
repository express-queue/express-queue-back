'use strict';

const res = require('express/lib/response');
// const CustomerModel = require('../models/CustomerModel');
const { TableCollection } = require('../models/index');
const getMeta = require('./getMeta');
const setHead = require('./setHead');
const setTail = require('./setTail');

async function deleteOne(req, res) {
  let id = req.params.id;
  let area = req.data.area;
  console.log(area);
  try {
    let targetNode = await TableCollection.findOneAndDelete({ _id: id });
    let meta = await getMeta(TableCollection);

    if (meta.head === targetNode.id) {
      await setHead(TableCollection, targetNode.next)
      if(meta.tail === targetNode.id){
        await setTail(TableCollection, null)
      }
    } else {
      let prev = await TableCollection.findOneAndUpdate({ next: targetNode.id }, { next: targetNode.next });
      if (meta.tail === targetNode.id){
        await setTail(TableCollection, prev.id);
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