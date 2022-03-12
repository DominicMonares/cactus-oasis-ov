const mongoose = require('mongoose');
const {Product, Feature, Style, Photo, SKU, Cart} = require('./index.js');

/*

let clearModel = (callback) => {
  // clears all data from hardcoded model, only to be used for testing
  Cart.deleteMany(callback);
}

*/

/* ========== PRODUCTS ========== */

let fetchAllProducts = (page, count, callback) => {
  // NOT USED CLIENT SIDE
  let start = (page - 1) * count;
  let end = (page * count) + 1;

  return Product.find({id: {'$gt': start, '$lt': end}})
    .select('-_id id name slogan description category default_price')
    .lean()
    .then(data => data)
    .catch(err => {throw err});
}

let fetchProduct = (product) => {
  return Product.find({ id: product })
    .select('-_id id name slogan description category default_price')
    .lean()
    .then(data => data)
    .catch(err => {throw err});
}


let createProduct = (product) => {
  // NOT USED CLIENT SIDE
  let newProduct = new Product(product);
  newProduct.save()
    .then(() => {console.log(`Product ${product.id} successfully created!`)})
    .catch(err => {throw err});
}

/* ========== FEATURES ========== */

let createFeature = (feature) => {
  // NOT USED CLIENT SIDE
  let newFeature = new Feature(feature);
  newFeature.save()
    .then(() => {console.log(`Feature ${feature.id} successfully created!`)})
    .catch(err => {throw err});
}

let fetchFeatures = (product) => {
  return Feature.find({product_id: product})
    .select('-_id feature value')
    .lean()
    .then(data => data)
    .catch(err => {throw err});
}

/* ========== STYLES ========== */

let createStyle = (style) => {
  // NOT USED CLIENT SIDE
  let newStyle = new Style(style);
  newStyle.save()
    .then(() => {console.log(`Style ${style.style_id} successfully created!`)})
    .catch(err => {throw err});
}

let fetchStyles = (product) => {
  return Style.find({product_id: product})
    .select('-_id style_id name original_price sale_price default?')
    .lean()
    .then(data => data)
    .catch(err => {throw err});
}

/* ========== PHOTOS ========== */

let createPhoto = (photo) => {
  // NOT USED CLIENT SIDE
  let newPhoto = new Photo(photo);
  newPhoto.save()
    .then(() => {console.log(`Photo ${photo.id} successfully created!`)})
    .catch(err => {throw err});
}

// let fetchPhotos = (style) => {
//   return Photo.find({style_id: style})
//     .select('-_id thumbnail_url url')
//     .lean()
//     .then(data => data)
//     .catch(err => {throw err});
// }

let fetchPhotos = (styles) => {
  return Photo.find({style_id: {$in: styles}})
    .select('-_id style_id thumbnail_url url')
    .lean()
    .then(data => data)
    .catch(err => {throw err});
}

/* ========== SKUS ========== */

let createSKU = (sku) => {
  // NOT USED CLIENT SIDE
  let newSKU = new SKU(sku);
  newSKU.save()
    .then(() => {console.log(`SKU ${sku.id} successfully created!`)})
    .catch(err => {throw err});
}

// let fetchSKUs = (style) => {
//   return SKU.find({style_id: style})
//     .select('-_id id quantity size')
//     .lean()
//     .then(data => data)
//     .catch(err => {throw err});
// }

let fetchSKUs = (styles) => {
  return SKU.find({style_id: {$in: styles}})
    .select('-_id id style_id quantity size')
    .lean()
    .then(data => data)
    .catch(err => {throw err});
}

/* ========== CART ========== */

let addToCart = (cartItem) => {
  // let newCart = new Cart(cartItem);
  // return newCart.save()
    // .then(() => {console.log(`Item ${cartItem.product_id} successfully added to cart!`)})
    // .catch(err => {throw err});

  // PUT operation to be used for POST testing
  // without overpopulating the db
  return Cart.findByIdAndUpdate('6225860dea6f25cd07c6bc4f', cartItem)
    .then(() => {console.log(`Cart item ${cartItem.product_id} successfully updated!`)})
    .catch(err => {throw err});
}

let fetchCart = (session) => {
  return Cart.find({user_session: session})
    .select('-_id product_id active')
    .lean()
    .then(data => data)
    .catch(err => {throw err});
}

/* ========== ETL ========== */

let saveProductBatch = (products) => {
  Product.insertMany(products)
    .then(() => {
      console.log('Successfully loaded product batch!');
    })
    .catch(err => { console.log('PRODUCT ERROR ', err) });
}

let saveFeatureBatch = (features) => {
  Feature.insertMany(feature)
    .then(() => {
      console.log('Successfully loaded feature batch!');
    })
    .catch(err => { console.log('FEATURE ERROR ', err) });
}

let saveStyleBatch = (styles) => {
  Style.insertMany(style)
    .then(() => {
      console.log('Successfully loaded style batch!');
    })
    .catch(err => { console.log('STYLE ERROR ', err) });
}

let savePhotoBatch = (photos) => {
  Photo.insertMany(photos)
    .then(() => {
      console.log('Successfully loaded photo batch!');
    })
    .catch(err => { console.log('PHOTO ERROR ', err) });
}

let saveSKUBatch = (skus) => {
  SKU.insertMany(skus)
    .then(() => {
      console.log('Successfully loaded SKU batch!');
    })
    .catch(err => { console.log('SKU ERROR ', err) });
}

let saveCartBatch = (cart, callback) => {
  Cart.insertMany(cart, callback)
    .then(() => {
      console.log('Successfully loaded cart batch!');
    })
    .catch(err => { console.log('CART ERROR ', err) });
}

module.exports = {
  // 'clearModel': clearModel,
  'fetchAllProducts': fetchAllProducts,
  'fetchProduct': fetchProduct,
  'createProduct': createProduct,
  'createFeature': createFeature,
  'fetchFeatures': fetchFeatures,
  'createStyle': createStyle,
  'fetchStyles': fetchStyles,
  'createPhoto': createPhoto,
  'fetchPhotos': fetchPhotos,
  'createSKU': createSKU,
  'fetchSKUs': fetchSKUs,
  'addToCart': addToCart,
  'fetchCart': fetchCart,
  'saveProductBatch': saveProductBatch,
  'saveFeatureBatch': saveFeatureBatch,
  'saveStyleBatch': saveStyleBatch,
  'savePhotoBatch': savePhotoBatch,
  'saveSKUBatch': saveSKUBatch,
  'saveCartBatch': saveCartBatch
}
