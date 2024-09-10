'use strict';
const express = require('express');
const { authenticateJWT } = require('../../middlewares/auth');
const router = express.Router();
const multer = require('multer');
const { uploadImage } = require('../../lib/s3');
const { ROUTES } = require('../../constants/routes');
const upload = multer();

router.put(
  ROUTES.UPLOAD.PRODUCT,
  authenticateJWT,
  upload.single('file'),
  async (req, res, next) => {
    try {
      const data = await uploadImage(req.user.id, req.file);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
