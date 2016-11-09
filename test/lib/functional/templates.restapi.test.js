'use strict';

const o = require('../common');

const url = 'http://localhost:3000/templates';

describe('templates restapi', function() {

  const doc = {
    name: 'main',
  };
  it('create template', (done) => {
    o.superagent.post(url)
      .send(doc)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          o.assert(res.body.id);
          doc.id = res.body.id;
          o.assert.strictEqual(res.body.name, doc.name);
          done();
        }
      });
  });
  it('get template', (done) => {
    o.superagent.get(url + '?id=' + doc.id)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          o.assert.strictEqual(res.body[0].id, doc.id);
          o.assert.strictEqual(res.body[0].name, doc.name);
          done();
        }
      });
  });
});
