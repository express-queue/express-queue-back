'use strict';

const getMeta = require('./getMeta');

async function getHeadID(model){
  let meta = await getMeta(model);
  return meta.head;
};

module.exports = getHeadID