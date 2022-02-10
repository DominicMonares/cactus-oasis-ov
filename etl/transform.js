const {
  createProduct, createFeature, createStyle, createPhoto, createSKU, createReview, createReviewPhoto, addToCart
} = require('../db/dbMethods.js');
const {convertBool, convertDate} = require('./transformHelpers.js')

let transformProduct = (originalProduct) => {
  originalProduct.forEach(product => {
    let newProduct = {
      id: Number(product.id),
      name: product.name,
      slogan: product.slogan,
      description: product.description,
      category: product.category,
      default_price: product.default_price
    }

    createProduct(newProduct, err => {
      if (err) {
        throw err;
      } else {
        console.log(`Product ${newProduct.id} has been successfully saved!`);
      }
    });
  })
}

let transformFeature = (originalFeature) => {
  originalFeature.forEach(feat => {
    let newFeature = {
      id: Number(feat.id),
      product_id: Number(feat.product_id),
      feature: feat.feature,
      value: feat.value
    }

    createFeature(newFeature, err => {
      if (err) {
        throw err;
      } else {
        console.log(`Feature ${newFeature.id} has been successfully saved!`);
      }
    })
  })
}

let transformStyle = (originalStyle) => {
  originalStyle.forEach(style => {
    let convertedDefault;
    if (style.default_style === '0') {
      convertedDefault = false;
    } else {
      convertedDefault = true;
    }

    let newStyle = {
      style_id: Number(style.id),
      product_id: Number(style.productId),
      name: style.name,
      sale_price: style.sale_price,
      original_price: style.original_price,
      'default?': convertedDefault
    }

    createStyle(newStyle, err => {
      if (err) {
        throw err;
      } else {
        console.log(`Style ${newStyle.style_id} has been successfully saved!`);
      }
    })
  })
}

let transformPhoto = (originalPhoto) => {
  originalPhoto.forEach(photo => {
    let newPhoto = {
      id: Number(photo.id),
      style_id: Number(photo.styleId),
      thumbnail_url: photo.thumbnail_url,
      url: photo.url
    }

    createPhoto(newPhoto, err => {
      if (err) {
        throw err;
      } else {
        console.log(`Photo ${newPhoto.id} has been successfully saved!`);
      }
    })
  })
}

let transformSKU = (originalSKU) => {
  originalSKU.forEach(sku => {
    let newSKU = {
      id: Number(sku.id),
      style_id: Number(sku.styleId),
      size: sku.size,
      quantity: Number(sku.quantity)
    }

    createSKU(newSKU, err => {
      if (err) {
        throw err;
      } else {
        console.log(`SKU ${newSKU.id} has been successfully saved!`);
      }
    })
  })
}

let transformReview = (originalReview) => {
  originalReview.forEach(review => {
    let newReview = {
      review_id: Number(review.id),
      product_id: Number(review.product_id),
      rating: Number(review.rating),
      summary: review.summary,
      recommend: convertBool(review.recommend),
      response: review.response,
      body: review.body,
      date: convertDate(Number(review.date)),
      reviewer_name: review.reviewer_name,
      email: review.reviewer_email,
      helpfulness: Number(review.helpfulness),
      reported: convertBool(review.reported)
    }

    createReview(newReview, err => {
      if (err) {
        throw err;
      } else {
        console.log(`Review ${newReview.review_id} has been successfully saved!`);
      }
    })
  })
}

let transformReviewPhoto = (originalPhoto) => {
  originalPhoto.forEach(photo => {
    let newPhoto = {
      id: Number(photo.id),
      review_id: Number(photo.review_id),
      url: photo.url
    }

    createReviewPhoto(newPhoto, err => {
      if (err) {
        throw err;
      } else {
        console.log(`Review Photo ${newPhoto.id} has been successfully saved!`);
      }
    })
  })
}

let transformCart = (cart) => {
  console.log('CART DATA ', cart.slice(0, 20));
  cart.forEach(cartItem => {
    let newCartItem = {
      id: Number(cartItem.id),
      user_session: Number(cartItem.user_session),
      product_id: Number(cartItem.product_id),
      active: Number(cartItem.active)
    }

    addToCart(newCartItem, err => {
      if (err) {
        throw err;
      } else {
        console.log(`Item ${newCartItem.id} has been successfully saved!`);
      }
    });
  })
}

module.exports = {
  'transformProduct': transformProduct,
  'transformFeature': transformFeature,
  'transformStyle': transformStyle,
  'transformPhoto': transformPhoto,
  'transformSKU': transformSKU,
  'transformReview': transformReview,
  'transformReviewPhoto': transformReviewPhoto,
  'transformCart': transformCart
}
