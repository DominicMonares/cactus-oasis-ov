const fs = require('fs');
const {pipeline} = require('stream');
const path = require('path');
const csv = require('csvtojson');
const moment = require('moment');
const csvParser = csv();
const {Transform} = require('stream');
const {saveProductBatch, saveFeatureBatch, saveStyleBatch, savePhotoBatch, saveSKUBatch, saveCartBatch} = require('../db/dbMethods.js');

const extractProduct = () => {
  const productInUrl = path.resolve(__dirname, 'origin/product.csv');
  const productOutUrl = path.resolve(__dirname, 'origin/json/product.json');
  const productInputStream = fs.createReadStream(productInUrl);
  const productOutputStream = fs.createWriteStream(productOutUrl);
  var products = [];
  const transformProduct = new Transform({
    transform(chunk, encoding, callback) {
      try {
        let product = Object.assign({}, JSON.parse(chunk));
        product = {
          id: Number(product.id),
          name: product.name,
          slogan: product.slogan,
          description: product.description,
          category: product.category,
          default_price: product.default_price
        };

        console.log(`${product.id} added to Batch!`);
        products.push(product);
        callback(null, JSON.stringify(product) + '\n');
      } catch (err) {
        callback(err);
      }
    }
  })

  pipeline(productInputStream, csvParser, transformProduct, productOutputStream, err => {
    if (err) {
      console.log('Product pipeline error: ', err);
    } else {
      saveProductBatch(products, (pErr, res) => {
        if (pErr) {
          console.log('FAILED SAVE PRODUCT BATCH ', pErr);
        } else {
          console.log('Product pipeline completed successfully');
        }
      });
    }
  })
}

const extractFeatures = () => {
  const featureInUrl = path.resolve(__dirname, 'origin/features.csv');
  const featureOutUrl = path.resolve(__dirname, 'origin/json/features.json');
  const featureInputStream = fs.createReadStream(featureInUrl);
  const featureOutputStream = fs.createWriteStream(featureOutUrl);
  var features = [];
  const transformFeature = new Transform({
    transform(chunk, encoding, callback) {
      try {
        let feature = Object.assign({}, JSON.parse(chunk));
        feature = {
          id: Number(feature.id),
          product_id: Number(feature.product_id),
          feature: feature.feature,
          value: feature.value
        }

        console.log(`${feature.id} added to Batch!`);
        features.push(feature);
        callback(null, JSON.stringify(feature) + '\n');
      } catch (err) {
        callback(err);
      }
    }
  })

  pipeline(featureInputStream, csvParser, transformFeature, featureOutputStream, err => {
    if (err) {
      console.log('Feature pipeline error ', err);
    } else {
      saveFeatureBatch(features, (fErr, res) => {
        if (fErr) {
          console.log('FAILED SAVE FEATURE BATCH ', fErr);
        } else {
          console.log('Feature pipeline completed successfully');
        }
      })
    }
  })
}

const extractStyles = () => {
  const styleInUrl = path.resolve(__dirname, 'origin/styles.csv');
  const styleOutUrl = path.resolve(__dirname, 'origin/json/styles.json');
  const styleInputStream = fs.createReadStream(styleInUrl);
  const styleOutputStream = fs.createWriteStream(styleOutUrl);
  var styles = [];
  const transformStyle = new Transform({
    transform(chunk, encoding, callback) {
      try {
        let style = Object.assign({}, JSON.parse(chunk));
        if (style.default_style === '0') {
          style.default_style = false;
        } else {
          style.default_style = true;
        }

        style = {
          style_id: Number(style.id),
          product_id: Number(style.productId),
          name: style.name,
          sale_price: style.sale_price,
          original_price: style.original_price,
          'default?': style.default_style
        }

        console.log(`${style.id} added to Batch!`);
        styles.push(style);
        callback(null, JSON.stringify(style) + '\n');
      } catch (err) {
        callback(err);
      }
    }
  })

  pipeline(styleInputStream, csvParser, transformStyle, styleOutputStream, err => {
    if (err) {
      console.log('Style pipeline error ', err);
    } else {
      saveStyleBatch(styles, (sErr, res) => {
        if (sErr) {
          console.log('FAILED SAVE STYLE BATCH ', sErr);
        } else {
          console.log('Style pipeline completed successfully');
        }
      })

    }
  })
}

const extractPhotos = () => {
  const photoInUrl = path.resolve(__dirname, 'origin/photos.csv');
  const photoOutUrl = path.resolve(__dirname, 'origin/json/photos.json');
  const photoInputStream = fs.createReadStream(photoInUrl);
  const photoOutputStream = fs.createWriteStream(photoOutUrl);
  var photos = [];
  const transformPhoto = new Transform({
    transform(chunk, encoding, callback) {
      try {
        let photo = Object.assign({}, JSON.parse(chunk));
        photo = {
          id: Number(photo.id),
          style_id: Number(photo.styleId),
          thumbnail_url: photo.thumbnail_url,
          url: photo.url
        }

        console.log(`${photo.id} added to Batch!`);
        photos.push(photo);
        callback(null, JSON.stringify(photo) + '\n');
      } catch (err) {
        callback(err);
      }
    }
  })

  pipeline(photoInputStream, csvParser, transformPhoto, photoOutputStream, err => {
    if (err) {
      console.log('Photo pipeline error ', err);
    } else {
      savePhotoBatch(photos, (pErr, res) => {
        if (pErr) {
          console.log('FAILED SAVE PHOTO BATCH ', pErr);
        } else {
          console.log('Photo pipeline completed successfully');
        }
      })
    }
  })
}

const extractSKUs = () => {
  const skuInUrl = path.resolve(__dirname, `origin/split/skus/skus2.csv`);
  const skuOutUrl = path.resolve(__dirname, 'origin/json/skus.json');
  const skuInputStream = fs.createReadStream(skuInUrl);
  const skuOutputStream = fs.createWriteStream(skuOutUrl);
  var skus = [];
  const transformSKU = new Transform({
    transform(chunk, encoding, callback) {
      try {
        let sku = Object.assign({}, JSON.parse(chunk));
        sku = {
          id: Number(sku.id),
          style_id: Number(sku.styleId),
          size: sku.size,
          quantity: Number(sku.quantity)
        }

        console.log(`${sku.id} added to Batch!`);
        skus.push(sku);
        callback(null, JSON.stringify(sku) + '\n');
      } catch (err) {
        callback(err);
      }
    }
  })

  pipeline(skuInputStream, csvParser, transformSKU, skuOutputStream, err => {
    if (err) {
      console.log('SKU pipeline error ', err);
    } else {
      saveSKUBatch(skus, (sErr, res) => {
        if (sErr) {
          console.log('FAILED SAVE PRODUCT BATCH ', sErr);
        } else {
          console.log('SKU pipeline completed successfully');
        }
      })
    }
  })
}

const extractCart = () => {
  const cartInUrl = path.resolve(__dirname, 'origin/cart_original.csv');
  const cartOutUrl = path.resolve(__dirname, 'origin/json/cart.json');
  const cartInputStream = fs.createReadStream(cartInUrl);
  const cartOutputStream = fs.createWriteStream(cartOutUrl);
  var cartItems = [];
  const transformCart = new Transform({
    transform(chunk, encoding, callback) {
      try {
        let cart = Object.assign({}, JSON.parse(chunk));
        cart = {
          id: Number(cart.id),
          user_session: Number(cart.user_session),
          product_id: Number(cart.product_id),
          active: Number(cart.active)
        }

        console.log(`${cart.id} added to Batch!`);
        cartItems.push(cart);
        callback(null, JSON.stringify(cart) + '\n');
      } catch (err) {
        callback(err);
      }
    }
  })

  pipeline(cartInputStream, csvParser, transformCart, cartOutputStream, err => {
    if (err) {
      console.log('Cart pipeline error ', err);
    } else {
      saveCartBatch(cartItems, (cErr, res) => {
        if (cErr) {
          console.log('FAILED SAVE CART BATCH ', cErr);
        } else {
          console.log('Cart pipeline completed successfully');
        }
      })
    }
  })
}

// extractProduct();
// extractFeatures();
// extractStyles();
// extractPhotos();
extractSKUs();
// extractCart();

module.exports = {
  'extractProduct': extractProduct,
  'extractFeatures': extractFeatures,
  'extractStyles': extractStyles,
  'extractPhotos': extractPhotos,
  'extractSKUs': extractSKUs,
  'extractCart': extractCart
}
