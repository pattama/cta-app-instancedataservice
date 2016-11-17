'use strict';

const chai = require('chai');
const path= require('path');
const Request = require('cta-tool-request');

module.exports = {
  app: path.resolve(__dirname, '..', 'lib', 'index.js'),
  assert: chai.assert,
  superagent: require('superagent'),
  request: new Request(),
  forever: require('forever-monitor'),
  exec: require('child_process').exec,
  path: path,
  os: require('os'),
  co: require('co'),
  coForEach: require('co-foreach'),
  mongoClient: require('mongodb').MongoClient,
  lodash: require('lodash'),
};
