// get /products/productId
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
};

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
};

// get /reviews/productId
const reviewData = {
  "product": "59559",
  "page": 0,
  "count": 5,
  "results": [
    {
      "review_id": 1095059,
      "rating": 4,
      "summary": "Really great",
      "recommend": true,
      "response": null,
      "body": "I love how this product fits and smells and tastes. Yummy!",
      "date": "2021-11-18T00:00:00.000Z",
      "reviewer_name": "Nosenose",
      "helpfulness": 3,
      "photos": []
    },
    {
      "review_id": 1095060,
      "rating": 2,
      "summary": "They were fine",
      "recommend": false,
      "response": null,
      "body": "The product was ok but a little narrow and small. Would buy a size smaller.",
      "date": "2021-11-18T00:00:00.000Z",
      "reviewer_name": "footi",
      "helpfulness": 1,
      "photos": []
    },
    {
      "review_id": 1095133,
      "rating": 4,
      "summary": "Best product ever",
      "recommend": true,
      "response": null,
      "body": "I love how cute these are. Would recommend to all.!!",
      "date": "2021-11-30T00:00:00.000Z",
      "reviewer_name": "pupppps",
      "helpfulness": 1,
      "photos": []
    },
    {
      "review_id": 1095136,
      "rating": 5,
      "summary": "Super cool",
      "recommend": true,
      "response": null,
      "body": "This is the best. I really loved everything about it.",
      "date": "2021-12-01T00:00:00.000Z",
      "reviewer_name": "puppipower",
      "helpfulness": 0,
      "photos": [
        {
          "id": 2100577,
          "url": "https://ucarecdn.com/73aad5f2-f6ef-4f5b-ba02-49ad2cd45105/"
        },
        {
          "id": 2100578,
          "url": "https://ucarecdn.com/d2c7381e-0922-4d0e-9a09-141be1e9053f/"
        }
      ]
    },
    {
      "review_id": 1095134,
      "rating": 5,
      "summary": "It fell apart",
      "recommend": false,
      "response": null,
      "body": "Why would you buy this? It was no bueno. Please refund.",
      "date": "2021-11-30T00:00:00.000Z",
      "reviewer_name": "saddy",
      "helpfulness": 0,
      "photos": []
    }
  ]
};

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
];

module.exports = {
  'productData': productData,
  'styleData': styleData,
  'reviewData': reviewData,
  'cartData': cartData
}
