require('dotenv').config();
const express = require('express');
const additionalRouter = require('express').Router();
const {createProduct, fetchFeatures, fetchPhotos, fetchSKUs} = require('../../db/dbMethods.js');

/* ========== PRODUCTS ========== */

// FOR TESTING PURPOSES ONLY

// additionalRouter.post('/admin/products', (req, res) => {
//   let product = {
//     id: 1,
//     name: "productname",
//     slogan: "productslogan",
//     description: "producdescription",
//     category: "productcategory",
//     default_price: "120"
//   };

//   createProduct(product, (err, data) => {
//     if (err) {
//       res.sendStatus(500);
//     } else {
//       res.send(data);
//     }
//   });
// });

/* ========== FEATURES ========== */

additionalRouter.get('/features/:product_id', (req, res) => {
  fetchFeatures(req.params.product_id)
    .then(data => {res.send(data)})
    .catch(err => {res.sendStatus(500)});
});

/* ========== PHOTOS ========== */

additionalRouter.get('/photos/:style_id', (req, res) => {
  fetchPhotos(req.params.style_id)
    .then(data => {res.send(data)})
    .catch(res.sendStatus(500));
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

  fetchSKUs(req.params.style_id)
    .then(data => {res.send(data)})
    .catch(err => {res.sendStatus(500)});
});

/* ========== STRESS TESTING ========== */

additionalRouter.get(`/${process.env.LOADER_IO}.txt`, (req, res) => {
  res.send(process.env.LOADER_IO);
})

module.exports = additionalRouter;
