'use strict';
const BaseDBInterfaceHelper = require('../../basedbinterface/basehelper.js');
const validate = require('cta-common').validate;
const schemas = {
  instance: require('../schemas/instance.js'), // eslint-disable-line global-require
  template: require('../schemas/template.js'), // eslint-disable-line global-require
};

/**
 * Database Interface MongoDB Helper Find class
 *
 * @augments BaseDBInterfaceHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class Find extends BaseDBInterfaceHelper {

  /**
   * Process the context
   * @param {Context} context - a Context
   */
  _process(context) {
    const that = this;
    const payload = context.data.payload;
    const mongoDbCollection = payload.type;
    const mongoDbQuery = new schemas[mongoDbCollection](payload.query);
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
