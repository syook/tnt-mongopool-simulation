const Person = require('./models/person');
const Card = require('./models/card');

Person.find({}).exec((err,res) => {
  if(err){
    return console.log(err);
  }
  console.log("LOG FROM THREAD",res)
});