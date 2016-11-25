'use strict';
const BaseHelper = require('../../base/basehelper.js');
const validate = require('cta-common').validate;
const Instance = require('../../../../utils/datamodels/instance.js');
const _ = require('lodash');

/**
 * Business Logic Instance Helper Update class
 *
 * @augments BaseHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class Update extends BaseHelper {

  /**
   * Validates Context properties specific to this Helper
   * Validates Instance Model fields
   * @param {Context} context - a Context
   * @abstract
   * @returns {Promise}
   */
  _validate(context) {
    return new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
      try {
        const job = context.data;
        const items = _.pick(Instance.queryKeys(), Object.keys(context.data.payload.content));
        validate(job.payload, {
          type: 'object',
          items: {
            query: 'object',
            content: {
              type: 'object',
              items: items,
            },
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
    const data = {
      nature: {
        type: 'dbInterface',
        quality: 'updateOne',
      },
      payload: {
        type: 'instance',
        query: context.data.payload.query,
        content: _.omit(context.data.payload.content, ['id']),
      },
    };
    const updateContext = this.cementHelper.createContext(data);
    updateContext.on('done', function(brickname, response) {
      context.emit('done', that.cementHelper.brickName, response);
    });
    updateContext.on('reject', function(brickname, error) {
      context.emit('reject', brickname, error);
    });
    updateContext.on('error', function(brickname, error) {
      context.emit('error', brickname, error);
    });
    updateContext.publish();
  }
}

module.exports = Update;
