const {
  fetchAllProducts, fetchProduct, fetchFeatures, fetchStyles, fetchPhotos, fetchSKUs, fetchReviews, fetchReviewPhotos, addToCart, fetchCart, countCart
} = require('../db/dbMethods.js');
const {cache, checkCache, createCache} = require('../cache/cache.js');

let getProduct = async (req, res, product) => {
  if (req && res) {
    var product_id = req.params.product_id;
  } else {
    var product_id = product;
  }

  let fullProduct;

  if (cache[`product ${product_id}`]) {
    if (res) {
      res.send(cache[`product ${product_id}`]);
    } else {
      return cache[`product ${product_id}`];
    }
  } else {
    fetchProduct(product_id, (err, data) => {
      console.log('ID ', product_id);
      if (err) {
        if (res) {
          res.sendStatus(500);
        } else {
          console.log('FETCH PRODUCT ERROR ', err);
        }
      } else {
        if (data.length === 0) {
          if (res) {
            res.send('No Product Data Found');
          } else {
            return 'No Product Data Found';
          }
        }

        delete data[0]['_id'];
        getFeatures(product_id, (fErr, fData) => {
          if (fErr) {
            if (res) {
              res.sendStatus(500);
            } else {
              console.log('GET FEATURES ERROR ', fErr);
            }
          } else {
            if (fData.length === 0) {
              if (res) {
                res.send('No Feature Data Found');
              } else {
                return 'No Feature Data Found';
              }
            }

            data[0]['features'] = fData.map(feature => {
              delete feature._id;
              if (feature.value === 'null') {
                feature.value = null;
              }

              return feature;
            });
            fullProduct = data[0];
            cache[`product ${product_id}`] = fullProduct;
            if (res) {
              res.send(fullProduct);
            } else {
              return fullProduct;
            }
          }
        });
      }
    });
  }
}

let getFeatures = (product, callback) => {
  fetchFeatures(product, callback);
}

module.exports = {'getProduct': getProduct};
