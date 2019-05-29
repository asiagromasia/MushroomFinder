module.exports = (app) => {
    let mushroom = require("../models/mushroom.js");
  //  const query = require('querystring');
    
    //UI routes
    
   app.get('/', (req,res) => {
          res.type('text/html');
          res.render('home');
      });

    //-send static file as response     mushroom?name=morel or find?name=morel
    app.get('/get?name:mush', (req, res, next) => {
            mushroom.find({}, (err, mush) => {
              if (err) return next(err);
                console.log(mushroom.length);
                //åconsole.log(mush);
                res.type('text/html');
                res.render('home', {mushrooms: mush, wantDisplay: false});
             });     
    });

    // send plain text response
    app.get('/about', (req, res) => {
            //res.send('a get request with /about route on port 4000 ');
            res.type('text/html');
            res.render('about');
            //res.redirect('http://www.expressjs.com/en/guide/using-middleware.html');
    });

    app.get('/getall', (req,res, next) => {
           mushroom.find({}, (err, mush) => {
             if (err) return next(err);
               console.log(mush.length);
               res.type('text/html');
               res.render('home', {mushrooms: mush, wantDisplay: true});
            });
    });

    // return a single record post(body)
    //localhost:4000/search                not      mushroom?name=morel
    app.post('/search', (req,res, next) => {
            console.log(req.body);
            mushroom.findOne({'name':req.body.name}, (err, name) => {
              if (err) return next(err);
                res.type('text/html');
                res.render("details", {result:name, justAdded: false});
            }); 
         }); 
    
    //-localhost:4000/mushroom/morel
    app.get('/mushroom/:name', (req, res, next) => {
        let info = mushroom.find((mushroom) => {
            return mushroom.name = req.params.name;
        });
        if (!info) return next(); 
            res.send(info);
    })

    // handle GET (query)
    //http://localhost:4000/delete?name=ba
    app.get('/delete', (req,res, next) => {
            mushroom.deleteOne({'name':req.query.name}, (err,name) => {
                if(err) return next(err);
                console.log(name);
                console.log(req.query.name);
            mushroom.countDocuments((err, total) => {
                   let toDel = {"name": req.query.name};
                    res.type('text/html');
                    res.render('delete', {result: toDel, total: total});  
            });

            });
    });

    // insert or update a single record
    //localhost:4000/add
    app.post('/add', (req, res, next) => {
            let newMushroom = {"name":req.body.name, "size":req.body.size, "location":req.body.location};
            mushroom.update({'name': req.body.name}, newMushroom, {upsert: true}, (err, result) => {    
                if (err) return next(err);
                console.log(result); 
            mushroom.find({}, (err, items) =>{
                if (err) return next (err);
                    console.log(items.length);
                res.type('text/html');
                res.render("details", {result: newMushroom, justAdded: true });
            });
            });
    });

    
    //====== API routes=====
    
    //get all items
    //localhost:4000/api/v1/mushrooms
    app.get('/api/v1/mushrooms', (req,res) => {
        mushroom.find({}, (err, mush) => {
             if (err) return res.status(500).send("Error: 'Internal server error");
               console.log(mush.length);
               res.type('text/html');
               res.json(mush);
            //res.render('home', {mushrooms: mush, wantDisplay: true}); //if more details
        });
    });
    
    //return single mushroom cors-enabled  by params
    //localhost:4000/api/v1/mushroom/morel
    app.get('/api/v1/mushroom/:name', (req,res, next) => {
            let name = req.params.name;
                console.log(name);
                mushroom.findOne({'name': name}, (err, result) => {
               //   if (err || !result) return next(err);
                    if(err) return next (err);
                    if(result){  
                     res.type('text/html');   
                     res.json(result); 
                    // res.render('home', {mushrooms: result, wantDisplay: true}); //if  more details
                    } else{ 
                     res.status(404).send("ups... 404-not found");   
                    }
                }); 
     }); 
    
    //add new or update  
    //localhost:4000/api/v1/add?name=morel
    app.post('/api/v1/add', (req, res) => {
        let newMush = {"name":req.body.name, "size": req.body.size, "location":req.body.location};
        console.log(req.body);
        if (newMush){
           // mushroom.push({req.body});
            mushroom.update({'name': req.body.name}, newMush);
           // console.log(result); 
           // mushroom.find({}, (err, items) =>{
              //  if (err) return next (err);
             //       console.log(items.length);
                res.type('text/html');
                res.json({"result":"updated"});
             //   res.render("details", {result: newMush, justAdded: true });
       
      //  });
    }
      });
  /*      let newMush = {"name":req.body.name, "size": req.body.size, "location":req.body.location};
        mushroom.findByIdAndUpdate({_id:req.body._id}, newMush, (err, result) => {
        if (err) {
            new mushroom(newMush).save((err) => {
                res.json({"result":"added"});
                res.json(result);
            });
        } else {
            res.json({"result":"updated"});
        }
        });
    });
    
*/
    //localhost:4000/api/v1/mushroom/delete/morel  
        app.get('/api/v1/mushroom/delete/:name', (req,res,next) => {
            let nameDel = req.params.name;
             console.log(nameDel);
            mushroom.findOne({"name": req.params.name}, (err,nameDel) => { 
                if (!nameDel){
                    console.log("not found")
                    res.type('text/html');
                    res.json({"result": "mushroom not found"});
                } else {
                mushroom.deleteOne({"name": req.params.name}, (err, result) => {
                    if(err) return next (err); 
                    if(result){
                        console.log(result);
                        res.type('text/html');   
                        res.json({"result": "deleted"});   
                    } else { 
                res.status(404).send("ups... 404-not found");   
                }
                });
                }
            });                 
        });
};
