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
const config =  require('./config.testdata');
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

describe('BusinessLogics - Instancereport', function() {
  it('should create new context from input context', function() {
    const brick = new Brick(CementHelper, config);
    expect(brick.validate()).to.be.resolved;
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
    const inputContext = new Context();
    inputContext.data = data;
    sinon.stub(inputContext, 'emit');

    const outputContext = new Context();
    outputContext.publish = sinon.stub();
    sinon.stub(brick.cementHelper, 'createContext')
      .withArgs(data)
      .returns(outputContext);

    brick.process(inputContext);

    sinon.assert.calledWith(brick.cementHelper.createContext, data);
    sinon.assert.called(outputContext.publish);

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
    const brickName = 'dblayer';
    outputContext.emit('reject', brickName, error);
    sinon.assert.calledWith(inputContext.emit, 'reject', brickName, error);

    outputContext.emit('error', brickName, error);
    sinon.assert.calledWith(inputContext.emit, 'error', brickName, error);
    brick.cementHelper.createContext.restore();
  });
});
