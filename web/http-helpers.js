var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {

  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile(asset, function(err, data) {
    if (err) {
      console.log('error', err);
    }   
    res.end(data);
  });

};



// As you progress, keep thinking about what helper functions you can put here!
