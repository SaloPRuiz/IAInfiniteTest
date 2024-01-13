const rabbitMQHandler = require('./handlers/rabbitMQHandler');
const fastify = require('fastify')({ logger: true });

rabbitMQHandler();

const start = async () => {
    try {
        await fastify.listen(5000);
    } catch (err) {
        process.exit(1);
    }
};

start();
