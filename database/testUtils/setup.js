'use strict';
const mongoose = require('mongoose');
const logger = require('../../lib/logger');
const { userSampleData } = require('./testData/userDara');
const { generateJwtToken } = require('../../lib/jwt');
const loadEnv = require('../../config/env');
const { dbConnect } = require('../dbConfig');
const { UserModel } = require('../models/User');

loadEnv();

const setup = {
  afterAll: async () => {
    const conn = dbConnect();
    try {
      await conn.close();
      console.log('connection closed');
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
 * @returns jwt token
 */
const addUserGetToken = async () => {
  const userObj = userSampleData[0];
  const user = await UserModel.create(userObj);
  return generateJwtToken(user._id.toString());
};

module.exports = {
  setup,
  addUserGetToken,
};
