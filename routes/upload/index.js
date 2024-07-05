'use strict';
const express = require('express');
const { authenticateJWT } = require('../../middlewares/auth');
const router = express.Router();
const AWS = require('aws-sdk');
const uuid = require('uuid');
const logger = require('../../lib/logger');
const multer = require('multer');
const keys = require('../../config/keys');
const upload = multer();

const s3 = new AWS.S3({
  region: 'us-east-2',
  credentials: {
    accessKeyId: keys.S3_ACCESS_KEY_ID,
    secretAccessKey: keys.S3_SECRET_ACCESS_KEY,
  }
});

router.put('/product', authenticateJWT, upload.single('file'), async (req, res, next) => {
  const key = `${req.user.id}/${uuid.v1()}.jpeg`;
  try {
    const file = req.file;
    const params = {
      Bucket: 'go-trade-local-product-123',
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    s3.upload(params, (err, data) => {
      if(err) {
        logger.error(err.toString());
      }
      res.json(data);
    })
  } catch (err) {
    logger.error(err.toString());
  }
});



module.exports = router;
