const {Product, Feature, Style, Photo, SKU, Review, Cart} = require('./index.js');

let clearModel = (callback) => {
  // clears all data from hardcoded model, only to be used for testing
  Product.deleteMany(callback);
}

/* ========== PRODUCTS ========== */

let fetchAllProducts = (page, count, callback) => {
  let start = (page - 1) * count;
  let end = (page * count) + 1;
  Product.find({id: {'$gt': start, '$lt': end}}, callback);
}

let fetchProduct = (product, callback) => {
  Product.find({id: product}, callback);
  Feature.find({product_id: product}, callback);
}

let createProduct = (product, callback) => {
  // NOT USED CLIENT SIDE
  let newProduct = new Product(product);
  console.log(`PRE-LOAD ${product.id}`)
  newProduct.save(callback);
}

/* ========== FEATURES ========== */

let createFeature = (feature, callback) => {
  let newFeature = new Feature(feature);
  console.log(`PRE-LOAD ${feature.id}`);
  newFeature.save(callback);
}

let fetchFeatures = (product, callback) => {
  Feature.find({product_id: product}, callback);
}

/* ========== STYLES ========== */

let createStyle = (style, callback) => {
  let newStyle = new Style(style);
  console.log(`PRE-LOAD ${style.style_id}`)
  newStyle.save(callback);
}

let fetchStyles = (product, callback) => {
  Style.find({product_id: product}, callback);
}

/* ========== PHOTOS ========== */

let createPhoto = (photo, callback) => {
  // NOT USED CLIENT SIDE
  let newPhoto = new Photo(photo);
  console.log(`PRE-LOAD ${photo.id}`);
  newPhoto.save(callback);
}

let fetchPhotos = (style, callback) => {
  Photo.find({style_id: style}, callback);
}

/* ========== SKUS ========== */

let createSKU = (sku, callback) => {
  // NOT USED CLIENT SIDE
  let newSKU = new SKU(sku);
  console.log(`PRE-LOAD ${sku.id}`)
  newSKU.save(callback);
}

let fetchSKUs = (style, callback) => {
  SKU.find({style_id: style}, callback);
}

/* ========== REVIEWS ========== */

let createReview = (review, callback) => {
  // NOT USED CLIENT SIDE IN OVERVIEW WIDGET
  let newReview = new Review(review);
  console.log(`PRE-LOAD ${review.review_id}`);
  newReview.save(callback);
}

let fetchReviews = (product, callback) => {
  Review.find({product_id: product}, callback);
}

/* ========== CART ========== */

let addToCart = (cartItem, callback) => {
  let newCart = new Cart(cartItem);
  newCart.save(callback);
}

let fetchCart = (session, callback) => {
  Cart.find({user_session: session}, callback);
}

let removeFromCart = (session, sku_id, callback) => {
  Cart.updateOne({
    user_session: session,
    product_id: sku_id,
    active: 1
  }, {
    active: 0
  }, callback);
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
  'fetchReview': fetchReviews,
  'addToCart': addToCart,
  'fetchCart': fetchCart,
  'removeFromCart': removeFromCart
}
