'use strict';

const config = {
  name: 'cta-app-instance-dataservice',
  tools: [
    {
    name: 'logger',
    module: 'cta-logger',
    properties: {},
    scope: 'all',
    },
    {
      name: 'messaging',
      module: 'cta-messaging',
      properties: {
        provider: 'rabbitmq',
        parameters: {
          url: 'amqp://localhost?heartbeat=60',
        },
      },
      singleton: true,
    },
    {
      name: 'my-express',
      module: 'cta-expresswrapper',
      properties: {
        port: 3000,
      },
      singleton: true,
    },
    {
      name: 'healthcheck',
      module: 'cta-healthcheck',
      properties: {
        queue: 'healthcheck',
      },
      dependencies: {
        messaging: 'messaging',
        express: 'my-express',
      },
      scope: 'bricks',
      singleton: true,
    },
  ],
  /**
   * Bricks
   */
  bricks: [
    {
      name: 'restapi',
      module: 'cta-restapi',
      dependencies: {
        express: 'my-express',
      },
      properties: {
        providers: [
          {
            name: 'executions',
            module: './utils/restapi/handlers/instance.js',
            routes: [
              {
                method: 'post', // http method get|post|put|delete
                handler: 'create', // name of the method in your provider
                path: '/executions', // the route path
              },
              {
                method: 'put', // http method get|post|put|delete
                handler: 'create', // name of the method in your provider
                path: '/executions/:id', // the route path
              },
              {
                method: 'patch', // http method get|post|put|delete
                handler: 'update', // name of the method in your provider
                path: '/executions/:id', // the route path
              },
              {
                method: 'get', // http method get|post|put|delete
                handler: 'findById', // name of the method in your provider
                path: '/executions/:id', // the route path
              },
              {
                method: 'delete', // http method get|post|put|delete
                handler: 'delete', // name of the method in your provider
                path: '/executions/:id', // the route path
              },
            ],
          },
        ],
      },
      publish: [
        {
          topic: 'bl.executions',
          data: [
            {
              nature: {
                type: 'execution',
              },
            },
          ],
        },
      ], // don't forget to define this property so that you are able to send jobs to the next bricks
    },
    {
      name: 'mongodblayer',
      module: 'cta-dblayer',
      properties: {
        provider: 'mongodb',
        configuration: {
          databasename: 'oss',
          servers: [
            {
              host: 'localhost',
              port: 27017,
            },
          ],
          options: {},
        },
      },
      publish: [],
      subscribe: [
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
    },
  ],
};

module.exports = config;
