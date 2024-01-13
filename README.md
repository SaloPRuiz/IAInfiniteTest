Se cumplio con todos los objetivos planteados en la prueba técnica:
- Implementación del formulario
- Implementación de los microservicios
- Implementación de redis
- Implementación de RabbitMQ
- Funcionalidad principal solicitada

Scripts usados para la base de datos:
CREATE TABLE AuthToken (
   IdToken INT AUTO_INCREMENT PRIMARY KEY,
  Token VARCHAR(8) NOT NULL,
  CreatedBy VARCHAR(255),
  UpdatedBy VARCHAR(255),
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  Active TINYINT(1) DEFAULT 1
);

CREATE TABLE cliente (
    IdCliente INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    CorreoElectronico VARCHAR(255) NOT NULL,
    IdToken INT NOT NULL,
    CreatedBy VARCHAR(255),
    UpdatedBy VARCHAR(255),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    Active TINYINT(1) DEFAULT 1,
    FOREIGN KEY (IdToken) REFERENCES authtoken(IdToken)
);

CREATE TABLE Parametro (
  IdParametro INT PRIMARY KEY,
  Descripcion VARCHAR(255) NOT NULL,
  CreatedBy VARCHAR(255),
  UpdatedBy VARCHAR(255),
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  Active TINYINT(1) DEFAULT 1
);

CREATE TABLE correo (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  IdCliente INT,
  CorreoElectronico VARCHAR(255) NOT NULL,
  CreatedBy VARCHAR(255) NOT NULL,
  UpdatedBy VARCHAR(255) NOT NULL,
  CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  Active TINYINT(1) DEFAULT 1,
  FOREIGN KEY (IdCliente) REFERENCES cliente(IdCliente)
);


INSERT INTO Parametro (IdParametro, Descripcion, CreatedBy, UpdatedBy)
VALUES (1001, 'Envío de correo de bienvenida', 'admin', 'admin');

Gracias.
