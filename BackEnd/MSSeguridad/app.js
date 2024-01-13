const fastify = require('fastify')({ logger: true })
const fastifyCors = require('@fastify/cors');
const tokenRoutes = require('./controllers/tokenController');

// CORS
fastify.register(fastifyCors, {
    origin: 'http://localhost:4200'
});

// Routes
fastify.register(tokenRoutes);

// Start
const start = async () => {
    try {
        await fastify.listen(3000);
    } catch (err) {
        process.exit(1);
    }
};

start();
