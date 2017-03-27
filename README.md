# Instances Data Service for Compass Test Automation
[![build status](https://git.sami.int.thomsonreuters.com/compass/cta-app-instancedataservice/badges/master/build.svg)](https://git.sami.int.thomsonreuters.com/compass/cta-app-instancedataservice/commits/master)[![coverage report](https://git.sami.int.thomsonreuters.com/compass/cta-app-instancedataservice/badges/master/coverage.svg)](https://git.sami.int.thomsonreuters.com/compass/cta-app-instancedataservice/commits/master)
------
* General Overview
  * [Overview](#overview)
  * [Features](#features)
* Getting Started
  * [Prerequisites](prerequisites) 
  * [Installation & Startup](#installation-&-startup)
* Development Guide
  * [Contributing](#contributing)
  * [More Information](#more-information)

------

## General Overview
### Overview
Instances Data Service (IDS) provides the service to register the instance which run the cta-client to CTA system. When the instance is registered, CTA system will assign the matched execution test to the cta-client. Any CTA’s services need IDS to check the information then IDS will provides the instance’s status (available or being executing the test) and the test script result base on the test script logics.

### Features
 * Instance Management 
 * Create a new Instance
 * Destroy an Instance

You can check more [feature guide](https://git.sami.int.thomsonreuters.com/compass/cta/blob/master/features.md) for a list of all features provided by CTA-OSS.

------

## Getting Started
### Prerequisites
 1. Front End skills required include `HTML`, `CSS`, `JavaScript`, `JSON`. 
 2. Back End development using `Node.js`, `Express,` and `MongoDB`. It also important concept of source control using `Git`.

### Installation & Startup
The easiest way to get started is to clone the repository:
```ruby
git clone git@git.sami.int.thomsonreuters.com:compass/cta-app-instancedataservice.git
```
Then install NPM dependencies:
```ruby
npm install
```
To build, be sure you have [node](https://nodejs.org/en/) installed.
To start the application, browse to the project directory and type: $ npm run into the terminal window. Point a browser to localhost:3000 and you're up and running!
  
------

### Development Guide

### Configuration
A [Configuration](https://git.sami.int.thomsonreuters.com/compass/cta-app-instancesdataservice/wikis/configuration) is the agreement of functional units according to their nature.

### Contributing
You can follow [these steps](https://git.sami.int.thomsonreuters.com/compass/cta/blob/master/contributing.md) to contribute.

### More Information
Our service is composed of different components working together to schedule, run, collect tests results and more. You can find additional information for more understand in Instances Data Service.
We also cover in detail :
* The [Rest API](https://git.sami.int.thomsonreuters.com/compass/cta-app-instancedataservice/wikis/restapi) is composed of multiple REST service to perform actions on CTA.
* A [DataContract](https://git.sami.int.thomsonreuters.com/compass/cta-app-instancedataservice/wikis/datacontract) is a formal agreement between a bricks.
* A [Configuration](https://git.sami.int.thomsonreuters.com/compass/cta-app-instancedataservice/wikis/configuration)is the agreement of functional units according to their nature.
* The [Document](https://git.sami.int.thomsonreuters.com/compass/cta-app-instancedataservice/wikis/document) associated with a software project and the system being.
* A [Sequence Diagrams](https://git.sami.int.thomsonreuters.com/compass/cta-app-instancesdataservice/wikis/sequencediagram) is an interaction diagram that shows how objects operate with one another and in what order.


------

This code is running live at [CTA-OSS](https://www.). We also have [CTA Central Document](https://git.sami.int.thomsonreuters.com/compass/cta) 
