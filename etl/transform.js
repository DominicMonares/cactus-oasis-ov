const {Transform} = require('stream');
const {convertBool, convertDate} = require('./transformHelpers.js');
const {createProduct, createFeature, createStyle, createPhoto, createSKU, addToCart} = require('../db/dbMethods.js');

const transformProduct = new Transform({
  transform(chunk, encoding, callback) {
    try {
      let product = Object.assign({}, JSON.parse(chunk));
      product = {
        id: Number(product.id),
        name: product.name,
        slogan: product.slogan,
        description: product.description,
        category: product.category,
        default_price: product.default_price
      };

      // load product
      createProduct(product, (err, res) => {
        if (err) {
          console.log(`FAILED TO CREATE PRODUCT ${product.id} `, err);
        } else {
          console.log(`Product ${product.id} has been successfully saved!`);
          callback(null, JSON.stringify(product) + '\n');
        }
      })
    } catch (err) {
      callback(err);
    }
  }
})

const transformFeature = new Transform({
  transform(chunk, encoding, callback) {
    try {
      let feature = Object.assign({}, JSON.parse(chunk));
      feature = {
        id: Number(feature.id),
        product_id: Number(feature.product_id),
        feature: feature.feature,
        value: feature.value
      }

      // load feature
      createFeature(feature, err => {
        if (err) {
          console.log(`FAILED TO CREATE FEATURE ${feature.id} `, err);
        } else {
          console.log(`Feature ${feature.id} has been successfully saved!`);
          callback(null, JSON.stringify(feature) + '\n');
        }
      })
    } catch (err) {
      callback(err);
    }
  }
})

const transformStyle = new Transform({
  transform(chunk, encoding, callback) {
    try {
      let style = Object.assign({}, JSON.parse(chunk));
      if (style.default_style === '0') {
        style.default_style = false;
      } else {
        style.default_style = true;
      }

      style = {
        style_id: Number(style.id),
        product_id: Number(style.productId),
        name: style.name,
        sale_price: style.sale_price,
        original_price: style.original_price,
        'default?': style.default_style
      }

      // load style
      createStyle(style, err => {
        if (err) {
          console.log(`FAILED TO CREATE STYLE ${style.id} `, err);
        } else {
          console.log(`Style ${style.style_id} has been successfully saved!`);
          callback(null, JSON.stringify(style) + '\n');
        }
      })
    } catch (err) {
      callback(err);
    }
  }
})

const transformPhoto = new Transform({
  transform(chunk, encoding, callback) {
    try {
      let photo = Object.assign({}, JSON.parse(chunk));
      photo = {
        id: Number(photo.id),
        style_id: Number(photo.styleId),
        thumbnail_url: photo.thumbnail_url,
        url: photo.url
      }

      // load photo
      createPhoto(photo, err => {
        if (err) {
          console.log(`FAILED TO CREATE PHOTO ${photo.id} `, err);
        } else {
          console.log(`Photo ${photo.id} has been successfully saved!`);
          callback(null, JSON.stringify(photo) + '\n');
        }
      })
    } catch (err) {
      callback(err);
    }
  }
})

const transformSKU = new Transform({
  transform(chunk, encoding, callback) {
    try {
      let sku = Object.assign({}, JSON.parse(chunk));
      sku = {
        id: Number(sku.id),
        style_id: Number(sku.styleId),
        size: sku.size,
        quantity: Number(sku.quantity)
      }

      // load sku
      createSKU(sku, err => {
        if (err) {
          console.log(`FAILED TO CREATE SKU ${sku.id} `, err);
        } else {
          console.log(`SKU ${sku.id} has been successfully saved!`);
          callback(null, JSON.stringify(sku) + '\n');
        }
      })
    } catch (err) {
      callback(err);
    }
  }
})

const transformCart = new Transform({
  transform(chunk, encoding, callback) {
    try {
      let cart = Object.assign({}, JSON.parse(chunk));
      cart = {
        id: Number(cart.id),
        user_session: Number(cart.user_session),
        product_id: Number(cart.product_id),
        active: Number(cart.active)
      }

      // load cart
      addToCart(cart, err => {
        if (err) {
          console.log(`FAILED TO CREATE CART ENTRY ${sku.id} `, err);
        } else {
          console.log(`Cart entry ${cart.id} has been successfully saved!`);
          callback(null, JSON.stringify(cart) + '\n');
        }
      })
    } catch (err) {
      callback(err);
    }
  }
})

module.exports = {
  'transformProduct': transformProduct,
  'transformFeature': transformFeature,
  'transformStyle': transformStyle,
  'transformPhoto': transformPhoto,
  'transformSKU': transformSKU,
  'transformCart': transformCart
}
