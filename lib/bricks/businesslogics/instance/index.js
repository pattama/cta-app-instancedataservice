'use strict';

const Base = require('../base');
const Helpers = {
  create: require('./helpers/create'),
  find: require('./helpers/find'),
  update: require('./helpers/update'),
  delete: require('./helpers/delete'),
};

/**
 * Business Logic Instance class
 *
 * @augments Base
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {BrickConfig} configuration - cement configuration of the brick
 * @property {Map<String, Helper>} helpers - Map of Helpers
 */
class Instance extends Base {
  constructor(cementHelper, configuration) {
    super(cementHelper, configuration);
    const that = this;
    Object.keys(Helpers).forEach((key) => {
      that.helpers.set(key, new Helpers[key](that.cementHelper, that.logger));
    });
  }
}

module.exports = Instance;
