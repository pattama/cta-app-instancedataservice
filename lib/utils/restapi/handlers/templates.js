'use strict';
const _ = require('lodash');

/**
 * Handler class for RESTAPI handlers : INSTANCES
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
   * Publishes request body (Template) in an instance-create Context
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
   * Publishes request body (Template) in an instance-update Context
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
      payload: req.body,
    };
    data.payload.id = req.params.id;
    const context = this.cementHelper.createContext(data);
    context.on('done', function(brickname, response) {
      if (response) {
        res.send(response);
      } else {
        res.status(404).send('Template not found.');
      }
    });
    context.once('reject', function(brickname, error) {
      res.status(400).send(error.message);
    });
    context.once('error', function(brickname, error) {
      res.status(400).send(error.message);
    });
    context.publish();
  }

  /**
   * Publishes request params (Query) id in an instance-findbyid Context
   * @param req
   * @param res
   * @param next
   */
  findById(req, res) {
    const data = {
      nature: {
        type: this.dataType,
        quality: 'findById',
      },
      payload: {
        id: req.params.id,
      },
    };
    const context = this.cementHelper.createContext(data);
    context.once('done', function(brickname, response) {
      if (response) {
        res.send(response);
      } else {
        res.status(404).send('Template not found.');
      }
    });
    context.once('reject', function(brickname, error) {
      res.status(400).send(error.message);
    });
    context.once('error', function(brickname, error) {
      res.status(400).send(error.message);
    });
    context.publish();
  }

  /**
   * Publishes request params (Query) id in an instance-deleteone Context
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
        res.send(response);
      } else {
        res.status(404).send('Template not found.');
      }
    });
    context.once('reject', function(brickname, error) {
      res.status(400).send(error.message);
    });
    context.once('error', function(brickname, error) {
      res.status(400).send(error.message);
    });
    context.publish();
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
