'use strict';
const mongoose = require('mongoose');
const logger = require('../lib/logger');
const { MONGO_URI } = require('../config/keys');

const dbConnect = () => {
  try {
    mongoose.connect(MONGO_URI);
    const db = mongoose.connection;
    db.on('error', (error) => logger.error(error));
    db.once('open', () => logger.info('Connect to Database'));
  } catch (err) {
    throw err;
  }
};

module.exports = { dbConnect };
