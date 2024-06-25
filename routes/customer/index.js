'use strict';
const express = require('express');
const { getCustomers, addCustomer, updateCustomer, getCustomerById } = require('../../database/engine/customer');
const { authenticateJWT } = require('../../middlewares/auth');
const router = express.Router();

router.get('/', authenticateJWT, async (req, res, next) => {
  const query = req.query;
  const { data, total } = await getCustomers(query, { isCache: true });
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
  const result = await getCustomerById(id, { isCache: true });
  res.json(result);
});

router.post('/', async (req, res, next) => {
  const customer = req.body;
  const result = await addCustomer(customer);
  res.json(result);
});

router.put('/:id', async (req, res, next) => {
  const updateObj = req.body;
  const result = await updateCustomer(req.params.id, updateObj );
  res.json(result);
});


module.exports = router;