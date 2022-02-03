const {Product, Feature, Style, Photo, SKU, Review, Cart} = require('./index.js');

let deleteProduct = () => {
  Product.deleteOne({id: 2})
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
}

let createProduct = (product) => {
  // not used client side
  let newProduct = new Product({
    id: 2,
    campus: 'hr-rpp',
    name: 'Sweet Battle Axe',
    slogan: 'It do be shiny tho.',
    description: 'Don\'t do anything I wouldn\'t do with that battle axe now, ya hear?',
    category: 'Melee Combat Weapons',
    default_price: '600.00',
    updated_at: '2021-11-18T22:50:41.839Z',
    created_at: '2021-11-18T22:50:41.839Z',
    features: [
      {feature: 'Stat Boosts', value: '+5 Stamina, +5 Strength, +5 JS Skill'}
    ]
  });

  newProduct.save()
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
}

let fetchProduct = (product_id) => {
  Product.find({id: product_id})
    .then(res => {
      return res;
    })
    .catch(err => {
      throw err;
    });
}

/* ========== */

let createStyle = (style) => {
  // not used client side
}

let fetchStyle = (style_id) => {

}

/* ========== */

let createReview = (review) => {
  // not used client side
}

let fetchReview = (review_id) => {

}

/* ========== */

let addToCart = (product) => {

}

let clearCart = (product) => {

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
  'clearCart': clearCart
}
