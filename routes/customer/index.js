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
      throw new NotFoundError(`Customer with ID ${id} not found`);
    }
    res.json(customerResultSchema(result));
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticateJWT, cleanCache, async (req, res, next) => {
  try {
    const customer = req.body;
    const requiredFiels = [
      { name: 'firstName', type: 'string' },
      { name: 'lastName', type: 'string' },
      { name: 'email', type: 'string' },
      { name: 'phone', type: 'string' },
    ];
    validateInputs({
      requiredFiels,
      bodyData: customer,
      modelName: 'Customer',
    });
    req.cache_key = 'customers_';
    const data = await addCustomer(customer);
    res.json({
      total: data.length,
      data: data.map(customerResultSchema),
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authenticateJWT, async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateObj = req.body;
    const result = await updateCustomer(id, updateObj);
    if (!result) {
      throw new NotFoundError(`Customer with ID ${id}`);
    }
    res.json(customerResultSchema(result));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
