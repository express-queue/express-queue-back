'use strict';

const prependCustomer = require('./prependCustomer');

async function prependToList(req, res) {
  try {
    let { value } = req.body;
    let customer = { value, next: null };
    let newCustomer = await prependCustomer(customer);
    res.send(newCustomer);
  } catch (err) {
    res.status(500).send('Something went wrong prepending a customer. Please try again');
    console.log(err.message);
  }
};

module.exports = prependToList;