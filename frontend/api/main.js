//-----------------------------------------------------------------------------
let produtos = [];

//-----------------------------------------------------------------------------
function codigoExiste(codigo) {
    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].codigoProduto === codigo) {
            return true;
        }
    }

    return false;
}
//------------------------------------------------------------------------------
function compararProdutoPorCodigo(produto1, produto2) {
    if (produto1.codigoProduto < produto2.codigoProduto) {
        return -1;
    }

    if (produto1.codigoProduto > produto2.codigoProduto) {
        return 1;
    }

    return 0;
}
//-------------------------------------------------------------------------------
function cadastrar() {
    let codigo = parseInt(document.getElementById('codigoProduto').value);
    let descricao = document.getElementById('descricaoProduto').value;
    let fabricante = document.getElementById('fabricanteProduto').value;
    let estoque = parseInt(document.getElementById('quantidadeEstoque').value);

    if (!codigo || !descricao || !fabricante || !estoque) {
        document.getElementById('message').innerHTML = '<span class="warning">Preencha os campos corretamente!</span>';
        return;
    }

    if (isNaN(codigo) || isNaN(estoque) || codigo < 0 || estoque < 0) {
        document.getElementById('message').innerHTML = '<span class="warning">Números inválidos!</span>';
        return;
    }

    if (codigoExiste(codigo)) {
        document.getElementById('message').innerHTML = `<span class="warning">Cadastramento Inválido! Código <span class="highlight">${codigo}</span> já existente!</span>`;
        return;
    }

    let produto = {
        codigoProduto: codigo,
        descricaoProduto: descricao,
        fabricanteProduto: fabricante,
        quantidadeEstoque: estoque
    };

    produtos.push(produto);
    reset();

    document.getElementById('message').innerHTML = `Registro <span class="highlight">${codigo}</span> cadastrado com sucesso!`;
    document.getElementById('codigoProduto').value = '';
    document.getElementById('descricaoProduto').value = '';
    document.getElementById('fabricanteProduto').value = '';
    document.getElementById('quantidadeEstoque').value = '';
}
//----------------------------------------------------------------------------------
function listar() {
    if (produtos.length === 0) {
        document.getElementById('message').innerHTML = '<span class="warning">Nenhum produto encontrado!</span>';
        return;
    }

    produtos.sort(compararProdutoPorCodigo);
    let listaDiv = document.getElementById('lista');
    let tableContent = '<table><thead><tr><th>Código</th><th>Descrição</th><th>Fabricante</th><th>Quantidade em Estoque</th></tr></thead><tbody>';

    for (let i = 0; i < produtos.length; i++) {
        tableContent += `<tr><td>${produtos[i].codigoProduto}</td><td>${produtos[i].descricaoProduto}</td><td>${produtos[i].fabricanteProduto}</td><td>${produtos[i].quantidadeEstoque}</td></tr>`;
    }

    tableContent += '</tbody></table>';
    listaDiv.innerHTML = tableContent;
    document.getElementById('message').innerHTML = '';
}
//----------------------------------------------------------------------------------
function limpar() {
    produtos = [];
    reset();
    return;
}
//----------------------------------------------------------------------------------
function deletar() {
    if (produtos.length === 0) {
        document.getElementById('message').innerHTML = '<span class="warning">Nenhum produto encontrado!</span>';
        return;
    }
    else {
        document.getElementById('message').innerHTML = '<span class="highlight">Selecione o produto que deseja deletar:</span>';

        produtos.sort(compararProdutoPorCodigo);
        let listaDiv = document.getElementById('lista');
        let tableContent = '<table><thead><tr><th>Código</th><th>Descrição</th><th>Fabricante</th><th>Quantidade em Estoque</th><th>Ação</th></tr></thead><tbody>';

        for (let i = 0; i < produtos.length; i++) {
            tableContent += `<tr><td>${produtos[i].codigoProduto}</td><td>${produtos[i].descricaoProduto}</td><td>${produtos[i].fabricanteProduto}</td><td>${produtos[i].quantidadeEstoque}</td><td style="text-align: center;"><button onclick="deletarGrid(${produtos[i].codigoProduto})" class="deletarGrid-btn">Deletar</button></td></tr>`;
        }

        tableContent += '</tbody></table>';
        listaDiv.innerHTML = tableContent;
        return;
    }
}
//----------------------------------------------------------------------------------
function deletarGrid(codigo) {
    const indice = produtos.findIndex(produto => produto.codigoProduto === codigo);

    if (indice !== -1) {
        produtos.splice(indice, 1);

        reset();
        deletar();
    }
}
//-------------------------------------------------------------------------------------
function reset() {
    document.getElementById('codigoProduto').value = '';
    document.getElementById('descricaoProduto').value = '';
    document.getElementById('fabricanteProduto').value = '';
    document.getElementById('quantidadeEstoque').value = '';
    document.getElementById('message').innerText = '';
    document.getElementById('lista').innerHTML = '';
}
//--------------------------------------------------------------------------------------