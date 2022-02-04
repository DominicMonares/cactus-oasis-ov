const {Product, Feature, Style, Photo, SKU, Review, Cart} = require('./index.js');

let deleteProduct = (callback) => {
  // clears all products, only to be used for testing
  Product.deleteMany(callback);
}

let createProduct = (product, callback) => {
  // not used client side
  let newProduct = new Product(product);
  newProduct.save(callback);
}

let fetchProduct = (product_id, callback) => {
  Product.find({id: product_id}, callback);
}

/* ========== */

let createStyle = (style, callback) => {
  // not used client side
}

let fetchStyle = (style_id, callback) => {

}

/* ========== */

let createReview = (review, callback) => {
  // not used client side
}

let fetchReview = (review_id, callback) => {

}

/* ========== */

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
  'createStyle': createStyle,
  'fetchStyle': fetchStyle,
  'createReview': createReview,
  'fetchReview': fetchReview,
  'addToCart': addToCart,
  'fetchCart': fetchCart,
  'removeFromCart': removeFromCart
}
