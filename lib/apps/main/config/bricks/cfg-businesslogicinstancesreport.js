'use strict';

// const module_name = 'cta-app-instancedataservice/lib/';

module.exports = {
  name: 'businesslogic-instancesreport',
  // module: module_name + './bricks/businesslogics/instance/index.js', // relative to Cement.dirname value (process.cwd() by default, i.e. where the app was launched)
  module: './bricks/businesslogics/instancereport/index.js', // relative to Cement.dirname value (process.cwd() by default, i.e. where the app was launched)
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
      topic: 'msg.instance',
      data: [
        {
          nature: {
            type: 'message',
            quality: 'acknowledge',
          },
        },
      ]
    }
  ],
  subscribe: [
    {
      topic: 'msg.instance',
      data: [
        {
          nature: {
            type: 'instancereport',
            quality: 'create',
          },
        },
      ]
    }
  ],
};
