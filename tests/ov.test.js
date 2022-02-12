const mongoose = require('mongoose');
const supertest = require('supertest');
const setupDB = require('./test-setup.js');
const createServer = require('../server/server.js');

const {Product, Feature, Style, Photo, SKU, Review, ReviewPhoto, Cart} = require('../db/index.js');

const {createProduct, createFeature, createStyle, createPhoto, createSKU, createReview, createReviewPhoto} = require('../db/dbMethods.js');

const {extractProduct, extractFeatures, extractStyles, extractPhotos, extractSKUs, extractReviews, extractReviewPhotos, extractCart} = require('../etl/extract.js');

const {testProduct, testFeature, testStyle, testPhoto, testSKU, testReview, testReviewPhoto, testCart1, testCart2} = require('./testObjects.js');

setupDB('overview-test');

const app = createServer();

describe('Overview', () => {

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

      test('should return 500 when an error occurs', async () => {
        const product = await Product.create(testProduct);


        await supertest(app)
          .get('/products')
          .expect(500)
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

            const post = await Cart.findOne({ user_session: 3232 });
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

    // test('GET /skus/:style_id Error Handling', () => {
    // test error handling here, look into sinon/stub
    // })

  })

  //////////////////////////////////
  // DATABASE METHODS
  //////////////////////////////////

  describe('Database Methods', () => {

    test('should create product', done => {
      createProduct(testProduct, async (err, data) => {
        if (err) {
          done(err);
        } else {
          const newProduct = await Product.findOne({id: 1});
          expect(newProduct).toBeTruthy();
          expect(newProduct.id).toBe(testProduct.id);
          expect(newProduct.name).toBe(testProduct.name);
          expect(newProduct.slogan).toBe(testProduct.slogan);
          expect(newProduct.description).toBe(testProduct.description);
          expect(newProduct.category).toBe(testProduct.category);
          expect(newProduct.default_price).toBe(testProduct.default_price);
          done();
        }
      });
    })

    test('should create feature', done => {
      createFeature(testFeature, async (err, data) => {
        if (err) {
          done(err);
        } else {
          const newFeature = await Feature.findOne({id: 1});
          expect(newFeature).toBeTruthy();
          expect(newFeature.id).toBe(testFeature.id);
          expect(newFeature.product_id).toBe(testFeature.product_id);
          expect(newFeature.feature).toBe(testFeature.feature);
          expect(newFeature.value).toBe(testFeature.value);
          done();
        }
      });
    })

    test('should create a style', done => {
      createStyle(testStyle, async (err, data) => {
        if (err) {
          done();
        } else {
          const newStyle = await Style.findOne({style_id: 1});
          expect(newStyle).toBeTruthy();
          expect(newStyle.style_id).toBe(testStyle.style_id);
          expect(newStyle.product_id).toBe(testStyle.product_id);
          expect(newStyle.name).toBe(testStyle.name);
          expect(newStyle.sale_price).toBe(testStyle.sale_price);
          expect(newStyle.original_price).toBe(testStyle.original_price);
          expect(newStyle['default?']).toBe(testStyle['default?']);
          done();
        }
      })
    })

    test('should create a photo', done => {
      createPhoto(testPhoto, async (err, data) => {
        if (err) {
          done(err);
        } else {
          const newPhoto = await Photo.findOne({id: 1});
          expect(newPhoto).toBeTruthy();
          expect(newPhoto.id).toBe(testPhoto.id);
          expect(newPhoto.style_id).toBe(testPhoto.style_id);
          expect(newPhoto.thumbnail_url).toBe(testPhoto.thumbnail_url);
          expect(newPhoto.url).toBe(testPhoto.url);
          done();
        }
      })
    })

    test('should create an sku', done => {
      createSKU(testSKU, async (err, data) => {
        if (err) {
          done(err);
        } else {
          const newSKU = await SKU.findOne({id: 1});
          expect(newSKU).toBeTruthy();
          expect(newSKU.id).toBe(testSKU.id);
          expect(newSKU.style_id).toBe(testSKU.style_id);
          expect(newSKU.size).toBe(testSKU.size);
          expect(newSKU.quantity).toBe(testSKU.quantity);
          done();
        }
      })
    })

    test('should create a review', done => {
      createReview(testReview, async (err, data) => {
        if (err) {
          done(err);
        } else {
          const newReview = await Review.findOne({review_id: 1});
          expect(newReview).toBeTruthy();
          expect(newReview.review_id).toBe(testReview.review_id);
          expect(newReview.product_id).toBe(testReview.product_id);
          expect(newReview.rating).toBe(testReview.rating);
          expect(newReview.summary).toBe(testReview.summary);
          expect(newReview.recommend).toBe(testReview.recommend);
          expect(newReview.response).toBe(testReview.response);
          expect(newReview.body).toBe(testReview.body);
          expect(newReview.date).toBe(testReview.date);
          expect(newReview.reviewer_name).toBe(testReview.reviewer_name);
          expect(newReview.email).toBe(testReview.email);
          expect(newReview.helpfulness).toBe(testReview.helpfulness);
          expect(newReview.reported).toBe(testReview.reported);
          done();
        }
      })
    })

    test('should create a review photo', done => {
      createReviewPhoto(testReviewPhoto, async (err, data) => {
        if (err) {
          done(err);
        } else {
          const newReviewPhoto = await ReviewPhoto.findOne({id: 1});
          expect(newReviewPhoto).toBeTruthy();
          expect(newReviewPhoto.id).toBe(testReviewPhoto.id);
          expect(newReviewPhoto.review_id).toBe(testReviewPhoto.review_id);
          expect(newReviewPhoto.url).toBe(testReviewPhoto.url);
          done();
        }
      })
    })

  })

  //////////////////////////////////
  // ETL
  //////////////////////////////////

  describe('ETL', () => {

    test('should ETL product data', async () => {
      await extractProduct();
      const etlProduct = await Product.findOne({id: 1});
      expect(etlProduct).toBeTruthy();
      expect(etlProduct.id).toBe(testProduct.id);
      expect(etlProduct.name).toBe(testProduct.name);
      expect(etlProduct.slogan).toBe(testProduct.slogan);
      expect(etlProduct.description).toBe(testProduct.description);
      expect(etlProduct.category).toBe(testProduct.category);
      expect(etlProduct.default_price).toBe(testProduct.default_price);
    })

    test('should ETL feature data', async () => {
      await extractFeatures();
      const etlFeature = await Feature.findOne({id: 1});
      expect(etlFeature).toBeTruthy();
      expect(etlFeature.id).toBe(testFeature.id);
      expect(etlFeature.product_id).toBe(testFeature.product_id);
      expect(etlFeature.feature).toBe(testFeature.feature);
      expect(etlFeature.value).toBe(testFeature.value);
    })

    test('should ETL style data', async () => {
      await extractStyles();
      const etlStyle = await Style.findOne({style_id: 1});
      expect(etlStyle).toBeTruthy();
      expect(etlStyle.style_id).toBe(testStyle.style_id);
      expect(etlStyle.product_id).toBe(testStyle.product_id);
      expect(etlStyle.name).toBe(testStyle.name);
      expect(etlStyle.sale_price).toBe(testStyle.sale_price);
      expect(etlStyle.original_price).toBe(testStyle.original_price);
      expect(etlStyle['default?']).toBe(testStyle['default?']);
    })

    test('should ETL photo data', async () => {
      await extractPhotos();
      const etlPhoto = await Photo.findOne({id: 1});
      expect(etlPhoto).toBeTruthy();
      expect(etlPhoto.id).toBe(testPhoto.id);
      expect(etlPhoto.style_id).toBe(testPhoto.style_id);
      expect(etlPhoto.thumbnail_url).toBe(testPhoto.thumbnail_url);
      expect(etlPhoto.url).toBe(testPhoto.url);
    })

    test('should ETL sku data', async () => {
      await extractSKUs();
      const etlSKU = await SKU.findOne({id: 1});
      expect(etlSKU).toBeTruthy();
      expect(etlSKU.id).toBe(testSKU.id);
      expect(etlSKU.style_id).toBe(testSKU.style_id);
      expect(etlSKU.size).toBe(testSKU.size);
      expect(etlSKU.quantity).toBe(testSKU.quantity);
    })

    test('should ETL review data', async () => {
      await extractReviews();
      const etlReview = await Review.findOne({review_id: 1});
      expect(etlReview).toBeTruthy();
      expect(etlReview.review_id).toBe(testReview.review_id);
      expect(etlReview.product_id).toBe(testReview.product_id);
      expect(etlReview.rating).toBe(testReview.rating);
      expect(etlReview.summary).toBe(testReview.summary);
      expect(etlReview.recommend).toBe(testReview.recommend);
      expect(etlReview.response).toBe(testReview.response);
      expect(etlReview.body).toBe(testReview.body);
      expect(etlReview.date).toBe(testReview.date);
      expect(etlReview.reviewer_name).toBe(testReview.reviewer_name);
      expect(etlReview.email).toBe(testReview.email);
      expect(etlReview.helpfulness).toBe(testReview.helpfulness);
      expect(etlReview.reported).toBe(testReview.reported);
    })

    test('should ETL review photo data', async () => {
      await extractReviewPhotos();
      const etlReviewPhoto = await ReviewPhoto.findOne({id: 1});
      expect(etlReviewPhoto).toBeTruthy();
      expect(etlReviewPhoto.id).toBe(testReviewPhoto.id);
      expect(etlReviewPhoto.review_id).toBe(testReviewPhoto.review_id);
      expect(etlReviewPhoto.url).toBe(testReviewPhoto.url);
    })

    test('should ETL cart data', async () => {
      await extractCart();
      const etlCart = await Cart.findOne({ user_session: 3232 });
      expect(etlCart).toBeTruthy();
      expect(etlCart.id).toBe(testCart1.id);
      expect(etlCart.user_session).toBe(testCart1.user_session);
      expect(etlCart.product_id).toBe(testCart1.product_id);
      expect(etlCart.active).toBe(testCart1.active);
    })

  })

})


