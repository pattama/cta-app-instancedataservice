'use strict';
const BaseDBInterface = require('../basedbinterface');
const FindByIdHelper = require('./helpers/findbyid');
//const DeleteOneHelper = require('./helpers/deleteone');
//const InsertOneHelper = require('./helpers/insertone');
//const UpdateOneHelper = require('./helpers/updateone');

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
    this.helpers.set('findbyhostname', new FindByHostnameHelper(this.cementHelper, this.logger));
//    this.helpers.set('deleteone', new DeleteOneHelper(this.cementHelper, this.logger));
//    this.helpers.set('insertone', new InsertOneHelper(this.cementHelper, this.logger));
//    this.helpers.set('updateone', new UpdateOneHelper(this.cementHelper, this.logger));
  }
}

module.exports = MongoDBInterface;
