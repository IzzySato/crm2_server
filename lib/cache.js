'use strict';

const { REDIS_URL } = require('../config/keys');
const Redis = require('ioredis');
const logger = require('./logger');
const mongoose = require('mongoose');
const exec = mongoose.Query.prototype.exec;
const redis = new Redis(REDIS_URL);

redis.on('connect', () => logger.info('Connected to Redis'));
redis.on('error', (err) => console.log(err));

const redisWrapper = async (exec) => {
  try {
    return await exec();
  } catch (error) {
    logger.error(error.toString());
  }
};

mongoose.Query.prototype.cache = function (id = '') {
  this.isCache = true;
  this.key = id;
  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.isCache) {
    logger.info('not cache');
    return exec.apply(this, arguments);
  }
  return await redisWrapper(async () => {
    const field = JSON.stringify(
      Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name,
      })
    );
    // Check the key in redis
    const cacheValue = await redis.hget(this.key, field);
    if (cacheValue) {
      logger.info(`{key: "${this.key}", message: "cache data is returned"}`);
      const doc = JSON.parse(cacheValue);
      return Array.isArray(doc)
        ? doc.map((d) => new this.model(d))
        : new this.model(doc);
    }
    logger.info(`key: ${this.key} store the value in cache`);
    // Store the result in redis
    const result = await exec.apply(this, arguments);
    await redis.hset(this.key, field, JSON.stringify(result));
    return result;
  });
};

const clearHash = async (key) => {
  redisWrapper(async () => {
    const keys = await redis.keys('*');
    const delKeys = [];
    keys.forEach(element, index => {
      if (keys[index].startsWith(key)) {
        delKeys.push(keys[i]);
      }
    });
    if (delKeys.length > 0) {
      await redis.del(delKeys);
    }
  });
};

const shutdown = () => {
  redis.quit(() => {
    logger.info('Redis connection closed');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

module.exports = { clearHash };
