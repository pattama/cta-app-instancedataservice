'use strict';

const o = require('../common');
let child;

before(function(done) {
  this.timeout(5000);
  // TODO provide mongodb cta-oss dev server
  o.mongoClient.connect('mongodb://localhost:27017/oss', function(err, db) {
    if (err) {
      done(err);
    } else {
      db.dropDatabase(function(err, result) {
        if (err) {
          done(err);
        } else {
          db.close();
          const file = o.path.resolve(__dirname, '..', '..', '..', 'lib', 'index.js');
          child = new(o.forever.Monitor)(file, {
            max: 0,
            silent: true,
            logFile: o.path.resolve(o.os.tmpDir(), 'cta-app-instancedataservice-main.log'),
            outFile: o.path.resolve(o.os.tmpDir(), 'cta-app-instancedataservice-out.log'),
            errFile: o.path.resolve(o.os.tmpDir(), 'cta-app-instancedataservice-err.log'),
          });
          child.on('start', function() {
            console.log(`*** forever started\nSee log files in:\n${child.logFile}\n${child.outFile}\n${child.errFile}`);
            setTimeout(done, 2000);
          });
          child.start();
        }
      });
    }
  });
});

after(function(done) {
  this.timeout(3000);
  child.on('stop', function() {
    console.log('\n*** forever stopped');
    setTimeout(done, 2000);
  });
  child.stop();
});
