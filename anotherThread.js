const Card = require('./models/card');
const Person = require('./models/person');

// let cardObj = new Card({
//   number: 2
// })

// cardObj.save();
Person.find({}).exec((err,res) => {
  if(err) return console.log(err)
  console.log("FROM SECOND THREAD",res)
});

// Card.find({}).exec((err,res) => {
//   if(err){
//     return console.log(err);
//   }
//   console.log("FROM SECOND THREAD",res);
// });