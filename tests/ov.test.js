const mongoose = require('mongoose');
const supertest = require('supertest');
const _ = require('underscore');

const createServer = require('../server/server.js');
const {clientRoutes} = require('../server/clientRoutes.js');
const {Product, Feature, Style, Photo, SKU, Review, ReviewPhoto, Cart} = require('../db/index.js');

// SAMPLES MAY NOT BE NEEDED, REVISIT
const {testProduct, testFeature, testStyle, testPhoto, testSKU, testReview, testReviewPhoto, testCart} = require('./testObjects.js');

describe('Overview API', () => {

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
          expect(res.length).toEqual(1);
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
          expect(Object.keys(res).length).toEqual(7);
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
          let results = res.results;
          let photos = results[0]['photos'];
          let skus = results[0]['skus'];
          expect(typeof res === 'object').toBeTruthy();
          expect(Object.keys(res).length).toEqual(2);

          expect(Array.isArray(results)).toBeTruthy();
          expect(results.length).toEqual(1);
          expect(results[0]['style_id']).toBe(style.style_id);
          expect(results[0]['name']).toBe(style.name);
          expect(results[0]['sale_price']).toBe(style.sale_price);
          expect(results[0]['original_price']).toBe(style.original_price);
          expect(results[0]['default?']).toBe(style['default?']);

          expect(Array.isArray(photos)).toBeTruthy();
          expect(photos.length).toEqual(1);
          expect(photos[0]['thumbnail_url']).toBe(photo.thumbnail_url);
          expect(photos[0]['url']).toBe(photo.url);

          expect(typeof skus === 'object').toBeTruthy();
          expect(Object.keys(skus).length).toEqual(1);
          expect(Number(Object.keys(skus)[0])).toBe(sku['id'])
          expect(skus['1']['quantity']).toBe(sku['quantity']);
          expect(skus['1']['size']).toBe(sku['size']);
        })
    })
  })

  /* ========== REVIEWS ========== */

  xdescribe('Reviews', () => {
    test('sample test', () => {
      let testResult = styleData;
      console.log(testResult);
      expect(typeof testResult).toBe('object');
    })
  })

  /* ========== CART ========== */

  xdescribe('Cart', () => {
    // POST WILL NEED TO DELETE ITEM IT JUST ADDED AFTER TEST
    test('sample test', () => {
      let testResult = styleData;
      console.log(testResult);
      expect(typeof testResult).toBe('object');
    })
  })

})
