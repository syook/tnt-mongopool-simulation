const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongoUrl = "mongodb://localhost:27017/newtest";

const db = mongoose.createConnection(mongoUrl,{poolSize: 1000})
// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + mongoUrl);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() { 
  console.log(">>>>>>>>>>>>>>>>",mongoose.connection,">>>>>>>>>>>>>>>>>>>") 
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0); 
  }); 
}); 

// require('./person')

module.exports = {db};