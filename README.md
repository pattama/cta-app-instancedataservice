# Instances Data Service for Compass Test Automation
[![build status](https://git.sami.int.thomsonreuters.com/compass/cta-app-instancedataservice/badges/master/build.svg)](https://git.sami.int.thomsonreuters.com/compass/cta-app-instancedataservice/commits/master)[![coverage report](https://git.sami.int.thomsonreuters.com/compass/cta-app-instancedataservice/badges/master/coverage.svg)](https://git.sami.int.thomsonreuters.com/compass/cta-app-instancedataservice/commits/master)
------
* General Overview
  * [Overview of Instances Data Service ](#Overview of Instances Data Service)
  * [What are the features that Instances Data Service provide?](#What are the features that Instances Data Service provide?)
  * [What is technology stack for Instances Data Service?](#What is technology stack for Instances Data Service?)
* Getting Started
  * Please visit  [IDS Wiki](https://git.sami.int.thomsonreuters.com/compass/cta-app-instancedataservice/wikis/home) to see the step.
* Development Guide
  * [What is Instances Data Service's configuration and how can I find it?](#What is Instances Data Service's configuration and how can I find it?)
  * [How I can contribute to my code?](#How I can contribute to my code?)
  * [Where can I find information about Instances Data Service component?](#Where can I find information about Instances Data Service component?)

------

### General Overview

#### Overview of Instances Data Service
Instances Data Service (IDS) provides the service to register the instance which run the cta-client to CTA system. When the instance is registered, CTA system will assign the matched execution test to the cta-client. Any CTA’s services need IDS to check the information then IDS will provides the instance’s status (available or being executing the test) and the test script result base on the test script logics.


#### What are the features that Instances Data Service provide?
Please check [IDS Wiki](https://git.sami.int.thomsonreuters.com/compass/cta-app-instancedataservice/wikis/home) for the list of all features provides by CTA.


#### What is technology stack for Instances Data Service?
 1. Front End skills required include `HTML`, `CSS`, `JavaScript`, `JSON`. 
 2. Back End development using `Node.js`, `Express,` and `MongoDB`. It also important concept of source control using `Git`.
  
------

### Development Guide

#### What is Instances Data Service's configuration and how can I find it?
A [Configuration](https://git.sami.int.thomsonreuters.com/compass/cta-app-instancesdataservice/wikis/configuration) is the agreement of functional units according to their nature.

#### How I can contribute to my code?
You can follow [these steps](https://git.sami.int.thomsonreuters.com/compass/cta/blob/master/contributing.md) to contribute.

#### Where can I find information about Instances Data Service component?
Our service is composed of different components working together to schedule, run, collect tests results and more. You can find additional information for more understand in Instances Data Service.
We also cover in detail :
* The [Rest API](https://git.sami.int.thomsonreuters.com/compass/cta-app-instancedataservice/wikis/restapi) is composed of multiple REST service to perform actions on CTA.
* A [DataContract](https://git.sami.int.thomsonreuters.com/compass/cta-app-instancedataservice/wikis/datacontract) is a formal agreement between a bricks.
* A [Configuration](https://git.sami.int.thomsonreuters.com/compass/cta-app-instancedataservice/wikis/configuration)is the agreement of functional units according to their nature.
* The [Document](https://git.sami.int.thomsonreuters.com/compass/cta-app-instancedataservice/wikis/document) associated with a software project and the system being.
* A [Sequence Diagrams](https://git.sami.int.thomsonreuters.com/compass/cta-app-instancesdataservice/wikis/sequencediagram) is an interaction diagram that shows how objects operate with one another and in what order.


------

This code is running live at [CTA-OSS](https://www.). We also have [CTA Central Document](https://git.sami.int.thomsonreuters.com/compass/cta) 
