'use strict';
const BaseHelper = require('../../base/basehelper.js');
const Instance = require('../../../../utils/datamodels/instance.js');
//const Schedule = require('../../../../utils/datamodels/schedule.js');
//const Scheduler = require('../scheduler.js');
const Synchronizer = require('../synchronizer.js');
const validate = require('cta-common').validate;

//const ObjectID = require('bson').ObjectID;

/**
 * Business Logic Execution Helper FindById class
 *
 * @augments BaseHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class FindByHostname extends BaseHelper {

  constructor(cementHelper, logger) {
    super(cementHelper, logger);
//    this.synchronizer = new Synchronizer(cementHelper, logger);
//    this.scheduler = new Scheduler(cementHelper, logger);
  }
  /**
   * Validates Context properties specific to this Helper
   * Validates Query Execution Model fields
   * @param {Context} context - a Context
   * @abstract
   * @returns {Promise}
   */
  _validate(context) { // eslint-disable-line no-unused-vars
//    const instance = context.data;
    return new Promise((resolve, reject) => {
      const pattern = {
        type: 'object',
        items: Instance.keys(),
      };
      pattern.items.id.optional = true;
      const validation = validate(context.data.payload, pattern);
      if (!validation.isValid) {
        const resultsKeysArray = Object.keys(validation.results);
        if (typeof validation.results === 'object'
          && resultsKeysArray.length > 0) {
          for (let i = 0; i < resultsKeysArray.length; i++) {
            const key = resultsKeysArray[i];
            if (!validation.results[key].isValid) {
              const error = validation.results[key].error;
              reject(new Error(`incorrect '${key}' in job payload: ${error}`));
              break;
            }
          }
        } else {
          reject(new Error('missing/incorrect \'payload\' Object in job'));
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
    const instance = new Instance(context.data.payload);
    this.findDB(instance, function(returnCode, brickname, response){
      if(returnCode === 'done') {
        that.synchronizer.broadcast(context.data.nature.quality, instance);
      }
      context.emit(returnCode, brickname, response);
    });
  }

  findDB(payload, callback) {
    const data = {
      nature: {
        type: 'dbinterface',
        quality: 'findbyhostname',
      },
      payload: {
        type: 'instance',
        content: payload,
//        hostname: context.data.payload.hostname,
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
