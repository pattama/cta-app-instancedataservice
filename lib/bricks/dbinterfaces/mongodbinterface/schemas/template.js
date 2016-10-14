'use strict';
const ObjectID = require('bson').ObjectID;
const _ = require('lodash');
const Template = require('../../../../utils/datamodels/template.js');
/**
 * Template Schema for MongoDB class
 *
 */
class TemplateSchema {
  /**
   *
   * @param {Template} template - params
   */
  constructor(template) {
    const keys = Template.keys();
    const schema = _.pick(template, Object.keys(keys));
    Object.keys(schema).forEach(function(key) {
      if (keys[key].type === 'identifier') {
        schema[key] = new ObjectID(template[key]);
      }
    });
    if ('id' in schema) {
      schema._id = schema.id;
      delete schema.id;
    }
    return schema;
  }

  static toCTAData(mongodbDoc) {
    const keys = Template.keys();
    const templateData = _.pick(mongodbDoc, Object.keys(keys));
    Object.keys(templateData).forEach(function(key) {
      if (keys[key].type === 'identifier') {
        templateData[key] = mongodbDoc[key].toString();
      }
    });
    if ('_id' in mongodbDoc) {
      templateData.id = mongodbDoc._id.toString();
    }
    return new Template(templateData);
  }

  static dataQueryKeys() {
    return Template.queryKeys();
  }
}

module.exports = TemplateSchema;
