'use strict';
const { clearHash } = require("../lib/cache");

module.exports = async (req, res, next) => {
  await next();
  await clearHash(req.cache_key || '');
};