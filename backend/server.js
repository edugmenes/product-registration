const express = require('express');
const path = require('path');
const db = require('./database/database'); // Importa a conexão do banco de dados

const app = express();
const PORT = 3000;

// Função para testar a conexão com o banco de dados
async function testDatabaseConnection() {
    try {
        const [rows] = await db.query('SELECT 1');
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
}

// Executa o teste de conexão quando o servidor inicia
testDatabaseConnection();

// Serve arquivos estáticos (HTML, CSS, etc.) da pasta "frontend"
app.use(express.static(path.join(__dirname, '../frontend')));

// Rota inicial para testar o servidor
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '../../frontend/pages/authentication/login.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '../../frontend/pages/authentication/login.html'));
});

// Rota para cadastro
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '../../frontend/pages/authentication/registration.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
