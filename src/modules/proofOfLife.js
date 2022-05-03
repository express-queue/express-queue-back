'use strict';

module.exports = (req, res) => {
  try {
    res.status(200).send('Proof of life!');
  } catch (error) {
    console.log(error);
  }
}