'use strict';

const module_name = 'cta-app-instancedataservice/lib/';

module.exports = {
  name: 'templates-businesslogic',
  module: module_name + './bricks/businesslogics/template/index.js', // relative to Cement.dirname value (process.cwd() by default, i.e. where the app was launched)
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
