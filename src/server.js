'use strict';

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
  try {
    res.status(200).send('Proof of life!')
    
  } catch (error) {
    console.log(error)
  }
})

app.get('/test', (req, res) => {
  res.status(200).send('Test successful!')
})

const start = () => {
  app.listen(3001, () => {
    console.log('Server running on port', 3001)
  });
}

module.exports = start