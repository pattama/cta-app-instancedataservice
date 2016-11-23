'use strict';
const BaseHandler = require('./basehandler.js');

/**
 * Handler class for RESTAPI handlers : INSTANCES
 * @property {CementHelper} cementHelper - cementHelper from a cta-restapi Brick
 */
class InstancesHandler extends BaseHandler {
  /**
   *
   * @param {CementHelper} cementHelper - cementHelper from a cta-restapi Brick
   */
  constructor(cementHelper) {
    super(cementHelper);
    this.collection = 'instances';
  }
}

module.exports = InstancesHandler;
