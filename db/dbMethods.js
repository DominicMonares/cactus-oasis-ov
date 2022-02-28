const mongoose = require('mongoose');
const {Product, Feature, Style, Photo, SKU, Review, ReviewPhoto, Cart} = require('./index.js');

// /*

let clearModel = (callback) => {
  // clears all data from hardcoded model, only to be used for testing
  Product.deleteMany(callback);
}

// */

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
  // console.log(`PRE-LOAD ${JSON.stringify(product)}`)
  newProduct.save(callback);
}

/* ========== FEATURES ========== */

let createFeature = (feature, callback) => {
  // NOT USED CLIENT SIDE
  let newFeature = new Feature(feature);
  console.log(`PRE-LOAD ${feature.id}`);
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
  console.log(`PRE-LOAD ${style.style_id}`)
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
  console.log(`PRE-LOAD ${photo.id}`);
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
  console.log(`PRE-LOAD ${sku.id}`)
  newSKU.save(callback);
}

let fetchSKUs = (style, callback) => {
  SKU.find({style_id: style}, callback)
    .select('id quantity size')
    .lean();
}

/* ========== REVIEWS ========== */

let createReview = (review, callback) => {
  // NOT NEEDED, USE EXAMPLE DATA
  let newReview = new Review(review);
  console.log(`PRE-LOAD ${review.review_id}`);
  newReview.save(callback);
}

let fetchReviews = (page, count, product, callback) => {
  // NOT NEEDED, USE EXAMPLE DATA
  let sortParams = 'review_id rating summary recommend response body date reviewer_name helpfulness';
  let start = (page - 1) * count;
  let end = (page * count) + 1;

  if (!product) {
    Review.find({ review_id: { '$gt': start, '$lt': end } }, callback)
      .select(sortParams)
      .lean();
  } else {
    Review.find({ product_id: product }, callback)
      .select(sortParams)
      .skip(start)
      .limit(count)
      .lean();
  }
}

/* ========== REVIEW PHOTOS ========== */

let createReviewPhoto = (reviewPhoto, callback) => {
  // NOT NEEDED, USE EXAMPLE DATA
  let newReviewPhoto = new ReviewPhoto(reviewPhoto);
  console.log(`PRE-LOAD ${reviewPhoto.id}`);
  newReviewPhoto.save(callback);
}

let fetchReviewPhotos = (review, callback) => {
  // NOT NEEDED, USE EXAMPLE DATA
  ReviewPhoto.find({review_id: review}, callback)
    .select('id url')
    .lean();
}

/* ========== CART ========== */

let addToCart = (cartItem, callback) => {
  let newCart = new Cart(cartItem);
  newCart.save(callback);
}

let fetchCart = (session, callback) => {
  Cart.find({user_session: session}, callback)
    .select('product_id active')
    .lean();
}

let countCart = (callback) => {
  Cart.count(callback)
    .lean();
}

module.exports = {
  'clearModel': clearModel,
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
  'createReview': createReview,
  'fetchReviews': fetchReviews,
  'createReviewPhoto': createReviewPhoto,
  'fetchReviewPhotos': fetchReviewPhotos,
  'addToCart': addToCart,
  'fetchCart': fetchCart,
  'countCart': countCart
}
