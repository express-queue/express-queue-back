'use strict';
const getHeadID = require('./getHeadID');
// let CustomerModel = require('../models/CustomerModel');
const { TableCollection, BarCollection } = require('../models/index');

async function findCustomer(model, id) {
  let response = await model.findOne({ _id: id });
  console.log('Explain:', response)
  return response
}

async function getList(req, res) {  
  let collection = req.query.area === 'table' ? TableCollection : BarCollection; 
  let queue = [];
  
  try {
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
    res.status(200).send(queue);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = getList;