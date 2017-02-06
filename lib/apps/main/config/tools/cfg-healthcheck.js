'use strict';

module.exports = {
  name: 'healthcheck',
  module: 'cta-healthcheck',
  properties: {
    queue: 'cta.hck',
  },
  dependencies: {
    messaging: 'messaging',
    express: 'express',
  },
  scope: 'bricks',
  singleton: true,
  order: 4,
};
