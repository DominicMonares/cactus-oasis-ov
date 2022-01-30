const reviewSchema = new mongoose.Schema({
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

const reviewPhotoSchema = new mongoose.Schema({
  review_id: {type: Number, required: true},
  id: {type: Number, required: true},
  url: {type: String, required: true}
})
