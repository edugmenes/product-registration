const express = require('express');
const router = express.Router();
const userModel = require('../model/userModel'); // Importa a lógica do model

// Rota para login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const user = await userModel.login(email, senha);

        if (user) {
            // Autenticação bem-sucedida
            res.status(200).json({ message: 'Login realizado com sucesso!' });
        } else {
            // Falha na autenticação
            res.status(401).json({ message: 'Email ou senha inválidos.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.', error });
    }
});

// Rota para cadastro
router.post('/register', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const result = await userModel.register(email, senha);
        res.status(201).json({ message: 'Cadastro realizado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor.', error });
    }
});

module.exports = router;
