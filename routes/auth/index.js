'use strict';
const express = require('express');
const passport = require('passport');
const { generateJwtToken } = require('../../lib/jwt');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email']}));

router.get('/google/callback', passport.authenticate('google', {
  session: false,
  failureRedirect: `${process.env.CLIENT_URL}/login_fail`
}), (req, res) => {
  const user = req.user;
  const token = generateJwtToken(user.id);
  const redirectUrl = `${process.env.CLIENT_URL}/auth/callback?token=${token}`;
  res.redirect(redirectUrl);
});

router.get('/logout', (req, res, next) => {
  try {
    req.logout();
    res.status(200).redirect(`${process.env.CLIENT_URL}/login`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

