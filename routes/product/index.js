'use strict';
const express = require('express');
const { authenticateJWT } = require('../../middlewares/auth');
const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
} = require('../../database/engine/product');
const cleanCache = require('../../middlewares/cleanCache');
const router = express.Router();

router.get('/', authenticateJWT, async (req, res, next) => {
  try {
    const query = req.query;
    const { data, total } = await getProducts(query, { isCache: true });
    res.json({
      total,
      length: query.length || 10,
      pageNum: query.pageNum || 1,
      sortBy: query.sortBy || '_id',
      data,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticateJWT, async (req, res, next) => {
  const id = req.params.id;
  const result = await getProductById(id, { isCache: false });
  if (!result) {
    return res.status(404).json({ message: `Product ${id} not found` });
  }
  res.json(result);
});

router.post('/', authenticateJWT, cleanCache, async (req, res, next) => {
  req.cache_key = 'products_';
  const product = req.body;
  const result = await addProduct(product);
  res.json(result);
});

router.put('/:id', authenticateJWT, cleanCache, async (req, res, next) => {
  req.cache_key = 'products_';
  const updateObj = req.body;
  const result = await updateProduct(req.params.id, updateObj);
  if (!result) {
    return res
      .status(404)
      .json({ message: `Product ${req.params.id} not found` });
  }
  res.json(result);
});

module.exports = router;
