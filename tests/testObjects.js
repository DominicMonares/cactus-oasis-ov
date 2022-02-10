const testProduct = {
  id: 1,
  name: 'Test product',
  slogan: 'Test slogan',
  description: 'Test description',
  category: 'Test category',
  default_price: 'Test price'
};

const testFeature = {
  id: 1,
  product_id: 1,
  feature: 'Test feature',
  value: 'Test value'
};

const testStyle = {
  style_id: 1,
  product_id: 1,
  name: 'Test name',
  sale_price: 'Test sale price',
  original_price: 'Test original price',
  'default?': true
}

const testPhoto = {
  id: 1,
  style_id: 1,
  thumbnail_url: 'Test thumbnail',
  url: 'Test url'
};

const testSKU = {
  id: 1,
  style_id: 1,
  size: 'Test size',
  quantity: 1
};

const testReview = {
  review_id: 1,
  product_id: 1,
  rating: 5,
  summary: 'Test summary',
  recommend: true,
  response: 'Test response',
  body: 'Test body',
  date: 'Test date',
  reviewer_name: 'Test reviewer',
  email: 'Test email',
  helpfulness: 4,
  reported: false
};

const testReviewPhoto = {
  id: 1,
  review_id: 1,
  url: 'Test url'
};

const testCart = {
  id: 1,
  user_session: 3232,
  product_id: 1,
  active: 1
};

module.exports = {
  'testProduct': testProduct,
  'testFeature': testFeature,
  'testStyle': testStyle,
  'testPhoto': testPhoto,
  'testSKU': testSKU,
  'testReview': testReview,
  'testReviewPhoto': testReviewPhoto,
  'testCart': testCart
}
