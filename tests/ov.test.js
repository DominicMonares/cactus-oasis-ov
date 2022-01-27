const _ = require('underscore');
const {productListData, productData, styleData, relatedProductsData, cartData} = require('./samples.js');

describe('Overview API', () => {

  test('test test', () => {
    let testResult = _.map([1, 2, 3], val => {
      return val;
    })
    expect(testResult).toStrictEqual(testResult);
  })

  test('sample test', () => {
    let testResult = styleData;
    console.log(testResult);
    expect(typeof testResult).toBe('object');
  })

})
