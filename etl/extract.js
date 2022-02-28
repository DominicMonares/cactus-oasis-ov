const fs = require('fs');
const {pipeline} = require('stream');
const path = require('path');
const csv = require('csvtojson');
const moment = require('moment');

const {
  transformProductStream,
} = require('./transform.js');

const csvParser = csv();

const extractProduct = async () => {
  const productInURL = path.resolve(__dirname, 'origin/product.csv');
  const productOutURL = path.resolve(__dirname, 'origin/json/product.json');

  const productInputStream = fs.createReadStream(productInURL);
  const productOutputStream = fs.createWriteStream(productOutURL);

  await pipeline(productInputStream, csvParser, transformProductStream, productOutputStream, err => {
    if (err) {
      console.log('Pipeline error: ', err);
    } else {
      console.log('Pipeline completed successfully');
    }
  })
}

// extractProduct();


// let extractProduct = () => {
//   const csvFilePath = `${__dirname}/origin/split/products/product1.csv`;
//   return csv()
//     .fromFile(csvFilePath)
//     .then(data => {
//       return data;
//     })
//     .catch(err => {
//       throw 'PRODUCT EXTRACTION ERROR ', err;
//     })
//     .then(extracted => {
//       transformProduct(extracted);
//     })
//     .catch(err => {
//       throw 'PRODUCT TRANSFORMATION ERROR ', err;
//     })
// }



// let extractFeatures = () => {
//   const csvFilePath = `${__dirname}/origin/split/features/features1.csv`;
//   return csv()
//     .fromFile(csvFilePath)
//     .then(data => {
//       return data;
//     })
//     .catch(err => {
//       throw 'FEATURE EXTRACTION ERROR ', err;
//     })
//     .then(extracted => {
//       transformFeature(extracted);
//     })
//     .catch(err => {
//       throw 'FEATURE TRANSFORMATION ERROR ', err;
//     })
// }

// let extractStyles = () => {
//   const csvFilePath = `${__dirname}/origin/split/styles/styles1.csv`;
//   return csv()
//     .fromFile(csvFilePath)
//     .then(data => {
//       console.log('DATA ', data.slice(0, 20));
//       return data;
//     })
//     .catch(err => {
//       throw 'STYLE EXTRACTION ERROR ', err;
//     })
//     .then(extracted => {
//       transformStyle(extracted);
//     })
//     .catch(err => {
//       throw 'STYLE TRANSFORMATION ERROR ', err;
//     })
// }

// let extractPhotos = () => {
//   const csvFilePath = `${__dirname}/origin/split/photos/photos1.csv`;
//   return csv()
//     .fromFile(csvFilePath)
//     .then(data => {
//       console.log('DATA ', data.slice(0, 20));
//       return data;
//     })
//     .catch(err => {
//       throw 'PHOTO EXTRACTION ERROR ', err;
//     })
//     .then(extracted => {
//       transformPhoto(extracted);
//     })
//     .catch(err => {
//       throw 'PHOTO TRANSFORMATION ERROR ', err;
//     })
// }

// let extractSKUs = () => {
//   const csvFilePath = `${__dirname}/origin/split/skus/skus1.csv`;
//   return csv()
//     .fromFile(csvFilePath)
//     .then(data => {
//       console.log('DATA ', data.slice(0, 20));
//       return data;
//     })
//     .catch(err => {
//       throw 'SKU EXTRACTION ERROR ', err;
//     })
//     .then(extracted => {
//       transformSKU(extracted);
//     })
//     .catch(err => {
//       throw 'SKU TRANSFORMATION ERROR ', err;
//     })
// }

// let extractReviews = () => {
//   const csvFilePath = `${__dirname}/origin/split/reviews/reviews1.csv`;
//   return csv()
//     .fromFile(csvFilePath)
//     .then(data => {
//       return data;
//     })
//     .catch(err => {
//       throw 'REVIEW EXTRACTION ERROR ', err;
//     })
//     .then(extracted => {
//       transformReview(extracted);
//     })
//     .catch(err => {
//       throw 'REVIEW TRANSFORMATION ERROR ', err;
//     })
// }

// let extractReviewPhotos = () => {
//   const csvFilePath = `${__dirname}/origin/split/review_photos/reviews_photos1.csv`;
//   return csv()
//     .fromFile(csvFilePath)
//     .then(data => {
//       return data;
//     })
//     .catch(err => {
//       throw 'REVIEW PHOTO EXTRACTION ERROR ', err;
//     })
//     .then(extracted => {
//       transformReviewPhoto(extracted);
//     })
//     .catch(err => {
//       throw 'REVIEW PHOTO TRANSFORMATION ERROR ', err;
//     })
// }

// let extractCart = () => {
//   const csvFilePath = `${__dirname}/origin/cart.csv`;
//   return csv()
//     .fromFile(csvFilePath)
//     .then(data => {
//       return data;
//     })
//     .catch(err => {
//       throw 'CART EXTRACTION ERROR ', err;
//     })
//     .then(extracted => {
//       transformCart(extracted);
//     })
//     .catch(err => {
//       throw 'CART TRANSFORMATION ERROR ', err;
//     })
// }

module.exports = {
  'extractProduct': extractProduct,
  // 'extractFeatures': extractFeatures,
  // 'extractStyles': extractStyles,
  // 'extractPhotos': extractPhotos,
  // 'extractSKUs': extractSKUs,
  // 'extractReviews': extractReviews,
  // 'extractReviewPhotos': extractReviewPhotos,
  // 'extractCart': extractCart
}
