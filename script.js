
class Produto {
    #preco;
    #quantidade;

    constructor(nome, preco, quantidade) {
        if (!nome || nome.trim() === "") {
            throw new Error("O nome do produto não pode estar em branco!");
        }

        if (isNaN(preco) || preco <= 0) {
            throw new Error("O preço deve ser maior que zero (R$ 0,00)!");
        }

        if (isNaN(quantidade) || quantidade <= 0) {
            throw new Error("A quantidade deve ser maior que zero!");
        }

        this.nome = nome.trim();
        this.#preco = preco;
        this.#quantidade = quantidade;
    }

    get preco() {
        return this.#preco;
    }

    get quantidade() {
        return this.#quantidade;
    }

    calcularSubtotal() {
        return this.#preco * this.#quantidade;
    }
}

var listaDeProdutos = [];

var formulario = document.getElementById("form-produto");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    var nome = document.getElementById("nome").value;
    var preco = Number(document.getElementById("preco").value);
    var quantidade = Number(document.getElementById("quantidade").value);

    try {
        var produto = new Produto(nome, preco, quantidade);
        listaDeProdutos.push(produto);

        mostrarProdutos();
        formulario.reset();
    } catch (erro) {
        alert(erro.message);
    }
});

function mostrarProdutos() {
    var tabela = document.getElementById("tabela-produtos");
    tabela.innerHTML = "";

    for (var i = 0; i < listaDeProdutos.length; i++) {
        var produto = listaDeProdutos[i];

        tabela.innerHTML += `
            <tr>
                <td>${produto.nome}</td>
                <td>R$ ${produto.preco.toFixed(2).replace(".", ",")}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.calcularSubtotal().toFixed(2).replace(".", ",")}</td>
                <td>
                    <button class="btn-remover" onclick="removerProduto(${i})">Remover</button>
                </td>
            </tr>
        `;
    }

    atualizarTotalEstoque();
}

function removerProduto(index) {
    listaDeProdutos.splice(index, 1);
    mostrarProdutos();
}

function atualizarTotalEstoque() {
    var total = listaDeProdutos.reduce(function (acumulador, produto) {
        return acumulador + produto.calcularSubtotal();
    }, 0);

    document.getElementById("total-estoque").innerText =
        "Total do estoque: R$ " + total.toFixed(2).replace(".", ",");
}

document.getElementById("limpar-tabela").addEventListener("click", function () {
    listaDeProdutos.length = 0;
    mostrarProdutos();
});