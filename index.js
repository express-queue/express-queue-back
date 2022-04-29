'use strict'

require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./src/server');
const resetMeta = require('./src/modules/resetMeta');
const resetData = require('./src/modules/resetData');


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    console.log('Connected to the database');
    await resetMeta();
    await resetData();
  }).then(()=>{
    server.start();
  })

