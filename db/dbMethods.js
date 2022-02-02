const {Product, Style, Review, ReviewPhoto, Cart} = require('./index.js');

let createProduct = async (product) => {
  // not used client side
  let newProduct = new Product({
    id: 1,
    campus: 'hr-rpp',
    name: '2001 Honda Civic',
    slogan: 'Yoda\'s whip.',
    description: 'Yoda has committed horrible crimes using this vehicle.',
    category: 'Sweet Automobiles',
    default_price: '1200.00',
    updated_at: '2021-10-18T22:50:41.839Z',
    created_at: '2021-10-18T22:50:41.839Z',
    features: [
      {feature: 'Interior', value: 'Rad as hell'}
    ]
  });

  await newProduct.save();
}

let fetchProduct = async (product_id) => {
  await Product.find({id: product_id})
    .then(res => {
      console.log('RES ', res);
    })
    .catch(err => {
      console.log('ERR ', err);
    })
}

/* ========== */

let createStlye = (style) => {
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

let createReviewPhoto = (review_photo) => {
  // not used client side
}

let fetchReviewPhoto = (review_photo) => {
  // not used client side
}

/* ========== */

let addToCart = (product) => {

}

let clearCart = (product) => {

}

// fetch product data
// fetch product style data
// fetch product review data
// fetch cart data
// add product to cart
