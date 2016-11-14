'use strict';

module.exports = {
  name: 'messaging',
  module: 'cta-messaging',
  properties: {
    provider: 'rabbitmq',
    parameters: {
      url: 'amqp://10.42.63.132?heartbeat=60',
    },
  },
  singleton: true,
  order: 2,
};
