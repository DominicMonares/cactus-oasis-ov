const csv = require('csvtojson');
const {transformCart} = require('./transform.js');

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
  'extractCart': extractCart
}
