'use strict';
const mongoose = require('mongoose');
const logger = require('../../lib/logger');
const { authTokenUser } = require('./testData/userDara');
const { generateJwtToken } = require('../../lib/jwt');
const loadEnv = require('../../config/env');
const { dbConnect } = require('../dbConfig');
const { UserModel } = require('../models/User');

loadEnv();

const setup = {
  afterAll: async () => {
    try {
      await dbConnect().close();
    } catch (error) {
      logger.error(error.toString());
    }
  },
  turnOffCache: () => {
    // app.js is connecting database for integration
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
 * @returns { token, userId }
 */
const addUserGetToken = async () => {
  const user = await UserModel.create(authTokenUser);
  return {
    token: generateJwtToken(user._id.toString()),
    userId: user._id.toString()
  };
};

module.exports = {
  setup,
  addUserGetToken,
};
