'use strict';

const Brick = require('cta-brick');
const _ = require('lodash');

/**
 * Business Logic Instance class
 *
 * @augments Base
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {BrickConfig} configuration - cement configuration of the brick
 * @property {Map<String, Helper>} helpers - Map of Helpers
 */
class InstanceReport extends Brick {

  validate(context) {
    return Promise.resolve(context);
  }

  process(context) {
    const that = this;
    try {
      if (context.data.nature.quality === 'update') {
        const data = {
          nature: {
            type: 'instance',
            quality: 'update',
          },
          payload: {
            query: context.data.payload.query,
            content: context.data.payload.content,
          },
        };
        that.cementHelper.createContext(data)
          .on('done', function(brickname, response) {
            if (response) {
              that.logger.info(response);
              that._ack(context.data.id);
            } else {
              that.logger.error('Instance not found.');
              that._create(context);
            }
          })
          .once('reject', function(brickname, error) {
            that.logger.error(error.message);
          })
          .once('error', function(brickname, error) {
            that.logger.error(error.message);
          })
          .publish();
      }
    } catch (err) {
      context.emit('reject', that.name, err);
      context.emit('error', that.name, err);
    }
  }

  _create(context) {
    const that = this;
    try {
      const data = {
        nature: {
          type: 'instance',
          quality: 'create',
        },
        payload: _.assignIn(context.data.payload.content, context.data.payload.query),
      };
      that.cementHelper.createContext(data)
        .on('done', function(brickname, response) {
          that.logger.info(response);
          that._ack(context.data.id);
        })
        .once('reject', function(brickname, error) {
          that.logger.error(error.message);
        })
        .once('error', function(brickname, error) {
          that.logger.error(error.message);
        })
        .publish();
    } catch (err) {
      context.emit('reject', that.name, err);
      context.emit('error', that.name, err);
    }
  }

  _ack(id) {
    const that = this;
    that.cementHelper.createContext({
      nature: {
        type: 'message',
        quality: 'acknowledge'
      },
      payload: {
        id: id,
      },
    })
    .on('done', function(brickname, response) {
      that.logger.info(response);
    })
    .once('reject', function(brickname, error) {
      that.logger.error(error.message);
    })
    .once('error', function(brickname, error) {
      that.logger.error(error.message);
    })
    .publish();
  }
}

module.exports = InstanceReport;
