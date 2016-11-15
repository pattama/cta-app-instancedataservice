'use strict';
const _ = require('lodash');
const Template = require('../../datamodels/template.js');

/**
 * Handler class for RESTAPI handlers : TEMPLATES
 * @property {CementHelper} cementHelper - cementHelper from a cta-restapi Brick
 */
class TemplatesHandler {
  /**
   *
   * @param {CementHelper} cementHelper - cementHelper from a cta-restapi Brick
   */
  constructor(cementHelper) {
    this.cementHelper = cementHelper;
    this.dataType = 'template';
  }

  /**
   * Publishes request body (Template) in an template-create Context
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
      res.status(400).send('Missing \'id\' property');
    } else {
      if (req.params.hasOwnProperty('id')) {
        data.payload.id = req.params.id;
      }
      const context = this.cementHelper.createContext(data);
      context.on('done', function(brickname, response) {
        res.status(201).send(response);
      });
      context.once('reject', function(brickname, error) {
        res.status(400).send(error.message);
      });
      context.once('error', function(brickname, error) {
        res.status(400).send(error.message);
      });
      context.publish();
    }
  }

  /**
   * Publishes request params (Query) in an instance-find Context
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
      res.send(response);
    });
    context.once('reject', function(brickname, error) {
      res.status(400).send(error.message);
    });
    context.once('error', function(brickname, error) {
      res.status(400).send(error.message);
    });
    context.publish();
  }
}

module.exports = TemplatesHandler;
