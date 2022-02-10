const mongoose = require('mongoose');
const supertest = require('supertest');
const _ = require('underscore');

const createServer = require('../server/server.js');
const {clientRoutes} = require('../server/clientRoutes.js');
const {Product, Feature, Style, Photo, SKU, Review, ReviewPhoto, Cart} = require('../db/index.js');

// SAMPLES MAY NOT BE NEEDED, REVISIT
const {testProduct, testFeature} = require('./testObjects.js');

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

  describe.only('Products', () => {


    test('GET /products', async () => {
      const product = await Product.create(testProduct);
      await supertest(app)
        .get('/products')
        .expect(200)
        .then(response => {
          expect(Array.isArray(response.body)).toBeTruthy();
          expect(response.body.length).toEqual(1);
          expect(response.body[0]['id']).toBe(product.id);
          expect(response.body[0]['name']).toBe(product.name);
          expect(response.body[0]['slogan']).toBe(product.slogan);
          expect(response.body[0]['description']).toBe(product.description);
          expect(response.body[0]['category']).toBe(product.category);
          expect(response.body[0]['default_price']).toBe(product.default_price);
        })
    })

    test('GET /products/:product_id', async () => {
      const product = await Product.create(testProduct);
      await supertest(app)
        .get('/products/1')
        .expect(200)
        .then(response => {
          expect(Array.isArray(response.body)).toBeTruthy();
          expect(response.body.length).toEqual(1);
          expect(response.body[0]['id']).toBe(product.id);
          expect(response.body[0]['name']).toBe(product.name);
          expect(response.body[0]['slogan']).toBe(product.slogan);
          expect(response.body[0]['description']).toBe(product.description);
          expect(response.body[0]['category']).toBe(product.category);
          expect(response.body[0]['default_price']).toBe(product.default_price);
        })
    })
  })

  /* ========== STYLES ========== */

  describe('Styles', () => {
    test('sample test', () => {
      let testResult = styleData;
      console.log(testResult);
      expect(typeof testResult).toBe('object');
    })
  })

  /* ========== REVIEWS ========== */

  describe('Reviews', () => {
    test('sample test', () => {
      let testResult = styleData;
      console.log(testResult);
      expect(typeof testResult).toBe('object');
    })
  })

  /* ========== CART ========== */

  describe('Cart', () => {
    // POST WILL NEED TO DELETE ITEM IT JUST ADDED AFTER TEST
    test('sample test', () => {
      let testResult = styleData;
      console.log(testResult);
      expect(typeof testResult).toBe('object');
    })
  })

})
