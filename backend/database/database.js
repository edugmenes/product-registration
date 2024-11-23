const mysql = require('mysql2/promise');

// Crie a conexão com o banco de dados
const db = mysql.createPool({
    host: 'junction.proxy.rlwy.net',   // Host do servidor
    user: 'root',                      // Nome de usuário
    password: 'gWjgWWHBcjfhlByUUMnTueESYOwDfRIJ',        // Senha (substitua pelo valor correto)
    database: 'railway',               // Nome do banco de dados
    port: 24816                        // Porta específica do Railway
});

module.exports = db;
