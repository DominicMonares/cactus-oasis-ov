const express = require('express');
const {
  createProduct, fetchProduct, deleteProduct,
  createStyle, fetchStyle,
  createReview, fetchReview,
  addToCart, fetchCart, removeFromCart
} = require('../db/dbMethods.js');

const app = express();
const port = 8080;

/* ========== ETL ROUTES ========== */
const {extractCart} = require('../etl/extract.js');

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

app.get('/products/:product_id/styles', (req, res) => {
  // fetch product style data
});

app.get('/reviews/:product_id/:sort/:page/:count', (req, res) => {
  // fetch review data
});

app.get('/cart', (req, res) => {
  // fetch cart data
});

app.post('/cart', (req, res) => {
  // add product to cart
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
