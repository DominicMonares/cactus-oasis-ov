const mongoose = require('mongoose');
const supertest = require('supertest');

const createServer = require('../server/server.js');
const {clientRoutes} = require('../server/clientRoutes.js');
const {Product, Feature, Style, Photo, SKU, Review, ReviewPhoto, Cart} = require('../db/index.js');

const {testProduct, testFeature, testStyle, testPhoto, testSKU, testReview, testReviewPhoto, testCart1, testCart2} = require('./testObjects.js');

beforeEach(done => {
  mongoose.connect('mongodb://localhost:27017/SDCTest', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, () => done())
});

afterEach(done => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  })
});

const app = createServer();

//////////////////////////////////
// PRIMARY ROUTES
//////////////////////////////////

describe('Primary Routes', () => {

  /* ========== PRODUCTS ========== */

  describe('Products', () => {
    test('GET /products', async () => {
      const product = await Product.create(testProduct);
      await supertest(app)
        .get('/products')
        .expect(200)
        .then(response => {
          let res = response.body;
          expect(Array.isArray(res)).toBeTruthy();
          expect(res.length).toBe(1);
          expect(res[0]['id']).toBe(product.id);
          expect(res[0]['name']).toBe(product.name);
          expect(res[0]['slogan']).toBe(product.slogan);
          expect(res[0]['description']).toBe(product.description);
          expect(res[0]['category']).toBe(product.category);
          expect(res[0]['default_price']).toBe(product.default_price);
        })
    })

    test('GET /products/:product_id', async () => {
      const product = await Product.create(testProduct);
      const feature = await Feature.create(testFeature);
      await supertest(app)
        .get('/products/1')
        .expect(200)
        .then(response => {
          let res = response.body;
          expect(typeof res === 'object').toBeTruthy();
          expect(Object.keys(res).length).toBe(7);
          expect(res.id).toBe(product.id);
          expect(res.name).toBe(product.name);
          expect(res.slogan).toBe(product.slogan);
          expect(res.description).toBe(product.description);
          expect(res.category).toBe(product.category);
          expect(res.default_price).toBe(product.default_price);
        })
    })
  })

  /* ========== STYLES ========== */

  describe('Styles', () => {
    test('GET /products/:product_id/styles', async () => {
      const product = await Product.create(testProduct);
      const feature = await Feature.create(testFeature);
      const style = await Style.create(testStyle);
      const photo = await Photo.create(testPhoto);
      const sku = await SKU.create(testSKU);
      await supertest(app)
        .get('/products/1/styles')
        .expect(200)
        .then(response => {
          let res = response.body;
          expect(typeof res === 'object').toBeTruthy();
          expect(Object.keys(res).length).toBe(2);

          let results = res.results;
          expect(Array.isArray(results)).toBeTruthy();
          expect(results.length).toBe(1);
          expect(results[0]['style_id']).toBe(style.style_id);
          expect(results[0]['name']).toBe(style.name);
          expect(results[0]['sale_price']).toBe(style.sale_price);
          expect(results[0]['original_price']).toBe(style.original_price);
          expect(results[0]['default?']).toBe(style['default?']);

          let photos = results[0]['photos'];
          expect(Array.isArray(photos)).toBeTruthy();
          expect(photos.length).toBe(1);
          expect(photos[0]['thumbnail_url']).toBe(photo.thumbnail_url);
          expect(photos[0]['url']).toBe(photo.url);

          let skus = results[0]['skus'];
          expect(typeof skus === 'object').toBeTruthy();
          expect(Object.keys(skus).length).toBe(1);
          expect(Number(Object.keys(skus)[0])).toBe(sku['id'])
          expect(skus['1']['quantity']).toBe(sku['quantity']);
          expect(skus['1']['size']).toBe(sku['size']);
        })
    })
  })

  /* ========== REVIEWS ========== */

  describe('Reviews', () => {
    test('GET /reviews/', async () => {
      const review = await Review.create(testReview);
      const reviewPhoto = await ReviewPhoto.create(testReviewPhoto);
      await supertest(app)
        .get('/reviews/?product_id=1&page=1&count=1')
        .expect(200)
        .then(response => {
          let res = response.body;
          expect(typeof res === 'object').toBeTruthy();
          expect(Object.keys(res).length).toBe(4);
          expect(Number(res.product)).toBe(review.product_id);
          expect(res.page).toBe(1);
          expect(res.count).toBe(1);

          expect(Array.isArray(res.results)).toBeTruthy();
          expect(res.results.length).toBe(1)

          let result = res.results[0];
          expect(typeof result === 'object');
          expect(Object.keys(result).length).toBe(10);
          expect(result.review_id).toBe(review.review_id);
          expect(result.rating).toBe(review.rating);
          expect(result.summary).toBe(review.summary);
          expect(result.recommend).toBe(review.recommend);
          expect(result.response).toBe(review.response);
          expect(result.body).toBe(review.body);
          expect(result.date).toBe(review.date);
          expect(result.reviewer_name).toBe(review.reviewer_name);
          expect(result.helpfulness).toBe(review.helpfulness);

          let photos = result.photos;
          expect(Array.isArray(photos)).toBeTruthy();
          expect(photos.length).toBe(1);

          let photo = photos[0];
          expect(typeof photo === 'object');
          expect(Object.keys(photo).length).toBe(2);
          expect(photo.id).toBe(reviewPhoto.id);
          expect(photo.url).toBe(reviewPhoto.url);
        })
    })
  })

  /* ========== CART ========== */

  describe('Cart', () => {
    test('GET /cart', async () => {
      const cart1 = await Cart.create(testCart1);
      const cart2 = await Cart.create(testCart2);
      await supertest(app)
        .get('/cart')
        .expect(200)
        .then(response => {
          let res = response.body;
          expect(Array.isArray(res)).toBeTruthy();
          expect(res.length).toBe(2);
          expect(res[0]['sku_id']).toBe(cart1.product_id);
          expect(res[0]['count']).toBe(1);
          expect(res[1]['sku_id']).toBe(cart2.product_id);
          expect(res[1]['count']).toBe(1);
        })
    })

    test('POST /cart', async () => {
      await supertest(app)
        .post('/cart?sku_id=1')
        .send(testCart1)
        .expect(200)
        .then(async response => {
          let res = response.body;
          expect(res.id).toBe(testCart1.id);
          expect(res.user_session).toBe(testCart1.user_session);
          expect(res.product_id).toBe(testCart1.product_id);
          expect(res.active).toBe(testCart1.active);

          const post = await Cart.findOne({user_session: 3232});
          expect(post).toBeTruthy();
          expect(post.id).toBe(testCart1.id);
          expect(post.user_session).toBe(testCart1.user_session);
          expect(post.product_id).toBe(testCart1.product_id);
          expect(post.active).toBe(testCart1.active);
        })
    })
  })

})

//////////////////////////////////
// ADDITIONAL ROUTES
//////////////////////////////////

describe('Additional Routes', () => {

  /* ========== FEATURES ========== */

  describe('Features', () => {
    test('GET /features/:product_id', async () => {
      const feature = await Feature.create(testFeature);
      await supertest(app)
        .get('/features/1')
        .expect(200)
        .then(response => {
          let res = response.body;
          expect(Array.isArray(res)).toBeTruthy();
          expect(res.length).toBe(1);
          expect(res[0]['feature']).toBe(feature.feature);
          expect(res[0]['value']).toBe(feature.value);
        })
    })
  })

  /* ========== PHOTOS ========== */

  describe('Photos', () => {
    test('GET /photos/:style_id', async () => {
      const photo = await Photo.create(testPhoto);
      await supertest(app)
        .get('/photos/1')
        .expect(200)
        .then(response => {
          let res = response.body;
          expect(Array.isArray(res)).toBeTruthy();
          expect(res.length).toBe(1);
          expect(res[0]['thumbnail_url']).toBe(photo.thumbnail_url);
          expect(res[0]['url']).toBe(photo.url);
        })
    })
  })

  /* ========== SKUS ========== */

  describe('SKUs', () => {
    test('GET /skus/:style_id', async () => {
      const sku = await SKU.create(testSKU);
      await supertest(app)
        .get('/skus/1')
        .expect(200)
        .then(response => {
          let res = response.body;
          expect(Array.isArray(res)).toBeTruthy();
          expect(res.length).toBe(1);
          expect(res[0]['id']).toBe(sku.id);
          expect(res[0]['size']).toBe(sku.size);
          expect(res[0]['quantity']).toBe(sku.quantity);
        })
    })
  })

})
