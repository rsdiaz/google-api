#!/usr/bin/env node
var google = require('../lib/google-api.js');

const E_MISSING_URL = 'ERROR -> missing url value.';
const VERSION = '0.0.1'
var g = new google({
  apiKey: 'AIzaSyD-hiA4JGBYXVkxmhL0pAi9fMpWlk5n-z8'
});

if (!process.argv[2]) {
  console.error('argument is required:\n use --help for more info.');
  process.exit(1);
}

if (process.argv[2] === '--get') {
  var shortUrl = process.argv[3];
  if (!shortUrl){
    console.error(E_MISSING_URL);
  }
  else {
    g.getUrl({
      shortUrl: shortUrl,
      projection: '',
      callback: function(err, data) {
        console.log('shortUrl: ' + data.id);
        console.log('longUrl: ' + data.longUrl);
        console.log('Total clicks shortUrl: ' + data.analytics.allTime.shortUrlClicks);
        process.exit(0);
      }
    });
  }

}

if (process.argv[2] === '--insert') {
  var longUrl = process.argv[3];
  if (!longUrl) {
    console.error(E_MISSING_URL);
    process.exit(1);
  }
  else {
    g.setUrl({
      longUrl: longUrl,
      callback: function(err, data) {
        console.log('shortUrl: ' + data.id);
        process.exit(0);
      }
    });
  }
}

if (process.argv[2] === '--help') {
  console.log('Usage: ' + process.argv[1].substring(9, 19) + " <option> <url>");
  console.log('Options:\n'
              + '--help\t\t for info.\n'
              + '--get\t\t get longUrl to shortUrl.\n'
              + '--insert\t get shortUrl to longUrl.');
}
