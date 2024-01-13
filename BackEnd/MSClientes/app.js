const fastifyApp = require('./fastifyApp')
const parametroHandler = require('./handlers/parametroHandler');

const iniciarParametros = async () => {
    await parametroHandler.handleInicializacionParametros();
}

// Start
const start = async () => {
    fastifyApp.configurarCors();
    await fastifyApp.configurarRedis();
    fastifyApp.configurarControladores();
    await fastifyApp.iniciar();
};

start()
    .then(()=> {
      iniciarParametros();
    });
