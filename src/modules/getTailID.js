'use strict';

const getMeta = require('./getMeta');

async function getTailID(model){
  const meta = await getMeta(model);
  return meta.tail;
};

module.exports = getTailID