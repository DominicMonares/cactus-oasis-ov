const express = require('express');
const etlRouter = require('express').Router();

const {
  extractProduct, extractFeatures, extractStyles, extractPhotos, extractSKUs, extractReviews, extractCart
} = require('../etl/extract.js');

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

etlRouter.get('/etl/cart', (req, res) => {
  extractCart()
    .then(data => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

module.exports = router;
