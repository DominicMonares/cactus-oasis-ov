const {Product, Feature, Style, Photo, SKU, Review, Cart} = require('./index.js');

let createProduct = async (product, callback) => {
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

  await newProduct.save()
    .then(res => {
      callback(res, null);
    })
    .catch(err => {
      callback(null, err);
    });
}

let fetchProduct = async (product_id, callback) => {
  await Product.find({id: product_id})
    .then(res => {
      callback(res);
    })
    .catch(err => {
      callback(err);
    });
}

/* ========== */

let createStyle = async (style, callback) => {
  // not used client side
}

let fetchStyle = async (style_id, callback) => {

}

/* ========== */

let createReview = async (review, callback) => {
  // not used client side
}

let fetchReview = async (review_id, callback) => {

}

/* ========== */

let addToCart = async (product, callback) => {

}

let clearCart = async (product, callback) => {

}

module.exports = {
  'createProduct': createProduct,
  'fetchProduct': fetchProduct,
  'createStyle': createStyle,
  'fetchStyle': fetchStyle,
  'createReview': createReview,
  'fetchReview': fetchReview,
  'addToCart': addToCart,
  'clearCart': clearCart
}
