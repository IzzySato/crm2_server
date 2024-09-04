'use strict';
const app = require('./app.js');
const logger = require('./lib/logger.js');

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  logger.info(`Server listening on ${PORT}`);
});

module.exports = server;
