/**
 * This source code is provided under the Apache 2.0 license and is provided
 * AS IS with no warranty or guarantee of fit for purpose. See the project's
 * LICENSE.md for details.
 * Copyright 2017 Thomson Reuters. All rights reserved.
 */

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
    this.dataType = 'instances';
  }
}

module.exports = InstancesHandler;
