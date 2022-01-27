// get /products/productId
const productListData = [
  {
    "id": 59558,
    "campus": "hr-rpp",
    "name": "Pumped Up Kicks",
    "slogan": "Faster than a just about anything",
    "description": "The Pumped Up serves up crisp court style with a modern look. These shoes show off tennis-whites shades and are constructed with a supple leather upper and a classic rubber cupsole.",
    "category": "Kicks",
    "default_price": "89.00",
    "created_at": "2021-10-18T22:50:41.839Z",
    "updated_at": "2021-10-18T22:50:41.839Z"
  },
  {
    "id": 59559,
    "campus": "hr-rpp",
    "name": "Blues Suede Shoes",
    "slogan": "2019 Stanley Cup Limited Edition",
    "description": "Touch down in the land of the Delta Blues in the middle of the pouring rain",
    "category": "Dress Shoes",
    "default_price": "120.00",
    "created_at": "2021-10-18T22:50:41.839Z",
    "updated_at": "2021-10-18T22:50:41.839Z"
  },
  {
    "id": 59560,
    "campus": "hr-rpp",
    "name": "YEasy 350",
    "slogan": "Just jumped over jumpman",
    "description": "These stretchy knit shoes show off asymmetrical lacing and a big sculpted rubber midsole. In a nod to adidas soccer heritage.",
    "category": "Kicks",
    "default_price": "450.00",
    "created_at": "2021-10-18T22:50:41.839Z",
    "updated_at": "2021-10-18T22:50:41.839Z"
  },
  {
    "id": 59561,
    "campus": "hr-rpp",
    "name": "Summer Shoes",
    "slogan": "A risky call in the spring or fall",
    "description": "Low-top panelled buffed leather and mesh sneakers. Sizing embroidered in black at round toe. Tonal lace-up closure. Pull-loop and rubberized style name at padded tongue. Padded collar. Pull-loop at heel collar. Logo embroidered in black at outer side. Tonal treaded rubber sole. Tonal stitching.",
    "category": "Kicks",
    "default_price": "59.00",
    "created_at": "2021-10-18T22:50:41.839Z",
    "updated_at": "2021-10-18T22:50:41.839Z"
  },
  {
    "id": 59562,
    "campus": "hr-rpp",
    "name": "Infinity Stone",
    "slogan": "Reality is often disappointing. That is, it was. Now, reality can be whatever I want.",
    "description": "The Infinity Stones are six immensely powerful stone-like objects tied to different aspects of the universe, created by the Cosmic Entities. Each of the stones possesses unique capabilities that have been enhanced and altered by various alien civilizations for millennia.",
    "category": "Accessories",
    "default_price": "50000000.00",
    "created_at": "2021-10-18T22:50:41.839Z",
    "updated_at": "2021-10-18T22:50:41.839Z"
  }
]

const productData = {
  "id": 59559,
  "campus": "hr-rpp",
  "name": "Blues Suede Shoes",
  "slogan": "2019 Stanley Cup Limited Edition",
  "description": "Touch down in the land of the Delta Blues in the middle of the pouring rain",
  "category": "Dress Shoes",
  "default_price": "120.00",
  "created_at": "2021-10-18T22:50:41.839Z",
  "updated_at": "2021-10-18T22:50:41.839Z",
  "features": [
    {
      "feature": "Sole",
      "value": "Rubber"
    },
    {
      "feature": "Material",
      "value": "FullControlSkin"
    },
    {
      "feature": "Stitching",
      "value": "Double Stitch"
    }
  ]
}

// get to /products/productId/styles
const styleData = {
  "product_id": "59559",
  "results": [
    {
      "style_id": 365444,
      "name": "White Sole",
      "original_price": "120.00",
      "sale_price": null,
      "default?": false,
      "photos": [
        {
          "thumbnail_url": "https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
        },
        {
          "thumbnail_url": "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
        }
      ],
      "skus": {
        "2122969": {
          "quantity": 14,
          "size": "7"
        },
        "2122970": {
          "quantity": 25,
          "size": "7.5"
        },
        "2122971": {
          "quantity": 9,
          "size": "8"
        },
        "2122972": {
          "quantity": 2,
          "size": "8.5"
        },
        "2122973": {
          "quantity": 18,
          "size": "9"
        }
      }
    },
    {
      "style_id": 365445,
      "name": "Black Sole",
      "original_price": "120.00",
      "sale_price": null,
      "default?": false,
      "photos": [
        {
          "thumbnail_url": "https://images.unsplash.com/uploads/1412198532414025532c0/6a31309c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/uploads/1412198532414025532c0/6a31309c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80"
        },
        {
          "thumbnail_url": "https://images.unsplash.com/photo-1454024183771-42d54053cd75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1454024183771-42d54053cd75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
        }
      ],
      "skus": {
        "2122980": {
          "quantity": 14,
          "size": "7"
        },
        "2122981": {
          "quantity": 25,
          "size": "7.5"
        },
        "2122982": {
          "quantity": 9,
          "size": "8"
        },
        "2122983": {
          "quantity": 2,
          "size": "8.5"
        },
        "2122984": {
          "quantity": 18,
          "size": "9"
        }
      }
    },
    {
      "style_id": 365446,
      "name": "Tan Sole",
      "original_price": "120.00",
      "sale_price": null,
      "default?": false,
      "photos": [
        {
          "thumbnail_url": "https://images.unsplash.com/photo-1465124982537-9f918f1e1aaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1465124982537-9f918f1e1aaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
        },
        {
          "thumbnail_url": "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
        }
      ],
      "skus": {
        "2122991": {
          "quantity": 14,
          "size": "7"
        },
        "2122992": {
          "quantity": 25,
          "size": "7.5"
        },
        "2122993": {
          "quantity": 9,
          "size": "8"
        },
        "2122994": {
          "quantity": 2,
          "size": "8.5"
        }
      }
    }
  ]
}

// get /cart
const cartData = [
  {
    "sku_id": 1,
    "count": 2
  },
  {
    "sku_id": 3,
    "count": 1
  },
  {
    "sku_id": 5,
    "count": 33
  }
]

module.exports = {
  'productListData': productListData,
  'productData': productData,
  'styleData': styleData,
  'cartData': cartData
}
