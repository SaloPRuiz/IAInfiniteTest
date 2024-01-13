class ClienteService {
    constructor(dbConn) {
        this.dbConn = dbConn;
    }

    async crearCliente(data) {
        try {
            const { name, email, IdToken } = data;

            const fechaActual = new Date();
            const createdBy = 'admin';

            const [resultado] = await this.dbConn.query(
                'INSERT INTO cliente (Nombre, CorreoElectronico, IdToken, CreatedBy, UpdatedBy, CreatedAt, UpdatedAt, Active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [name, email, IdToken, createdBy, createdBy, fechaActual, fechaActual, 1]
            );

            if (resultado && resultado.insertId) {
                const nuevoIdCliente = resultado.insertId;
                return {
                    success: true,
                    idCliente: nuevoIdCliente,
                    Correo: email
                };
            } else {
                return {
                    success: false,
                    mensaje: 'Error al crear el cliente.'
                };
            }
        } catch (error) {
            console.error('Error al crear el cliente:', error);
            return {
                success: false,
                mensaje: 'Error al crear el cliente.'
            };
        }
    }
}

module.exports = ClienteService;
