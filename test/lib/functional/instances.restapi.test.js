'use strict';

const o = require('../common');

const url = 'http://localhost:3000/instances';

describe('instances restapi', function() {

  const doc = {
    hostname: 'foo.com',
    ip: '12.34.56.78',
  };
  it('create instance', (done) => {
    o.request.post(url, doc)
      .then((res) => {
        o.assert(res.data.id);
        doc.id = res.data.id;
        o.assert.strictEqual(res.data.hostname, doc.hostname);
        o.assert.strictEqual(res.data.ip, doc.ip);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  it('get instance by id', (done) => {
    o.request.get(url + '?id=' + doc.id)
      .then((res) => {
        o.assert.strictEqual(res.data[0].id, doc.id);
        o.assert.strictEqual(res.data[0].hostname, doc.hostname);
        o.assert.strictEqual(res.data[0].ip, doc.ip);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
