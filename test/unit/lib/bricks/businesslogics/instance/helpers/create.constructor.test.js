'use strict';

const appRootPath = require('cta-common').root('cta-app-instancedataservice');
const chai = require('chai');
const expect = chai.expect;
const nodepath = require('path');

const Logger = require('cta-logger');
const Base = require(nodepath.join(appRootPath,
  '/lib/bricks/businesslogics/base/', 'basehelper.js'));
const Helper = require(nodepath.join(appRootPath,
  '/lib/bricks/businesslogics/instances/helpers/', 'create.js'));

const DEFAULTCONFIG = require('../index.config.testdata.js');
const DEFAULTLOGGER = new Logger(null, null, DEFAULTCONFIG.name);
const DEFAULTCEMENTHELPER = {
  constructor: {
    name: 'CementHelper',
  },
  brickName: DEFAULTCONFIG.name,
  dependencies: {
    logger: DEFAULTLOGGER,
  },
  appProperties: {
    // instanceApiUrl: 'http://localhost:3010/ids/',
    // schedulerApiUrl: 'http://localhost:3011/sch',
    // jobManagerApiUrl: 'http://localhost:3012/jms/',
  },
};
const DEFAULTAPIURLS = {
  instanceApiUrl: 'http://localhost:3010/ids/',
  schedulerApiUrl: 'http://localhost:3011/sch',
  jobManagerApiUrl: 'http://localhost:3012/jms/',
};

describe('BusinessLogics - Instance - Create - constructor', function() {
  context('when everything ok', function() {
    let helper;
    before(function() {
      helper = new Helper(DEFAULTCEMENTHELPER, DEFAULTLOGGER, DEFAULTAPIURLS);
    });

    it('should extend BaseHelper', function() {
      expect(Object.getPrototypeOf(Helper)).to.equal(Base);
    });

    it('should return a handler instance', function() {
      expect(helper).to.be.an.instanceof(Helper);
    });
  });
});
