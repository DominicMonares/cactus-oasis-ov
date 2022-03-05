const express = require('express');
const mongoose = require('mongoose');
const createServer = require('./server.js');

mongoose
  .connect('mongodb://localhost:27017/SDC', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    const app = createServer();
    app.listen(8080, () => {
      console.log('Listening on port 8080');
    })
});
