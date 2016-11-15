'use strict';
const Main = require('./index.js');

/**
 * Handler class for RESTAPI handlers : INSTANCES
 * @property {CementHelper} cementHelper - cementHelper from a cta-restapi Brick
 */
class InstancesHandler extends Main {
  /**
   *
   * @param {CementHelper} cementHelper - cementHelper from a cta-restapi Brick
   */
  constructor(cementHelper) {
    super(cementHelper);
    this.dataType = 'instance';
  }
}

module.exports = InstancesHandler;
