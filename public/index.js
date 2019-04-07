const http = require("http"); 
http.createServer((req,res) => {
  const path = req.url.toLowerCase();
  switch(path) {
    case '/':
      res.writeHead(200, {'Content-Type': 'text/plain'});
<<<<<<< HEAD
      res.end('Welcome to Home page');
=======
      res.end('Home page');
>>>>>>> caedf6a6002125af80c4382d5defd2a9c1b87fae
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('About page');
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
      break;
    }
}).listen(process.env.PORT || 3000);
