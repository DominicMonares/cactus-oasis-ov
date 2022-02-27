const newrelic = require('newrelic');
const express = require('express');

const clientRouter = require('./routes/clientRoutes.js');
const etlRouter = require('./routes/etlRoutes.js');
const additionalRouter = require('./routes/additionalRoutes.js');

const createServer = () => {
  const app = express();
  app.use('/', clientRouter);
  app.use('/', etlRouter);
  app.use('/', additionalRouter);
  return app;
}

module.exports = createServer;
