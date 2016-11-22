'use strict';

module.exports = {
  name: 'dbinterface-mongodb',
  module: './bricks/dbinterfaces/mongodbinterface/index.js', // relative to Cement.dirname value (process.cwd() by default, i.e. where the app was launched)
  properties: {},
  publish: [
    {
      topic: 'dblayer',
      data: [{
        nature: {
          type: 'database',
          quality: 'query',
        },
      }],
    },
  ],
  subscribe: [
    {
      topic: 'db.interface',
      data: [{
        nature: {
          type: 'document',
          quality: 'create',
        },
      }],
    },
  ],
};
