// const newrelic = require('newrelic');
const express = require('express');
const clientRouter = require('express').Router();

const {
  fetchAllProducts, fetchProduct, fetchFeatures, fetchStyles, fetchPhotos, fetchSKUs, addToCart, fetchCart
} = require('../../db/dbMethods.js');
const {checkCache, addToCache, updateCache} = require('../../cache/cache.js');

/* ========== PRODUCTS ========== */

clientRouter.get('/products', (req, res) => {
  let page, count;
  !req.query.page ? page = 1 : page = req.query.page;
  !req.query.count ? count = 5 : count = req.query.count;

  fetchAllProducts(page, count)
    .then(data => {res.send(data);})
    .catch(err => {res.sendStatus(500)});
});

clientRouter.get('/products/:product_id', async (req, res) => {
  let product_id = req.params.product_id;
  let key = `product_${product_id}`;
  let fullProduct;

  checkCache(key, (err, cache) => {
    if (err) {
      res.sendStatus(500);
    } else if (cache) {
      res.send(cache);
    } else {
      fetchProduct(product_id)
        .then(product => { fullProduct = product[0] })
        .catch(err => res.sendStatus(500))
        .then(() => { return fetchFeatures(product_id) })
        .then(features => {return checkFeatures(features)})
        .catch(err => { res.sendStatus(500) })
        .then(() => { addToCache(key, fullProduct) })
        .then(() => { res.send(fullProduct) });
    }
  })

  let checkFeatures = (features) => {
    fullProduct.features = features.map(feature => {
      if (feature.value === null) { feature.value = null }
      return feature;
    })
  }
});

/* ========== STYLES ========== */

clientRouter.get('/products/:product_id/styles', (req, res) => {
  let product_id = req.params.product_id;
  let key = `style_${product_id}`;
  let fullStyle = { 'product_id': product_id };

  checkCache(key, (err, cache) => {
    if (err) {
      res.sendStatus(500);
    } else if (cache) {
      res.send(cache);
    } else {
      fetchStyles(product_id)
        .then(styles => {return checkStyles(styles)})
        .catch(err => { res.sendStatus(500) });
    }
  });

  let checkStyles = (styles) => {
    let style_ids = styles.map(style => style.style_id);
    fetchPhotos(style_ids)
    .then(photos => {
        styles.forEach((style, i) => {
          style.photos = [];
          photos.forEach(photo => {
            if (photo.style_id === style.style_id) {
              delete photo.style_id;
              style.photos.push(photo);
            }

            if (i === styles.length - 1) {
              fullStyle.results = styles;
            }
          })
        });
      })
      .catch(err => { res.sendStatus(500) })
      .then(() => {
        return fetchSKUs(style_ids)
      })
      .then(skus => {
        fullStyle.results.forEach((style, i) => {
          let fullSKUs = {};
          skus.forEach((sku, j) => {
            if (sku.style_id === style.style_id) {
              fullSKUs[sku.id] = { quantity: sku.quantity, size: sku.size };
            }

            if (j === skus.length - 1) {
              fullStyle['results'][i]['skus'] = fullSKUs;
            }
          })
        })
      })
      .then(() => {
        addToCache(key, fullStyle);
        res.send(fullStyle);
      })
  }

  // let checkStyles = (styles) => {
  //   console.log('STYLES ', styles);
  //   styles.forEach((style, i) => {
  //     let style_id = style.style_id;
  //     fetchPhotos(style_id)
  //       .then(photos => { style.photos = photos })
  //       .catch(err => { res.sendStatus(500) })
  //       .then(() => { return fetchSKUs(style_id) })
  //       .then(skus => {
  //         let fullSKUs = {};
  //         skus.forEach(sku => {
  //           fullSKUs[sku.id] = { quantity: sku.quantity, size: sku.size };
  //         })

  //         style.skus = fullSKUs;
  //         if (i === styles.length - 1) {
  //           fullStyle.results = styles;
  //           addToCache(key, fullStyle);
  //           res.send(fullStyle);
  //         }
  //       })
  //       .catch(err => { res.sendStatus(500) });
  //   })
  // }
});

/* ========== CART ========== */

let update = false;

clientRouter.get('/cart', (req, res) => {
  // 3232 is the user session for this project
  let session = randomCart(); // only used for stress testing

  // let session = 3232;
  let key = `user_session_${session}`
  checkCache(key, (err, cache) => {
    if (err) {
      throw err;
    } else if (cache && !update) {
      res.send(cache);
    } else {
      fetchCart(session)
        .then(data => {
          update = false;
          addToCache(key, sortCart(data));
          data.length === 0 ? res.send([]) : res.send(sortCart(data));
        })
        .catch(err => { res.sendStatus(500) });
    }
  });
});

const sortCart = (cart) => {
  let fullCart = {};
  for (var item = 0; item < cart.length; item ++) {
    let val = cart[item];
    if (fullCart[val.product_id] === undefined) {
      fullCart[val.product_id] = { sku_id: val.product_id, count: 1 };
    } else {
      fullCart[val.product_id]['count'] ++;
    }
  }

  return Object.values(fullCart);
}

const randomCart = () => {
  let carts = [1111, 1234, 4321, 3232];
  let user = Math.floor(Math.random() * (3 - 0) + 0);
  return carts[user];
}

clientRouter.post('/cart', (req, res) => {
  let cartItem = {
    user_session: 3232,
    product_id: req.query.sku_id,
    active: 1
  };

  update = true;
  addToCart(cartItem)
    .then(() => {res.sendStatus(201)})
    .catch(err => {res.sendStatus(500)});
});

module.exports = clientRouter;
