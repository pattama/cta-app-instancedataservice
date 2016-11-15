'use strict';

// const module_name = 'cta-app-instancedataservice/lib/';

module.exports = {
  name: 'businesslogic-instances',
  // module: module_name + './bricks/businesslogics/instance/index.js', // relative to Cement.dirname value (process.cwd() by default, i.e. where the app was launched)
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
  ],
  subscribe: [
    {
      topic: 'bl.instances',
      data: [
        {
          nature: {
            type: 'instance',
            quality: 'create',
          },
        },
        {
          nature: {
            type: 'instance',
            quality: 'find',
          },
        },
      ],
    },
  ],
};
