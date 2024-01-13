const {databaseConnection} = require("../database/db");
const ClienteService = require("../services/clienteService");
const {handleEnvioCorreoBienvenida} = require("./correoHandler");

async function obtenerService() {
    const dbConn = await databaseConnection();
    return new ClienteService(dbConn);
}

async function handleCreacionCliente(request, reply) {
    const clienteService = await obtenerService();

    const client = request.body.client;

    if (!client) {
        return reply.code(400).send({ error: 'No existe un cliente para su creacion' });
    }

    const clienteResponse = await clienteService.crearCliente(client)

    if(clienteResponse.success)
    {
        await handleEnvioCorreoBienvenida(clienteResponse)
        return reply.send({ clienteResponse });
    }
    else
    {
        return reply.code(400).send({ error: 'Ocurrio un error en la creación del cliente' });
    }

}

module.exports = {
    handleCreacionCliente
}
