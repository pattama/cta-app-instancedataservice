'use strict';

const o = require('../common');

const url = 'http://localhost:3000/instances';

describe('instances restapi', function() {

  const doc = {
    hostname: 'foo.com',
    ip: '12.34.56.78',
  };
  it('create instance', (done) => {
    o.superagent.post(url)
      .send(doc)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          o.assert(res.body.id);
          doc.id = res.body.id;
          o.assert.strictEqual(res.body.hostname, doc.hostname);
          o.assert.strictEqual(res.body.ip, doc.ip);
          done();
        }
      });
  });
  it('get instance', (done) => {
    o.superagent.get(url + '?id=' + doc.id)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          o.assert.strictEqual(res.body[0].id, doc.id);
          o.assert.strictEqual(res.body[0].hostname, doc.hostname);
          o.assert.strictEqual(res.body[0].ip, doc.ip);
          done();
        }
      });
  });
});
