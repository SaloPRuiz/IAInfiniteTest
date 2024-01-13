const CorreoService = require('../services/correoService');
const {databaseConnection} = require("../database/db");

const amqp = require('amqplib');

const conectarRabbitMQ = async () => {
    const conexion = await amqp.connect('amqp://guest:guest@localhost');
    const canal = await conexion.createChannel();

    const nombreCola = 'cola_envio_correo';

    await canal.assertQueue(nombreCola, { durable: true });

    console.log(`Conexión a RabbitMQ establecida. Esperando mensajes en la cola: ${nombreCola}`);

    canal.consume(nombreCola, async (mensaje) => {
        if (mensaje !== null) {
            const contenidoMensaje = mensaje.content.toString();
            console.log('Mensaje recibido:', contenidoMensaje);

            try {
                const dbConn = await databaseConnection();
                const correoService = new CorreoService(dbConn);

                const mensajeObjeto = JSON.parse(contenidoMensaje);
                const resultado = await correoService.guardarCorreo(mensajeObjeto.data);

                if (resultado.success) {
                    console.log('Correo guardado con éxito. ID:', resultado.idCorreo);
                } else {
                    console.error('Error al guardar el correo:', resultado.mensaje);
                }
            } catch (error) {
                console.error('Error al procesar el mensaje:', error);
            }

            canal.ack(mensaje);
        }
    });
};

module.exports = conectarRabbitMQ;
