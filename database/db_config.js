const mongoose = require('mongoose');
const logger = require('../lib/logger');

const dbConnect = () => {
  try {
    mongoose.connect(process.env.DB_URI);
    const db = mongoose.connection;
    db.on('error', (error) => logger.error(error));
    db.once('open', () => logger.info('Connect to Database'));
  } catch (err) {
    throw err;
  }
};

module.exports = { dbConnect };
