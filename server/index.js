const express = require('express');
const {
  createProduct, fetchProduct, deleteProduct,
  createFeature, fetchFeatures,
  createStyle, fetchStyle,
  createPhoto, fetchPhotos,
  createSKU, fetchSKUs,
  createReview, fetchReview,
  addToCart, fetchCart, removeFromCart
} = require('../db/dbMethods.js');

const app = express();
const port = 8080;

/* ========== ETL ROUTES ========== */
const {extractCart, extractProduct, extractFeature} = require('../etl/extract.js');

app.get('/etl/product', (req, res) => {
  extractProduct()
    .then(data => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

app.get('/etl/feature', (req, res) => {
  extractFeature()
    .then(data => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

app.get('/etl/cart', (req, res) => {
  extractCart()
    .then(data => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

/* ========== MAIN ROUTES ========== */

app.get('/products/delete', (req, res) => {
  deleteProduct((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  })
});

app.post('/products', (req, res) => {
  createProduct(null, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
})

app.get('/products/:product_id', (req, res) => {
  fetchProduct(req.params.product_id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

app.get('/features/:product_id', (req, res) => {

});

app.get('/products/:product_id/styles', (req, res) => {
  // fetch product style data
});

app.get('/reviews/:product_id/:sort/:page/:count', (req, res) => {
  // fetch review data
});

app.get('/cart', (req, res) => {
  // 3232 will be used for new cart sessions
  fetchCart(1111, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  })
});

app.post('/cart', (req, res) => {
  // add product to cart
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
