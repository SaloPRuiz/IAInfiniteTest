const fastify = require('fastify')({ logger: true });
const fastifyCors = require('@fastify/cors');
const fastifyRedis = require('@fastify/redis');
const fastifyControllers = require('./controllers/clienteController');
const redisClient = require('./utils/redis');

class FastifyApp {
    constructor() {
        this.fastifyApp = fastify;
    }

    configurarCors() {
        this.fastifyApp.register(fastifyCors, {
            origin: 'http://localhost:4200'
        });
    }

    async configurarRedis() {
        await this.fastifyApp.register(fastifyRedis, {redisClient, closeClient: true});
    }

    configurarControladores() {
        this.fastifyApp.register(fastifyControllers);
    }

    async iniciar() {
        await this.fastifyApp.listen(4000);
    }
}

module.exports = new FastifyApp();
