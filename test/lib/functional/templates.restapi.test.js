'use strict';

const o = require('../common');

const url = 'http://localhost:3000/templates';
const docs = [{
  name: 'one',
  properties: {
    os: 'windows 7',
    office: 'office 2013',
    env: 'alpha',
  },
  templateId: 'template-one',
  cloud: {
    id: 'cloud-one',
    name: 'cloud one',
  },
}, {
  name: 'two',
  properties: {
    os: 'windows 8',
    office: 'office 2013',
    env: ['alpha', 'beta'],
  },
  templateId: 'template-two',
  cloud: {
    id: 'cloud-two',
    name: 'cloud two',
  },
}, {
  name: 'three',
  properties: {
    os: 'windows 10',
    office: 'office 2016',
    env: 'prod',
  },
  templateId: 'template-three',
  cloud: {
    id: 'cloud-three',
    name: 'cloud three',
  },
}];
function sort(a, b) {
  return a.name > b.name ? 1 : -1;
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
      return e.name === doc.name;
    });
    if (arr.length !== 1) {
      return false;
    }
  }
  return true;
}
describe('templates restapi', function() {

  it('mandatory fields', function(done) {
    o.co(function * (){
      const resp = yield o.request.post(url, {name: 'foo'});
      done('should raise an error');
    })
    .catch((err) => {
      done();
    });
  });

  it('create', function(done) {
    o.coForEach(docs, function * (doc) {
      const res = yield o.request.post(url, doc);
      o.assert(res.data.id);
      doc.id = res.data.id;
      o.assert.strictEqual(res.data.name, doc.name);
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
        o.assert.strictEqual(res.data.length, docs.length);
        o.assert.isOk(contain(docs, res.data));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('get by id', function(done) {
    o.request.get(url + '?id=' + docs[0].id)
      .then((res) => {
        o.assert.strictEqual(res.data.length, 1);
        o.assert.strictEqual(res.data[0].id, docs[0].id);
        o.assert.strictEqual(res.data[0].name, docs[0].name);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('get by name', function(done) {
    o.request.get(url + '?name=' + docs[1].name)
      .then((res) => {
        console.log(res);
        o.assert.strictEqual(res.data.length, 1);
        o.assert.strictEqual(res.data[0].id, docs[1].id);
        o.assert.strictEqual(res.data[0].name, docs[1].name);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('get by properties', function(done) {
    o.co(function * (){
      let resp;

      resp = yield o.request.get(url + '?properties.env=beta');
      o.assert.strictEqual(resp.data.length, 1);
      o.assert.strictEqual(resp.data[0].name, docs[1].name);

      resp = yield o.request.post(url + '/search', {
        'properties.env': 'beta',
      });
      o.assert.strictEqual(resp.data.length, 1);
      o.assert.strictEqual(resp.data[0].name, docs[1].name);

      const sliced = o.lodash.cloneDeep(docs).slice(1, 3);

      resp = yield o.request.get(url + '?properties.env=beta,prod');
      o.assert.strictEqual(resp.data.length, 2);
      o.assert.isOk(contain(sliced, resp.data));

      resp = yield o.request.post(url + '/search', {
        'properties.env': 'beta,prod',
      });
      o.assert.strictEqual(resp.data.length, 2);
      o.assert.isOk(contain(sliced, resp.data));

      done();
    })
    .catch((err) => {
      done(err);
    });
  });

  it('limit results', function(done) {
    o.co(function * (){
      const resp = yield o.request.get(url + '?limit=2');
      o.assert.strictEqual(resp.data.length, 2);
      done();
    })
    .catch((err) => {
      done(err);
    });
  });

  it('sort results', function(done) {
    o.co(function * (){
      const resp = yield o.request.get(url + '?sort=name');
      o.assert.isOk(contain(docs, resp.data));
      done();
    })
    .catch((err) => {
      done(err);
    });
  });
});
