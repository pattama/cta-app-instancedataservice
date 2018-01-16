/**
 * This source code is provided under the Apache 2.0 license and is provided
 * AS IS with no warranty or guarantee of fit for purpose. See the project's
 * LICENSE.md for details.
 * Copyright 2017 Thomson Reuters. All rights reserved.
 */

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
            path: '/ids/instances',
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
