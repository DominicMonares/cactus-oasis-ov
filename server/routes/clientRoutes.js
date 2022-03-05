const newrelic = require('newrelic');
const express = require('express');
const clientRouter = require('express').Router();

const {
  fetchAllProducts, fetchProduct, fetchFeatures, fetchStyles, fetchPhotos, fetchSKUs, addToCart, fetchCart, countCart
} = require('../../db/dbMethods.js');
const {checkCache, addToCache, updateCache} = require('../../cache/cache.js');

const Memcached = require('memcached');
const memcached = new Memcached('127.0.0.1:11211');

/* ========== PRODUCTS ========== */

clientRouter.get('/products', (req, res) => {
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

// will refactor to get myself out of callback hell, time permitting
clientRouter.get('/products/:product_id', (req, res) => {
  let product_id = req.params.product_id;
  let key = `product_${product_id}`;
  let fullProduct;

  checkCache(key, (err, data) => {
    if (err) {
      throw err;
    } else {
      if (data) {
        res.send(data);
      } else {
        fetchProduct(product_id, (pErr, data) => {
          if (pErr) {
            res.sendStatus(500);
          } else {
            delete data[0]['_id'];
            getFeatures(product_id, (fErr, fData) => {
              if (fErr) {
                res.sendStatus(500);
              } else {
                data[0]['features'] = fData.map(feature => {
                  delete feature._id;
                  if (feature.value === 'null') {
                    feature.value = null;
                  }

                  return feature;
                });
                fullProduct = data[0];
                addToCache(key, fullProduct);
                res.send(fullProduct);
              }
            });
          }
        });
      }
    }
  });
});

let getFeatures = (product, callback) => {
  fetchFeatures(product, callback);
}

/* ========== STYLES ========== */

// will refactor to get myself out of callback hell, time permitting
clientRouter.get('/products/:product_id/styles', (req, res) => {
  let product_id = req.params.product_id;
  let key = `style_${product_id}`;
  let fullStyle = { 'product_id': product_id };

  checkCache(key, (err, data) => {
    if (err) {
      throw err;
    } else {
      if (data) {
        res.send(data);
      } else {
        fetchStyles(product_id, (stErr, data) => {
          if (stErr) {
            res.sendStatus(500);
          } else {
            data.forEach((val, i) => {
              delete val._id;
              let style = val.style_id
              photoHelper(style, (pErr, pData) => {
                if (pErr) {
                  res.sendStatus(500);
                } else {
                  pData.forEach(pVal => { delete pVal._id });
                  val.photos = pData;
                }
              })

              skuHelper(style, (sErr, sData) => {
                if (sErr) {
                  res.sendStatus(500);
                } else {
                  let fullSKUs = {};
                  sData.forEach(sVal => {
                    delete sVal._id;
                    fullSKUs[sVal.id] = { quantity: sVal.quantity, size: sVal.size };
                  });

                  val.skus = fullSKUs;
                  if (i === data.length - 1) {
                    fullStyle.results = data;
                    addToCache(key, fullStyle);
                    res.send(fullStyle);
                  }
                }
              })
            });
          }
        });
      }
    }
  })
});

let photoHelper = (style, callback) => {
  fetchPhotos(style, callback);
}

let skuHelper = (style, callback) => {
  fetchSKUs(style, callback);
}

/* ========== CART ========== */

// will refactor to get myself out of callback hell, time permitting
clientRouter.get('/cart', (req, res) => {
  // 3232 is the user session for this project
  checkCache(`user_session_3232`, (err, data) => {
    if (err) {
      throw err;
    } else {
      if (data) {
        res.send(data);
      } else {
        fetchCart(3232, (err, data) => {
          if (err) {
            res.sendStatus(500);
          } else {
            if (data.length === 0) {
              res.send([]);
            } else {
              res.send(sortCart(data));
            }
          }
        });
      }
    }
  })
});

let sortCart = (cart) => {
  let fullCart = {};
  for (var item = 0; item < cart.length; item ++) {
    let val = cart[item];
    delete val._id;
    if (fullCart[val.product_id] === undefined) {
      fullCart[val.product_id] = { sku_id: val.product_id, count: 1 };
    } else {
      fullCart[val.product_id]['count'] ++;
    }
  }

  return Object.values(fullCart);
}

// will refactor to get myself out of callback hell, time permitting
clientRouter.post('/cart', (req, res) => {
  checkCache(`user_session_3232`, (err, data) => {
    if (err) {
      throw err;
    } else {
      countCart((countErr, countData) => {
        if (countErr) {
          res.sendStatus(500);
        } else {
          let cartItem = {
            id: countData + 1,
            user_session: 3232,
            product_id: req.query.sku_id,
            active: 1
          }

          if (data) {
            var cart = data;
            cart.push(cartItem);
            updateCache(3232, cart);
          }

          addToCart(cartItem, (cErr, cData) => {
            if (cErr) {
              res.sendStatus(500);
            } else {
              res.send(cData);
            }
          });
        }
      })
    }
  })
});

module.exports = clientRouter;
