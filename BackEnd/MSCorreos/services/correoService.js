class CorreoService {
    constructor(dbConn) {
        this.dbConn = dbConn;
    }

    async guardarCorreo(data) {
        try {
            const fechaActual = new Date();

            const [resultado] = await this.dbConn.query(
                'INSERT INTO correo (IdCliente, CorreoElectronico, CreatedBy, UpdatedBy, CreatedAt, UpdatedAt, Active) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [data.idCliente, data.Correo, "admin", "admin", fechaActual, fechaActual, 1]
            );

            if (resultado && resultado.insertId) {
                const nuevoIdCorreo = resultado.insertId;
                return { success: true, idCorreo: nuevoIdCorreo };
            } else {
                return { success: false, mensaje: 'Error al guardar el correo.' };
            }
        } catch (error) {
            console.error('Error al guardar el correo:', error);
            return { success: false, mensaje: 'Error al guardar el correo.' };
        }
    }
}

module.exports = CorreoService;
