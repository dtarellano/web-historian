var path = require('path');
var archive = require('../helpers/archive-helpers');
var querystring = require('querystring');
var fs = require('fs');
var helpers = require('./http-helpers');
// require more modules/folders here!
// var url = '';

exports.handleRequest = function (req, res) {
  
  var code = 200;
  
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
              
              helpers.serveAssets(res, `./archives/sites/${url}`);
            } else {
              helpers.serveAssets(res, './web/public/loading.html');
              archive.readListOfUrls(function(list) {
                archive.downloadUrls(list);
              });
            } 
          });  
        } else {
          archive.addUrlToList(url, function(isTrue) {
            console.log('time to feed');
            url = '';
            res.writeHead(302, helpers.headers);
            
            archive.readListOfUrls(function(list) {
              console.log('list', list);
              // archive.downloadUrls(list);
            });
            
          });          
          
        }
      });  
    //check to see if we already have it in the list and in the archive
      //return that file from the archive
            //else
              //send the loading page
              //download the file
        
            //send the file to the client
        //update our list of downloads to reflect this
      
      
      
   
    });

      

  }

};
