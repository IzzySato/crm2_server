'use strict';

// update STAGING_URL once hosted

module.exports = {
  MONGO_URI: process.env.MONGO_CI_URI,
  REDIS_URL: process.env.REDIS_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  SERVER_URL: process.env.STAGING_URL
};