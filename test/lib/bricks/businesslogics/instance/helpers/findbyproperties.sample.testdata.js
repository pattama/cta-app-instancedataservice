'use strict';
const ObjectID = require('bson').ObjectID;

const data = {
    id: (new ObjectID()).toString(),
    schedule: '* * * * *',
    rest: {
      method: 'POST',
      url: '/instances/search',
      headers: {
        "Content-Type": 'application/json'
      },
      body: {
        "query": {
          "instance_type": {
            "type": 'cloud',
            "properties": [{
              "name": "testsuite1"
              , "value": "notepad.exe"}],
            "instancestemplate": {}
          },
        },
        "sort": "",
        "per_page": 1,
        "page": 1,
      }
    }
  };

module.exports = data;
