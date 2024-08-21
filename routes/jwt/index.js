'use strict';
const express = require('express');
const router = express.Router();
const { generateJwtToken } = require('../../lib/jwt');

router.post('/generate-token', async (req, res, next) => {
  const { userId } = req.body;
  const token = generateJwtToken(userId);
  res.json({ token });
});

module.exports = router;
