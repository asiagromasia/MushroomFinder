'use strict'
let mushroom = require("./models/mushroom.js");

//const query = require('querystring');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//const back_link = "<p><a href='/'>Back</a>";

app.set('port', process.env.PORT || 4000);
app.use(express.static ('/public')); // set default location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

//+5 send static file as response
app.get('/', (req, res, next) => {
        mushroom.find({}, (err, mush) => {
          if (err) return next(err);
            //console.log(mushroom.length);
           // console.log(mush);
            res.type('text/html');
            res.render('home', {mushrooms: mush, wantDisplay: false});
            
         });     
});

app.get('/getall', (req,res, next) => {
       mushroom.find({}, (err, mush) => {
         if (err) return next(err);
           console.log(mush.length); 
        res.type('text/html');
        res.render('home', {mushrooms: mush, wantDisplay: true});
     });
     });
    

//+5 send plain text response
app.get('/about', (req, res) => {
    //res.send('a get request with /about route on port 4000 ');
    res.type('text/html');
    res.render('about');
    //res.redirect('http://www.expressjs.com/en/guide/using-middleware.html');
});


//+5 return a single record
app.post('/search', (req,res, next) => {
    console.log(req.body);
        mushroom.findOne({'name':req.body.name}, (err, name) => {
          if (err) return next(err);
          console.log(mushroom);
            res.type('text/html');
            res.render("details", {result:name});
        }); 
     }); 

//5 handle GET 
app.get('/delete', (req,res, next) => {
    mushroom.deleteOne({'name':req.query.name}, (err,name) => {
        if(err) return next(err);
      
        console.log(name);
        console.log(req.query.name);
        mushroom.countDocuments((err, total) => {   
   // mushroom.countDocuments((err, total) => {   
        res.type('text/html');
        res.render('delete',  {name: req.query.name, result: name, total: total }); 
    });
    
  });
});
// insert or update a single record
//it is adding but not showing it is added
app.post('/add', (req, res, next) => {
    let newMushroom = {"name":req.body.name, "size":req.body.size, "location":req.body.location};
    mushroom.update({'name': req.body.name}, newMushroom, {upsert:true}, (err, result) => {
      if (err) return next(err);
      console.log(result); 

    mushroom.find({}, (err, items) =>{
        if (err) return next (err);
        console.log(items.length);
        res.type('text/html');
        res.render('home');
    });
        
    });
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