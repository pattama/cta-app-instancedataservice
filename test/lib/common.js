'use strict';

const chai = require('chai');
const Request = require('cta-tool-request');

module.exports = {
  assert: chai.assert,
  superagent: require('superagent'),
  request: new Request(),
  forever: require('forever-monitor'),
  exec: require('child_process').exec,
  path: require('path'),
  os: require('os'),
};
