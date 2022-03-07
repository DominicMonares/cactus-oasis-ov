require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const createServer = require('./server.js');

// .connect('mongodb://localhost:27017/SDC', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

mongoose
  .connect(`mongodb://dominic:${process.env.DB_PW}@3.87.83.146/SDC`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    const app = createServer();
    app.listen(8080, () => {
      console.log('Listening on port 8080');
    })
});

// additionalRouter.get('/loaderio-167d73d03ab32c3fcf35f58f2aba4fe5/', (req, res) => {
//   res.send('loaderio-167d73d03ab32c3fcf35f58f2aba4fe5');
// })
