'use strict';
const BaseHelper = require('../../base/basehelper.js');
const Instance = require('../../../../utils/datamodels/instance.js');
const validate = require('cta-common').validate;

const Messenger = require('../../base/messenger');

/**
 * Business Logic Instance Helper Create class
 *
 * @augments BaseHelper
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {Logger} logger - logger instance
 */
class Create extends BaseHelper {

  constructor(cementHelper, logger) {
    super(cementHelper, logger);
    this.messenger = new Messenger(cementHelper, logger);
  }
  /**
   * Validates Context properties specific to this Helper
   * Validates Instance Model fields
   * @param {Context} context - a Context
   * @abstract
   * @returns {Promise}
   */
  _validate(context) {
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
    // const instance = new Instance(context.data.payload);
    // const data = {
    //   nature: {
    //     type: 'dbInterface',
    //     quality: 'insertOne',
    //   },
    //   payload: {
    //     type: 'instance',
    //     content: instance,
    //   },
    // };
    // const output = this.cementHelper.createContext(data);
    // output.on('done', function(brickname, response) {
    //   context.emit('done', that.cementHelper.brickName, response);
    // });
    // output.on('reject', function(brickname, error) {
    //   context.emit('reject', brickname, error);
    // });
    // output.on('error', function(brickname, error) {
    //   context.emit('error', brickname, error);
    // });
    // output.publish();

    return this.acknowledgeMessage(context)
      .then(()  => {
        const instance = new Instance(context.data.payload);
        const data_query = {
          nature: {
            type: 'dbInterface',
            quality: 'find',
          },
          payload: {
            type: 'instance',
            filter: {
              limit: 2,
              offset: 0,
            },
            query: {
              hostname: instance.hostname,
              ip: instance.ip,
            },
          },
        };
        const output_query = this.cementHelper.createContext(data_query);
        output_query.on('done', function(brickname, response) {
          if (response.length == 0) {
            const data = {
              nature: {
                type: 'dbInterface',
                quality: 'insertOne',
              },
              payload: {
                type: 'instance',
                content: instance,
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
          else {
            context.emit('reject', brickname, "Machine already exist");
          }
          //context.emit('done', that.cementHelper.brickName, response);
        });
        output_query.on('reject', function(brickname, error) {
          context.emit('reject', brickname, error);
        });
        output_query.on('error', function(brickname, error) {
          context.emit('error', brickname, error);
        });
        output_query.publish();
      });
  }

  acknowledgeMessage(context) {
    const that = this;
    return this.messenger.acknowledgeMessage(context.data.id)
        .catch((err) => {
        that.logger.error(`Cannot acknowledge message: ${context.data.id}`);
    throw err;
  });
  }
}

module.exports = Create;
