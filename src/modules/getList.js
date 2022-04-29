'use strict';

let CustomerModel = require('../models/CustomerModel');

async function getList(req, res){
  try{
    CustomerModel.find({}, (err, customersDB)=>{
      res.status(200).send(customersDB);
    })
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = getList;