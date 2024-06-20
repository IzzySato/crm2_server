'use strict';
const express = require('express');
const { getAddressById, addAddress, updateAddress } = require('../../database/engine/address/index');
const router = express.Router();
const cleanCache = require('../../middlewares/cleanCache');

router.get('/:id', async (req, res, next) => {
  const data = await getAddressById(req.params.id, { isCache: true });
  res.json(data);
});

router.post('/', cleanCache, async (req, res, next) => {
  const data = await addAddress(req.body);
  console.log(data)
  res.json(data);
});

router.put('/:id', async (req, res) => {
  const updateObj = req.body;
  const result = await updateAddress(req.params.id, updateObj );
  res.json(result);
});

module.exports = router;