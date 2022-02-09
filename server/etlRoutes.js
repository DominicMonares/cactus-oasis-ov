const express = require('express');
const etlRouter = require('express').Router();
const {
  extractProduct, extractFeatures, extractStyles, extractPhotos, extractSKUs, extractReviews, extractReviewPhotos, extractCart
} = require('../etl/extract.js');
const {clearModel} = require('../db/dbMethods.js');

etlRouter.get('etl/delete', (req, res) => {
  // COMMENT THIS ROUTE OUT BEFORE DEPLOYMENT
  // MODEL TO DELETE IS HARDCODED IN CLEAR MODEL
  clearModel((err, data) => {
    err ? res.sendStatus(500) : res.send(data);
  })
});

etlRouter.get('/etl/product', (req, res) => {
  extractProduct()
    .then(data => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

etlRouter.get('/etl/features', (req, res) => {
  extractFeatures()
    .then(data => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

etlRouter.get('/etl/styles', (req, res) => {
  extractStyles()
    .then(data => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(500);
    });
})

etlRouter.get('/etl/photos', (req, res) => {
  extractPhotos()
    .then(data => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(500);
    });
})

etlRouter.get('/etl/skus', (req, res) => {
  extractSKUs()
    .then(data => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(500);
    });
})

etlRouter.get('/etl/reviews', (req, res) => {
  extractReviews()
    .then(data => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(500);
    });
})

etlRouter.get('/etl/review/photos', (req, res) => {
  extractReviewPhotos()
    .then(data => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(500);
    });
})

etlRouter.get('/etl/cart', (req, res) => {
  extractCart()
    .then(data => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

module.exports = etlRouter;
