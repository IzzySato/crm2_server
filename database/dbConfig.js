'use strict';
const mongoose = require('mongoose');
const logger = require('../lib/logger');
const loadEnv = require('../config/env');

const dbConnect = () => {
  try {
    loadEnv();
    mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection;
    db.on('error', (error) => logger.error(error));
    db.once('open', () => logger.info('Connect to Database'));
  } catch (err) {
    throw err;
  }
};

module.exports = { dbConnect };
