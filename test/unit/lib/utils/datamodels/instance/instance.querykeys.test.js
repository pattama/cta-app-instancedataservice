'use strict';

const appRootPath = require('cta-common').root('cta-app-instancedataservice');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const nodepath = require('path');
const _ = require('lodash');

const Model = require(nodepath.join(appRootPath,
  '/lib/utils/datamodels', 'instance.js'));

describe('Data Model - Instance - QueryKeys', function() {
  context('when everything ok', function() {
    it('should return properties', function() {
      const keys = {
        id: { type: 'identifier', optional: true },
        hostname: { type: 'string' },
        ip: { type: 'string' },
        properties: { type: 'object', optional: true },
      };
      const queryKeys = Model.queryKeys();
      assert.deepEqual(queryKeys, keys);
    });
  });
});
