'use strict';

const appRootPath = require('cta-common').root('cta-app-instancedataservice');
const chai = require('chai');
const expect = chai.expect;
const nodepath = require('path');
const _ = require('lodash');

const Model = require(nodepath.join(appRootPath,
  '/lib/utils/datamodels', 'instances.js'));

describe('Data Model - Instance - Keys', function() {
  context('when everything ok', function() {
    it('should return properties', function() {
      const keys = {
        id: { type: 'identifier', optional: true },
        hostname: { type: 'string' },
        ip: { type: 'string' },
        properties: { type: 'object', optional: true },
        executionId: { type: 'string', optional: true },
        state: { type: 'string', optional: true },
      };
      expect(_.isEqual(Model.keys(), keys)).to.be.equal(true);
    });
  });
});
