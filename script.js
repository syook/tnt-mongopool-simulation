const Card = require('./models/card');

let i = 0;
let j = 0;

const pushDocs = () => {
  if(i === 500){
    clearInterval(timer);
    process.exit(0);
  }else{
    i++;
    j += 10000;
    let array = [...Array(j).keys()].splice(j - 10000);
    let documents = array.map(a => ({number: a}));
    Card.insertMany(documents,(err,res) => {
      if(err) return console.log(err);
      console.log(res.length,j)
    });
  }
}

const timer = setInterval(pushDocs,1000);
timer


// const pushDocs = () => {
//   let j = 0;
//   for (let i = 0; i < 1000; i++) {
//     j += 10000;
//     let array = [...Array(j).keys()].splice(j - 10000);
//     let documents = array.map(a => ({ number: a }));
//     Card.insertMany(documents, (err, res) => {
//       if (err) return console.log(err);
//       console.log('documents insreted', res.length, j)
//     });
//   }
// }

// pushDocs();