const fs = require('fs');
const path = require('path');
const {pipeline} = require('stream');
const {parse} = require('csv-parse');
const {saveProductBatch, saveFeatureBatch, saveStyleBatch, savePhotoBatch, saveSKUBatch, createSKU, saveCartBatch} = require('../db/dbMethods.js');

const batchSize = 1000;

const extractProduct = () => {
  const productUrl = path.resolve(__dirname, `origin/split/products/products1.csv`);
  let products = [];
  const productStream = fs.createReadStream(productUrl)
    .setEncoding('utf-8')
    .pipe(parse())
    .on('data', async row => {
      if (row[0] !== 'id') {
        let product = {
          id: Number(row.id),
          name: row.name,
          slogan: row.slogan,
          description: row.description,
          category: row.category,
          default_price: row.default_price
        };

        products.push(product);
        console.log(`Product ${product.id} pre-loaded!`);
        if (products.length === batchSize) {
          await saveProductBatch(products);
          products = [];
        }
      }
    })
    .on('end', () => {
      saveProductBatch(products);
    })
}

const extractFeatures = () => {
  const featureUrl = path.resolve(__dirname, `origin/split/features/features1.csv`);
  let features = [];
  const featureStream = fs.createReadStream(featureUrl)
    .setEncoding('utf-8')
    .pipe(parse())
    .on('data', row => {
      if (row[0] !== 'id') {
        let feature = {
          id: Number(row.id),
          product_id: Number(row.product_id),
          feature: row.feature,
          value: row.value
        }

        features.push(feature);
        console.log(`Feature ${feature.id} pre-loaded!`);
        if (features.length === batchSize) {
          saveFeatureBatch(features);
          features = [];
        }
      }
    })
    .on('end', () => {
      saveFeatureBatch(features);
    })
}

const extractStyles = () => {
  const styleUrl = path.resolve(__dirname, `origin/split/styles/styles1.csv`);
  let styles = [];
  const styleStream = fs.createReadStream(styleUrl)
    .setEncoding('utf-8')
    .pipe(parse())
    .on('data', row => {
      if (row[0] !== 'id') {
        let style = {
          style_id: Number(row.id),
          product_id: Number(row.productId),
          name: row.name,
          sale_price: row.sale_price,
          original_price: row.original_price,
          'default?': row.default_style
        }

        styles.push(style);
        console.log(`Style ${style.id} pre-loaded!`);
        if (styles.length === batchSize) {
          saveStyleBatch(styles);
          styles = [];
        }
      }
    })
    .on('end', () => {
      saveStyleBatch(styles);
    })
}

const extractPhotos = () => {
  const photoUrl = path.resolve(__dirname, `origin/split/photos/photos1.csv`);
  let photos = [];
  const photoStream = fs.createReadStream(photoUrl)
    .setEncoding('utf-8')
    .pipe(parse())
    .on('data', row => {
      if (row[0] !== 'id') {
        let photo = {
          id: Number(row.id),
          style_id: Number(row.styleId),
          thumbnail_url: row.thumbnail_url,
          url: row.url
        }

        photos.push(photo);
        console.log(`Photo ${photo.id} pre-loaded!`);
        if (photos.length === batchSize) {
          savePhotoBatch(photos);
          photos = [];
        }
      }
    })
    .on('end', () => {
      savePhotoBatch(photos);
    })
}

const extractSKUs = () => {
  const skuUrl = path.resolve(__dirname, `origin/split/skus/skus1.csv`);
  let skus = [];
  const skuStream = fs.createReadStream(skuUrl)
    .setEncoding('utf-8')
    .pipe(parse())
    .on('data', row => {
      if (row[0] !== 'id') {
        let sku = {
          id: Number(row[0]),
          style_id: Number(row[1]),
          size: row[2],
          quantity: Number(row[3])
        }

        skus.push(sku);
        console.log(`SKU ${sku.id} pre-loaded!`);
        if (skus.length === batchSize) {
          saveSKUBatch(skus);
          skus = [];
        }
      }
    })
    .on('end', () => {
      saveSKUBatch(skus);
    })
}

const extractCart = () => {
  const cartUrl = path.resolve(__dirname, 'origin/cart_original.csv');
  var cartItems = [];
  const cartStream = fs.createReadStream(cartUrl)
    .setEncoding('utf-8')
    .pipe(parse())
    .on('data', row => {
      if (row[0] !== 'id') {
        let cart = {
          id: Number(row.id),
          user_session: Number(row.user_session),
          product_id: Number(row.product_id),
          active: Number(row.active)
        }

        cartItems.push(cart);
        console.log(`Cart item ${cart.id} pre-loaded!`);
        if (cartItems.length === batchSize) {
          saveCartBatch(cartItems);
          cartItems = [];
        }
      }
    })
    .on('end', () => {
      saveCartBatch(cartItems)
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
