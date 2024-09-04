'use strict';
const express = require('express');
const {
  getAddressById,
  addAddress,
  updateAddress,
} = require('../../database/engine/address/index');
const { authenticateJWT } = require('../../middlewares/auth');
const addressResultSchema = require('../../schemas/addressResultSchema');
const { validateInputs } = require('../../validation');
const router = express.Router();

router.get('/:id', authenticateJWT, async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await getAddressById(id);
    if (!result) {
      const error = new Error(`Address with ID ${id} not found`);
      error.status = 404;
      throw error;
    }
    res.json(addressResultSchema(result));
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticateJWT, async (req, res, next) => {
  try {
    const requiredFiels = [
      { name: 'line1', type: 'string' },
      { name: 'city', type: 'string' },
      { name: 'province', type: 'string' },
    ];
    validateInputs({ requiredFiels, bodyData: req.body, modelName: 'Address' });
    const data = await addAddress(req.body);
    res.json({
      total: data.length,
      data: data.map(addressResultSchema)
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authenticateJWT, async (req, res) => {
  try {
    const id = req.params.id;
    const updateObj = req.body;
    const result = await updateAddress(id, updateObj);
    if (!result) {
      const error = new Error(`Address with ID ${id} not found`);
      error.status = 404;
      throw error;
    }
    res.json(addressResultSchema(result));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
