/**
 * This source code is provided under the Apache 2.0 license and is provided
 * AS IS with no warranty or guarantee of fit for purpose. See the project's
 * LICENSE.md for details.
 * Copyright 2017 Thomson Reuters. All rights reserved.
 */

'use strict';

module.exports = {
  name: 'receiver',
  module: 'cta-io',
  dependencies: {
    messaging: 'messaging',
  },
  properties: {
    input: {
      queue: 'cta.ids.instances',
    },
  },
  publish: [
    {
      topic: 'messages',
      data: [
        {
          nature: {
            type: 'instances',
            //quality: 'create|update|delete',
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
            type: 'messages',
            quality: 'acknowledge',
          },
        },
      ],
    },
  ],
};
