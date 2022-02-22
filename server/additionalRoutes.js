const express = require('express');
const additionalRouter = require('express').Router();
const {createProduct, fetchFeatures, fetchPhotos, fetchSKUs} = require('../db/dbMethods.js');

/* ========== PRODUCTS ========== */

/*

FOR TESTING PURPOSES ONLY

additionalRouter.post('/admin/products', (req, res) => {
  createProduct(null, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

*/

/* ========== FEATURES ========== */

additionalRouter.get('/features/:product_id', (req, res) => {
  fetchFeatures(req.params.product_id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      data.forEach(val => {delete val._id})
      res.send(data);
    }
  })
});

/* ========== PHOTOS ========== */

additionalRouter.get('/photos/:style_id', (req, res) => {
  fetchPhotos(req.params.style_id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      data.forEach(val => {delete val._id})
      res.send(data);
    }
  })
});

/* ========== SKUS ========== */

additionalRouter.get('/skus/:style_id', (req, res) => {
  fetchSKUs(req.params.style_id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      data.forEach(val => {delete val._id})
      res.send(data);
    }
  })
});

module.exports = additionalRouter;
