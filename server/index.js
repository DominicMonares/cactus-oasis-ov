const express = require('express');
const app = express();
const port = 8080;
const clientRouter = require('./clientRoutes.js');
const etlRouter = require('./etlRoutes.js');
const additionalRouter = require('./additionalRoutes.js');

app.use('/', clientRouter);
app.use('/', etlRouter);
app.use('/', additionalRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

module.exports = app;
