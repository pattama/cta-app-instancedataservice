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
 * Database Interface MongoDB Helper InsertOne class
 *
 * @augments BaseDBInterfaceHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class Create extends BaseDBInterfaceHelper {

  constructor(cementHelper, logger) {
    super(cementHelper, logger);
    this.name = 'create';
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
            content: 'object',
          },
        }, {throwErr: true});
        const dataModel = datamodels[context.data.payload.collection];
        const pattern = {
          type: 'object',
          items: dataModel.keys(),
        };
        pattern.items.id.optional = true;
        validate(context.data.payload.content, pattern, {throwErr: true});
        context.data.payload.content = new dataModel(context.data.payload.content);
        validate(job.payload.content.id, 'identifier', {throwErr: true});
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
    const mongoDbDocument = new schemas[mongoDbCollection](context.data.payload.content);

    const data = {
      nature: {
        type: 'database',
        quality: 'query',
      },
      payload: {
        collection: mongoDbCollection,
        action: 'insertOne',
        args: [
          mongoDbDocument,
        ],
      },
    };
    const output = this.cementHelper.createContext(data);
    output.on('done', function(brickname, response) {
      if (response.hasOwnProperty('result') && response.hasOwnProperty('ops')) {
        if (response.result.ok && response.result.n > 0 && response.ops.length > 0) {
          const result = schemas[mongoDbCollection].toCTAData(response.ops[0]);
          context.emit('done', that.cementHelper.brickName, result);
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

module.exports = Create;
