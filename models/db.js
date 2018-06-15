const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongoUrl = "mongodb://localhost:27017/newtest";

var options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 15, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};
const db = mongoose.createConnection(mongoUrl, options)
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