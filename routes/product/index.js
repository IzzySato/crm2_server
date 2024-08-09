'use strict';
const express = require('express');
const { authenticateJWT } = require('../../middlewares/auth');
const { getProducts, getProductById, addProduct, updateProduct } = require('../../database/engine/product');
const cleanCache = require('../../middlewares/cleanCache');
const router = express.Router();

router.get('/', authenticateJWT, async (req, res, next) => {
  const query = req.query;
  const { data, total } = await getProducts(query, { isCache: true });
  res.json({
    total,
    length: query.length || 10,
    pageNum: query.pageNum || 1,
    sortBy: query.sortBy || '_id',
    data
  });
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  const result = await getProductById(id, { isCache: false });
  res.json(result);
});

router.post('/', cleanCache, async (req, res, next) => {
  req.cache_key = 'products_';
  const product = req.body;
  const result = await addProduct(product);
  res.json(result);
});

router.put('/:id', cleanCache, async (req, res, next) => {
  req.cache_key = 'products_';
  const updateObj = req.body;
  const result = await updateProduct(req.params.id, updateObj );
  res.json(result);
});

module.exports = router;