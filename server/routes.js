const express = require('express');
const router = require('express').Router();

const {
  createProduct, fetchProduct, deleteProduct,
  createFeature, fetchFeatures,
  createStyle, fetchStyle,
  createPhoto, fetchPhotos,
  createSKU, fetchSKUs,
  createReview, fetchReview,
  addToCart, fetchCart, removeFromCart
} = require('../db/dbMethods.js');

/* ========== PRODUCTS ========== */

router.get('/products/delete', (req, res) => {
  deleteProduct((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  })
});

router.post('/products', (req, res) => {
  createProduct(null, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
})

router.get('/products/:product_id', (req, res) => {
  fetchProduct(req.params.product_id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

/* ========== FEATURES ========== */

router.get('/features/:product_id', (req, res) => {

});

/* ========== STYLES ========== */

router.get('/products/:product_id/styles', (req, res) => {

});

/* ========== PHOTOS ========== */

/* ========== SKUS ========== */

/* ========== REVIEWS ========== */

router.get('/reviews/:product_id/:sort/:page/:count', (req, res) => {
  // fetch review data
});

/* ========== CART ========== */

router.get('/cart', (req, res) => {
  // 3232 will be used for new cart sessions
  fetchCart(1111, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  })
});

router.post('/cart', (req, res) => {
  // add product to cart
});

module.exports = router;
