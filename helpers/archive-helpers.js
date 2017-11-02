var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
      console.log('fucking error', err);
    } else {
      callback(data.toString().split('\n'));
      // return data.toString().split('\n');
    }
  });
};

exports.isUrlInList = function(url, callback) {
  //take in a url, and call back
  //

  //return true or false depending on if url is found
  exports.readListOfUrls(function(list) {
    callback(list.includes(url));
  });
  // list.map(callxback(url));  // console.log(list);


};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url, function(error) {
    if (error) {
      console.log('error');  
    } else {
      exports.isUrlInList(url, callback);
      console.log('good shit');
    }
    
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, function(err, files) {
    callback(files.includes(url));
  });
};

exports.downloadUrls = function(urls) {
};
