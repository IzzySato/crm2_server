const dotenv = require('dotenv');

function loadEnv() {
  if (process.env.NODE_ENV !== 'production') {
    dotenv.config({
      path:
        process.env.NODE_ENV === 'test'
          ? '.env.test'
          : process.env.NODE_ENV === 'ci'
          ? '.env.ci'
          : '.env',
    });
  } else {
    dotenv.config(); // Load default .env for production
  }
}

module.exports = loadEnv;