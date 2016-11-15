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
  },
}, {
  hostname: 'two',
  ip: '22.22.22.22',
  properties: {
    os: 'windows 8',
    office: 'office 2013',
    env: ['alpha', 'beta'],
  },
}, {
  hostname: 'three',
  ip: '33.33.33.33',
  properties: {
    os: 'windows 10',
    office: 'office 2016',
    env: 'prod',
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

  it('mandatory fields', function(done) {
    o.co(function * () {
      const resp = yield o.request.post(url, {hostname: 'foo'});
      done('should raise an error');
    })
    .catch((err) => {
      done();
    });
  });

  it('create', function(done) {
    o.coForEach(docs, function * (doc) {
      const res = yield o.request.post(url, doc);
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

  it('get all', function(done) {
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

  it('get by id', function(done) {
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

  it('get by hostname', function(done) {
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

  it('get by properties', function(done) {
    o.co(function * () {
      let resp;

      resp = yield o.request.get(url + '?properties.env=beta');
      o.assert.strictEqual(resp.data.result.length, 1);
      o.assert.strictEqual(resp.data.result[0].hostname, docs[1].hostname);

      resp = yield o.request.post(url + '/search', {
        'properties.env': 'beta',
      });
      o.assert.strictEqual(resp.data.result.length, 1);
      o.assert.strictEqual(resp.data.result[0].hostname, docs[1].hostname);

      const sliced = o.lodash.cloneDeep(docs).slice(1, 3);

      resp = yield o.request.get(url + '?properties.env=beta,prod');
      o.assert.strictEqual(resp.data.result.length, 2);
      o.assert.isOk(contain(sliced, resp.data.result));

      resp = yield o.request.post(url + '/search', {
        'properties.env': 'beta,prod',
      });
      o.assert.strictEqual(resp.data.result.length, 2);
      o.assert.isOk(contain(sliced, resp.data.result));

      done();
    })
    .catch((err) => {
      done(err);
    });
  });

  it('limit results', function(done) {
    o.co(function * () {
      const resp = yield o.request.get(url + '?limit=2');
      o.assert.strictEqual(resp.data.result.length, 2);
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

  it('sort results', function(done) {
    o.co(function * () {
      const resp = yield o.request.get(url + '?sort=hostname');
      const source = docs.map((e) => { return e.hostname }).sort();
      const data = resp.data.result.map((e) => { return e.hostname });
      o.assert.deepEqual(source, data);
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

  it('update', function(done) {
    o.co(function * () {
      const resp = yield o.request.exec({
        method: 'patch',
        url: url + '/' + docs[0].id,
        body: {
          ip: '00.00.00.00',
        },
      });
      o.assert.strictEqual(resp.data.result.ip, '00.00.00.00');
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

  it('delete', function(done) {
    o.co(function * () {
      let resp = yield o.request.delete(url + '/' + docs[0].id);
      o.assert.strictEqual(resp.data.result.id, docs[0].id);
      resp = yield o.request.get(url + '/?id=' + docs[0].id);
      o.assert.strictEqual(resp.data.result.length, 0);
      done();
    })
    .catch((err) => {
      done(err);
    });
  });
});
