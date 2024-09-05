'use strict';
const mongoose = require('mongoose');
const logger = require('../../lib/logger');
const loadEnv = require('../../config/env');
const { dbConnect } = require('../dbConfig');

(async () => {
  try {
    loadEnv();
    await dbConnect().dropDatabase();
    logger.info('Database dropped successfully.');
  } catch (error) {
    logger.error('Error dropping the database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
})();