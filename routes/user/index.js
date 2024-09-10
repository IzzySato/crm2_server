'use strict';
const express = require('express');
const {
  addUser,
  updateUser,
  getUserById,
} = require('../../database/engine/user');
const { authenticateJWT } = require('../../middlewares/auth');
const userResultSchema = require('../../schemas/userResultSchema');
const NotFoundError = require('../../errors/NotFoundError');
const { validateInputs } = require('../../validation');
const { USER_NOT_FOUND, DEV_ONLY } = require('../../constants/errorMessage');
const { REQUIRED_FIELDS } = require('../../constants/requiredFields');
const { ENV } = require('../../constants/env');
const router = express.Router();

router.get('/:id', authenticateJWT, async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await getUserById(id);
    if (!result) {
      throw new NotFoundError(USER_NOT_FOUND);
    }
    res.json(userResultSchema(result));
  } catch (error) {
    next(error);
  }
});

// Use this for development
router.post('/', async (req, res, next) => {
  try {
    if (process.env.NODE_MODE === ENV.PRODUCTION.NAME) {
      return res.status(400).json({ message: DEV_ONLY });
    }
    const user = req.body;
    const requiredFiels = REQUIRED_FIELDS.USER;
    validateInputs({
      requiredFiels,
      bodyData: user
    });
    const data = await addUser(user);
    res.json({
      total: data.length,
      data: data.map(userResultSchema),
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authenticateJWT, async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateObj = req.body;
    const result = await updateUser(id, updateObj);
    if (!result) {
      throw new NotFoundError(USER_NOT_FOUND);
    }
    res.json(userResultSchema(result));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
