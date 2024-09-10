const dotenv = require('dotenv');
const { ENV } = require('../constants/env');

const loadEnv = () => {
  let path = '';
  switch (process.env.NODE_ENV) {
    case ENV.PRODUCTION.NAME:
      path = ENV.PRODUCTION.PATH;
      break;
    case ENV.TEST.NAME:
      path = ENV.TEST.PATH;
      break;
    case ENV.CI.NAME:
      path = ENV.CI.PATH;
      break;
    default:
      path = ENV.DEFAULT.PATH;
  }
  dotenv.config({ path });
};

module.exports = loadEnv;
