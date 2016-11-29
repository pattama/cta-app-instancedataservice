'use strict';

const FlowControl = require('cta-flowcontrol');
const Cement = FlowControl.Cement;
const config = require('cta-common').config('cta-app-instancedataservice');
const cement = new Cement(config, path.join(__dirname, '..', '..'));  // eslint-disable-line no-unused-vars
