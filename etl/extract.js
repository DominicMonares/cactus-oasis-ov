const moment = require('moment');
const csv = require('csvtojson');
const {
  transformProduct, transformFeature, transformStyle, transformPhoto, transformSKU, transformReview, transformCart
} = require('./transform.js');

let extractProduct = () => {
  const csvFilePath = `${__dirname}/origin/split/products/product2.csv`;
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

let extractFeatures = () => {
  const csvFilePath = `${__dirname}/origin/split/features/features4.csv`;
  return csv()
    .fromFile(csvFilePath)
    .then(data => {
      return data;
    })
    .catch(err => {
      throw 'FEATURE EXTRACTION ERROR ', err;
    })
    .then(extracted => {
      transformFeature(extracted);
    })
    .catch(err => {
      throw 'FEATURE TRANSFORMATION ERROR ', err;
    })
}

let extractStyles = () => {
  const csvFilePath = `${__dirname}/origin/split/styles/styles3.csv`;
  return csv()
    .fromFile(csvFilePath)
    .then(data => {
      console.log('DATA ', data.slice(0, 20));
      return data;
    })
    .catch(err => {
      throw 'STYLE EXTRACTION ERROR ', err;
    })
    .then(extracted => {
      transformStyle(extracted);
    })
    .catch(err => {
      throw 'STYLE TRANSFORMATION ERROR ', err;
    })
}

let extractPhotos = () => {
  const csvFilePath = `${__dirname}/origin/split/photos/photos9.csv`;
  return csv()
    .fromFile(csvFilePath)
    .then(data => {
      console.log('DATA ', data.slice(0, 20));
      return data;
    })
    .catch(err => {
      throw 'PHOTO EXTRACTION ERROR ', err;
    })
    .then(extracted => {
      transformPhoto(extracted);
    })
    .catch(err => {
      throw 'PHOTO TRANSFORMATION ERROR ', err;
    })
}

let extractSKUs = () => {
  const csvFilePath = `${__dirname}/origin/split/skus/skus17.csv`;
  return csv()
    .fromFile(csvFilePath)
    .then(data => {
      console.log('DATA ', data.slice(0, 20));
      return data;
    })
    .catch(err => {
      throw 'SKU EXTRACTION ERROR ', err;
    })
    .then(extracted => {
      transformSKU(extracted);
    })
    .catch(err => {
      throw 'SKU TRANSFORMATION ERROR ', err;
    })
}

let extractReviews = () => {
  const csvFilePath = `${__dirname}/origin/split/reviews/reviews9.csv`;
  return csv()
    .fromFile(csvFilePath)
    .then(data => {
      return data;
    })
    .catch(err => {
      throw 'REVIEW EXTRACTION ERROR ', err;
    })
    .then(extracted => {
      transformReview(extracted);
    })
    .catch(err => {
      throw 'REVIEW TRANSFORMATION ERROR ', err;
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
  'extractProduct': extractProduct,
  'extractFeatures': extractFeatures,
  'extractStyles': extractStyles,
  'extractPhotos': extractPhotos,
  'extractSKUs': extractSKUs,
  'extractReviews': extractReviews,
  'extractCart': extractCart
}
