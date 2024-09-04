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
const productResultSchema = require('../../schemas/productResultSchema');
const { validateInputs } = require('../../validation');
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
      data: data.map(productResultSchema),
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticateJWT, async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await getProductById(id, { isCache: false });
    if (!result) {
      const error = new Error(`Product with ID ${id} not found`);
      error.status = 404;
      throw error;
    }
    res.json(productResultSchema(result));
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticateJWT, cleanCache, async (req, res, next) => {
  try {
    const product = req.body;
    const requiredFiels = [
      { name: 'name', type: 'string' },
      { name: 'sku', type: 'string' },
    ];
    validateInputs({
      requiredFiels,
      bodyData: product,
      modelName: 'Product',
    });
    req.cache_key = 'products_';
    const data = await addProduct(product);
    res.json({
      total: data.length,
      data: data.map(productResultSchema)
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authenticateJWT, cleanCache, async (req, res, next) => {
  try {
    req.cache_key = 'products_';
    const id = req.params.id;
    const updateObj = req.body;
    const result = await updateProduct(id, updateObj);
    if (!result) {
      const error = new Error(`Product with ID ${id} not found`);
      error.status = 404;
      throw error;
    }
    res.json(productResultSchema(result));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
