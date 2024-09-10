'use strict';
const mongoose = require('mongoose');
const logger = require('../lib/logger');
const loadEnv = require('../config/env');
const { ENV } = require('../constants/env');

loadEnv();

const dbConnect = () => {
  try {
    let dbName = process.env.MONGODB_URI;
    if (process.env.NODE_ENV === ENV.TEST.NAME) {
      dbName = process.env.MONGODB_URI.replace('${NAME}', process.env.TEST_TYPE)
    }
    return mongoose.createConnection(dbName);
  } catch (err) {
    logger.error(err.toString());
    throw err;
  }
};

module.exports = { dbConnect };
