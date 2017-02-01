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
            type: 'instances',
          },
        },
      ],
    },
    {
      topic: 'messages',
      data: [
        {
          nature: {
            type: 'messages',
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
