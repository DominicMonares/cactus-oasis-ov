const csv = require('csvtojson');
const {transformCart, transformProduct} = require('./transform.js');

let extractProduct = () => {
  const csvFilePath = `${__dirname}/origin/product.csv`;
  return csv()
    .fromFile(csvFilePath)
    .then(data => {
      return data;
    })
    .catch(err => {
      throw 'PRODUCT EXTRACTION ERROR ', err;
    })
    .then(extracted => {
      transformProduct(extracted);
    })
    .catch(err => {
      throw 'PRODUCT TRANSFORMATION ERROR ', err;
    })
}

let extractCart = () => {
  const csvFilePath = `${__dirname}/origin/cart.csv`;
  return csv()
    .fromFile(csvFilePath)
    .then(data => {
      return data;
    })
    .catch(err => {
      throw 'CART EXTRACTION ERROR ', err;
    })
    .then(extracted => {
      transformCart(extracted);
    })
    .catch(err => {
      throw 'CART TRANSFORMATION ERROR ', err;
    })
}

module.exports = {
  'extractCart': extractCart,
  'extractProduct': extractProduct
}
