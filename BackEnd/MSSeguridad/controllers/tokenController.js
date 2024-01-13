const tokenHandlers = require('../handlers/tokenHandler');

module.exports = async function (fastify) {
    fastify.get('/generar-token', tokenHandlers.handleGeneracionToken);
    fastify.post('/consultar-token', tokenHandlers.handleConsultaToken);
};
