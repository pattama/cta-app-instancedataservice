# Instance DataService for Compass Test Automation
[Readme](README.md) | [Rest API](RESTAPI.md) | [DataModel](DATAMODEL.md) | [DataContract](DATACONTRACT.md) | [Document](DOCUMENTATION.md) |[Configuration](CONFIGURATION.md)| [Sequence Diagrams](https://www.lucidchart.com/documents/edit/9980627b-2d6c-4a15-b610-235575b8801e)

## Instance data model

| field | validation | description | example
| --- | --- | --- | ---
| id | identifier (optional) | unique id | "582c1e7b66f0ef0d14d2d739"
| hostname | string (mandatory) | hostname of the instance | "localhost"
| ip | string (mandatory) | IP address of the instance | "10.3.177.98"
| properties | object (optional) | instance properties | {os: 'windows 10', browser: 'ie10', env: ['alpha', 'beta']}
| executionId | string (optional) | execution id of the current running execution | "892c1e7b66fop9d14d2d782"
| state | string (optional) | state of the current execution | "finished"