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
        module: './utils/restapi/handlers/instances.js', // relative to Cement.dirname value (process.cwd() by default, i.e. where the app was launched)
        routes: [
          {
            method: 'post', // http method get|post|put|delete
            handler: 'create', // name of the method in your provider
            path: '/instances', // the route path
          },
          {
            method: 'get', // http method get|post|put|delete
            handler: 'find', // name of the method in your provider
            path: '/instances', // the route path
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
  ], // don't forget to define this property so that you are able to send jobs to the next bricks
};
