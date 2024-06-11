const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('../../lib/logger');

dotenv.config();

const setupDatabase = () => {
  /* Connecting to the database before each test. */
  beforeEach(async () => {
    try {
      await mongoose.connect(process.env.DB_TEST_URI);
    } catch (error) {
      logger.error(error.toString());
    }
  });

  /* Closing database connection after each test. */
  afterEach(async () => {
    try {
      await mongoose.connection.dropDatabase();
    } catch (error) {
      logger.error(error.toString());
    } finally {
      await mongoose.connection.close();
    }
  });
};

module.exports = setupDatabase;
