'use strict';
const getHeadID = require('./getHeadID');
// let CustomerModel = require('../models/CustomerModel');
const { TableCollection, BarCollection } = require('../models/index');

async function findCustomer(model, id) {
  let response = await model.findOne({ _id: id });
  console.log('Explain:', response)
  return response
}

async function getOneCollection(collection) {
  let queue = [];
  let head = await getHeadID(collection.model);
  if (head !== null) {
    let curr = head;
    while (curr) {
      let result = await findCustomer(collection.model, curr);
      let personObj = { id: result._id, value: result.value }
      queue.push(personObj);
      curr = result.next;
    }
  }
  return queue;
}

async function getList(req, res) {
  let area = req.query.area;
  if (area) {
    // let collection = req.query.area === 'table' ? TableCollection : BarCollection;
    let collection
    if (area === 'table') collection === TableCollection;
    if (area === 'bar') collection === BarCollection;
  } else {
  }

  try {
    let result = getOneCollection(collection);
    res.status(200).send(result);
  }
  catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = getList;