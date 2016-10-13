'use strict';

class InstancesRestApi {

  constructor(cementHelper) {
    this.cementHelper = cementHelper;
  }

  create(req, res) {
    const data = {
      nature: {
        type: 'instance',
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
      context.publish();
      context.on('done', function(brickname, response) {
        res.status(201).send(response);
      });
      context.once('reject', function(brickname, error) {
        res.status(400).send(error.message);
      });
      context.once('error', function(brickname, error) {
        res.status(400).send(error.message);
      });
    }
  }

}

module.exports = InstancesRestApi;
