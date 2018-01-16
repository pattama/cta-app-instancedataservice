/**
 * This source code is provided under the Apache 2.0 license and is provided
 * AS IS with no warranty or guarantee of fit for purpose. See the project's
 * LICENSE.md for details.
 * Copyright 2017 Thomson Reuters. All rights reserved.
 */

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
            type: 'instances',
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
          type: 'instances',
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
        type: 'messages',
        quality: 'acknowledge',
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
