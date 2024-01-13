class tokenService {
    constructor(dbConn) {
        this.dbConn = dbConn;
    }

    async generarToken() {
        const nuevoToken = this.generarTokenUnico();
        const fechaActual = new Date();

        const [resultado] = await this.dbConn.query(
            'INSERT INTO authtoken (Token, CreatedAt, UpdatedAt, CreatedBy, UpdatedBy) VALUES (?, ?, ?, ?, ?)',
            [nuevoToken, fechaActual, fechaActual, 'admin', 'admin',]
        );

        if (resultado.affectedRows === 1) {
            return { token: nuevoToken, id: resultado.insertId };
        } else {
            return null;
        }
    }

    async consultarToken(queryToken) {
        const [resultado] = await this.dbConn.query(
            'SELECT token FROM authtoken WHERE Token = ?',
            [queryToken]
        );

        if (resultado.length > 0) {
            console.log('Token consultado correctamente desde la base de datos.');
            return resultado[0].token;
        } else {
            console.error('No se encontró el token en la base de datos.');
            return null;
        }
    }

    generarTokenUnico() {
        return Math.random().toString(36).substring(2, 10).toUpperCase();
    }
}

module.exports = tokenService;
