const express = require('express');
const {
  clearModel,
  createProduct, fetchProduct,
  createFeature, fetchFeatures,
  createStyle, fetchStyle,
  createPhoto, fetchPhotos,
  createSKU, fetchSKUs,
  createReview, fetchReview,
  addToCart, fetchCart, removeFromCart
} = require('../db/dbMethods.js');

const app = express();
const port = 8080;

/* ========== MAIN ROUTES ========== */

app.get('/delete', (req, res) => {
  clearModel((err, data) => {
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


/* ========== ETL ROUTES ========== */

const {
  extractProduct, extractFeatures, extractStyles, extractPhotos, extractSKUs, extractReviews, extractCart
} = require('../etl/extract.js');

app.get('/etl/product', (req, res) => {
  extractProduct()
    .then(data => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

app.get('/etl/features', (req, res) => {
  extractFeatures()
    .then(data => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

app.get('/etl/styles', (req, res) => {
  extractStyles()
    .then(data => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(500);
    });
})

app.get('/etl/photos', (req, res) => {
  extractPhotos()
    .then(data => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(500);
    });
})

app.get('/etl/skus', (req, res) => {
  extractSKUs()
    .then(data => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(500);
    });
})

app.get('/etl/reviews', (req, res) => {
  extractReviews()
    .then(data => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(500);
    });
})

app.get('/etl/cart', (req, res) => {
  extractCart()
    .then(data => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
