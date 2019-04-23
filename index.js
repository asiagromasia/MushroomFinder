'use strict'
const http = require("http");
const fs = require("fs"); 
const qs = require("querystring");
const mushrooms = require("./lib/mushrooms.js");

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
    
   // separate route from query string
    let url = req.url.split("?"); 
    // convert query string to object
    let query = qs.parse(url[1]); 
    let path = url[0].toLowerCase();
    
  switch(path) {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      //res.end('Welcome to Home page!!!!!');
        serveStatic(res, '/public/home.html', 'text/html');
      break;
          
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Welcome to page about mushrooms!');
      break;
          
    case '/getall':
          let mushrCont = mushrooms.getAll();
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.end('Here are all mushrooms: ' + "\n" + JSON.stringify(mushrCont));
     break;      
          
    case '/get':
        let found = mushrooms.get(query.name.toLowerCase()) //get mushroom object
        let results = (found) ? JSON.stringify(found) : " Item Not found";
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end("Results for mushroom name: " + query.name + "\n" + results);
      break;   
            
    case '/delete':
        let delMush = mushrooms.delete(query.name.toLowerCase()); 
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Following are results of deleting'+" "+ query.name +' '+ 'mushroom: ' + "\n" + JSON.stringify(delMush));
      break;
          
    case '/add':
        let adMush = mushrooms.add(query.name.toLowerCase())
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('You just added following mushroom:' + query.name + ' '+ JSON.stringify(adMush) );
      break;
          
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
      break;
          
    }
}).listen(process.env.PORT || 3000);


