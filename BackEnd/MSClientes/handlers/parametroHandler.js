const ParametroService = require('../services/parametroService');
const {databaseConnection} = require("../database/db");
const {fastifyApp} = require('../fastifyApp');

async function obtenerService() {
    const dbConn = await databaseConnection();
    const redisClient = fastifyApp.redis;
    return new ParametroService(dbConn, redisClient);
}

async function handleInicializacionParametros() {
    const service = await obtenerService();
    return await service.almacenarParametrosEnRedis();
}

module.exports = {
    handleInicializacionParametros
}
