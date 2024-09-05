const dotenv = require('dotenv');

const loadEnv = () => {
  let path = '';
  switch (process.env.NODE_ENV) {
    case 'production':
      path = '.env';
      break;
    case 'test':
      path = '.env.test';
      break;
    case 'ci':
      path = '.env.ci';
      break;
    default:
      path = '.env';
  }
  dotenv.config({ path });
};

module.exports = loadEnv;
