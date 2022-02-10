const app = require('../server/index');
const mongoose = require('mongoose');
const supertest = require('supertest');
const _ = require('underscore');

const {clientRoutes} = require('../server/clientRoutes.js');
const {Product, Feature, Style, Photo, SKU, Review, ReviewPhoto, Cart} = require('../db/index.js');

// SAMPLES MAY NOT BE NEEDED, REVISIT
// const {productData, styleData, reviewData, cartData} = require('./samples.js');

describe('Overview API', () => {

  beforeEach(done => {
    mongoose.connect('mongodb://localhost:27017/SDCTest', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, () => done());
  });

  afterEach(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done());
    })
  });

  describe('Products', () => {
    // test('GET /products', async () => {
    //   const products = await
    // })
  })

  describe('Styles', () => {
    test('sample test', () => {
      let testResult = styleData;
      console.log(testResult);
      expect(typeof testResult).toBe('object');
    })
  })

  describe('Reviews', () => {
    test('sample test', () => {
      let testResult = styleData;
      console.log(testResult);
      expect(typeof testResult).toBe('object');
    })
  })

  describe('Cart', () => {
    // POST WILL NEED TO DELETE ITEM IT JUST ADDED AFTER TEST
    test('sample test', () => {
      let testResult = styleData;
      console.log(testResult);
      expect(typeof testResult).toBe('object');
    })
  })
})
