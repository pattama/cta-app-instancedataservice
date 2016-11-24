'use strict';

const appRootPath = require('cta-common').root('cta-app-instancedataservice');
const sinon = require('sinon');
const requireSubvert = require('require-subvert')(__dirname);
const nodepath = require('path');
const ObjectID = require('bson').ObjectID;
const nodeUrl = require('url');
const _ = require('lodash');

const Logger = require('cta-logger');
const Context = require('cta-flowcontrol').Context;
const pathToHelper = nodepath.join(appRootPath,
  '/lib/bricks/businesslogics/instance/helpers/', 'create.js');
let Helper = require(pathToHelper);
const pathToInstance = nodepath.join(appRootPath,
  '/lib/utils/datamodels', 'instance.js');
const Instance = require(pathToInstance);

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
  createContext: function() {},
};
const DEFAULTAPIURLS = {
  instanceApiUrl: 'http://localhost:3010/',
  schedulerApiUrl: 'http://localhost:3011/',
  jobManagerApiUrl: 'http://localhost:3012/',
};

describe('BusinessLogics - Instance - Create - _process', function() {
  let helper;
  context('when everything ok', function() {
    const inputJOB = {
      nature: {
        type: 'instance',
        quality: Helper.name.toLowerCase(),
      },
      payload: {},
    };
    const mockInputContext = new Context(DEFAULTCEMENTHELPER, inputJOB);
    let insertInstanceContext;
    let insertInstanceJob;
    let mockInstance;
    before(function() {
      sinon.stub(mockInputContext, 'emit');
      const now = Date.now();
      sinon.stub(Date, 'now').returns(now);

      mockInstance = new Instance({
        id: (new ObjectID()).toString(),
        hostname: 'foo.com',
        ip: '11.11.11.11',
      });
      const StubInstanceConstructor = sinon.stub().returns(mockInstance);
      requireSubvert.subvert(pathToInstance, StubInstanceConstructor);
      Helper = requireSubvert.require(pathToHelper);
      helper = new Helper(DEFAULTCEMENTHELPER, DEFAULTLOGGER, DEFAULTAPIURLS);

      insertInstanceJob = {
        nature: {
          type: 'dbInterface',
          quality: 'insertOne',
        },
        payload: {
          type: 'instance',
          content: mockInstance,
        },
      };
      insertInstanceContext = new Context(DEFAULTCEMENTHELPER, insertInstanceJob);
      insertInstanceContext.publish = sinon.stub();

      sinon.stub(helper.cementHelper, 'createContext')
        .withArgs(insertInstanceJob)
        .returns(insertInstanceContext);
      helper._process(mockInputContext);
    });
    after(function() {
      requireSubvert.cleanUp();
      Date.now.restore();
      helper.cementHelper.createContext.restore();
    });

    it('should send a new insertInstanceContext', function() {
      sinon.assert.calledWith(helper.cementHelper.createContext, insertInstanceJob);
      sinon.assert.called(insertInstanceContext.publish);
    });

    context('when outputContext emits reject event', function() {
      it('should emit reject event on inputContext', function() {
        const error = new Error('mockError');
        const brickName = 'dbInterface';
        insertInstanceContext.emit('reject', brickName, error);
        sinon.assert.calledWith(mockInputContext.emit,
          'reject', brickName, error);
      });
    });

    context('when outputContext emits error event', function() {
      it('should emit error event on inputContext', function() {
        const error = new Error('mockError');
        const brickName = 'dbInterface';
        insertInstanceContext.emit('error', brickName, error);
        sinon.assert.calledWith(mockInputContext.emit,
          'error', brickName, error);
      });
    });
  });
});
