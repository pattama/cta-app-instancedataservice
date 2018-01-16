/**
 * This source code is provided under the Apache 2.0 license and is provided
 * AS IS with no warranty or guarantee of fit for purpose. See the project's
 * LICENSE.md for details.
 * Copyright 2017 Thomson Reuters. All rights reserved.
 */

'use strict';

const Base = require('../base');
const load = require('cta-common').loader;
const helpers = load.asObject('helpers', __dirname);

/**
 * Business Logic Instance class
 *
 * @augments Base
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {BrickConfig} configuration - cement configuration of the brick
 * @property {Map<String, Helper>} helpers - Map of Helpers
 */
class Instances extends Base {
  constructor(cementHelper, configuration) {
    super(cementHelper, configuration);
    const that = this;
    Object.keys(helpers).forEach((key) => {
      that.helpers.set(key, new helpers[key](that.cementHelper, that.logger));
    });
  }
}

module.exports = Instances;
