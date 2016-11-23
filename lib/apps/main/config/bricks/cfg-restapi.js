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
            method: 'get',
            handler: 'find',
            path: '/instances',
          },
          {
            method: 'post',
            handler: 'find',
            path: '/instances/search',
          },
          {
            method: 'patch',
            handler: 'update',
            path: '/instances',
          },
          {
            method: 'delete',
            handler: 'delete',
            path: '/instances',
          },
        ],
      },
    ],
  },
  publish: [
    {
      topic: 'db.interface',
      data: [{
        nature: {
          type: 'document',
          //quality: 'create|update|find|delete',
        },
      }],
    },
  ],
};
