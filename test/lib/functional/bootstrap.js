'use strict';

const o = require('../common');
let child;

before(function(done) {
  this.timeout(5000);
  const file = o.path.resolve(__dirname, '..', '..', '..', 'lib', 'index.js');
  child = new(o.forever.Monitor)(file, {
    max: 0,
    silent: true,
    logFile: o.path.resolve(o.os.tmpDir(), 'cta-app-instancedataservice-main.log'),
    outFile: o.path.resolve(o.os.tmpDir(), 'cta-app-instancedataservice-out.log'),
    errFile: o.path.resolve(o.os.tmpDir(), 'cta-app-instancedataservice-err.log'),
  });
  child.on('start', function() {
    setTimeout(done, 2000);
  });
  child.start();
});

after(function(done) {
  this.timeout(3000);
  child.on('stop', function() {
    done();
  });
  child.stop();
});
