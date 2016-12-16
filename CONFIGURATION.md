# Instance DataService for Compass Test Automation
[Readme](README.md) | [Rest API](RESTAPI.md) | [DataContract](DATACONTRACT.md) | [Document](DOCUMENTATION.md) |[Configuration](CONFIGURATION.md)| [Sequence Diagrams](https://www.lucidchart.com/documents/edit/9980627b-2d6c-4a15-b610-235575b8801e)


## Instanse Configuration
 * [Instance business logic](#instance-business-logic)
 * [Instance report business logic](#instance-report-business-logic)
 * [DB Interface](#db-interface-mongodb)
 * [DB Layer](#db-layer-mongodb)
 * [CTA IO Receiver](#receiver)
 * [Rest API](#restapi)

### Instance business logic:
```ruby
module.exports = {
  name: 'businesslogic-instances',
  module: './bricks/businesslogics/instance/index.js',
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
          },
        },
      ],
    },
  ],
};

```

### Instance report business logic:
```ruby
module.exports = {
  name: 'businesslogic-instancesreport',
  module: './bricks/businesslogics/instancereport/index.js',
  properties: {},
  publish: [
    {
      topic: 'bl.instances',
      data: [
        {
          nature: {
            type: 'instance',
          },
        },
      ],
    },
    {
      topic: 'messages',
      data: [
        {
          nature: {
            type: 'message',
            quality: 'acknowledge',
          },
        },
      ],
    },
  ],
  subscribe: [
    {
      topic: 'messages',
      data: [
        {
          nature: {
            type: 'instance',
            // quality: 'create|update|delete',
          },
        },
      ],
    },
  ],
}
```

### DB Interface:
```ruby
module.exports = {
  name: 'dbinterface-mongodb',
  module: './bricks/dbinterfaces/mongodbinterface/index.js',
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
}
```

### DB Layer:
```ruby
module.exports = {
  name: 'dblayer-mongodb',
  module: 'cta-dblayer',
  properties: {
    provider: 'mongodb',
    configuration: {
      databaseName: 'oss',
      servers: [
        {
          host: 'localhost',
          port: 27017,
        },
      ],
      options: {},
    },
  },
  publish: [],
  subscribe: [
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
}
```

### CTA IO Receiver:
```ruby
module.exports = {
  name: 'receiver',
  module: 'cta-io',
  dependencies: {
    messaging: 'messaging',
  },
  properties: {
    input: {
      queue: 'cta.ids',
    },
  },
  publish: [
    {
      topic: 'messages',
      data: [
        {
          nature: {
            type: 'instance',
            //quality: 'create|update|delete',
          },
        },
      ],
    },
  ],
  subscribe: [
    {
      topic: 'messages',
      data: [
        {
          nature: {
            type: 'message',
            quality: 'acknowledge',
          },
        },
      ],
    },
  ],
}
```

### Rest API:
```ruby
module.exports = {
  name: 'restapi',
  module: 'cta-restapi',
  dependencies: {
    express: 'express',
  },
  properties: {
    providers: [
      {
        name: 'instances',
        module: './utils/restapi/handlers/instances.js',
        routes: [
          {
            method: 'post',
            handler: 'create',
            path: '/instances',
          },
          {
            method: 'post',
            handler: 'find',
            path: '/instances/search',
          },
          {
            method: 'get',
            handler: 'find',
            path: '/instances',
          },
          {
            method: 'patch',
            handler: 'update',
            path: '/instances',
          },
          {
            method: 'delete',
            handler: 'delete',
            path: '/instances/:id',
          },
        ],
      },
    ],
  },
  publish: [
    {
      topic: 'bl.instances',
      data: [
        {
          nature: {
            type: 'instance',
          },
        },
      ],
    },
  ],
}
```

