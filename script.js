
class Produto {

    constructor(nome, preco, quantidade) {
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
    }

    calcularSubtotal() {
        return this.preco * this.quantidade;
    }
}


// Lista de produtos
var listaDeProdutos = [];


// Formulário
var formulario = document.getElementById("form-produto");


// Cadastrar produto
formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    var nome = document.getElementById("nome").value;
    var preco = Number(document.getElementById("preco").value);
    var quantidade = Number(document.getElementById("quantidade").value);

    var produto = new Produto(nome, preco, quantidade);

    listaDeProdutos.push(produto);

    mostrarProdutos();

    formulario.reset();

});


// Mostrar produtos na tabela
function mostrarProdutos() {

    var tabela = document.getElementById("tabela-produtos");

    tabela.innerHTML = "";

    for (var i = 0; i < listaDeProdutos.length; i++) {

        var produto = listaDeProdutos[i];

        tabela.innerHTML += `
    
                <td>${produto.nome}</td>
                <td>R$ ${produto.preco.toFixed(2)}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.calcularSubtotal().toFixed(2)}</td>
           
    `;
    }

    atualizarTotalEstoque();
}


// Calcular total do estoque
function atualizarTotalEstoque() {

    var total = listaDeProdutos.reduce(function (total, produto) {

        return total + produto.calcularSubtotal();

    }, 0);

    document.getElementById("total-estoque").innerText =
        "Total do estoque: R$ " + total.toFixed(2);
}


// Botão limpar estoque
document.getElementById("limpar-tabela").addEventListener("click", function () {

    listaDeProdutos.length = 0;

    mostrarProdutos();

});

