/**
 * This source code is provided under the Apache 2.0 license and is provided
 * AS IS with no warranty or guarantee of fit for purpose. See the project's
 * LICENSE.md for details.
 * Copyright 2017 Thomson Reuters. All rights reserved.
 */

'use strict';
const BaseDBInterfaceHelper = require('../../basedbinterface/basehelper.js');
const validate = require('cta-common').validate;
const schemas = {
  instances: require('../schemas/instances.js'), // eslint-disable-line global-require
};

/**
 * Database Interface MongoDB Helper UpdateOne class
 *
 * @augments BaseDBInterfaceHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class UpdateOne extends BaseDBInterfaceHelper {

  constructor(cementHelper, logger) {
    super(cementHelper, logger);
    this.name = 'updateOne';
  }

  /**
   * Validates Context properties specific to this Helper
   * Validates abstract query fields
   * @param {Context} context - a Context
   * @abstract
   * @returns {Promise}
   */
  _validate(context) {
    return new Promise((resolve, reject) => {
      try {
        validate(context.data.payload, {
          type: 'object',
          items: {
            type: 'string',
            query: 'object',
            content: 'object',
          },
        }, { throwErr: true });
        resolve({ ok: 1 });
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Process the context
   * @param {Context} context - a Context
   */
  _process(context) {
    const that = this;
    const collection = context.data.payload.type;
    const query = new schemas[collection](context.data.payload.query);
    const document = {
      $set: new schemas[collection](context.data.payload.content),
    };
    const options = {
      returnOriginal: false,
    };

    const data = {
      nature: {
        type: 'database',
        quality: 'query',
      },
      payload: {
        collection: collection,
        action: 'findOneAndUpdate',
        args: [
          query,
          document,
          options,
        ],
      },
    };
    const output = this.cementHelper.createContext(data);
    output.on('done', function(brickname, response) {
      if (response.ok) {
        if (response.hasOwnProperty('value') && response.value !== null) {
          const object = schemas[collection].toCTAData(response.value);
          context.emit('done', that.cementHelper.brickName, object);
        } else {
          context.emit('done', that.cementHelper.brickName, null);
        }
      }
    });
    output.on('reject', function(brickname, error) {
      context.emit('reject', brickname, error);
    });
    output.on('error', function(brickname, error) {
      context.emit('error', brickname, error);
    });
    output.publish();
  }
}

module.exports = UpdateOne;
