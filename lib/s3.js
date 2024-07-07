'use strict';
const AWS = require('aws-sdk');
const uuid = require('uuid');
const keys = require('../config/keys');
const logger = require('./logger');

const s3 = new AWS.S3({
  region: 'us-east-2',
  credentials: {
    accessKeyId: keys.S3_ACCESS_KEY_ID,
    secretAccessKey: keys.S3_SECRET_ACCESS_KEY,
  }
});

const BUCKET_NAME = 'go-trade-local-product-123';

const uploadImage = (userId, file) => {
  const key = `${userId}/${uuid.v1()}.jpeg`;
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if(err) {
          logger.error(err.toString());
          return reject(err);
        }
        resolve(data);
      });
    });
  } catch (err) {
    logger.error(err.toString());
  }
};

const deleteImage = async (imageUrl) => {
  const splitedUrl = imageUrl.split('/');
  const key = `${splitedUrl[3]}/${splitedUrl[4]}`;
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
    }
    new Promise((resolve, reject) => {
      s3.deleteObject(params, (err, data) => {
        if (err) {
          logger.error(err.toString());
          return reject(err);
        }
        resolve(data);
      });
    });
  } catch (error) {
    logger.error(err.toString());
  }
};

module.exports = {
  uploadImage,
  deleteImage,
}