const {
  createProduct, fetchProduct, deleteProduct,
  createFeature, fetchFeatures,
  createStyle, fetchStyle,
  createPhoto, fetchPhotos,
  createSKU, fetchSKUs,
  createReview, fetchReview,
  addToCart, fetchCart, removeFromCart
} = require('../db/dbMethods.js');

let transformProduct = (originalProduct) => {
  // console.log('PRODUCT DATA ', originalProduct.slice(0, 20));
  originalProduct.forEach(product => {
    let newProduct = {
      id: Number(product.id),
      name: product.name,
      slogan: product.slogan,
      description: product.description,
      category: product.category,
      default_price: product.default_price
    }

    createProduct(newProduct, (err, data) => {
      if (err) {
        throw err;
      } else {
        console.log(`Product ${newProduct.id} has been successfully saved!`);
      }
    });
  })
}

let transformFeature = (originalFeature) => {
  originalFeature.forEach(feature => {
    let newFeature = {

    }
  })
}

let transformCart = (cart) => {
  console.log('CART DATA ', cart.slice(0, 20));
  cart.forEach(cartItem => {
    let newCartItem = {
      id: Number(cartItem.id),
      user_session: Number(cartItem.user_session),
      product_id: Number(cartItem.product_id),
      active: Number(cartItem.active)
    }

    addToCart(newCartItem, (err, data) => {
      if (err) {
        throw err;
      } else {
        console.log(`Item ${newCartItem.id} has been successfully saved!`);
      }
    });
  })
}

module.exports = {
  'transformCart': transformCart,
  'transformProduct': transformProduct
}
