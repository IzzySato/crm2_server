'use strict';
const { clearHash } = require("../lib/cache");

module.exports = async (req, res, next) => {
  // Let router handler do the jobs
  await next();
  // TODO: store the cache_key somewhere
  // The tutorial was using req.user.id
  await clearHash(req.cache_key || '');
};