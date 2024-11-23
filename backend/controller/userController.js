const { login, register } = require('../model/userModel'); // Ajuste o caminho conforme necessário

// Rota para login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body; // Supondo que o corpo da requisição contenha email e senha

    try {
        const user = await login(email, senha);
        if (user) {
            res.status(200).json({ message: 'Login bem-sucedido', user });
        } else {
            res.status(400).json({ message: 'Credenciais inválidas' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// Rota para registro
app.post('/register', async (req, res) => {
    const { username, email, senha, permissao } = req.body;

    try {
        const userId = await register(username, email, senha, permissao);
        res.status(201).json({ message: 'Cadastro realizado com sucesso', userId });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar usuário', error });
    }
});
