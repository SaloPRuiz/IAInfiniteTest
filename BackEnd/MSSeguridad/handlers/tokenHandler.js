const TokenService = require('../services/tokenService');
const {databaseConnection} = require("../database/db");

async function obtenerTokenService() {
    const dbConn = await databaseConnection();
    return new TokenService(dbConn);
}

async function handleGeneracionToken(request, reply) {
    const tokenService = await obtenerTokenService();
    const data = await tokenService.generarToken();
    return reply.send({ data });
}

async function handleConsultaToken(request, reply) {
    const tokenService = await obtenerTokenService();

    const token = request.body.token;

    if (!token) {
        return reply.code(400).send({ error: 'Debe proporcionar un token para la consulta.' });
    }

    const data = await tokenService.consultarToken(token);

    if (data) {
        return reply.send({ data });
    } else {
        return reply.code(404).send({ error: 'Token no encontrado en la base de datos.' });
    }
}
module.exports = {
    handleGeneracionToken,
    handleConsultaToken
}
