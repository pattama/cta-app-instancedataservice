'use strict';

const appRootPath = require('cta-common').root('cta-app-instancedataservice');
const chai = require('chai');
const expect = chai.expect;
const nodepath = require('path');

const Model = require(nodepath.join(appRootPath,
  '/lib/utils/datamodels', 'instance.js'));
const data = require('./instance.data.testdata.js');

describe('Data Model - Instance', function() {
  it('should return an Instance', function() {
    const object = new Model(data);
    expect(object).to.be.an.instanceof(Model);
    expect(object).to.have.property('id');
    expect(object).to.have.property('hostname', data.hostname);
    expect(object).to.have.property('ip', data.ip);
  });
});
