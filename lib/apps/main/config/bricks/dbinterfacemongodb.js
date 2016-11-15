'use strict';

// const module_name = 'cta-app-instancedataservice/lib/';

module.exports = {
  name: 'dbinterface-mongodb',
  // module: module_name + './bricks/dbinterfaces/mongodbinterface/index.js', // relative to Cement.dirname value (process.cwd() by default, i.e. where the app was launched)
  module: './bricks/dbinterfaces/mongodbinterface/index.js', // relative to Cement.dirname value (process.cwd() by default, i.e. where the app was launched)
  properties: {},
  publish: [
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
  subscribe: [
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
};
