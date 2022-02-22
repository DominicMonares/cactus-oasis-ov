const express = require('express');

const clientRouter = require('./clientRoutes.js');
const etlRouter = require('./etlRoutes.js');
const additionalRouter = require('./additionalRoutes.js');

const createServer = () => {
  const app = express();
  app.use('/', clientRouter);
  app.use('/', etlRouter);
  app.use('/', additionalRouter);
  return app;
}

module.exports = createServer;
