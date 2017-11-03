var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, function(err, data) {
    if (err) {
      console.log('error', err);
    } else {
      callback(data.toString().split('\n'));
    }
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(list) {
    callback(list.includes(url));
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, `${url}\n`, function(error) {
    if (error) {
      console.log('error');  
    } else {
      console.log('hey');
      //exports.isUrlInList(url, callback);
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, function(err, files) {
    callback(files.includes(url));
  });
};

exports.downloadUrls = function(urls) {
  console.log(urls);
  urls.map(function(url) {
    console.log('url', url);
    var file = fs.createWriteStream(`${exports.paths.archivedSites}/${url}`);
    request(`https://${url}`, function(err, res, body) {
      if (err) {
        // console.log('the url im going to', `http://${url}`)
        // console.log('error in get request');
      }
      console.log('the responde', res);
      console.log('the body', body);
    }).pipe(file);
    // fs.writeFile(exports.paths.archivedSites, file, (err) => {
    //   console.log(err);
    // });
  });  
};















