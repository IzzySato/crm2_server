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
      const error = new Error(`Customer with ID ${id} not found`);
      error.status = 404;
      throw error;
    }
    res.json(customerResultSchema(result));
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticateJWT, cleanCache, async (req, res, next) => {
  try {
    const requiredFiels = [
      { name: 'firstName', type: 'string' },
      { name: 'lastName', type: 'string' },
      { name: 'email', type: 'string' },
      { name: 'phone', type: 'string' },
    ];
    validateInputs({
      requiredFiels,
      bodyData: req.body,
      modelName: 'Customer',
    });
    req.cache_key = 'customers_';
    const customer = req.body;
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
    req.cache_key = 'customers_';
    const updateObj = req.body;
    const result = await updateCustomer(req.params.id, updateObj);
    if (!result) {
      const error = new Error(`Customer with ID ${req.params.id} not found`);
      error.status = 404;
      throw error;
    }
    res.json(customerResultSchema(result));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
