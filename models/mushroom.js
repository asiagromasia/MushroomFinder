'use strict'
const mongoose = require("mongoose");
const cred = require('../connection.js');

// remote db connection settings. For security, connectionString should be in a separate file not committed to git
// const connectionString = "mongodb+srv://<dbuser>:<dbpassword>@<cluster>.mongodb.net/test?retryWrites=true";

// local db connection settings 
// const ip = process.env.ip || '127.0.0.1';
//const connectionString = 'mongodb://' +ip+ '/<DB_NAME>';

mongoose.connect(cred.connectionString, { dbName: "itc230", useNewUrlParser: true }); 

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define Mushroom model in JSON key/value pairs
// values indicate the data type of each key
const mySchema = mongoose.Schema({
 name: { type: String, required: true },
 size: Number,
 location: String, 
}); 

module.exports = mongoose.model('mushrooms', mySchema);