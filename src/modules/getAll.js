'use strict';
const { mongoose, db } = require('../models/index');

async function getAll(req, res){
  
  console.log(mongoose.connection.getCollectionNames())

  // mongoose.connection.db.listCollections().toArray(function(err, names){
  //   console.log(names)
  //   })

}

module.exports = getAll;