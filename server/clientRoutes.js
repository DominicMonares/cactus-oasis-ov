const express = require('express');
const clientRouter = require('express').Router();
const {
  fetchAllProducts, fetchProduct, fetchFeatures, fetchStyles, fetchPhotos, fetchSKUs, fetchReviews, fetchReviewPhotos, addToCart, fetchCart
} = require('../db/dbMethods.js');

/* ========== PRODUCTS ========== */

clientRouter.get('/products', (req, res) => {
  let page, count;
  !req.query.page ? page = 1 : page = req.query.page;
  !req.query.count ? count = 5 : count = req.query.count;

  fetchAllProducts(page, count, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      if (data.length === 0) {
        res.send('No Product Data Found');
      }

      data.forEach(val => {delete val._id});
      res.send(data);
    }
  })
})

clientRouter.get('/products/:product_id', async (req, res) => {
  let product_id = req.params.product_id;
  let fullProduct;

  fetchProduct(product_id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      if (data.length === 0) {
        res.send('No Product Data Found');
      }

      delete data[0]['_id'];
      getFeatures(product_id, (fErr, fData) => {
        if (fErr) {
          res.sendStatus(500);
        } else {
          if (fData.length === 0) {
            res.send('No Feature Data Found');
          }

          data[0]['features'] = fData.map(feature => {
            delete feature._id;
            return feature;
          });
          fullProduct = data[0];
          res.send(fullProduct);
        }
      });
    }
  });
});

let getFeatures = (product, callback) => {
  fetchFeatures(product, callback);
}

/* ========== STYLES ========== */

clientRouter.get('/products/:product_id/styles', async (req, res) => {
  let product_id = req.params.product_id;
  let fullStyle = {'product_id': product_id};

  fetchStyles(product_id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      if (data.length === 0) {
        res.sendStatus('No Style Data Found');
      }

      data.forEach((val, i) => {
        delete val._id;
        let style = val.style_id
        photoHelper(style, (pErr, pData) => {
          if (pErr) {
            res.sendStatus(500);
          } else {
            pData.forEach(pVal => {delete pVal._id});
            val.photos = pData;
          }
        })

        skuHelper(style, (sErr, sData) => {
          if (sErr) {
            res.sendStatus(500);
          } else {
            if (sData.length === 0) {
              res.send('No SKU Data Found');
            }

            let fullSKUs = {};
            sData.forEach(sVal => {
              delete sVal._id;
              fullSKUs[sVal.id] = {quantity: sVal.quantity, size: sVal.size};
            });

            val.skus = fullSKUs;
            if (i === data.length - 1) {
              fullStyle.results = data;
              res.send(fullStyle);
            }
          }
        })
      });
    }
  });
});

let photoHelper = (style, callback) => {
  fetchPhotos(style, callback);
}

let skuHelper = (style, callback) => {
  fetchSKUs(style, callback);
}

/* ========== REVIEWS ========== */

clientRouter.get('/reviews/', (req, res) => {
  let page, count, product_id;
  !req.query.page ? page = 1 : page = Number(req.query.page);
  !req.query.count ? count = 5 : count = req.query.count;
  !req.query.product_id ? product_id = null : product_id = req.query.product_id.toString();

  let fullReview = {
    'product': product_id || null,
    'page': page,
    'count': count
  };

  fetchReviews(page, count, product_id, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      if (data.length === 0) {
        res.send('No Review Data Found');
      }

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

clientRouter.get('/cart', (req, res) => {
  // 3232 is the user session for this project
  fetchCart(3232, (err, data) => {
    err ? res.sendStatus(500) : res.send(data);
  })
});

clientRouter.post('/cart', (req, res) => {
  let cartItem = {
    id: '',
    user_session: 3232,
    product_id: req.query.sku_id,
    active: 1
  }

  addToCart(cartItem, (err, data) => {
    err ? res.sendStatus(500) : res.send(data);
  })
});

module.exports = clientRouter;
