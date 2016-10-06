'use strict'

const Requester = require('./requester');

/**
 * Instance Helper class
 */
class Instance {
  constructor(/*name, */cementHelper, logger) {
    this.requester = new Requester(logger);
    //this.name = name;
    this.cementHelper = cementHelper;
    this.logger = logger;
  }


}