const clienteHandler = require('../handlers/clienteHandler');

module.exports = async function (fastify) {
    fastify.post('/cliente', clienteHandler.handleCreacionCliente);
};
