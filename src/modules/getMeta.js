'use strict';

async function getMeta(model){
  const meta = await model.findOne({meta: true}).lean();
  return meta
}

module.exports = getMeta;