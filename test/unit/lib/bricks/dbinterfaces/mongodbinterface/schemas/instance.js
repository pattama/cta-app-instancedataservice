'use strict';

const appRootPath = require('cta-common').root('cta-app-instancedataservice');
const chai = require('chai');
const expect = chai.expect;
const nodepath = require('path');
const _ = require('lodash');
const ObjectID = require('bson').ObjectID;

const Model = require(nodepath.join(appRootPath,
  '/lib/utils/datamodels', 'instances.js'));
const Schema = require(nodepath.join(appRootPath,
  '/lib/bricks/dbinterfaces/mongodbinterface/schemas', 'instances.js'));


describe('DatabaseInterfaces - MongoDB - Schema - Instance', function() {
  describe('constructor', function() {
    const data = {
      id: (new ObjectID()).toString(),
      hostname: 'foo.bar',
      ip: '11.22.33.44',
    };
    const instance = new Model(data);
    it('should return an InstanceSchema', function() {
      const object = new Schema(instance);
      expect(object.id).to.not.exist; // eslint-disable-line no-unused-expressions
      expect(object._id).to.be.an.instanceof(ObjectID);
      expect(object._id.toString()).to.equal(instance.id);
      expect(object.hostname).to.equal(instance.hostname);
      expect(object.ip).to.equal(instance.ip);
    });
  });

  describe('toCTAData', function() {
    const mongodbDoc = {
      _id: (new ObjectID()),
      hostname: 'foo.bar',
      ip: '11.22.33.44',
    };
    it('should return an Instance', function() {
      const object = Schema.toCTAData(mongodbDoc);
      expect(object).to.be.an.instanceof(Model);
      expect(object._id).to.not.exist; // eslint-disable-line no-unused-expressions
      expect(object.id).to.equal(mongodbDoc._id.toString());
      expect(object.hostname).to.equal(mongodbDoc.hostname);
      expect(object.ip).to.equal(mongodbDoc.ip);
    });
  });

  describe('dataQueryKeys', function() {
    it('should return Model QueryKeys', function() {
      const modelQueryKeys = Model.queryKeys();
      const schemaQueryKeys = Schema.dataQueryKeys();
      expect(_.isEqual(modelQueryKeys, schemaQueryKeys)).to.be.equal(true);
    });
  });
});
