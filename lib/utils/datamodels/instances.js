/**
 * This source code is provided under the Apache 2.0 license and is provided
 * AS IS with no warranty or guarantee of fit for purpose. See the project's
 * LICENSE.md for details.
 * Copyright 2017 Thomson Reuters. All rights reserved.
 */

'use strict';
const ObjectID = require('bson').ObjectID;
const _ = require('lodash');

const keys = {
  id: { type: 'identifier', optional: true },
  hostname: { type: 'string' },
  ip: { type: 'string' },
  properties: { type: 'object', optional: true },
  executionId: { type: 'string', optional: true },
  state: { type: 'string', optional: true },
};
/**
 * Instance Data Model class
 */
class Instances {
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

module.exports = Instances;
