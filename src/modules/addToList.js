'use strict';

const addCustomer = require('./addCustomer');
async function AddToList(req, res) {
  try {
    let { name } = req.body;
    // console.log(req.body)
    let customer = { name };
    let newCustomer = await addCustomer(customer);
    res.send(newCustomer);
    // console.log(newCustomer);
  } catch (err) {
    res.status(500).send('Something went wrong adding a customer. Please try again');
    console.log(err.message);
  }
};

module.exports = AddToList;
