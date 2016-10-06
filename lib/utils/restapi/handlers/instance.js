'use strict';

const ObjectID = require('bson').ObjectID;
const defaultLogger = require('cta-logger');
const extend = require('util')._extend;

class InstanceRestApi {

  constructor(cementHelper) {
    this.cementHelper = cementHelper;
    this.logger = defaultLogger();
  }

  testInstance(req, res) {
    res.send('ok for instance');
  }

  /**
   * Get instance that matches request
   * @param req
   * @returns {Object} - instance object
   */
  findInstance(req, res) {
    var context = this.cementHelper.createContext({
      nature:{
        type:"instance",
        quality:req.method,
      },
      payload:{
        req:req.query,
      },
    });

    context.on('error', function(result) {
      console.log('EEEEEEEEE');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.writeHead(500, {'Content-Type': 'application/json'});
      const json = {'return': 'error'};
      if (result) {
        json.messageError = result;
      }
      res.end(JSON.stringify(json));
    })
    context.on('done', function(result) {
      console.log('DDDDDD');
      if (result == null) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.writeHead(404, {'Content-Type': 'application/json'});
        const json = {'return': 'error'};
        if (result) {
          json.messageError = result;
        }
        res.end(JSON.stringify(json));
      } else {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(result));
      }
    })
    context.publish();
  }

  findInstanceById(req, res) {
    var context = this.cementHelper.createContext({
      nature:{
        type:"instance",
        quality:req.method,
      },
      payload:{
        req:req.params,
      },
    });

    context.on('error', function(result) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.writeHead(500, {'Content-Type': 'application/json'});
      const json = {'return': 'error'};
      if (result) {
        json.messageError = result;
      }
      res.end(JSON.stringify(json));
    })
    context.on('done', function(result) {
      if (result == null) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.writeHead(404, {'Content-Type': 'application/json'});
        const json = {'return': 'error'};
        if (result) {
          json.messageError = result;
        }
        res.end(JSON.stringify(json));
      } else {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(result));
      }
    })
    context.publish();

  }

  updateInstance(req, res) {
    var context = this.cementHelper.createContext({
      nature:{
        type:"instance",
        quality:req.method,
      },
      payload:{
        req:req.body,
      },
    });

    context.on('error', function(result) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.writeHead(500, {'Content-Type': 'application/json'});
      const json = {'return': 'error'};
      if (result) {
        json.messageError = result;
      }
      res.end(JSON.stringify(json));
    })
    context.on('done', function(result) {
      if (result == null) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.writeHead(404, {'Content-Type': 'application/json'});
        const json = {'return': 'error'};
        if (result) {
          json.messageError = result;
        }
        res.end(JSON.stringify(json));
      } else {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(result));
      }
    })
    context.publish();

  }

  deleteInstance(req) {

  }

  /**
   * Publish the job to other bricks
   * @param job
   * @param callback {Function.<string, Object>} - return statusCode and result as parameter
   */
  sendToDestination(job, callback) {
    const that = this;
    const context = this.cementHelper.createContext(job);
    context
      .on('reject', function onContextReject(who, reject) {
        this.logger.error('Job was rejected', reject);
        callback('reject', reject);
      })
      .on('error', function onContextError(who, error) {
        this.logger.error('Job has error', error);
        callback('error', error);
      })
      .on('accept', function onContextReject(who, result) {
        this.logger.info('Job accepted', result);
        callback('accept', result);
      })
      .on('done', function onContextDone(who, result) {
        callback('done', result);
      })
      .publish();
  }

}


module.exports = InstanceRestApi;

