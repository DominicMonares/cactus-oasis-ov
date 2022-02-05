const {Product, Feature, Style, Photo, SKU, Review, Cart} = require('./index.js');

/* ========== PRODUCTS ========== */

let createProduct = (product, callback) => {
  // not used client side
  let newProduct = new Product(product);
  console.log(`PRE-LOAD ${product.id}`)
  newProduct.save(callback);
}

let fetchProduct = (product_id, callback) => {
  Product.find({id: product_id}, callback);
}

let deleteProduct = (callback) => {
  // clears all products, only to be used for testing
  Photo.deleteMany(callback);
}

/* ========== FEATURES ========== */

let createFeature = (feature, callback) => {
  let newFeature = new Feature(feature);
  console.log(`PRE-LOAD ${feature.id}`);
  newFeature.save(callback);
}

let fetchFeatures = (product, callback) => {
  Feature.find({product_id: product, callback})
}

/* ========== STYLES ========== */

let createStyle = (style, callback) => {
  let newStyle = new Style(style);
  newStyle.save(callback);
}

let fetchStyle = (product, callback) => {
  Style.find({product_id: product}, callback);
}

/* ========== PHOTOS ========== */

let createPhoto = (photo, callback) => {
  // not used client side
  let newPhoto = new Photo(photo);
  console.log(`PRE-LOAD ${photo.id}`);
  newPhoto.save(callback);
}

let fetchPhotos = (style, callback) => {
  Photo.find({style_id: style}, callback);
}

/* ========== SKUS ========== */

let createSKU = (sku, callback) => {
  // not used client side
  let newSKU = new SKU(sku);
  newSKU.save(callback);
}

let fetchSKUs = (style, callback) => {
  SKU.find({style_id: style}, callback);
}

/* ========== REVIEWS ========== */

let createReview = (review, callback) => {
  // not used client side
  let newReview = new Review(review);
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
  'createProduct': createProduct,
  'fetchProduct': fetchProduct,
  'deleteProduct': deleteProduct,
  'createFeature': createFeature,
  'fetchFeatures': fetchFeatures,
  'createStyle': createStyle,
  'fetchStyle': fetchStyle,
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
