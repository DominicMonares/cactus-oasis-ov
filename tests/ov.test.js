const _ = require('underscore');
const {productData, styleData, reviewData, cartData} = require('./samples.js');
const {clientRoutes} = require('../server/clientRoutes.js');

describe('Overview API', () => {

  // test('test test', () => {
  //   let testResult = _.map([1, 2, 3], val => {
  //     return val;
  //   })
  //   expect(testResult).toStrictEqual(testResult);
  // })

  // test('sample test', () => {
  //   let testResult = styleData;
  //   console.log(testResult);
  //   expect(typeof testResult).toBe('object');
  // })

  describe('Products', () => {
    test('sample test', () => {
      let testResult = styleData;
      console.log(testResult);
      expect(typeof testResult).toBe('object');
    })
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
    test('sample test', () => {
      let testResult = styleData;
      console.log(testResult);
      expect(typeof testResult).toBe('object');
    })
  })
})
