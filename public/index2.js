'use strict'
var http = require("http"), fs = require('fs'), qs = require("querystring");
var mushroom = require('../lib/mushrooms.js');

function serveStatic(res, path, contentType, responseCode){
  if(!responseCode) responseCode = 200;
  fs.readFile(__dirname + path, function(err, data){
      if(err){
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      }
      else{
        res.writeHead(responseCode, {'Content-Type': contentType});
        res.end(data);
      }
  });
}


http.createServer((req,res) => {
//    console.log(mushroom);
  
    // separate route from query string
    var url = req.url.split("?"); 
    // convert query string to object
    var query = qs.parse(url[1]); 
    var path = url[0].toLowerCase();
    
  switch(path) {
    case '/':
     // res.writeHead(200, {'Content-Type': 'text/plain'});
    //  res.end('Welcome to Home page!!!!!');
        serveStatic(res, '/../public/home.html', 'text/html');
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Welcome to about page!');
      break;
    case '/get':
      let found = mushroom.get(query.name); // get mushroom object  
      res.writeHead(200, {'Content-Type': 'text/plain'});
      let results = (found) ? JSON.stringify(found) : "Not found";
          console.log(results);
        res.end('Results for mushroom name ' + query.name + "\n" + mushrooms.size);
//      res.end('Results for mushroom name ' + query.name + "\n" + results);
      break;   
      case '/getall':
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.end('Here are all mushrooms: ');
        break;
          
    case '/delete':
      res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('delete');
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
      break;
    }
}).listen(process.env.PORT || 3000);
