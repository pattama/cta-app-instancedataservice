'use strict';

const config = {
  name: 'base-businesslogic',
  module: './bricks/businesslogics/instances/index.js',
  properties: {
    instanceApiUrl: 'http://localhost:3010/ids/',
    schedulerApiUrl: 'http://localhost:3011/sch',
    jobManagerApiUrl: 'http://localhost:3012/jms/',
  },
  publish: [],
  subscribe: [
    {
      topic: 'bl.base',
      data: [
        {},
      ],
    },
  ],
};

module.exports = config;
