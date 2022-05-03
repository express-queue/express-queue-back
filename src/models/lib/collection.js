'use strict';

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

  async append(){
    // todo
  }

  async prepend(){
    // todo
  }

  async delete(){
    // todo
  }

  async dequeue(){
    // todo
  }

  async enqueue(){
    // todo
  }
}

module.exports = Collection;