'use strict';
const dotenv = require('dotenv');
dotenv.config();
const dbTestUri = process.env.DB_TEST_URI.replace('${JEST_WORKER_ID}', process.env.JEST_WORKER_ID || '1');

module.exports = {
  cookieKey: '123345',
  dbTestUri
};