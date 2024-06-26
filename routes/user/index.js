'use strict';
const express = require('express');
const { addUser, deleteUser } = require('../../database/engine/user');
const router = express.Router();

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  const result = await getCustomerById(id, { isCache: true });
  res.json(result);
});

router.post('/', async (req, res, next) => {
  console.log(req.body)
  const result = await addUser(req.body);
  console.log(result)
  res.json(result);
});

router.delete('/', async (req, res, next) => {
  const result = await deleteUser(req.params.id);
  res.json(result);
});

module.exports = router;