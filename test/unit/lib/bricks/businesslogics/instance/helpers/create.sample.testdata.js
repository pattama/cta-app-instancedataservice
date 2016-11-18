'use strict';
const ObjectID = require('bson').ObjectID;

const data = {
  id: (new ObjectID()).toString(),
  hostname: 'foo.com',
  ip: '11.11.11.11',
};

module.exports = data;
