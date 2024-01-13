const amqp = require('amqplib');
const ParametroService = require('../services/parametroService');
const {databaseConnection} = require("../database/db");

const fastify = require('fastify')({ logger: true });
const fastifyRedis = require('@fastify/redis');
const redisClient = require('../utils/redis');

async function obtenerService() {
    const dbConn = await databaseConnection();
    let redis;

    if(!fastify.redis) {
        await fastify.register(fastifyRedis, { redisClient, closeClient: true });
        redis = fastify.redis;
    } else {
        redis = fastify.redis;
    }

    return new ParametroService(dbConn, redis);
}

async function handleEnvioCorreoBienvenida(cliente) {
    try {
        const service = await obtenerService();
        const enviarCorreo = await service.obtenerParametroEnvioCorreo();

        if(enviarCorreo)
        {
            const mensaje = {
                tipo: 'envio_correo_bienvenida',
                data: cliente
            };

            await enviarMensajeRabbitMQ(mensaje);
        } else {
            console.log('El parámetro indica que no se debe enviar el correo de bienvenida.');
        }
    } catch (error) {
        console.error('Error al enviar el correo de bienvenida:', error);
    }
}

async function enviarMensajeRabbitMQ(mensaje) {
    try {
        const conexion = await amqp.connect('amqp://guest:guest@localhost');
        const channel = await conexion.createChannel();
        const queue = 'cola_envio_correo';
        await channel.assertQueue(queue, { durable: true });

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(mensaje)));
        console.log('Mensaje enviado a RabbitMQ:', mensaje);

        await channel.close();
        await conexion.close();
    } catch (error) {
        console.error('Error al enviar mensaje a RabbitMQ:', error);
    }
}

module.exports = {
    handleEnvioCorreoBienvenida
}
