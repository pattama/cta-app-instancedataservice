'use strict';
const ObjectID = require('bson').ObjectID;

const data = {
    filter: {
      limit: 100,
      offset: 0,
    },
    query: {
      // id: (new ObjectID()).toString(),
      // hostname: 'unknown',
      // ip: '1.2.3.4',
      instance_type: {
        propName: ['test1','test2'],
        // instancetemplate: (new ObjectID()).toString(),
      },
    },

};

module.exports = data;
