'use strict';

const appRootPath = require('cta-common').root('cta-app-instancedataservice');
const Context = require('events').EventEmitter;
const _ = require('lodash');
const sinon = require('sinon');
const nodepath = require('path');
const ObjectID = require('bson').ObjectID;
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
describe('BusinessLogics - Instancereport', function() {
  it('should resolve validate', function() {
    return expect(brick.validate()).to.be.resolved;
  });
  it('should publish a new context from input context', function() {
    const ioData = {
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
    const data = _.omit(ioData, 'id');
    inputContext = new Context();
    inputContext.data = data;
    sinon.stub(inputContext, 'emit');

    outputContext = new Context();
    outputContext.publish = sinon.stub();
    sinon.stub(brick.cementHelper, 'createContext')
      .withArgs(data)
      .returns(outputContext);

    brick.process(inputContext);

    sinon.assert.calledWith(brick.cementHelper.createContext, data);
    sinon.assert.called(outputContext.publish);
  });

  // TODO fix it
  it.skip('should handle emitted events', function() {
    const responseDocument = {
      _id: new ObjectID(),
      hostname: 'foo.com',
      ip: '11.11.11.11',
    };
    let response = {
      ok: 1,
      value: responseDocument,
    };
    outputContext.emit('done', 'dblayer', response);
    sinon.assert.calledWith(inputContext.emit, 'done', brick.cementHelper.brickName);

    response = {
      ok: 1,
      value: null,
    };
    outputContext.emit('done', 'dblayer', response);
    sinon.assert.calledWith(inputContext.emit, 'done', brick.cementHelper.brickName, null);

    const error = new Error();
    const outBrickName = 'dblayer';
    outputContext.emit('reject', outBrickName, error);
    sinon.assert.calledWith(inputContext.emit, 'reject', outBrickName, error);

    outputContext.emit('error', outBrickName, error);
    sinon.assert.calledWith(inputContext.emit, 'error', outBrickName, error);
    brick.cementHelper.createContext.restore();
  });
});
