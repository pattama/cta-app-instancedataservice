'use strict';

const chai = require('chai');
const path = require('path');
const Request = require('cta-tool-request');
const superagent = require('superagent');
const forever = require('forever-monitor');
const exec = require('child_process').exec;
const os = require('os');
const co = require('co');
const coForEach = require('co-foreach');
const mongoClient = require('mongodb').MongoClient;
const lodash = require('lodash');

module.exports = {
  root: path.resolve(__dirname, '..'),
  app: path.resolve(__dirname, '..', 'lib', 'index.js'),
  assert: chai.assert,
  superagent: superagent,
  request: new Request(),
  forever: forever,
  exec: exec,
  path: path,
  os: os,
  co: co,
  coForEach: coForEach,
  mongoClient: mongoClient,
  lodash: lodash,
};
