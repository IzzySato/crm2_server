'use strict';
const Redis = require('ioredis');
const logger = require('./logger');
const mongoose = require('mongoose');
const exec = mongoose.Query.prototype.exec;
const dotenv = require('dotenv');
dotenv.config();

const redis = new Redis(process.env.IOREDIS_URL);

redis.on('connect', () => logger.info('Connected to Redis'));
redis.on('error', (err) => console.log(err));

const redisWrapper = async (exec) => {
  try {
    return await exec();
  } catch (error) {
    logger.error(error.toString());
    throw error;
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
    const keys = await redis.keys(`${key}*`);
    if (keys.length <= 0) {
      return;
    }
    await redis.del(keys);
  });
};

const flushall = async () => {
  redis.flashall((error, result) => {
    if (error) {
      logger.error(error.toString());
    } else {
      logger.info(result);
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

module.exports = { clearHash, flushall };
