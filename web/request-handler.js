var path = require('path');
var archive = require('../helpers/archive-helpers');
var querystring = require('querystring');
var fs = require('fs');
var helpers = require('./http-helpers');
// require more modules/folders here!
var url = '';

exports.handleRequest = function (req, res) {

// renders website


//takes in URL and makes it a string
  var code = 200;

  //if request method is options
  //if request method is post
  if (req.method === 'POST') {
    req.on('data', function(chunk) {
      url += chunk;
    });
    req.on('end', function() {
      archive.addUrlToList(url.slice(4), function(isTrue) {
        url = '';
        res.writeHead(302, helpers.headers);
        res.end();
      });    
    });

    // res.end();
  }
  
  helpers.serveAssets(res, './web/public/index.html');

  //res.end();
};
