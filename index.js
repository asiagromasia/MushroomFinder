'use strict'
let mushrooms = require("./lib/mushrooms.js");
const query = require('querystring');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('port', process.env.PORT || 4000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

// send static file as response
app.get('/', (req, res) => {
    const mush = mushrooms.getAll();
 res.type('text/html');
// res.sendFile(__dirname + '/public/home.html'); 
    res.render('home', {mushrooms: mush});
});

// send plain text response
app.get('/about', (req, res) => {
 res.type('text/plain');
   const about2= mushrooms.getAll();
//res.sendFile(__dirname + '/views/about.html');
   res.render('about', {mushrooms: about2});
});

app.get('/getall', (req,res) => {
          let mushrCont = mushrooms.getAll();
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.end('Here are all mushrooms: ' + "\n" + JSON.stringify(mushrCont));
});      
app.get('/get', (req,res) => {
    let found = mushrooms.get(req.query.name) //get mushroom object
    let results = (found) ? JSON.stringify(found) : " Item Not found";
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.render('details', {name: req.query.name, result: found})
})

// handle GET 
app.get('/delete', (req,res) => {
    let delMush = mushrooms.delete(req.query.name); // delete book object
    res.render('delete', {name: req.query.name, result: delMush});
});

// handle POST
app.post('/search', (req,res) => {
    res.type('text/html');
    console.log(req.body) //display parsed form submission
    let found = mushrooms.get(req.body.name);
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

