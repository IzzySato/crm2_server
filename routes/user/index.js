'use strict';
const express = require('express');
const { addUser, deleteUser } = require('../../database/engine/user');
const { authenticateJWT } = require('../../middlewares/auth');
const userResultSchema = require('../../schemas/userResultSchema');
const NotFoundError = require('../../errors/NotFoundError');
const router = express.Router();

router.get('/:id', authenticateJWT, async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await getCustomerById(id, { isCache: true });
    if (!result) {
      const error = new Error(`User with ID ${id} not found`);
      error.status = 404;
      throw error;
    }
    res.json(userResultSchema(result));
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticateJWT, async (req, res, next) => {
  try {
    const requiredFiels = [
      { name: 'firstName', type: 'string' },
      { name: 'lastName', type: 'string' },
      { name: 'email', type: 'string' },
    ];
    validateInputs({
      requiredFiels,
      bodyData: req.body,
      modelName: 'User',
    });
    const data = await addUser(req.body);
    res.json({
      total: data.length,
      data: data.map(userResultSchema)
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authenticateJWT, async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await deleteUser(id);
    if (!result) {
      throw new NotFoundError(`User with ID ${id}`);
    }
    res.json(userResultSchema(result));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
