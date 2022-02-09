const express = require('express');
const router = require('express').Router();

const {
  clearModel,
  fetchAllProducts, fetchProduct, createProduct,
  createFeature, fetchFeatures,
  createStyle, fetchStyles,
  createPhoto, fetchPhotos,
  createSKU, fetchSKUs,
  createReview, fetchReviews,
  createReviewPhoto, fetchReviewPhotos,
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
  !req.query.page ? page = 1 : page = req.query.page;
  !req.query.count ? count = 5 : count = req.query.count;

  fetchAllProducts(page, count, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      data.forEach(val => {delete val._id});
      res.send(data);
    }
  })
})

router.get('/products/:product_id/', async (req, res) => {
  let product_id = req.params.product_id;
  let fullProduct;
  await fetchProduct(product_id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      delete data[0]['_id']
      fullProduct = data[0];
    }
  });

  await fetchFeatures(product_id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      data.forEach(val => { delete val._id });
      fullProduct.features = data;
      res.send(fullProduct);
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
});

/* ========== FEATURES ========== */

router.get('/features/:product_id', (req, res) => {
  fetchFeatures(req.params.product_id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      data.forEach(val => {delete val._id})
      res.send(data);
    }
  })
});

/* ========== STYLES ========== */

router.get('/products/:product_id/styles', async (req, res) => {
  let product_id = req.params.product_id;
  let fullStyle = {'product_id': product_id};

  await fetchStyles(product_id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      data.forEach(async (val, index) => {
        delete val._id;
        await fetchPhotos(val.style_id, (pErr, pData) => {
          if (pErr) {
            res.sendStatus(500);
          } else {
            pData.forEach(pVal => {delete pVal._id});
            val.photos = pData;
          }
        })

        await fetchSKUs(val.style_id, (sErr, sData) => {
          if (sErr) {
            res.sendStatus(500);
          } else {
            let fullSKUs = {};
            sData.forEach(sVal => {
              delete sVal._id;
              fullSKUs[sVal.id] = {quantity: sVal.quantity, size: sVal.size};
            });

            val.skus = fullSKUs;
            if (index === data.length - 1) {
              fullStyle.results = data;
              res.send(fullStyle);
            }
          }
        });
      });
    }
  });
});

/* ========== PHOTOS ========== */

router.get('/photos/:style_id', (req, res) => {
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

router.get('/skus/:style_id', (req, res) => {
  fetchSKUs(req.params.style_id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      data.forEach(val => {delete val._id})
      res.send(data);
    }
  })
});

/* ========== REVIEWS ========== */

router.get('/reviews/', (req, res) => {
  let page, count, sort, product_id;
  !req.query.page ? page = 1 : page = req.query.page;
  !req.query.count ? count = 5 : count = req.query.count;
  !req.query.sort ? sort = null : sort = req.query.sort;
  !req.query.product_id ? product_id = null : product_id = req.query.product_id;

  let fullReview = {
    'product': product_id.toString(),
    'page': page,
    'count': count
  };

  fetchReviews(page, count, sort, product_id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      data.forEach((val, i) => {
        delete val._id;
        reviewHelper(val.review_id, (pErr, pData) => {
          if (pErr) {
            res.sendStatus(500);
          } else {
            val.photos = pData.map(photo => {
              delete photo._id;
              return photo;
            });
          }

          if (i === data.length - 1) {
            fullReview.results = data;
            res.send(fullReview);
          }
        });
      });
    }
  });
});

let reviewHelper = (review, callback) => {
  fetchReviewPhotos(review, callback);
}

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
