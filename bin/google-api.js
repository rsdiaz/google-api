#!/usr/bin/env node
var google = require('../lib/google-api');

if (!process.argv[2]) {
  console.error('argument is required.');
  process.exit(1);
}
if (process.argv[2] === '--getUrl') {
  var g = new google({
    
  })
}
