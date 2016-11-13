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
