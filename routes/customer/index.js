const express = require('express');
const { getCustomers, addCustomer } = require('../../database/engine/customer');
const Customer = require('../../database/models/Customer');
const router = express.Router();

router.get('/', async (req, res) => {
  const params = req.params;
  const customers = await getCustomers(params);
  const total = await Customer.countDocuments();
  return res.json({
    total,
    length: params.length || 10,
    pageNum: params.pageNum || 1,
    sortBy: params.sortBy || 'id',
    data: customers
  })
});

router.post('/', async (req, res) => {
  const customer = req.body;
  const customers = await addCustomer(customer);
  return res.json(customers)
});


module.exports = router;