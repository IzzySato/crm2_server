'use strict';
const express = require('express');
const router = express.Router();
const { generateJwtToken } = require('../../lib/jwt');
const { ENV } = require('../../constants/env');
const { DEV_ONLY } = require('../../constants/errorMessage');
const { ROUTES } = require('../../constants/routes');

router.post(ROUTES.JWT.GENERATE_TOKEN, async (req, res, next) => {
  try {
    if (process.env.NODE_ENV !== ENV.DEV.NAME) {
      res.json({ message: DEV_ONLY});
      return;
    }
    const { userId } = req.body;
    const token = generateJwtToken(userId);
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
