'use strict';
const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email']}));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/auth/login/success',
  failureRedirect: '/auth/login/fail'
}));

router.get('/login/fail', async (req, res, next) => {
  res.status(401).redirect(`${process.env.CLIENT_URL}/login_fail`);
});

router.get('/login/success', async (req, res, next) => {
  if (req.user) {
    res.status(200).redirect(`${process.env.CLIENT_URL}`);
  } else {
    res.status(401).redirect(`${process.env.CLIENT_URL}/login_fail`);
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).redirect(`${process.env.CLIENT_URL}/login`);
});

module.exports = router;
