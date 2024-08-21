'use strict';
const mongoose = require('mongoose');
const logger = require('../../lib/logger');
const dotenv = require('dotenv');

dotenv.config();

(async () => {
  try {
    const MONGO_TEST_URI = process.env.MONGO_TEST_URI;
    await mongoose.connect(MONGO_TEST_URI);
    await mongoose.connection.dropDatabase();
    logger.info('Database dropped successfully.');
  } catch (error) {
    logger.error('Error dropping the database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
})();