const {Product, Feature, Style, Photo, SKU, Review, Cart} = require('./index.js');

let deleteProduct = () => {
  Product.deleteOne({id: 2})
    .then(res => {
      callback(res);
    })
    .catch(err => {
      callback(err);
    });
}

let createProduct = (product, callback) => {
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
      callback(res, null);
    })
    .catch(err => {
      callback(null, err);
    });
}

let fetchProduct = (product_id, callback) => {
  Product.find({id: product_id})
    .then(res => {
      callback(res);
    })
    .catch(err => {
      callback(err);
    });
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

let addToCart = (product, callback) => {

}

let clearCart = (product, callback) => {

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
