'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT;
const addToList = require('./modules/addToList');
const getList = require('./modules/getList');


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  try {
    res.status(200).send('Proof of life!')
    
  } catch (error) {
    console.log(error)
  }
})

app.post('/add', addToList);
app.get('/getList', getList);

const start = () => {
  app.listen(PORT, () => {
    console.log('Server running on port', PORT)
  });
}

module.exports = {
  app,
  start
}