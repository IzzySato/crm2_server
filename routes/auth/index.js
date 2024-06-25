'use strict';
const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email']}));

router.get('/google/callback', passport.authenticate('google', {
  session: false,
  failureRedirect: `${process.env.CLIENT_URL}/login_fail`
}), (req, res) => {
  const user = req.user;
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const redirectUrl = `${process.env.CLIENT_URL}/auth/callback?token=${token}`;
  res.redirect(redirectUrl);
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.status(200).redirect(`${process.env.CLIENT_URL}/login`);
});

module.exports = router;

