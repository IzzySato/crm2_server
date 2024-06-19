'use strict';
const express = require('express');
const { getCustomers, addCustomer, updateCustomer, getCustomerById } = require('../../database/engine/customer');
const Customer = require('../../database/models/Customer');
const router = express.Router();

router.get('/', async (req, res) => {
  const query = req.query;
  const customers = await getCustomers(query);
  const total = await Customer.countDocuments();
  res.json({
    total,
    length: query.length || 10,
    pageNum: query.pageNum || 1,
    sortBy: query.sortBy || 'id',
    data: customers
  });
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await getCustomerById(id);
  res.json(result);
});

router.post('/', async (req, res) => {
  const customer = req.body;
  const result = await addCustomer(customer);
  res.json(result);
});

router.put('/:id', async (req, res) => {
  const updateObj = req.body;
  const result = await updateCustomer(req.params.id, updateObj );
  res.json(result);
});


module.exports = router;