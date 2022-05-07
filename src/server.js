'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT;
const addToQueue = require('./modules/addToQueue');
const getList = require('./modules/getList');
const prependToList = require('./modules/prependToList');
const deleteOne = require('./modules/deleteOne');
const proofOfLife = require('./modules/proofOfLife');

app.use(cors());
app.use(express.json());

app.get('/', proofOfLife);
app.post('/addCustomer', addToQueue);
app.post('/prepend', prependToList);
app.get('/getList', getList);
app.delete('/delete/:id/:area', deleteOne);

const start = () => {
  app.listen(PORT, () => {
    console.log('Server running on port', PORT)
  });
};

module.exports = {
  app,
  start
};