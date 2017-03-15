'use strict';

const path = require('path');
const FlowControl = require('cta-flowcontrol');
const Cement = FlowControl.Cement;
const config = require('cta-common').config(path.join(__dirname, 'config'));
const cement = new Cement(config, path.join(__dirname, '..', '..'));  // eslint-disable-line no-unused-vars
