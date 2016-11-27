'use strict';

module.exports = {
  name: 'businesslogic-instancesreport',
  module: './bricks/businesslogics/instancereport/index.js',
  properties: {},
  publish: [
    {
      topic: 'bl.instances',
      data: [
        {
          nature: {
            type: 'instance',
          },
        },
      ],
    },
    {
      topic: 'messages',
      data: [
        {
          nature: {
            type: 'message',
            quality: 'acknowledge',
          },
        },
      ]
    }
  ],
  subscribe: [
    {
      topic: 'messages',
      data: [
        {
          nature: {
            type: 'instance',
            // quality: 'create|update|delete',
          },
        },
      ]
    }
  ],
};
