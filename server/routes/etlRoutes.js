const express = require('express');
const etlRouter = require('express').Router();
const {
  extractProduct, extractFeatures, extractStyles, extractPhotos, extractSKUs, extractCart
} = require('../../etl/extract.js');

// const {clearModel} = require('../../db/dbMethods.js');

// etlRouter.get('/etl/delete', (req, res) => {
//   // MODEL TO DELETE IS HARDCODED IN CLEAR MODEL
//   clearModel((err, data) => {
//     err ? res.sendStatus(500) : res.send(data);
//   })
// });

module.exports = etlRouter;
