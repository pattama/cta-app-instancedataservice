'use strict';
const BaseDBInterfaceHelper = require('../../basedbinterface/basehelper.js');
const validate = require('cta-common').validate;
const ObjectID = require('bson').ObjectID;
const schemas = {
  instances: require('../schemas/instances.js'), // eslint-disable-line global-require
};

/**
 * Database Interface MongoDB Helper Find class
 *
 * @augments BaseDBInterfaceHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class Find extends BaseDBInterfaceHelper {

  constructor(cementHelper, logger) {
    super(cementHelper, logger);
    this.name = 'find';
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
        const pattern = {
          type: 'object',
          items: {
            collection: 'string',
            filter: {
              type: 'object',
              items: {
                limit: 'number',
                offset: 'number',
                sort: {type: 'object', optional: true},
              },
            },
            query: 'object',
          },
        };
        validate(context.data.payload, pattern, {throwErr: true});
        resolve({ok: 1});
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
    const payload = context.data.payload;
    const mongoDbCollection = payload.collection;

    const mongoDbQuery = payload.query;
    if ('id' in mongoDbQuery) {
      mongoDbQuery._id = new ObjectID(mongoDbQuery.id);
      delete mongoDbQuery.id;
    }
    Object.keys(mongoDbQuery).filter((p) => {
      return p.indexOf('_') !== 0;
    }).forEach((property) => {
      let values = mongoDbQuery[property].split(',');
      mongoDbQuery[property] = values.length > 1 ? {$in: values} : values[0];
    });

    const mongoDbFilter = {
      limit: payload.filter.limit,
      skip: payload.filter.offset,
    };
    if (payload.filter.hasOwnProperty('sort')) {
      mongoDbFilter.sort = payload.filter.sort;
    }

    const data = {
      nature: {
        type: 'database',
        quality: 'query',
      },
      payload: {
        collection: mongoDbCollection,
        action: 'find',
        args: [
          mongoDbQuery,
          mongoDbFilter,
        ],
      },
    };
    const output = this.cementHelper.createContext(data);
    output.on('done', function(brickname, response) {
      const objects = [];
      response.forEach(function(doc) {
        objects.push(schemas[mongoDbCollection].toCTAData(doc));
      });
      context.emit('done', that.cementHelper.brickName, objects);
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

module.exports = Find;
