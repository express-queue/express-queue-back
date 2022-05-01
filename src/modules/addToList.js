'use strict';
const addCustomer = require('./addCustomer');

async function AddToList(req, res) {
  try {
    let { value } = req.body;
    let customer = { value, next: null };
    let newCustomer = await addCustomer(customer);
    res.send(newCustomer);
  } catch (err) {
    res.status(500).send('Something went wrong adding a customer. Please try again');
    console.log(err.message);
  }
};

module.exports = AddToList;
