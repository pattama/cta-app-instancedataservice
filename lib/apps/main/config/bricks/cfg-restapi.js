'use strict';

module.exports = {
  name: 'restapi',
  module: 'cta-restapi',
  dependencies: {
    express: 'express',
  },
  properties: {
    providers: [
      {
        name: 'instances',
        module: './utils/restapi/handlers/instances.js',
        routes: [
          {
            method: 'post',
            handler: 'create',
            path: '/instances',
          },
          {
            method: 'post',
            handler: 'find',
            path: '/instances/search',
          },
          {
            method: 'get',
            handler: 'find',
            path: '/instances',
          },
          {
            method: 'patch',
            handler: 'update',
            path: '/instances',
          },
          {
            method: 'delete',
            handler: 'delete',
            path: '/instances/:id',
          },
        ],
      },
    ],
  },
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
  ],
};
