'use strict';
const mongoose = require('mongoose');
const logger = require('../lib/logger');
const loadEnv = require('../config/env');

loadEnv();

const dbConnect = () => {
  try {
    let dbName = process.env.MONGODB_URI;
    if (process.env.NODE_ENV === 'test') {
      dbName = process.env.MONGODB_URI.replace('${NAME}', process.env.TEST_TYPE)
    }
    return mongoose.createConnection(dbName);
  } catch (err) {
    logger.error(err.toString());
    throw err;
  }
};

module.exports = { dbConnect };
