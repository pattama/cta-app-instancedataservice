'use strict';

const Base = require('../base');
const Register = require('../instance/helpers/create');


/**
 * Business Logic Instance class
 *
 * @augments Base
 * @property {CementHelper} cementHelper - cementHelper instance
 * @property {BrickConfig} configuration - cement configuration of the brick
 * @property {Map<String, Helper>} helpers - Map of Helpers
 */
class InstanceReport extends Base {
  constructor(cementHelper, configuration) {
    super(cementHelper, configuration);
    this.helpers.set('create', new Register(this.cementHelper, this.logger));
  }
}

module.exports = InstanceReport;