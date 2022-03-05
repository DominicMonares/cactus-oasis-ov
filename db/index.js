const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/SDC', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

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
const Cart = mongoose.model('Cart', cartSchema);

module.exports = {
  'Product': Product,
  'Feature': Feature,
  'Style': Style,
  'Photo': Photo,
  'SKU': SKU,
  'Cart': Cart
};
