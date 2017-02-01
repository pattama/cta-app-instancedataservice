'use strict';

module.exports = {
  name: 'businesslogic-instances',
  module: './bricks/businesslogics/instances/index.js',
  properties: {},
  publish: [
    {
      topic: 'dbInterface',
      data: [
        {
          nature: {
            type: 'dbInterface',
          },
        },
      ],
    },
  ],
  subscribe: [
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
  ],
};
