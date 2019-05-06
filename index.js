'use strict'
let mushrooms = require("./lib/mushrooms.js");
//const query = require('querystring');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//const mongoose = require("mongoose");
const back_link = "<p><a href='/'>Back</a>";
//const mushroom = require("./models/mushroom.js");

app.set('port', process.env.PORT || 4000);
app.use(express.static ('/public')); // set default location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

// send static file as response
app.get('/', (req, res) => {
    const mush = mushrooms.getAll();
    res.type('text/html');
    res.render('home', {mushrooms: mush});
});

// send plain text response
app.get('/about', (req, res) => {
    //res.send('a get request with /about route on port 4000 ');
    res.type('text/html');
    res.render('about');
    //res.redirect('http://www.expressjs.com/en/guide/using-middleware.html');
});

app.get('/getall', (req,res) => {
    let mushrCont = mushrooms.getAll();
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Here are all mushrooms: ' + "\n" + JSON.stringify(mushrCont));
});    

app.get('/get', (req,res) => {
    let result = mushrooms.get(req.query.name.toLowerCase()); //get mushroom object
    res.type('text/html');
    //middleware are all functions happening before we send respone back(all above here) 
    res.render('details', {name: req.query.name, result: result}); 
})

// handle GET 
app.get('/delete', (req,res) => {
    let delMush = mushrooms.delete(req.query.name); // delete mushroom object
    res.type('text/html');
    res.render('delete', {name: req.query.name, result: delMush});
});

// handle POST
app.post('/search', (req,res) => {
    res.type('text/html');
    console.log(req.body) //display parsed form submission
    let found = mushrooms.get(req.body.name);
    res.render("details", {name: req.body.name, result: found});
});
app.post('/add', (req,res) => {
    res.type('text/html');
    console.log(req.body) //display parsed form submission
    let newMushroom = {"name":req.body.name, "size":req.body.size, "location":req.body.location}
    let result = mushrooms.add(newMushroom);
    if (result.added) {
        res.send("Added:" + req.body.name + "<br>New total = " +result.total + back_link);
    } else {
        res.end('details' + req.body.name + back_link);
    }
    
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

