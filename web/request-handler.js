var path = require('path');
var archive = require('../helpers/archive-helpers');
var querystring = require('querystring');
var fs = require('fs');
var helpers = require('./http-helpers');
// require more modules/folders here!
// var url = '';

exports.handleRequest = function (req, res) {
  
  var code = 200;
  console.log('method', req.method);
  console.log('urls', req.url);
  if (req.method === 'GET') {
    helpers.serveAssets(res, './web/public/index.html');
  }

  if (req.method === 'POST') {
              
    var url = '';
    req.on('data', function(chunk) {
      url += chunk.slice(4);
    });
    req.on('end', function() {
      archive.isUrlInList(url, function(isInList) {
        if (isInList) {
          archive.isUrlArchived(url, function(hasArchived) {
            if (hasArchived) {
              console.log('should be going here', url);
              helpers.serveAssets(res, `./archives/sites/${url}`);
              url = '';
            } else {
              console.log('should not be going here');
              helpers.serveAssets(res, './web/public/loading.html');
              archive.readListOfUrls(function(list) {
                archive.downloadUrls(list);
              });
              url = '';
            } 
          });  
        } else {
          archive.addUrlToList(url, function(isTrue) {

            res.writeHead(302, helpers.headers);
            archive.readListOfUrls(function(list) {
              archive.downloadUrls(list);
            });
            url = '';
          });          
        }
      });  
    });
  }
};
