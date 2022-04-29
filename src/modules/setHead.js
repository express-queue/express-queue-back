'use strict';

async function setHead(model, id) {
  await model.findOneAndUpdate(
    { meta: true },
    { head: id },
    {
      upsert: true,
      strict: false
    }
  )
}

module.exports = setHead;