'use strict';

module.exports = {
  name: 'receiver',
  module: 'cta-io',
  dependencies: {
    messaging: 'messaging',
  },
  properties: {
    input: {
      queue: 'cta.instance',
    },
  },
  publish: [
    {
      topic: 'messaging.io',
      data: [{}],
    },
  ],
  subscribe: [
    {
      topic: 'messaging.io',
      data: [{}],
    },
  ],
};
