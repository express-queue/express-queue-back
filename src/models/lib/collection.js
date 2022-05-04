'use strict';

const getHeadID = require('../../modules/getHeadID');
const setHead = require('../../modules/setHead');
const getTailID = require('../../modules/getTailID');
const setTail = require('../../modules/setTail');

class Collection {
  constructor(model) {
    this.model = model;
  }

  async resetMeta() {
    await this.model.findOneAndUpdate(
      { meta: true },
      { head: null, tail: null },
      {
        upsert: true,
        strict: false
      }
    );
    console.log('meta reset for:', this.model)
  }

  async resetData() {
    await this.model.deleteMany({
      value: { $exists: true }
    });
    console.log('data reset for:', this.model)
  }

  async append(obj) {
    // todo  
    
    // const newCust = new TableCollection(obj);    
    const newCust = new this.model(obj);
    const newNode = await newCust.save();
    const insertedId = newNode.id;
    const head = await getHeadID(this.model);

    if (head === null) {
      await setHead(this.model, insertedId)
    } else {
      const tail = await getTailID(this.model);
      await this.model.updateOne({ _id: tail }, { $set: { next: insertedId } });
    }

    await setTail(this.model, insertedId);    
    return newNode
  }

  async prepend(obj) {
    // todo
    const newCust = new this.model(obj);
    const newNode = await newCust.save();
    const insertedId = newNode.id;
    const head = await getHeadID(this.model);
  
    if (head === null) {
      await setTail(this.model, insertedId);
    } else {
      await this.model.updateOne({ _id: insertedId }, { $set: { next: head } });
    } 
  
    await setHead(this.model, insertedId);  
    return newNode
  }

  async delete() {
    // todo
  }

  async dequeue() {
    // todo
  }

  async enqueue() {
    // todo
  }
}

module.exports = Collection;