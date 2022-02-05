const csv = require('csvtojson');

let extractCart = () => {
  const csvFilePath = `${__dirname}/origin/cart.csv`;
  console.log('FILE PATH ', csvFilePath);
  csv()
    .fromFile(csvFilePath)
    .then(data => {
      console.log('DATAAAA ', data.slice(0, 20));
    });
}

module.exports = {
  'extractCart': extractCart
}
