'use strict'
let mushrooms = require("./lib/mushrooms.js");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

// send static file as response
app.get('/', (req, res) => {
 res.type('text/html');
 res.sendFile(__dirname + '/public/home.html'); 
  //  res.render('home');
});

// send plain text response
app.get('/about', (req, res) => {
 res.type('text/plain');
 res.sendFile(__dirname + '/public/about.html');
});

app.get('/getall', (req,res) => {
          let mushrCont = mushrooms.getAll();
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.end('Here are all mushrooms: ' + "\n" + JSON.stringify(mushrCont));
});      

// handle GET 
app.get('/delete', (req,res) => {
    let delMush = mushrooms.delete(req.query.name); // delete book object
    res.render('delete', {name: req.query.name, result: delMush});
});

// handle POST
app.post('/search', (req,res) => {
    res.type('text/html');
    console.log(req.body) //display parsed form submission
    var found = mushrooms.get(req.body.name);
    res.render("details", {name: req.body.name, result: found});
});


// define 404 handler
app.use( (req,res) => {
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
 console.log('Express started'); 
});

