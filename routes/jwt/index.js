'use strict';
const express = require('express');
const router = express.Router();
const { generateJwtToken } = require('../../lib/jwt');

router.post('/generate-token', async (req, res, next) => {
  if (process.env.NODE_ENV !== 'dev') {
    res.json({ message: 'dev only endpoint'});
    return;
  }
  const { userId } = req.body;
  const token = generateJwtToken(userId);
  res.json({ token });
});

module.exports = router;
