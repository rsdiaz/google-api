var assert = require('assert');
var google = require('../lib/google-api');

assert.throws(function() {
  var g = new google();
}, Error, 'Incorrect construction did not throw error');

assert.throws(function() {
  var g = new google({
    apiKey: ['asdf', 'asdf']
  });
}, Error, 'Incorrect apiKey data type did not throw error')

var g = new google({
  apiKey: 'YOUR API KEY'
})

// invalid shortUrl to getUrl
assert.throws(function() {
  g.getUrl({
    // shortUrl: 'xxx',
    callback: function(err, data) {
      if (err) throw new Error(err);
    }
  });
}, Error, 'Incorrect shortUrl to getUrl did not throw error');
// invalid projection to getUrl
assert.throws(function() {
    g.getUrl({
      projection: ['wqw', 'qwwq'],
      callback: function(err, data) {
        if (err) throw new Error(err);
      }
    });
}, Error, 'Incorrect projection to getUrl did not throw ')
assert.throws(function() {
  g.setUrl({
    // longUrl: 'xxx',
    callback: function(err, data) {
      if (err) throw new Error(err);
    }
  });
}, Error, 'Incorrect longUrl to setUrl did not throw error');


assert.doesNotThrow(function() {
  g.getUrl({
    shortUrl: 'http://goo.gl/fbsS',
    callback: function(err, data) {
      if (err) throw new Error(err);
      assert.ok(data, 'No data returned from getNewsForApp');
    }
  });

  g.setUrl({
    longUrl:  'www.serranodiaz.com',
    callback: function(err, data) {
      if (err) throw new Error(err);
      assert.ok(data, 'No data returned from setUrl');
    }
  });

},Error, 'Failed during correct implimentation');
