'use strict';

const appRootPath = require('cta-common').root('cta-app-instancedataservice');
const assert = require('chai').assert;
const Context = require('events').EventEmitter;
const _ = require('lodash');
const sinon = require('sinon');
const nodepath = require('path');
const Logger = require('cta-logger');
const BrickPath = nodepath.join(appRootPath,
  '/lib/bricks/businesslogics/instancereport/index.js');
const Brick = require(BrickPath);
const config = require('./config.testdata');
const logger = new Logger();
const brickName = config.name;
const CementHelper = {
  constructor: {
    name: 'CementHelper',
  },
  brickName: brickName,
  dependencies: {
    logger: logger,
  },
  createContext: function() {},
};
const chai = require('chai');
const expect = chai.expect;
const brick = new Brick(CementHelper, config);
let inputContext;
let outputContext;
const data = {
  id: '123',
  nature: {
    type: 'instance',
    quality: 'update',
  },
  payload: {
    query: { hostname: 'foo.com' },
    content: {
      ip: '11.11.11.11',
    },
  },
};
describe('BusinessLogics - Instancereport', function() {
  beforeEach(function() {
    inputContext = new Context();
    sinon.stub(inputContext, 'emit');
    outputContext = new Context();
    outputContext.publish = sinon.stub();
    sinon.stub(brick.cementHelper, 'createContext')
      .returns(outputContext);
    sinon.spy(brick, '_create');
    sinon.spy(brick, '_ack');
    sinon.stub(brick.logger, 'error');
    sinon.stub(brick.logger, 'info');
  });

  afterEach(function() {
    inputContext.emit.restore();
    brick.cementHelper.createContext.restore();
    brick._create.restore();
    brick._ack.restore();
    brick.logger.error.restore();
    brick.logger.info.restore();
  });

  it('validate', function() {
    return expect(brick.validate()).to.be.resolved;
  });

  it('process', function() {
    inputContext.data = data;

    brick.process(inputContext);
    sinon.assert.calledWith(brick.cementHelper.createContext, _.omit(data, 'id'));
    sinon.assert.called(outputContext.publish);

    outputContext.emit('done', 'someBrickName', 'someResponse');
    sinon.assert.calledWith(brick.logger.info, 'someResponse');
    sinon.assert.calledWith(brick._ack, data.id);

    outputContext.emit('done', 'someBrickName', null);
    sinon.assert.calledWith(brick.logger.error, 'Instance not found.');
    sinon.assert.calledWith(brick._create, inputContext);

    outputContext.emit('reject', 'someBrickName', new Error('reject error'));
    sinon.assert.calledWith(brick.logger.error, 'reject error');

    outputContext.emit('error', 'someBrickName', new Error('error'));
    sinon.assert.calledWith(brick.logger.error, 'error');

    const error = new Error('error');
    outputContext.publish = function() {
      throw error;
    };

    try {
      brick.process(inputContext);
      assert.fail('should not be here');
    } catch (e) {
      sinon.assert.calledWith(inputContext.emit, 'reject', brick.name, error);
      sinon.assert.calledWith(inputContext.emit, 'error', brick.name, error);
    }
  });

  it('_create', function() {
    inputContext.data = data;
    brick._create(inputContext);
    const outData = {
      nature: {
        type: 'instance',
        quality: 'create',
      },
      payload: {
        hostname: 'foo.com',
        ip: '11.11.11.11',
      },
    };
    sinon.assert.calledWith(brick.cementHelper.createContext, outData);
    sinon.assert.called(outputContext.publish);

    outputContext.emit('done', 'someBrickName', 'someResponse');
    sinon.assert.calledWith(brick.logger.info, 'someResponse');
    sinon.assert.calledWith(brick._ack, data.id);

    outputContext.emit('reject', 'someBrickName', new Error('reject error'));
    sinon.assert.calledWith(brick.logger.error, 'reject error');

    outputContext.emit('error', 'someBrickName', new Error('error'));
    sinon.assert.calledWith(brick.logger.error, 'error');

    const error = new Error('error');
    outputContext.publish = function() {
      throw error;
    };

    try {
      brick._create(inputContext);
      assert.fail('should not be here');
    } catch (e) {
      sinon.assert.calledWith(inputContext.emit, 'reject', brick.name, error);
      sinon.assert.calledWith(inputContext.emit, 'error', brick.name, error);
    }
  });

  it('ack', function() {
    brick._ack(data.id);
    const outData = {
      nature: {
        type: 'message',
        quality: 'acknowledge',
      },
      payload: {
        id: '123',
      },
    };
    sinon.assert.calledWith(brick.cementHelper.createContext, outData);
    sinon.assert.called(outputContext.publish);
    outputContext.emit('done', 'someBrickName', 'someResponse');
    sinon.assert.calledWith(brick.logger.info, 'someResponse');
    outputContext.emit('reject', 'someBrickName', new Error('reject error'));
    sinon.assert.calledWith(brick.logger.error, 'reject error');
    outputContext.emit('error', 'someBrickName', new Error('error'));
    sinon.assert.calledWith(brick.logger.error, 'error');
  });
});
