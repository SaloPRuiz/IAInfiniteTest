const { ParametrosConstantes, EstadoRegistro } = require("../utils/const");

class ParametroService {
    constructor(dbConn, redisClient) {
        this.dbConn = dbConn;
        this.redisClient = redisClient;
    }

    async obtenerTodosLosParametros() {
        const [resultado] = await this.dbConn.query('SELECT IdParametro, Descripcion, Active FROM parametro');
        return resultado;
    }

    async almacenarParametrosEnRedis() {
        const parametros = await this.obtenerTodosLosParametros();
        await this.redisClient.set('parametros', JSON.stringify(parametros));
        return parametros;
    }

    async obtenerParametroEnvioCorreo() {
        try {
            const parametrosRedis = await this.redisClient.get('parametros');
            if (parametrosRedis !== null) {
                const parametros = JSON.parse(parametrosRedis);
                const parametroEnvioCorreo = parametros
                    .find((item) => item.IdParametro === ParametrosConstantes.EnvioCorreo
                          && item.Active === EstadoRegistro.Activo);

                return parametroEnvioCorreo;
            } else {
               return null;
            }
        } catch (error) {
            console.error('Error al obtener el parámetro de envío de correo:', error);
            return null;
        }
    }
}

module.exports = ParametroService;
