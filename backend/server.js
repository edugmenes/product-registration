const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve arquivos estáticos (HTML, CSS, etc.) da pasta "frontend"
app.use(express.static(path.join(__dirname, '../frontend')));

// Rota inicial para testar o servidor
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
