'use strict';

module.exports = {
  name: 'templates-businesslogic',
  module: './bricks/businesslogics/template/index.js', // relative to Cement.dirname value (process.cwd() by default, i.e. where the app was launched)
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
  ],
  subscribe: [
    {
      topic: 'bl.templates',
      data: [
        {
          nature: {
            type: 'template',
            quality: 'create',
          },
        },
        {
          nature: {
            type: 'template',
            quality: 'find',
          },
        },
      ],
    },
  ],
};
