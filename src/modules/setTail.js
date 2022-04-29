'use strict';

async function setTail(model, id) {
  await model.findOneAndUpdate(
    { meta: true },
    { tail: id },
    {
      upsert: true,
      strict: false
    }
  )
}

module.exports = setTail;