'use strict';

const chai = require('chai');

module.exports = {
  assert: chai.assert,
  superagent: require('superagent'),
  forever: require('forever-monitor'),
  exec: require('child_process').exec,
  path: require('path'),
  os: require('os'),
};
