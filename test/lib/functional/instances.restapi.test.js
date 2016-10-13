'use strict';

const o = require('../common');

const url = 'http://localhost:3000/instances';

describe('instances restapi', () => {
  it('create instance', (done) => {
    o.superagent.post(url)
      .send({hostname: 'foo.com'})
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          o.assert.strictEqual(res.body.hostname, 'foo.com');
          done();
        }
      });
  });
  it.skip('get instance', (done) => {
    o.superagent.get(url + '?hostname=foo.com')
      .send({hostname: 'foo.com'})
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          o.assert.strictEqual(res.body.hostname, 'foo.com');
          done();
        }
      });
  });
  it.skip('delete instance', (done) => {
    o.superagent.delete(url)
      .send({hostname: 'my.hostname'})
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});
