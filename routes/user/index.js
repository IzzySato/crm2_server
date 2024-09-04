'use strict';
const express = require('express');
const { addUser, deleteUser } = require('../../database/engine/user');
const { authenticateJWT } = require('../../middlewares/auth');
const router = express.Router();

router.get('/:id', authenticateJWT, async (req, res, next) => {
  const id = req.params.id;
  const result = await getCustomerById(id, { isCache: true });
  res.json(result);
});

router.post('/', authenticateJWT, async (req, res, next) => {
  const result = await addUser(req.body);
  res.json(result);
});

router.delete('/', authenticateJWT, async (req, res, next) => {
  const result = await deleteUser(req.params.id);
  res.json(result);
});

module.exports = router;