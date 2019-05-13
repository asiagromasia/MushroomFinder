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
            res.render('home', {mushrooms: mush});
            
         });     
});
app.get('/getall', (req,res, next) => {
       mushroom.find({}, (err, mush) => {
         if (err) return next(err);
           console.log(mush.length);
         //  else {
       // let mush = 
        res.type('text/html');
      //  res.render('home', {mushrooms: mush});
        res.render('home', {mushrooms: mush});
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

/*    // handle POST
app.post('/search', (req,res) => {
    res.type('text/html');
    console.log(req.body) //display parsed form submission
    let found = mushrooms.get(req.body.name);
    res.render("details", {name: req.body.name, result: found});
});*/



//app.get('/get', (req,res) => {
//    let result = mushrooms.get(req.query.name.toLowerCase()); //get mushroom object
//    res.type('text/html');
//    //middleware are all functions happening before we send respone back(all above here) 
//    res.render('details', {name: req.query.name, result: result}); 
//})



//5 handle GET 
app.get('/delete', (req,res, next) => {
    mushroom.remove({'name':req.query.name}, (err,result) =>{
        if(err) return next(err);
        //return # of items deleted
    //    let deleted = result.result.n !==0 //n will be 0 if no docs are deleted
    mushroom.count((err, total)=> {    
        res.type('text/html');
        res.render('delete', {name: req.query.name, deleted: result.result.n !==0, total: total}); 
        
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
 
 /*   app.get('/api/v1/add/:title/:author/:pubdate', (req,res, next) => {
    // find & update existing item, or add new 
    let title = req.params.title;
    Book.update({ title: title}, {title:title, author: req.params.author, pubdate: req.params.pubdate }, {upsert: true }, (err, result) => {
        if (err) return next(err);
        // nModified = 0 for new item, = 1+ for updated item 
        res.json({updated: result.nModified});
    });
});*/
/*
app.post('/add', (req,res, next) => {
    res.type('text/html');
    console.log(req.body) //display parsed form submission
    let newMushroom = {"name":req.body.name, "size":req.body.size, "location":req.body.location}
    let result = mushrooms.add(newMushroom);
    if (result.added) {
        res.send("Added:" + req.body.name + "<br>New total = " +result.total + back_link);
    } else {
        res.end( req.body.name + " is already in our database" + back_link);
    }
    
});*/
    

// define 404 handler
app.use( (req,res) => {
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
 console.log('Express started'); 
});