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
            path: '/ids/instances',
          },
          {
            method: 'post',
            handler: 'find',
            path: '/ids/instances/search',
          },
          {
            method: 'get',
            handler: 'find',
            path: '/ids/instances',
          },
          {
            method: 'patch',
            handler: 'update',
            path: '/ids/instances/:id',
          },
          {
            method: 'delete',
            handler: 'delete',
            path: '/ids/instances/:id',
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
            type: 'instances',
          },
        },
      ],
    },
  ],
};
