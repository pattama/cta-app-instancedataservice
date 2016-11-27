'use strict';

module.exports = {
  name: 'dbinterface-mongodb',
  module: './bricks/dbinterfaces/mongodbinterface/index.js',
  properties: {},
  publish: [
    {
      topic: 'dblayer',
      data: [
        {
          nature: {
            type: 'database',
            quality: 'query',
          },
        },
      ],
    },
  ],
  subscribe: [
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
};
