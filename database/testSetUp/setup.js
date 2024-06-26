'use strict';
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('../../lib/logger');
const { dbTestUri } = require('../../config/dev');

dotenv.config();

const setup = {
  beforeAll: () => {
    return new Promise(async (resolve, reject) => {
      try {
        await mongoose.connect(dbTestUri);
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
      let err = undefined;
      try {
        await mongoose.connection.dropDatabase();
      } catch (error) {
        err = error;
        logger.error(error.toString());
      } finally {
        await mongoose.connection.close();
        (err) ? reject(err) : resolve();
      }
    });
  },
};

module.exports = {
  setup,
};
