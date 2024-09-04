'use strict';
const mongoose = require('mongoose');
const logger = require('../../lib/logger');
const loadEnv = require('../../config/env');

(async () => {
  try {
    loadEnv();
    await mongoose.connect(process.env.MONGODB_URI);
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