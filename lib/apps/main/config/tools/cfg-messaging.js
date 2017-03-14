'use strict';

module.exports = {
  name: 'messaging',
  module: 'cta-messaging',
  properties: {
    provider: 'rabbitmq',
    parameters: {
      url: 'amqp://rabbitmq?heartbeat=60',
    },
  },
  singleton: true,
  order: 2,
};
