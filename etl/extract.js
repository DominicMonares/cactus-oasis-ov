const fs = require('fs');
const {pipeline} = require('stream');
const path = require('path');
const csv = require('csvtojson');
const moment = require('moment');

const {
  transformProduct, transformFeature, transformStyle
} = require('./transform.js');

const csvParser = csv();

const extractProduct = () => {
  const productInUrl = path.resolve(__dirname, 'origin/product.csv');
  const productOutUrl = path.resolve(__dirname, 'origin/json/product.json');

  const productInputStream = fs.createReadStream(productInUrl);
  const productOutputStream = fs.createWriteStream(productOutUrl);

  pipeline(productInputStream, csvParser, transformProduct, productOutputStream, err => {
    if (err) {
      console.log('Product pipeline error: ', err);
    } else {
      console.log('Product pipeline completed successfully');
    }
  })
}

// extractProduct();

const extractFeatures = () => {
  const featureInUrl = path.resolve(__dirname, 'origin/features.csv');
  const featureOutUrl = path.resolve(__dirname, 'origin/json/features.json');

  const featureInputStream = fs.createReadStream(featureInUrl);
  const featureOutputStream = fs.createWriteStream(featureOutUrl);

  pipeline(featureInputStream, csvParser, transformFeature, featureOutputStream, err => {
    if (err) {
      console.log('Feature pipeline error ', err);
    } else {
      console.log('Feature pipeline completed successfully');
    }
  })
}

// extractFeatures();

const extractStyles = () => {
  const styleInUrl = path.resolve(__dirname, 'origin/styles.csv');
  const styleOutUrl = path.resolve(__dirname, 'origin/json/styles.json');

  const styleInputStream = fs.createReadStream(styleInUrl);
  const styleOutputStream = fs.createWriteStream(styleOutUrl);

  pipeline(styleInputStream, csvParser, transformStyle, styleOutputStream, err => {
    if (err) {
      console.log('Style pipeline error ', err);
    } else {
      console.log('Style pipeline completed successfully');
    }
  })
}

// extractStyles();

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
