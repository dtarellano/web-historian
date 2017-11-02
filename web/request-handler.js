var path = require('path');
var archive = require('../helpers/archive-helpers');
var querystring = require('querystring');
var fs = require('fs');
var helpers = require('./http-helpers');
// require more modules/folders here!
var url = '';

exports.handleRequest = function (req, res) {

// renders website
  helpers.serveAssets(res, './web/public/index.html');

//takes in URL and makes it a string
  req.on('data', function(chunk) {
    url += chunk;
  });
  req.on('end', function() {
    fs.appendFile('sites.text', url, function(error) {
      console.log('fuck its an ', error);
    });
  });





//.readlistofurls
  //.isrUlInList
    // if true
      //send user the data
    // else
      //.addUrlToList
      //.downloadUrls


  //res.end(archive.paths.list);
};
