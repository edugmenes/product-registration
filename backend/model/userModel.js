const db = require('../database/database'); // Importa a conexão com o banco de dados

// Função para login do usuário
const login = async (email, senha) => {
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ? AND senha = ?', [email, senha]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        throw error;
    }
};

// Função para registrar um novo usuário
const register = async (email, senha) => {
    try {
        const [result] = await db.query('INSERT INTO users (email, senha) VALUES (?, ?)', [email, senha]);
        return result.insertId;
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        throw error;
    }
};

module.exports = {
    login,
    register
};
