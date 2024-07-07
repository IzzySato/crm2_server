'use strict';
const express = require('express');
const { authenticateJWT } = require('../../middlewares/auth');
const router = express.Router();
const multer = require('multer');
const { uploadImage } = require('../../lib/s3');
const upload = multer();

router.put('/product', authenticateJWT, upload.single('file'), async (req, res, next) => {
  const data = await uploadImage(req.user.id, req.file);
  res.json(data);
});



module.exports = router;
