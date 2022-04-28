'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT


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
  app.listen(PORT, () => {
    console.log('Server running on port', PORT)
  });
}

module.exports = {
  app,
  start
}