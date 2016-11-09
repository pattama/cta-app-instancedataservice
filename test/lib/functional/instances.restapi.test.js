'use strict';

const o = require('../common');

const url = 'http://localhost:3000/instances';
const docs = [{
  hostname: 'foo.com',
  ip: '12.34.56.78',
}, {
  hostname: 'bar.com',
  ip: '91.23.45.67',
}];

describe('instances restapi', function() {

  it('create instances', function(done) {
    o.coForEach(docs, function * (doc) {
      const res = yield o.request.post(url, doc);
      o.assert(res.data.id);
      doc.id = res.data.id;
      o.assert.strictEqual(res.data.hostname, doc.hostname);
      o.assert.strictEqual(res.data.ip, doc.ip);
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

  it('get all instances', function(done) {
    o.request.get(url)
      .then((res) => {
        o.assert.strictEqual(res.data.length, 2);
        o.assert.deepEqual(docs, res.data);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('get instance by id', function(done) {
    o.request.get(url + '?id=' + docs[0].id)
      .then((res) => {
        o.assert.strictEqual(res.data.length, 1);
        o.assert.strictEqual(res.data[0].id, docs[0].id);
        o.assert.strictEqual(res.data[0].hostname, docs[0].hostname);
        o.assert.strictEqual(res.data[0].ip, docs[0].ip);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('get instance by hostname', function(done) {
    o.request.get(url + '?hostname=bar.com')
      .then((res) => {
        console.log(res);
        o.assert.strictEqual(res.data.length, 1);
        o.assert.strictEqual(res.data[0].id, docs[1].id);
        o.assert.strictEqual(res.data[0].hostname, docs[1].hostname);
        o.assert.strictEqual(res.data[0].ip, docs[1].ip);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
