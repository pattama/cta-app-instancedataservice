'use strict';
const ObjectID = require('bson').ObjectID;
const _ = require('lodash');

const keys = {
  id: { type: 'identifier' },
  hostname: { type: 'string' },
  ip: { type: 'string'},
  instance_type: {
    type: 'object',
    items: {
      propName: { type: 'array' },
      instancetemplate: { type: 'identifier', optional: true },
    }
  },
};

class Instance {
  constructor(data) {
    this.id = data.id || (new ObjectID()).toString();
    this.hostname = data.hostname;
    this.ip = data.ip;
    this.instance_type = data.instance_type
  }

  static keys() {
    return _.cloneDeep(keys);
  }

}

module.exports = Instance;