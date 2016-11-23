'use strict';

const o = require('../common');

const url = 'http://localhost:3000/instances';
const docs = [{
  hostname: 'one',
  ip: '11.11.11.11',
  properties: {
    os: 'windows 7',
    office: 'office 2013',
    env: 'alpha',
    tag: 'foo',
  },
}, {
  hostname: 'two',
  ip: '22.22.22.22',
  properties: {
    os: 'windows 8',
    office: 'office 2013',
    env: ['alpha', 'beta'],
    tag: 'bar',
  },
}, {
  hostname: 'three',
  ip: '33.33.33.33',
  properties: {
    os: 'windows 10',
    office: 'office 2016',
    env: 'prod',
    tag: 'foo',
  },
}];
function sort(a, b) {
  return a.hostname > b.hostname ? 1 : -1;
}
function contain(source, data) {
  if (!Array.isArray(data)) {
    return false;
  }
  if (data.length === 0) {
    return false;
  }
  for (let i = 0; i < source.length; i++) {
    const doc = source[i];
    const arr = data.filter((e) => {
      return e.hostname === doc.hostname;
    });
    if (arr.length !== 1) {
      return false;
    }
  }
  return true;
}
describe('Instances REST API', function() {

  context('Create API', function() {
    it('should reject when ip is missing', function(done) {
      o.co(function * () {
        yield o.request.post(url, {hostname: 'foo'});
        done('should raise an error');
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
    it('should reject when hostname is missing', function(done) {
      o.co(function * () {
        yield o.request.post(url, {ip: '11.11.11.11'});
        done('should raise an error');
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
    it('should accept when all mandatory fields are present', function(done) {
      o.coForEach(docs, function * (doc) {
        const res = yield o.request.post(url, doc);
        console.log(res.data);
        o.assert(res.data.result.id);
        doc.id = res.data.result.id;
        o.assert.strictEqual(res.data.result.hostname, doc.hostname);
        o.assert.strictEqual(res.data.result.ip, doc.ip);
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
  });

  context('Find API', function() {
    it('should find all created instances', function (done) {
      o.request.get(url)
        .then((res) => {
          o.assert.strictEqual(res.data.result.length, docs.length);
          o.assert.isOk(contain(docs, res.data.result));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    it('should find one matching instance by its id', function (done) {
      o.request.get(url + '?id=' + docs[0].id)
        .then((res) => {
          o.assert.strictEqual(res.data.result.length, 1);
          o.assert.strictEqual(res.data.result[0].id, docs[0].id);
          o.assert.strictEqual(res.data.result[0].hostname, docs[0].hostname);
          o.assert.strictEqual(res.data.result[0].ip, docs[0].ip);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    it('should find one matching instance by its hostname', function (done) {
      o.request.get(url + '?hostname=' + docs[1].hostname)
        .then((res) => {
          console.log(res);
          o.assert.strictEqual(res.data.result.length, 1);
          o.assert.strictEqual(res.data.result[0].id, docs[1].id);
          o.assert.strictEqual(res.data.result[0].hostname, docs[1].hostname);
          o.assert.strictEqual(res.data.result[0].ip, docs[1].ip);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    it('should find all matching instances by properties', function (done) {
      o.co(function *() {
        let resp;

        resp = yield o.request.get(url + '?properties.env=beta');
        o.assert.strictEqual(resp.data.result.length, 1);
        o.assert.strictEqual(resp.data.result[0].hostname, docs[1].hostname);

        const sliced = o.lodash.cloneDeep(docs).slice(1, 3);
        resp = yield o.request.get(url + '?properties.env=beta,prod');
        o.assert.strictEqual(resp.data.result.length, 2);
        o.assert.isOk(contain(sliced, resp.data.result));

        done();
      })
      .catch((err) => {
        done(err);
      });
    });
    it('should limit results to provided size', function (done) {
      o.co(function *() {
        const resp = yield o.request.get(url + '?limit=2');
        o.assert.strictEqual(resp.data.result.length, 2);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
    it('should sort results by provided sorting element', function (done) {
      o.co(function *() {
        const resp = yield o.request.get(url + '?sort=hostname');
        const source = docs.map((e) => {
          return e.hostname
        }).sort();
        const data = resp.data.result.map((e) => {
          return e.hostname
        });
        o.assert.deepEqual(source, data);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
  });

  context('Update API', function() {
    it('should update instance matching its id', function(done) {
      o.co(function * () {
        let resp = yield o.request.exec({
          method: 'patch',
          url: url + '/?id=' + docs[0].id,
          body: {
            ip: '11.11.11.22',
          },
        });
        resp = yield o.request.get(url + '?id=' + docs[0].id);
        o.assert.strictEqual(resp.data.result[0].ip, '11.11.11.22');
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

    it('should update instance matching its hostname', function(done) {
      o.co(function * () {
        let resp = yield o.request.exec({
          method: 'patch',
          url: url + '/?hostname=' + docs[1].hostname,
          body: {
            properties: {a: 1, b: 2},
          },
        });
        resp = yield o.request.get(url + '?hostname=' + docs[1].hostname);
        o.assert.deepEqual(resp.data.result[0].properties, {a: 1, b: 2});
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
  });

  context('Delete API', function(){
    it('should delete instance by its id', function(done) {
      o.co(function * () {
        let resp = yield o.request.delete(url + '?id=' + docs[0].id);
        o.assert.strictEqual(resp.data.result.id, docs[0].id);
        resp = yield o.request.get(url + '/?id=' + docs[0].id);
        o.assert.strictEqual(resp.data.result.length, 0);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
    it('should delete instance by its hostname', function(done) {
      o.co(function * () {
        let resp = yield o.request.delete(url + '?hostname=' + docs[1].hostname);
        o.assert.strictEqual(resp.data.result.id, docs[1].id);
        resp = yield o.request.get(url + '/?id=' + docs[1].id);
        o.assert.strictEqual(resp.data.result.length, 0);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
  });
});
