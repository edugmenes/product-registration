const db = require('../database/database'); // Importa a conexão com o banco de dados
const bcrypt = require('bcrypt'); // Importa o bcrypt para criptografar a senha

// Função para login do usuário
const login = async (email, senha) => {
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length > 0) {
            const user = rows[0];
            // Verifica se a senha informada corresponde à senha criptografada armazenada
            const isMatch = await bcrypt.compare(senha, user.password);
            return isMatch ? user : null;
        }
        return null;
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        throw error;
    }
};

// Função para registrar um novo usuário
const register = async (username, email, senha, permissao) => {
    try {
        // Criptografa a senha antes de armazená-la no banco
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Insere os dados na tabela de usuários
        const [result] = await db.query(
            'INSERT INTO users (username, email, password, permissao) VALUES (?, ?, ?, "full_access")',
            [username, email, hashedPassword, permissao]
        );

        return result.insertId; // Retorna o ID do novo usuário
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        throw error;
    }
};

module.exports = {
    login,
    register
};
