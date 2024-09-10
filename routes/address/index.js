'use strict';
const express = require('express');
const router = express.Router();
const {
  getAddressById,
  addAddress,
  updateAddress,
} = require('../../database/engine/address/index');
const { authenticateJWT } = require('../../middlewares/auth');
const addressResultSchema = require('../../schemas/addressResultSchema');
const { validateInputs } = require('../../validation');
const NotFoundError = require('../../errors/NotFoundError');
const { ADDRESS_NOT_FOUND } = require('../../constants/errorMessage');
const { REQUIRED_FIELDS } = require('../../constants/requiredFields');

router.get('/:id', authenticateJWT, async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await getAddressById(id);
    if (!result) {
      throw new NotFoundError(ADDRESS_NOT_FOUND);
    }
    res.json(addressResultSchema(result));
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticateJWT, async (req, res, next) => {
  try {
    const address = req.body;
    const requiredFiels = REQUIRED_FIELDS.ADDRESS;
    validateInputs({
      requiredFiels,
      bodyData: address,
    });
    const data = await addAddress(address);
    res.json({
      total: data.length,
      data: data.map(addressResultSchema),
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authenticateJWT, async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateObj = req.body;
    const result = await updateAddress(id, updateObj);
    if (!result) {
      throw new NotFoundError(ADDRESS_NOT_FOUND);
    }
    res.json(addressResultSchema(result));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
