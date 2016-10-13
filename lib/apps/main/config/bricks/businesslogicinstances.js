'use strict';

module.exports = {
  name: 'businesslogic-instances',
  module: './bricks/businesslogics/instance/index.js', // relative to Cement.dirname value (process.cwd() by default, i.e. where the app was launched)
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
    {
      topic: 'bl.executions',
      data: [
        {
          nature: {
            type: 'execution',
            quality: 'finalize',
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
            quality: 'create',
          },
        },
        {
          nature: {
            type: 'instances',
            quality: 'findById',
          },
        },
        {
          nature: {
            type: 'instances',
            quality: 'update',
          },
        },
        {
          nature: {
            type: 'instances',
            quality: 'delete',
          },
        },
        {
          nature: {
            type: 'instances',
            quality: 'find',
          },
        },
      ],
    },
  ],
};
