'use strict';

module.exports = {
  name: 'receiver',
  module: 'cta-io',
  dependencies: {
    messaging: 'messaging',
  },
  properties: {
    input: {
      queue: 'cta.ids',
    },
  },
  publish: [
    {
      topic: 'messages',
      data: [
        {
          nature: {
            type: 'instances',
            //quality: 'create|update|delete',
          },
        },
      ],
    },
  ],
  subscribe: [
    {
      topic: 'messages',
      data: [
        {
          nature: {
            type: 'message',
            quality: 'acknowledge',
          },
        },
        {
          nature: {
            type: 'instances',
          },
        },
      ],
    },
  ],
};
