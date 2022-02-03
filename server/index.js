const express = require('express');
const {
  createProduct, fetchProduct, deleteProduct,
  createStyle, fetchStyle,
  createReview, fetchReview,
  addToCart, clearCart
} = require('../db/dbMethods.js');
const {extractCart} = require('../etl/extract.js');

const app = express();
const port = 8080;

app.get('/etl', (req, res) => {
  extractCart();
  res.end();
});

app.get('delete', (req, res) => {
  deleteProduct();
  res.end();
});

app.post('/products', (req, res) => {
  createProduct(null, (response, err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  })
})

app.get('/products/:product_id', (req, res) => {
  fetchProduct(req.params.product_id, (response, err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(response);
    }
  })
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
