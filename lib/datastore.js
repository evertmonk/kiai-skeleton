const Datastore = require('@google-cloud/datastore');
const path = require('path');
const config = require('../config/datastore.json');

process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(__dirname, '../config/datastore.json');

const datastore = new Datastore({
  projectId: config.project_id,
});

module.exports = {
  async upsert(collection, where, data) {
    const [result] = await this.get(collection, { where });
    
    if (result) {
      const key = result[datastore.KEY];
      return datastore.update({ key, data });
    }
    
    return this.add(collection, data);
  },
  
  async get(collection, { where = {}, order = {}, offset, limit } = {}) {
    const query = datastore.createQuery(collection);
    
    Object.keys(where).forEach(key => {
      query.filter(key, '=', where[key]);
    });
    
    Object.keys(order).forEach(fieldName => {
      query.order(fieldName, { descending: !order[fieldName] });
    });
    
    if (offset) query.offset(offset);
    
    if (limit) query.limit(limit);
    
    const [result] = await query.run();
    
    return result.map(entity => ({
      ...entity,
    }));
  },
  
  add(collection, data) {
    const key = datastore.key(collection);
    return datastore.insert({ key, data });
  },
  
  async update(collection, where, data) {
    const [result] = await this.get(collection, { where });
    
    if (!result) return;
    
    const key = result[datastore.KEY];
    data = Object.assign(result, data);
    datastore.update({ key, data });
  },
};
