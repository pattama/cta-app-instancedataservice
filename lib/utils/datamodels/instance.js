'use strict';
const ObjectID = require('bson').ObjectID;
const _ = require('lodash');

const keys = {
  id: { type: 'identifier' },
  hostname: { type: 'string' },
  ip: { type: 'string'},
};

class Instance {
  constructor(data) {
    this.id = data.id || (new ObjectID()).toString();
    this.hostname = data.hostname;
    this.ip = data.ip;
  }

  static keys() {
    return _.cloneDeep(keys);
  }

}

module.exports = Instance;