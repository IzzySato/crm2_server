const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email']}));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/auth/login/success',
  failureRedirect: '/auth/login/fail'
}));

router.get('/login/fail', async (req, res, next) => {
  res.status(401).json({
    error: true,
    message: 'Login failure',
  });
});

router.get('/login/success', async (req, res, next) => {
  console.log(req)
  if (req.user) {
    res.status(200).json({
      error: false,
      message: 'Successfully Login',
    });
  } else {
    res.status(403).json({
      error: true,
      message: 'Not Authorized',
    });
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
