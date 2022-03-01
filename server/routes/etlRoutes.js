const express = require('express');
const etlRouter = require('express').Router();

// const {clearModel} = require('../../db/dbMethods.js');

// etlRouter.get('/etl/delete', (req, res) => {
//   // MODEL TO DELETE IS HARDCODED IN CLEAR MODEL
//   clearModel((err, data) => {
//     err ? res.sendStatus(500) : res.send(data);
//   })
// });

module.exports = etlRouter;
