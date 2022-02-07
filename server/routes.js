const express = require('express');
const router = require('express').Router();

const {
  clearModel,
  fetchAllProducts, fetchProduct, createProduct,
  createFeature, fetchFeatures,
  createStyle, fetchStyles,
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
  let product_id = req.params.product_id;
  let fullProduct;
  fetchProduct(product_id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      if (!fullProduct) {
        fullProduct = {};
        for (var key in data[0]) {
          if (key === 'id' || key === 'name' ||
            key === 'slogan' || key === 'description' ||
            key === 'category' || key === 'default_price'
          ) {
            fullProduct[key] = data[0][key];
          }
        }
      } else {
        let features = [];
        for (var feat = 0; feat < data.length; feat++) {
          features.push({
            feature: data[feat]['feature'],
            value: data[feat]['value']
          })
        }

        fullProduct['features'] = features;
        res.send(fullProduct);
      }
    }
  })
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
  fetchFeatures(req.params.product_id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  })
});

/* ========== STYLES ========== */

router.get('/products/:product_id/styles', (req, res) => {
  let product_id = req.params.product_id;
  fetchStyles(product_id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {

      let styles = [];
      let fullStyles = {
       'product_id': product_id
      }

      data.forEach(val => {
        let filteredStyle = {};
        for (var i in val) {
          if (i === 'style_id' || i === 'name' ||
            i === 'original_price' || i === 'sale_price' ||
            i === 'default?'
          ) {
            filteredStyle[i] = val[i];
          }
        }

        styles.push(filteredStyle);
      })

      fullStyles.results = styles;
      res.send(fullStyles);
    }
  })
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
