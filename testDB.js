let mushroom = require("./models/mushroom.js");

mushroom.countDocuments((err, result) => {
    console.log(result);
})
mushroom.find({}, (err, result) => {
  if (err) {
      console.log(err);
  }else{
      
  console.log(result);
  }
});