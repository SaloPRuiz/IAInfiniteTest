const mysql = require('mysql2/promise');

async function databaseConnection() {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'admin',
        password: 'root',
        database: 'iainfinitetest',
    });
}

module.exports = { databaseConnection };
