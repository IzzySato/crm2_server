'use strict';
const mongoose = require('mongoose');
const logger = require('../../lib/logger');
const User = require('../models/User');
const { userSampleData } = require('./testData/userDara');
const { generateJwtToken } = require('../../lib/jwt');
const loadEnv = require('../../config/env');

loadEnv();

const setup = {
  beforeAll: () => {
    return new Promise(async (resolve, reject) => {
      try {
        await mongoose.connect(process.env.MONGODB_URI);
        logger.info('connected');
        resolve();
      } catch (error) {
        logger.error(error.toString());
        reject(error);
      }
    });
  },
  afterAll: () => {
    return new Promise(async (resolve, reject) => {
      try {
        await mongoose.disconnect();
        resolve();
      } catch (error) {
        logger.error(error.toString());
        reject(error);
      }
    });
  },
  beforeAllNoCache:() => {
    // Mock the cache method to disable cache
    mongoose.Query.prototype.cache = function (id = '') {
      this.isCache = false;
      this.key = id;
      return this;
    };
  }
};

/**
 * Use it for the integration tests
 * add a user and return the jwt token
 * @returns jwt token
 */
const addUserGetToken = async () => {
  const userObj = userSampleData[0];
  const user = await User.create(userObj);
  return generateJwtToken(user._id.toString());
};

module.exports = {
  setup,
  addUserGetToken
};
