'use strict';
const Main = require('./index.js');

/**
 * Handler class for RESTAPI handlers : Templates
 * @property {CementHelper} cementHelper - cementHelper from a cta-restapi Brick
 */
class TemplatesHandler extends Main {
  /**
   *
   * @param {CementHelper} cementHelper - cementHelper from a cta-restapi Brick
   */
  constructor(cementHelper) {
    super(cementHelper);
    this.dataType = 'template';
  }
}

module.exports = TemplatesHandler;
