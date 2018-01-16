/**
 * This source code is provided under the Apache 2.0 license and is provided
 * AS IS with no warranty or guarantee of fit for purpose. See the project's
 * LICENSE.md for details.
 * Copyright 2017 Thomson Reuters. All rights reserved.
 */

'use strict';
const _ = require('lodash');

/**
 * Handler class for RESTAPI handlers
 * @property {CementHelper} cementHelper - cementHelper from a cta-restapi Brick
 */
class Handler {
  /**
   *
   * @param {CementHelper} cementHelper - cementHelper from a cta-restapi Brick
   */
  constructor(cementHelper) {
    this.cementHelper = cementHelper;
    this.dataType = null; // to be set by child class
  }

  /**
   * Publishes create
   * @param req
   * @param res
   * @param next
   */
  create(req, res) {
    const data = {
      nature: {
        type: this.dataType,
        quality: 'create',
      },
      payload: req.body,
    };
    if (req.method.toLowerCase() === 'put' && !req.params.hasOwnProperty('id')) {
      res.status(400).send({ error: 'Missing \'id\' property' });
    } else {
      if (req.params.hasOwnProperty('id')) {
        data.payload.id = req.params.id;
      }
      const context = this.cementHelper.createContext(data);
      context.on('done', function(brickname, response) {
        res.status(201).send({ result: response });
      });
      context.once('reject', function(brickname, error) {
        res.status(400).send({ error: error.message });
      });
      context.once('error', function(brickname, error) {
        res.status(400).send({ error: error.message });
      });
      context.publish();
    }
  }

  /**
   * Publishes update
   * @param req
   * @param res
   * @param next
   */
  update(req, res) {
    const data = {
      nature: {
        type: this.dataType,
        quality: 'update',
      },
      payload: {
        query: req.query,
        content: req.body,
      },
    };
    if (req.params && req.params.hasOwnProperty('id')) {
      data.payload.query.id = req.params.id;
    }
    const context = this.cementHelper.createContext(data);
    context.on('done', function(brickname, response) {
      if (response) {
        res.send({ result: response });
      } else {
        res.status(404).send({ error: 'Instance not found.' });
      }
    });
    context.once('reject', function(brickname, error) {
      res.status(400).send({ error: error.message });
    });
    context.once('error', function(brickname, error) {
      res.status(400).send({ error: error.message });
    });
    context.publish();
  }

  /**
   * Publishes delete
   * @param req
   * @param res
   * @param next
   */
  delete(req, res) {
    const data = {
      nature: {
        type: this.dataType,
        quality: 'delete',
      },
      payload: {
        id: req.params.id,
      },
    };
    const context = this.cementHelper.createContext(data);
    context.once('done', function(brickname, response) {
      if (response) {
        res.send({ result: response });
      } else {
        res.status(404).send({ error: 'Instance not found.' });
      }
    });
    context.once('reject', function(brickname, error) {
      res.status(400).send({ error: error.message });
    });
    context.once('error', function(brickname, error) {
      res.status(400).send({ error: error.message });
    });
    context.publish();
  }

  /**
   * Publishes find
   * @param req
   * @param res
   * @param next
   */
  find(req, res) {
    const params = req.method === 'POST' ? _.cloneDeep(req.body) : _.cloneDeep(req.query);
    const filter = {};
    filter.limit = parseInt(params.limit, 10) || 20;
    delete params.limit;
    filter.offset = parseInt(params.offset, 10) || 0;
    delete params.offset;
    if (params.hasOwnProperty('sort')) {
      filter.sort = {};
      const split = params.sort.split(',')
        .filter((str) => (str.length > 0));
      split.forEach(function(sortValue) {
        if (sortValue.startsWith('-')) {
          filter.sort[sortValue.substr(1)] = -1;
        } else {
          filter.sort[sortValue] = 1;
        }
      });
      delete params.sort;
    }
    const data = {
      nature: {
        type: this.dataType,
        quality: 'find',
      },
      payload: {
        filter: filter,
        query: params,
      },
    };
    const context = this.cementHelper.createContext(data);
    context.once('done', function(brickname, response) {
      res.send({ result: response });
    });
    context.once('reject', function(brickname, error) {
      res.status(400).send({ error: error.message });
    });
    context.once('error', function(brickname, error) {
      res.status(400).send({ error: error.message });
    });
    context.publish();
  }
}

module.exports = Handler;
