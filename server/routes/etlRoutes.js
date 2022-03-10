const express = require('express');
const etlRouter = require('express').Router();
const {
  extractProduct, extractFeatures, extractStyles, extractPhotos, extractSKUs, extractCart
} = require('../../etl/extract.js');

module.exports = etlRouter;
