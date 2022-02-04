const {
  createProduct, fetchProduct, deleteProduct,
  createStyle, fetchStyle,
  createReview, fetchReview,
  addToCart, fetchCart, removeFromCart
} = require('../db/dbMethods.js');

let transformCart = (cart) => {
  console.log('CART DATA ', cart.slice(0, 20));
  cart.forEach(cartItem => {
    let newCartItem = {
      id: Number(cartItem.id),
      user_session: Number(cartItem.user_session),
      product_id: Number(cartItem.product_id),
      active: Number(cartItem.active)
    }

    addToCart(newCartItem);
  })
}

module.exports = {
  'transformCart': transformCart
}
