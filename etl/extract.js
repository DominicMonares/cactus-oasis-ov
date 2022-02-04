const csv = require('csvtojson');
const {transformCart} = require('./transform.js');

let extractCart = () => {
  const csvFilePath = `${__dirname}/origin/cart.csv`;
  return csv()
    .fromFile(csvFilePath)
    .then(data => {
      console.log('DATAAAA ', data.slice(0, 20));
      // transform
      return data;
    })
    .catch(err => {
      throw err;
    });
}

module.exports = {
  'extractCart': extractCart
}
