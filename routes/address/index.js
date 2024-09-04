'use strict';
const express = require('express');
const {
  getAddressById,
  addAddress,
  updateAddress,
} = require('../../database/engine/address/index');
const { authenticateJWT } = require('../../middlewares/auth');
const router = express.Router();

router.get('/:id', authenticateJWT, async (req, res, next) => {
  const data = await getAddressById(req.params.id, { isCache: false });
  if (!data) {
    return res
      .status(404)
      .json({ message: `Address ${req.params.id} not found` });
  }
  res.json(data);
});

router.post('/', authenticateJWT, async (req, res, next) => {
  const data = await addAddress(req.body);
  res.json(data);
});

router.put('/:id', authenticateJWT, async (req, res) => {
  const updateObj = req.body;
  const result = await updateAddress(req.params.id, updateObj);
  if (!result) {
    return res
      .status(404)
      .json({ message: `Address ${req.params.id} not found` });
  }
  res.json(result);
});

module.exports = router;
