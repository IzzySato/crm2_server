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
const NotFoundError = require('../../errors/NotFoundError');
const { PRODUCT_NOT_FOUND } = require('../../constants/errorMessage');
const { REQUIRED_FIELDS } = require('../../constants/requiredFields');
const { MODEL_NAME } = require('../../constants/modelName');
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
    const result = await getProductById(id);
    if (!result) {
      throw new NotFoundError(PRODUCT_NOT_FOUND);
    }
    res.json(productResultSchema(result));
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticateJWT, cleanCache, async (req, res, next) => {
  try {
    const product = req.body;
    const requiredFiels = REQUIRED_FIELDS.PRODUCT;
    validateInputs({
      requiredFiels,
      bodyData: product
    });
    req.cache_key = MODEL_NAME.PRODUCT;
    const data = await addProduct(product);
    res.json({
      total: data.length,
      data: data.map(productResultSchema),
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authenticateJWT, cleanCache, async (req, res, next) => {
  try {
    req.cache_key = MODEL_NAME.PRODUCT;
    const id = req.params.id;
    const updateObj = req.body;
    const result = await updateProduct(id, updateObj);
    if (!result) {
      throw new NotFoundError(PRODUCT_NOT_FOUND);
    }
    res.json(productResultSchema(result));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
