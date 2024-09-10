'use strict';
const express = require('express');
const {
  getCustomers,
  addCustomer,
  updateCustomer,
  getCustomerById,
} = require('../../database/engine/customer');
const { authenticateJWT } = require('../../middlewares/auth');
const cleanCache = require('../../middlewares/cleanCache');
const customerResultSchema = require('../../schemas/customerResultSchema');
const { validateInputs } = require('../../validation');
const NotFoundError = require('../../errors/NotFoundError');
const { CUSTOMER_NOT_FOUND } = require('../../constants/errorMessage');
const { REQUIRED_FIELDS } = require('../../constants/requiredFields');
const { MODEL_NAME } = require('../../constants/modelName');
const router = express.Router();

router.get('/', authenticateJWT, async (req, res, next) => {
  try {
    const query = req.query;
    const { data, total } = await getCustomers(query, { isCache: true });
    res.json({
      total,
      length: query.length || 10,
      pageNum: query.pageNum || 1,
      sortBy: query.sortBy || '_id',
      data: data.map(customerResultSchema),
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticateJWT, async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await getCustomerById(id);
    if (!result) {
      throw new NotFoundError(CUSTOMER_NOT_FOUND);
    }
    res.json(customerResultSchema(result));
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticateJWT, cleanCache, async (req, res, next) => {
  try {
    const customer = req.body;
    const requiredFiels = REQUIRED_FIELDS.CUSTOMER;
    validateInputs({
      requiredFiels,
      bodyData: customer
    });
    req.cache_key = MODEL_NAME.CUSTOMER;
    const data = await addCustomer(customer);
    res.json({
      total: data.length,
      data: data.map(customerResultSchema),
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authenticateJWT, cleanCache, async (req, res, next) => {
  try {
    req.cache_key = MODEL_NAME.CUSTOMER;
    const id = req.params.id;
    const updateObj = req.body;
    const result = await updateCustomer(id, updateObj);
    if (!result) {
      throw new NotFoundError(CUSTOMER_NOT_FOUND);
    }
    res.json(customerResultSchema(result));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
