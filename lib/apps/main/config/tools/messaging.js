'use strict';

module.exports = {
  name: 'messaging',
  module: 'cta-messaging',
  properties: {
    provider: 'rabbitmq',
    parameters: {
      url: 'amqp://10.42.63.132?heartbeat=60',
      // url: 'amqp://dtco-ctawbmd-dev-02.emea1.cis.trcloud?heartbeat=60',
    },
  },
  singleton: true,
  order: 2,
};
