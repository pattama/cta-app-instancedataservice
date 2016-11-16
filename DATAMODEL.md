Data Model
==========

# Summary

* Instance data model(#instance-data-model)
* Template data model(#template-data-model)

# Instance data model

| field | validation | description | example
| --- | --- | --- | ---
| id | identifier (optional) | unique id | "582c1e7b66f0ef0d14d2d739"
| hostname | string (mandatory) | hostname of the instance | "localhost"
| ip | string (mandatory) | IP address of the instance | "10.3.177.98"
| properties | object (optional) | instance properties | {os: 'windows 10', browser: 'ie10', env: ['alpha', 'beta']}

# Template data model

| field | validation | description | example
| --- | --- | --- | ---
| id | identifier (optional) | unique id | "582c1e7b66f0ef0d14d2d73c"
| name | string (mandatory) | name of the template | "win10-office16-ie10"
| properties | object (optional) | template properties | {os: 'windows 10', office: '2016', browser: 'ie10', nodejs: '6.9.1'}