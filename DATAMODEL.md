Data Model
==========

# Summary

* Instance data model(#instance-data-model)
* Template data model(#template-data-model)

# Instance data model

| field | validation | description | example
| --- | --- | --- | ---
| id | identifier | unique id | "582c1e7b66f0ef0d14d2d739"
| hostname | string (mandatory) | hostname of the instance | "localhost"
| ip | string (mandatory) | IP address of the instance | "10.3.177.98"
| properties | object (optional) | Instance properties | `{os: 'windows', office: '2013', browser: 'ie10'}`

# Template data model