const express = require('express');
const app = express();
const port = 8080;

app.get('/products/:product_id', (req, res) => {
  // fetch product data
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
