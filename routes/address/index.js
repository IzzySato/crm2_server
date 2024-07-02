'use strict';
const express = require('express');
const { getAddressById, addAddress, updateAddress } = require('../../database/engine/address/index');
const router = express.Router();

router.get('/:id', async (req, res, next) => {
  const data = await getAddressById(req.params.id, { isCache: false });
  res.json(data);
});

router.post('/', async (req, res, next) => {
  const data = await addAddress(req.body);
  res.json(data);
});

router.put('/:id', async (req, res) => {
  const updateObj = req.body;
  const result = await updateAddress(req.params.id, updateObj );
  res.json(result);
});

module.exports = router;