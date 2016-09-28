'use strict';
const BaseHelper = require('../../base/basehelper.js');
const ObjectID = require('bson').ObjectID;

/**
 * Business Logic Execution Helper FindById class
 *
 * @augments BaseHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class FindByHostname extends BaseHelper {

  /**
   * Validates Context properties specific to this Helper
   * Validates Query Execution Model fields
   * @param {Context} context - a Context
   * @abstract
   * @returns {Promise}
   */
  _validate(context) { // eslint-disable-line no-unused-vars
    const instance = context.data;
    return new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
      if (!instance.payload.hasOwnProperty('hostname')
        || typeof instance.payload.hostname !== 'string'
        || !(ObjectID.isValid(instance.payload.hostname))) {
        reject(new Error('missing/incorrect \'hostname\' String value of ObjectID in instance payload'));
      }
      resolve({ ok: 1 });
    });
  }

  /**
   * Process the context
   * @param {Context} context - a Context
   */
  _process(context) {
    const that = this;
    const data = {
      nature: {
        type: 'dbinterface',
        quality: 'findbyhostname',
      },
      payload: {
        type: 'instance',
        hostname: context.data.payload.hostname,
      },
    };
    const output = this.cementHelper.createContext(data);
    output.on('done', function(brickname, response) {
      context.emit('done', that.cementHelper.brickName, response);
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

module.exports = FindByHostname;
