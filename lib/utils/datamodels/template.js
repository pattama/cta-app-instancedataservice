'use strict';
const ObjectID = require('bson').ObjectID;
const _ = require('lodash');

const keys = {
  id: { type: 'identifier' },
  name: { type: 'string' },
  templateId: { type: 'string' },
  properties: { type: 'object', optional: true },
  cloud: {
    type: 'object',
    items: {
      id: { type: 'string' },
      name: { type: 'string' },
    },
  },
};
/**
 * Template Data Model class
 */
class Template {
  /**
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

  //TODO check optional items
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

module.exports = Template;
