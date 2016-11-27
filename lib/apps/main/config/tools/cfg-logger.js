'use strict';

module.exports = {
  name: 'logger',
  module: 'cta-logger',
  properties: {
    filename: __dirname + '/../../../../../tmp/default.log',
    level: 'debug',
  },
  scope: 'all',
  order: 1,
};
