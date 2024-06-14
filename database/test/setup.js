const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('../../lib/logger');

dotenv.config();

const setup = {
  beforeAll: () => {
    return new Promise(async (resolve, reject) => {
      try {
        await mongoose.connect(process.env.DB_TEST_URI);
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
