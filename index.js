'use strict';
//let mushroom = require("./models/mushroom.js");

const query = require('querystring');

//using express
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
//let _ = require('underscore');
//let request = require ('request');



//configuring express for index.js
app.set('port', process.env.PORT || 4000);
app.use(express.static ('/public')); // set default location for static files
app.use(bodyParser.urlencoded({extended: true}));
//app.use(require('bodyParser').urlencoded({extended: true})); // parse form submissions

app.use(bodyParser.json());
//app.use(routes);
app.use('/api', require('cors')()); //set Access-Control-Allow-Origin header for api route
// or app.use(cors());

//set template engine
const handlebars = require('express-handlebars').create({extname: '.html' });
app.engine('html', handlebars.engine);
app.set('view engine', 'html' );

let routes = require("./lib/routes.js")(app); // pass ‘app’ instance to the routes module
 

// define 404 handler
app.use( (req,res) => {
 res.type('text/plain'); 
 res.status(404);
 res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
 console.log('Express started'); 
});