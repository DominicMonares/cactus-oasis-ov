const productSchema = new mongoose.Schema({
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

const styleSchema = new mongoose.Schema({
  product_id: {type: String, required: true},
  style_id: {type: Number, required: true},
  name: {type: String, required: true},
  original_price: {type: String, required: true},
  sale_price: {type: String, default: null},
  'default?': {type: Boolean, default: false}
});

consts cartSchema = new mongoose.Schema({
  cartData: {type: Array}
});
