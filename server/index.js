const express = require('express');
const app = express();
const port = 8080;
const router = require('./routes.js');
const etlRouter = require('./etlRoutes.js');

app.use('/', router);
app.use('/', etlRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
