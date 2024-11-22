// URL base do backend
const BASE_URL = 'http://localhost:3000'; // Substitua pela URL correta do seu backend

// Função para realizar o login
async function login() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (email === '' || senha === '') {
        document.getElementById('message').innerHTML = '<span class="warning">Preencha todos os campos!</span>';
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('message').innerHTML = '<span class="highlight">Login realizado com sucesso!</span>';
            // Redirecionar para a página principal após login
            window.location.href = '../main/main.html';
        } else {
            document.getElementById('message').innerHTML = `<span class="warning">${data.message}</span>`;
        }
    } catch (error) {
        document.getElementById('message').innerHTML = '<span class="warning">Erro ao conectar ao servidor!</span>';
        console.error('Erro:', error);
    }
}

// Função para limpar os campos de login
function cleanLogin() {
    document.getElementById('email').value = '';
    document.getElementById('senha').value = '';
    document.getElementById('message').innerHTML = '';
}

// Função para realizar o cadastro
async function register() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    if (email === '' || senha === '' || confirmarSenha === '') {
        document.getElementById('message').innerHTML = '<span class="warning">Preencha todos os campos!</span>';
        return;
    }

    if (senha !== confirmarSenha) {
        document.getElementById('message').innerHTML = '<span class="warning">As senhas não coincidem!</span>';
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('message').innerHTML = '<span class="highlight">Cadastro realizado com sucesso!</span>';
            // Redirecionar para a página de login após cadastro
            window.location.href = '../authentication/login.html';
        } else {
            document.getElementById('message').innerHTML = `<span class="warning">${data.message}</span>`;
        }
    } catch (error) {
        document.getElementById('message').innerHTML = '<span class="warning">Erro ao conectar ao servidor!</span>';
        console.error('Erro:', error);
    }
}

// Função para limpar os campos de cadastro
function cleanRegister() {
    document.getElementById('email').value = '';
    document.getElementById('senha').value = '';
    document.getElementById('confirmarSenha').value = '';
    document.getElementById('message').innerHTML = '';
}
