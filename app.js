'use strict';
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

const playstore = require('./playstore'); 

app.get('/apps', (req, res) => {
//   if(!req.query){
//     res.send(playstore);
//   }

  const { sort } = req.query;
    
  if(sort) {
    if(!['rating', 'app'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be one of rating or app');
    }
  }

  //   let results = books
  //     .filter(book => 
  //       book
  //         .title
  //         .toLowerCase()
  //         .includes(search.toLowerCase()));

  let results = playstore;
  res.send(results);
  if(sort) {
    results
      .sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      }); 
  }  

  res
    .json(results);
});

app.listen(8000, () => {
  console.log('listening on port 8000');
});