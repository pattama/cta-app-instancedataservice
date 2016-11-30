'use strict';

module.exports = {
  name: 'instancesreport',
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
      ],
    },
  ],
  subscribe: [
    {
      topic: 'messages',
      data: [
        {
          nature: {
            type: 'instances',
            // quality: 'create|update|delete',
          },
        },
      ],
    },
  ],
};
