'use strict';
const BaseHelper = require('../../base/basehelper.js');
const Template = require('../../../../utils/datamodels/template.js');
const validate = require('cta-common').validate;

/**
 * Business Logic Template Helper Find class
 *
 * @augments BaseHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class Find extends BaseHelper {

  /**
   * Process the context
   * @param {Context} context - a Context
   */
  _process(context) {
    const that = this;
    const data = {
      nature: {
        type: 'dbInterface',
        quality: 'find',
      },
      payload: {
        type: 'template',
        filter: context.data.payload.filter,
        query: context.data.payload.query,
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

module.exports = Find;
