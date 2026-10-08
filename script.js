// Array para armazenar os produtos
let produtos = [];

// Elementos do DOM
const formProduto = document.getElementById("form-produto");
const listaProdutos = document.getElementById("lista-produtos");
const areaEtiqueta = document.getElementById("area-etiqueta");
const qrcodeContainer = document.getElementById("qrcode");

// Carregar produtos do localStorage ao iniciar
window.onload = function() {
    const produtosSalvos = localStorage.getItem("produtos");
    if (produtosSalvos) {
        produtos = JSON.parse(produtosSalvos);
        renderizarTabela();
    }
};

// Evento de submissão do formulário (RF: Persistência de Dados)
formProduto.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const preco = parseFloat(document.getElementById("preco").value);

    const novoProduto = {
        id: Date.now(), // ID único baseado no timestamp
        nome: nome,
        preco: preco
    };

    produtos.push(novoProduto);
    salvarNoLocalStorage();
    renderizarTabela();
    
    formProduto.reset();
});

// Salvar no localStorage (RF)
function salvarNoLocalStorage() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Renderizar lista na tabela
function renderizarTabela() {
    listaProdutos.innerHTML = "";

    produtos.forEach((produto) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${produto.nome}</td>
            <td>R$ ${produto.preco.toFixed(2)}</td>
            <td>
                <button onclick="gerarEtiqueta(${produto.id})">🏷️ Gerar QR Code</button>
                <button onclick="removerProduto(${produto.id})">❌ Eliminar</button>
            </td>
        `;

        listaProdutos.appendChild(tr);
    });
}

// RF: Geração de QR Code e Etiqueta por Produto
function gerarEtiqueta(id) {
    const produto = produtos.find(p => p.id === id);
    if (!produto) return;

    // Atualiza os dados da etiqueta
    document.getElementById("etiqueta-nome").innerText = `Produto: ${produto.nome}`;
    document.getElementById("etiqueta-preco").innerText = `Preço: R$ ${produto.preco.toFixed(2)}`;

    // Limpa o QR Code anterior
    qrcodeContainer.innerHTML = "";

    // Conteúdo gravado dentro do QR Code
    const dadosQRCode = JSON.stringify({
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco
    });

    // Cria o novo QR Code
    new QRCode(qrcodeContainer, {
        text: dadosQRCode,
        width: 128,
        height: 128
    });

    areaEtiqueta.style.display = "block";
}

// Função do Botão de Impressão da Etiqueta
function imprimirEtiqueta() {
    window.print();
}

// Remover Produto
function removerProduto(id) {
    produtos = produtos.filter(p => p.id !== id);
    salvarNoLocalStorage();
    renderizarTabela();
    areaEtiqueta.style.display = "none";
}