//2 variations of index page
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8080);

/*
const http = require("http");  
http.createServer((req,res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
 res.end('Aloha world');
}).listen(process.env.PORT || 3000);
*/
