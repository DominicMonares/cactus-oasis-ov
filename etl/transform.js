const {
  createProduct, fetchProduct, deleteProduct,
  createStyle, fetchStyle,
  createReview, fetchReview,
  addToCart, clearCart
} = require('../db/dbMethods.js');

// send each obj to db as they're transformed

let transformCart = (cart) => {

}

module.exports = {
  'transformCart': transformCart
}
