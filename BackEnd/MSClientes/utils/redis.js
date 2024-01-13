const Redis = require('ioredis');

const redisConfig = {
    host: 'localhost',
    port: 6379
};

const redisClient = new Redis(redisConfig);

module.exports = redisClient;
