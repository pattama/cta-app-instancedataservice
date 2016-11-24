'use strict';
const ObjectID = require('bson').ObjectID;
const _ = require('lodash');

const keys = {
  id: { type: 'identifier', optional: true },
  hostname: { type: 'string' },
  ip: { type: 'string' },
  properties: { type: 'object', optional: true },
};
/**
 * Instance Data Model class
 */
class Instance {
  /**
   *
   * @param {Object} data - params
   */
  constructor(data) {
    const that = this;
    Object.keys(keys).forEach((key) => {
      if (key === 'id') {
        that[key] = data[key] || (new ObjectID()).toString();
      } else {
        that[key] = data[key];
      }
    });
  }

  static keys() {
    return _.cloneDeep(keys);
  }

  static queryKeys() {
    return _.cloneDeep(keys);
  }

  static convertQueryStrings(query) {
    const converted = {};
    const queryArrays = Object.keys(query);
    queryArrays.forEach(function(key) {
      if (keys.hasOwnProperty(key)) {
        converted[key] = query[key];
      }
    });
    return converted;
  }
}

module.exports = Instance;
