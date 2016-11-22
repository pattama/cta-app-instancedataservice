'use strict';

const BaseDBInterface = require('../basedbinterface');
const load = require('cta-common').loader;
const helpers = load.asObject('helpers', __dirname);

/**
 * Database Interface MongoDB class
 *
 * @augments BaseDBInterface
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {BrickConfig} configuration - cement configuration of the brick
 * @property {Map<String, Helper>} helpers - Map of Helpers
 */
class MongoDBInterface extends BaseDBInterface {
  constructor(cementHelper, configuration) {
    super(cementHelper, configuration);
    const that = this;
    Object.keys(helpers).forEach((key) => {
      const helperInstance = new helpers[key](that.cementHelper, that.logger);
      const helperName = helperInstance.name;
      that.helpers.set(helperName, helperInstance);
    });
  }
}

module.exports = MongoDBInterface;
