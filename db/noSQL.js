const mongoose = require('mongoose');
// mongoose.connect('')

let productSchema = new mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  campus: {type: String, default: 'hr-rpp'},
  name: {type: String, required: true},
  slogan: {type: String, required: true},
  description: {type: String, required: true},
  category: {type: String, required: true},
  default_price: {type: String, required: true},
  created_at: {type: String, required: true},
  updated_at: {type: String, required: true},
  features: {type: Array, required: true}
});

let styleSchema = new mongoose.Schema({
  product_id: {type: String, required: true},
  style_id: {type: Number, required: true},
  name: {type: String, required: true},
  original_price: {type: String, required: true},
  sale_price: {type: String, default: null},
  'default?': {type: Boolean, default: false}
});

let reviewSchema = new mongoose.Schema({
  product_id: {type: String, required: true},
  review_id: {type: Number, required: true},
  rating: {type: Number, required: true},
  summary: {type: String, required: true},
  recommend: {type: Boolean, default: true},
  response: {type: String, default: null},
  body: {type: String, required: true},
  date: {type: String, required: true},
  reviewer_name: {type: String, required: true},
  email: {type: String, required: true},
  helpfulness: {type: Number, required: true}
});

let reviewPhotoSchema = new mongoose.Schema({
  review_id: {type: Number, required: true},
  id: {type: Number, required: true},
  url: {type: String, required: true}
})

let cartSchema = new mongoose.Schema({
  cartData: {type: Array}
});
