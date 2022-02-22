const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  name: {type: String, required: true},
  slogan: {type: String, required: true},
  description: {type: String, required: true},
  category: {type: String, required: true},
  default_price: {type: String, required: true}
});

const featureSchema = new mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  product_id: {type: Number, required: true},
  feature: {type: String, required: true},
  value: {type: String, required: true}
});

const styleSchema = new mongoose.Schema({
  style_id: {type: Number, required: true, unique: true},
  product_id: {type: Number, required: true},
  name: {type: String, required: true},
  sale_price: {type: String, default: null},
  original_price: {type: String, required: true},
  'default?': {type: Boolean, default: false}
});

const photoSchema = new mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  style_id: {type: Number, required: true},
  thumbnail_url: {type: String, required: true},
  url: {type: String, required: true}
});

const skuSchema = new mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  style_id: {type: Number, required: true},
  size: {type: String, required: true},
  quantity: {type: Number, required: true}
});

const reviewSchema = new mongoose.Schema({
  review_id: {type: Number, required: true, unique: true},
  product_id: {type: Number, required: true},
  rating: {type: Number, required: true},
  summary: {type: String, required: true},
  recommend: {type: Boolean, default: true},
  response: {type: String, default: null},
  body: {type: String, required: true},
  date: {type: String, required: true},
  reviewer_name: {type: String, required: true},
  email: {type: String, required: true},
  helpfulness: {type: Number, required: true},
  reported: {type: Boolean, default: false}
});

const reviewPhotoSchema = new mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  review_id: {type: Number, required: true},
  url: {type: String, required: true}
});

const cartSchema = new mongoose.Schema({
  id: {type: Number, required: true},
  user_session: {type: Number, required: true},
  product_id: {type: Number, required: true},
  active: {type: Number, default: 1}
});

const Product = mongoose.model('Product', productSchema);
const Feature = mongoose.model('Feature', featureSchema);
const Style = mongoose.model('Style', styleSchema);
const Photo = mongoose.model('Photo', photoSchema);
const SKU = mongoose.model('SKU', skuSchema);
const Review = mongoose.model('Review', reviewSchema);
const ReviewPhoto = mongoose.model('ReviewPhoto', reviewPhotoSchema);
const Cart = mongoose.model('Cart', cartSchema);

module.exports = {
  'Product': Product,
  'Feature': Feature,
  'Style': Style,
  'Photo': Photo,
  'SKU': SKU,
  'Review': Review,
  'ReviewPhoto': ReviewPhoto,
  'Cart': Cart
};
