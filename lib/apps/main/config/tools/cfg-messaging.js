'use strict';

module.exports = {
  name: 'messaging',
  module: 'cta-messaging',
  properties: {
    provider: 'rabbitmq',
    parameters: {
      url: 'amqp://10.211.55.3?heartbeat=60',
      // url: 'amqp://dtco-ctawbmd-dev-02.emea1.cis.trcloud?heartbeat=60',
    },
  },
  singleton: true,
  order: 2,
};
