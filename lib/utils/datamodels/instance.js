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
      propName: {
        type: 'array',
        items: ['string']
      },
      instancetemplate: { type: 'identifier', optional: true },
    },
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

  static queryKeys() {
    const queryKeys = _.cloneDeep(keys);
    const keysArray = Object.keys(queryKeys);
    keysArray.forEach(function(key) {
      queryKeys[key].optional = true;
    });
    return queryKeys;
  }

  static convertQueryStrings(query) {
    const converted = {};
    const queryArrays = Object.keys(query);
    queryArrays.forEach(function(key) {
      if (keys.hasOwnProperty(key)) {
        switch (keys[key].type) {
          case 'number':
            converted[key] = parseInt(query[key], 10);
            break;
          case 'boolean':
            converted[key] = (query[key].toLowerCase() === 'true');
            break;
          default:
            converted[key] = query[key];
        }
      }
    });
    return converted;
  }
}

module.exports = Instance;