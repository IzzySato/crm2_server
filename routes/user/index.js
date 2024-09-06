'use strict';
const express = require('express');
const {
  addUser,
  deleteUser,
  updateUser,
  getUserById,
} = require('../../database/engine/user');
const { authenticateJWT } = require('../../middlewares/auth');
const userResultSchema = require('../../schemas/userResultSchema');
const NotFoundError = require('../../errors/NotFoundError');
const { validateInputs } = require('../../validation');
const router = express.Router();

router.get('/:id', authenticateJWT, async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await getUserById(id);
    if (!result) {
      throw new NotFoundError(`User with ID ${id}`);
    }
    res.json(userResultSchema(result));
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticateJWT, async (req, res, next) => {
  try {
    const user = req.body;
    const requiredFiels = [
      { name: 'firstName', type: 'string' },
      { name: 'lastName', type: 'string' },
      { name: 'email', type: 'string' },
    ];
    validateInputs({
      requiredFiels,
      bodyData: user,
      modelName: 'User',
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
      throw new NotFoundError(`User with ID ${id}`);
    }
    res.json(userResultSchema(result));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
