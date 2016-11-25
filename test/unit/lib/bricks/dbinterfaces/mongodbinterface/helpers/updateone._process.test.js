'use strict';

const appRootPath = require('cta-common').root('cta-app-instancedataservice');
const Context = require('events').EventEmitter;
const sinon = require('sinon');
const nodepath = require('path');
const ObjectID = require('bson').ObjectID;
const Logger = require('cta-logger');
const pathToHelper = nodepath.join(appRootPath,
  '/lib/bricks/dbinterfaces/mongodbinterface/helpers/', 'updateone.js');
let Helper = require(pathToHelper);
const config = require('../index.config.testdata.js');
const logger = new Logger();
const CementHelper = {
  constructor: {
    name: 'CementHelper',
  },
  brickName: config.name,
  dependencies: {
    logger: logger,
  },
  createContext: function() {},
};

describe('DatabaseInterfaces - MongoDB - UpdateOne - _process', function() {
  it('should create new context from input context', function() {
    const input = {
      nature: {
        type: 'dbInterface',
        quality: 'updateOne',
      },
      payload: {
        type: 'instance',
        query: { hostname: 'foo.com' },
        content: {
          ip: '11.11.11.11',
        },
      },
    };
    const output = {
      nature: {
        type: 'database',
        quality: 'query',
      },
      payload: {
        collection: input.payload.type,
        action: 'findOneAndUpdate',
        args: [
          { hostname: 'foo.com' },
          { $set: { ip: '11.11.11.11' } },
          { returnOriginal: false },
        ],
      },
    };
    const helper = new Helper(CementHelper, logger);

    const inputContext = new Context();
    inputContext.data = input;
    sinon.stub(inputContext, 'emit');

    const outputContext = new Context();
    outputContext.publish = sinon.stub();
    sinon.stub(helper.cementHelper, 'createContext')
      .withArgs(output)
      .returns(outputContext);

    helper._process(inputContext);

    sinon.assert.calledWith(helper.cementHelper.createContext, output);
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
    sinon.assert.calledWith(inputContext.emit, 'done', helper.cementHelper.brickName);

    response = {
      ok: 1,
      value: null,
    };
    outputContext.emit('done', 'dblayer', response);
    sinon.assert.calledWith(inputContext.emit, 'done', helper.cementHelper.brickName, null);

    const error = new Error();
    const brickName = 'dblayer';
    outputContext.emit('reject', brickName, error);
    sinon.assert.calledWith(inputContext.emit, 'reject', brickName, error);

    outputContext.emit('error', brickName, error);
    sinon.assert.calledWith(inputContext.emit, 'error', brickName, error);
    helper.cementHelper.createContext.restore();
  });
});
