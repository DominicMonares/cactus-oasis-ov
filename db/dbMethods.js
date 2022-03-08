const mongoose = require('mongoose');
const {Product, Feature, Style, Photo, SKU, Cart} = require('./index.js');

/*

let clearModel = (callback) => {
  // clears all data from hardcoded model, only to be used for testing
  Cart.deleteMany(callback);
}

*/

/* ========== PRODUCTS ========== */

let fetchAllProducts = (page, count, callback) => {
  // NOT USED CLIENT SIDE
  let start = (page - 1) * count;
  let end = (page * count) + 1;
  Product.find({id: {'$gt': start, '$lt': end}}, callback)
    .select('id name slogan description category default_price')
    .lean();
}

let fetchProduct = (product, callback) => {
  Product.find({ id: product }, callback)
    .select('id name slogan description category default_price')
    .lean()
}

let createProduct = (product, callback) => {
  // NOT USED CLIENT SIDE
  let newProduct = new Product(product);
  newProduct.save(callback);
}

/* ========== FEATURES ========== */

let createFeature = (feature, callback) => {
  // NOT USED CLIENT SIDE
  let newFeature = new Feature(feature);
  newFeature.save(callback);
}

let fetchFeatures = (product, callback) => {
  Feature.find({product_id: product}, callback)
    .select('feature value')
    .lean();
}

/* ========== STYLES ========== */

let createStyle = (style, callback) => {
  // NOT USED CLIENT SIDE
  let newStyle = new Style(style);
  newStyle.save(callback);
}

let fetchStyles = (product, callback) => {
  Style.find({product_id: product}, callback)
    .select('style_id name original_price sale_price default?')
    .lean();
}

/* ========== PHOTOS ========== */

let createPhoto = (photo, callback) => {
  // NOT USED CLIENT SIDE
  let newPhoto = new Photo(photo);
  newPhoto.save(callback);
}

let fetchPhotos = (style, callback) => {
  Photo.find({style_id: style}, callback)
    .select('thumbnail_url url')
    .lean();
}

/* ========== SKUS ========== */

let createSKU = (sku, callback) => {
  // NOT USED CLIENT SIDE
  let newSKU = new SKU(sku);
  newSKU.save(callback);
}

let fetchSKUs = (style, callback) => {
  SKU.find({style_id: style}, callback)
    .select('id quantity size')
    .lean();
}

/* ========== CART ========== */

let addToCart = (cartItem, callback) => {
  // let newCart = new Cart(cartItem);
  // newCart.save(callback);

  // PUT operation to be used for POST testing
  // without overpopulating the db
  Cart.findByIdAndUpdate('6225860dea6f25cd07c6bc4f', cartItem, callback);
}

let fetchCart = (session, callback) => {
  Cart.find({user_session: session}, callback)
    .select('product_id active')
    .lean();
}

/* ========== ETL ========== */

let saveProductBatch = (products) => {
  Product.insertMany(products)
    .then(() => {
      console.log('Successfully loaded product batch!');
    })
    .catch(err => { console.log('PRODUCT ERROR ', err) });
}

let saveFeatureBatch = (features) => {
  Feature.insertMany(feature)
    .then(() => {
      console.log('Successfully loaded feature batch!');
    })
    .catch(err => { console.log('FEATURE ERROR ', err) });
}

let saveStyleBatch = (styles) => {
  Style.insertMany(style)
    .then(() => {
      console.log('Successfully loaded style batch!');
    })
    .catch(err => { console.log('STYLE ERROR ', err) });
}

let savePhotoBatch = (photos) => {
  Photo.insertMany(photos)
    .then(() => {
      console.log('Successfully loaded photo batch!');
    })
    .catch(err => { console.log('PHOTO ERROR ', err) });
}

let saveSKUBatch = (skus) => {
  SKU.insertMany(skus)
    .then(() => {
      console.log('Successfully loaded SKU batch!');
    })
    .catch(err => { console.log('SKU ERROR ', err) });
}

let saveCartBatch = (cart, callback) => {
  Cart.insertMany(cart, callback)
    .then(() => {
      console.log('Successfully loaded cart batch!');
    })
    .catch(err => { console.log('CART ERROR ', err) });
}

module.exports = {
  // 'clearModel': clearModel,
  'fetchAllProducts': fetchAllProducts,
  'fetchProduct': fetchProduct,
  'createProduct': createProduct,
  'createFeature': createFeature,
  'fetchFeatures': fetchFeatures,
  'createStyle': createStyle,
  'fetchStyles': fetchStyles,
  'createPhoto': createPhoto,
  'fetchPhotos': fetchPhotos,
  'createSKU': createSKU,
  'fetchSKUs': fetchSKUs,
  'addToCart': addToCart,
  'fetchCart': fetchCart,
  'saveProductBatch': saveProductBatch,
  'saveFeatureBatch': saveFeatureBatch,
  'saveStyleBatch': saveStyleBatch,
  'savePhotoBatch': savePhotoBatch,
  'saveSKUBatch': saveSKUBatch,
  'saveCartBatch': saveCartBatch
}
