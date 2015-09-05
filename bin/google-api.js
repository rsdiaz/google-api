#!/usr/bin/env node
var google = require('../lib/google-api.js');

if (!process.argv[2]) {
  console.error('argument is required.');
  process.exit(1);
}
if (process.argv[2] === '--get') {
  var shortUrl = process.argv[3];
  var g = new google({
    apiKey: 'YOUR API KEY'
  })

  g.getUrl({
    shortUrl: shortUrl,
    projection: '',
    callback: function(err, data) {
      console.log('shortUrl: ' + data.id);
      console.log('longUrl: ' + data.longUrl);
      process.exit(0);
    }
  })
  // console.log(process.argv);
}
