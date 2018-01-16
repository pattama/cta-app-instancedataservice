/**
 * This source code is provided under the Apache 2.0 license and is provided
 * AS IS with no warranty or guarantee of fit for purpose. See the project's
 * LICENSE.md for details.
 * Copyright 2017 Thomson Reuters. All rights reserved.
 */

'use strict';
const ObjectID = require('bson').ObjectID;
const _ = require('lodash');
const Instance = require('../../../../utils/datamodels/instances.js');
/**
 * Instance Schema for MongoDB class
 *
 */
class InstancesSchema {
  /**
   *
   * @param {Instance} instance - params
   */
  constructor(instance) {
    const keys = Instance.keys();
    const schema = _.pick(instance, Object.keys(keys));
    Object.keys(schema).forEach(function(key) {
      if (keys[key].type === 'identifier') {
        schema[key] = new ObjectID(instance[key]);
      }
    });
    if ('id' in schema) {
      schema._id = schema.id;
      delete schema.id;
    }
    return schema;
  }

  static toCTAData(mongodbDoc) {
    const keys = Instance.keys();
    const instanceData = _.pick(mongodbDoc, Object.keys(keys));
    Object.keys(instanceData).forEach(function(key) {
      if (keys[key].type === 'identifier') {
        instanceData[key] = mongodbDoc[key].toString();
      }
    });
    if ('_id' in mongodbDoc) {
      instanceData.id = mongodbDoc._id.toString();
    }
    return new Instance(instanceData);
  }

  static dataQueryKeys() {
    return Instance.queryKeys();
  }
}

module.exports = InstancesSchema;
