const express = require('express');
const router = require('express').Router();

const {
  clearModel,
  fetchAllProducts, fetchProduct, createProduct,
  createFeature, fetchFeatures,
  createStyle, fetchStyle,
  createPhoto, fetchPhotos,
  createSKU, fetchSKUs,
  createReview, fetchReview,
  addToCart, fetchCart, removeFromCart
} = require('../db/dbMethods.js');

router.get('/delete', (req, res) => {
  // COMMENT THIS ROUTE OUT BEFORE DEPLOYMENT
  clearModel((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  })
});

/* ========== PRODUCTS ========== */

router.get('/products', (req, res) => {
  let page, count;
  if (!req.query.page) {
    page = 1;
  } else {
    page = req.query.page;
  }

  if (!req.query.count) {
    count = 5;
  } else {
    count = req.query.count;
  }

  fetchAllProducts(page, count, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  })
})

router.get('/products/:product_id/', (req, res) => {
  fetchProduct(req.params.product_id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      // res.send(data);
      data[0]['features'] = fetchFeatures(req.params.product_id, (err, fData) => {
        if (err) {
          res.sendStatus(500);
        } else {
          console.log('D2 ', fData);
          return fData;
        }
      });

      console.log('DATA ', data[0]['features']);
      res.send(data[0]);
    }
  });
});

router.post('/products', (req, res) => {
  // COMMENT THIS ROUTE OUT BEFORE DEPLOYMENT
  createProduct(null, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
})

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

// how will we create a new user session and utilize only that session, per session?
// will that be necessary?

router.get('/cart', (req, res) => {
  // 3232 will be used for new cart sessions
  fetchCart(3232, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  })
});

router.post('/cart/:sku_id', (req, res) => {
  // add product to cart
  let cartItem = {
    id: '',
    user_session: 3232,
    product_id: req.params.sku_id,
    active: 1
  }

  addToCart(cartItem, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  })
});

router.put('/cart/remove', (req, res) => {
  // on load? after connection termination? even necessary?
  // remove product from cart
});

module.exports = router;
