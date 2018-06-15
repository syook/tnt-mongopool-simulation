const db = require('./models/db').db;
const Person = require('./models/person')
const child_process = require('child_process');
const Card = require('./models/card');
const kue = require('kue');
const queue = kue.createQueue();
kue.app.listen(8001);

queue.on('job enqueue', function(id, type) {
  console.log('Job %s got queued of type %s', id, type);
});

const processAggregate = () => {
  return new Promise((resolve,reject) => {
    Card.aggregate([{$group: {_id: null,total: {$sum: "$number"}}}]).exec((err,res) => {
      if(err) return reject(err);
      resolve(res);
    })
  });
};

queue.process('aggregate',32,(job,done) => {
  processAggregate().then(res => {
    console.log(res);
    done(null,res)
  }).catch(err => done(err));
});

// Card.find({}).exec((err,res) => {
//   if(err) return console.log(err);
//   console.log("MAIN THREAD CARDS",res)
// });
// let personObj = new Person({
//   name: 'Test',
//   mobile: '1234567890'
// })

// personObj.save();
// console.log(db)

const Thread = child_process.fork('./thread');
const SecondThread = child_process.fork('./anotherThread');

Person.find({}).exec((err,res) => {
  if(err) return console.log(err)
  console.log(res)
});

const aggregateToDb = () => {
  // console.log('setinterval')
  queue.create('aggregate',{title: 'aggregate'}).on('failed',() => console.log('Error')).removeOnComplete(true).save();
};

setInterval(aggregateToDb,100);