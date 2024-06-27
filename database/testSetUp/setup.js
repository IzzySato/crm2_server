'use strict';
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('../../lib/logger');

dotenv.config();

const setup = {
  beforeAll: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const MONGO_TEST_URI = process.env.MONGO_TEST_URI.replace('${JEST_WORKER_ID}', process.env.JEST_WORKER_ID || '1');
        await mongoose.connect(MONGO_TEST_URI);
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
