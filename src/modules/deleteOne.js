'use strict';

const res = require('express/lib/response');
const CustomerModel = require('../models/CustomerModel');
const getMeta = require('./getMeta');
const setHead = require('./setHead');

async function deleteOne(req, res) {
  let id = req.params.id;
  try {
    let targetNode = await CustomerModel.findOneAndDelete({ _id: id });
    let meta = await getMeta(CustomerModel);

    if (meta.head === targetNode.id) {
      await setHead(CustomerModel, targetNode.next)
    } else {
      await CustomerModel.updateOne({ next: targetNode.id }, { next: targetNode.next });
    }
    res.status(200).send('Success deleting')
  }
  catch (e) {
    console.log(e.message);
    res.status(500).send('Error deleting')
  }
}


module.exports = deleteOne;