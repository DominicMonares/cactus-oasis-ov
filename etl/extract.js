const fs = require('fs');
const {pipeline} = require('stream');
const path = require('path');
const csv = require('csvtojson');
const moment = require('moment');
const csvParser = csv();
const bucket = 'https://arid-sdc-products.s3.us-east-1.amazonaws.com/';

const {
  transformProduct, transformFeature, transformStyle, transformPhoto, transformSKU, transformCart
} = require('./transform.js');

const extractProduct = () => {
  // const productInUrl = path.resolve(__dirname, 'origin/product.csv');
  const productInUrl = path.resolve(bucket, 'product.csv');
  const productOutUrl = path.resolve(__dirname, 'origin/json/product.json');

  const productInputStream = fs.createReadStream(productInUrl);
  const productOutputStream = fs.createWriteStream(productOutUrl);

  pipeline(productInputStream, csvParser, transformProduct, productOutputStream, err => {
    if (err) {
      console.log('Product pipeline error: ', err);
    } else {
      console.log('Product pipeline completed successfully');
    }
  })
}

const extractFeatures = () => {
  // const featureInUrl = path.resolve(__dirname, 'origin/features.csv');
  const featureInUrl = path.resolve(bucket, 'features.csv');
  const featureOutUrl = path.resolve(__dirname, 'origin/json/features.json');

  const featureInputStream = fs.createReadStream(featureInUrl);
  const featureOutputStream = fs.createWriteStream(featureOutUrl);

  pipeline(featureInputStream, csvParser, transformFeature, featureOutputStream, err => {
    if (err) {
      console.log('Feature pipeline error ', err);
    } else {
      console.log('Feature pipeline completed successfully');
    }
  })
}

const extractStyles = () => {
  // const styleInUrl = path.resolve(__dirname, 'origin/styles.csv');
  const styleInUrl = path.resolve(bucket, 'styles.csv');
  const styleOutUrl = path.resolve(__dirname, 'origin/json/styles.json');

  const styleInputStream = fs.createReadStream(styleInUrl);
  const styleOutputStream = fs.createWriteStream(styleOutUrl);

  pipeline(styleInputStream, csvParser, transformStyle, styleOutputStream, err => {
    if (err) {
      console.log('Style pipeline error ', err);
    } else {
      console.log('Style pipeline completed successfully');
    }
  })
}

const extractPhotos = () => {
  // const photoInUrl = path.resolve(__dirname, 'origin/photos.csv');
  const photoInUrl = path.resolve(bucket, 'photos.csv');
  const photoOutUrl = path.resolve(__dirname, 'origin/json/photos.json');

  const photoInputStream = fs.createReadStream(photoInUrl);
  const photoOutputStream = fs.createWriteStream(photoOutUrl);

  pipeline(photoInputStream, csvParser, transformPhoto, photoOutputStream, err => {
    if (err) {
      console.log('Photo pipeline error ', err);
    } else {
      console.log('Photo pipeline completed successfully');
    }
  })
}

const extractSKUs = () => {
  // const skuInUrl = path.resolve(__dirname, 'origin/skus.csv');
  const skuInUrl = path.resolve(bucket, 'skus.csv');
  const skuOutUrl = path.resolve(__dirname, 'origin/json/skus.json');

  const skuInputStream = fs.createReadStream(skuInUrl);
  const skuOutputStream = fs.createWriteStream(skuOutUrl);

  pipeline(skuInputStream, csvParser, transformSKU, skuOutputStream, err => {
    if (err) {
      console.log('SKU pipeline error ', err);
    } else {
      console.log('SKU pipeline completed successfully');
    }
  })
}

const extractCart = () => {
  // const cartInUrl = path.resolve(__dirname, 'origin/cart_original.csv');
  const cartInUrl = path.resolve(bucket, 'cart_original.csv');
  const cartOutUrl = path.resolve(__dirname, 'origin/json/cart.json');

  const cartInputStream = fs.createReadStream(cartInUrl);
  const cartOutputStream = fs.createWriteStream(cartOutUrl);

  pipeline(cartInputStream, csvParser, transformCart, cartOutputStream, err => {
    if (err) {
      console.log('Cart pipeline error ', err);
    } else {
      console.log('Cart pipeline completed successfully');
    }
  })
}

extractProduct();
// extractFeatures();
// extractStyles();
// extractPhotos();
// extractSKUs();
// extractCart();

module.exports = {
  'extractProduct': extractProduct,
  'extractFeatures': extractFeatures,
  'extractStyles': extractStyles,
  'extractPhotos': extractPhotos,
  'extractSKUs': extractSKUs,
  'extractCart': extractCart
}
