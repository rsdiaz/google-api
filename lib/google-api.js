var request = require('request');

var google = function(obj) {

  // error checking
  if (typeof obj != 'object') throw new Error('invalid options passed to constructor');
  if (typeof obj.apiKey == 'undefined' || typeof obj.apiKey != 'string') throw new Error('invalid or missing API key');

  this.apiKey = obj.apiKey;
}

google.prototype.apiKey = '';
google.prototype.url = 'https://www.googleapis.com/urlshortener/v1/url';

google.prototype.getUrl = function(obj) {
  obj.method = 'GET';
  obj.projection = obj.projection || '';

  if (!this.validate(obj, 'getUrl')) return false;
  this.makeRequest(obj);

}

google.prototype.setUrl = function(obj) {
  obj.method = 'POST';

  if (!this.validate(obj, 'setUrl')) return false;
  this.makeRequest(obj);
}

google.prototype.validate = function(obj, method) {
  var error;

  if (!obj) throw new Error('no arguments passed');
  if (typeof obj.callback != 'function') throw new Error('invalid callback');

  switch(method) {
    case 'getUrl':
      if (typeof obj.shortUrl != 'string') error = ('invalid shortUrl');
      if (typeof obj.projection != 'string') error = ('invalid projection');
      break;
    case 'setUrl':
      if (typeof obj.longUrl != 'string') error = ('invalid longUrl');
      break;
  }
  if (error) {
    obj.callback(error);
    return false;
  }
  return true;
}

google.prototype.makeRequest = function(obj) {
  var callback = obj.callback;
  var qs;
  var body;

  if (obj.method == 'GET') {
     qs = {
      'key': this.apiKey,
      'shortUrl': obj.shortUrl
    }
  }
  if (obj.method == 'POST') {
    qs = {
      'key': this.apiKey
    }
    body = {
      'longUrl' : obj.longUrl
    }
  }
  request({
    method: obj.method,
    url: this.url,
    qs: qs,
    body: body,
    json: true
  }, function(err, response, body){
    if (err) {
      console.error(err);
      callback(err, body);
    }
    // console.log(response.statusCode);
    if ((response.statusCode === 200) || (response.statusCode === 304)) {
      // console.log(body);
      callback(err, body);
    }
  });
}

module.exports = google;
