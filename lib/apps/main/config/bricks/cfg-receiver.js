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
    // {
    //   topic: 'messaging.io',
    //   data: [{}],
    // },
    {
      topic: 'msg.instance',
      data: [
        {
          nature: {
            type: 'instancereport',
            quality: 'create',
          }
        }
      ]
    }
  ],
  subscribe: [
    // {
    //   topic: 'messaging.io',
    //   data: [{}],
    // },
    // {
    //   topic: 'instanceReport',
    //   data: [
    //     {
    //       nature: {
    //         type: 'instanceReport',
    //         quality: 'create',
    //       }
    //     }
    //   ]
    // },
    {
      topic: 'msg.instance',
      data: [
        {
          nature: {
            type: 'instancereport',
            quality: 'create',
          }
        },
        {
          nature: {
            type: 'message',
            quality: 'acknowledge',
          }
        }
      ]
    },
  ],
};
