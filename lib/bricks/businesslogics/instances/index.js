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
