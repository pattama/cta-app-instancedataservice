'use strict';

const root = require('cta-common').root('cta-app-instancedataservice');
const BaseDBInterfaceHelper = require('../../basedbinterface/basehelper.js');
const validate = require('cta-common').validate;
const datamodels = {
  instances: require(root + '/lib/utils/datamodels/instances.js'),
};
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
class Update extends BaseDBInterfaceHelper {

  constructor(cementHelper, logger) {
    super(cementHelper, logger);
    this.name = 'update';
  }

  /**
   * Validates Context properties specific to this Helper
   * Validates abstract query fields
   * @param {Context} context - a Context
   * @abstract
   * @returns {Promise}
   */
  _validate(context) { // eslint-disable-line no-unused-vars
    return new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
      try {
        const job = context.data;
        validate(job.payload, {
          type: 'object',
          items: {
            collection: 'string',
            filter: 'object',
            content: 'object',
          },
        }, {throwErr: true});
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
    const mongoDbCollection = context.data.payload.collection;
    const mongoDbFilter = context.data.payload.filter;
    const mongoDbDocument = {
      $set: new schemas[mongoDbCollection](context.data.payload.content),
    };
    const mongoDbOptions = {
      returnOriginal: false,
    };

    const data = {
      nature: {
        type: 'database',
        quality: 'query',
      },
      payload: {
        collection: mongoDbCollection,
        action: 'findOneAndUpdate',
        args: [
          mongoDbFilter,
          mongoDbDocument,
          mongoDbOptions,
        ],
      },
    };
    const output = this.cementHelper.createContext(data);
    output.on('done', function(brickname, response) {
      if (response.ok) {
        if (response.hasOwnProperty('value') && response.value !== null) {
          const object = schemas[mongoDbCollection].toCTAData(response.value);
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

module.exports = Update;
