// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var cron = require('node-cron');
archive.readListOfUrls(archive.downloadUrls(list));

