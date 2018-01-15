# cta-app-instancedataservice
[![build status](https://git.sami.int.thomsonreuters.com/compass/cta-app-instancedataservice/badges/master/build.svg)](https://git.sami.int.thomsonreuters.com/compass/cta-app-instancedataservice/commits/master)[![coverage report](https://git.sami.int.thomsonreuters.com/compass/cta-app-instancedataservice/badges/master/coverage.svg)](https://git.sami.int.thomsonreuters.com/compass/cta-app-instancedataservice/commits/master)

**Instance Data Service Application (IDS)** for Compass Test Automation, implementing CTA-OSS Framework

## General Overview

### Overview
Instances Data Service (IDS) provides the service to register the instance which run the cta-client to CTA system. When the instance is registered, CTA system will assign the matched execution test to the cta-client. Any CTA’s services need IDS to check the information then IDS will provides the instance’s status (available or being executing the test) and the test script result base on the test script logics.

For detail, please go to our [**CTA Main Repository**](https://github.com/thomsonreuters/cta).

### Features
 * Instance Management 
 * Create a new Instance
 * Destroy an Instance

## Guidelines

* [Getting Start](#getting-start)
  * [Prerequisites](#prerequisites) 
  * [Installation & Startup](#installation-startup)
* [Development Guide](#development-guide)
  * [Contributing](#contributing)
  * [More Information](#more-information)

## Getting Start

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

### Development Guide

### Configuration
A Configuration is the agreement of functional units according to their nature.

### Contributing
You can follow [these steps](https://github.com/thomsonreuters/cta/blob/master/contributing.md) to contribute.

### More Information
Our service is composed of different components working together to schedule, run, collect tests results and more. You can find additional information for more understand in Instances Data Service.
We also cover in detail :
* The Rest API is composed of multiple REST service to perform actions on CTA.
* A DataContract is a formal agreement between a bricks.
* A Configuration is the agreement of functional units according to their nature.
* The Document associated with a software project and the system being.
* A Sequence Diagrams is an interaction diagram that shows how objects operate with one another and in what order.
