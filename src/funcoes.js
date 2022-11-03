import chalk from 'chalk';
import { arteCompraBemSucedida, arteItemJaPossuido, arteSaldoInsuficiente } from "../ascii-arts/arts.js";

export function retornaItensPorCategoria(categoria, itens) {
    let itensSelecionados = [];
    let categoriaRecebida = categoria.toUpperCase();
    for (let i = 0; i < itens[categoriaRecebida].length; i++) {
        itensSelecionados.push(itens[categoriaRecebida][i]);
    };
    return itensSelecionados
};

export function mostraItem(item) {
    console.log("-------------------------------------");
    console.log("   ID: " + item.id);
    console.log("   Nome: " + item.nome);
    console.log("   Pontos: " + item.pontos);
    console.log("   Preço: $" + item.preco);
    console.log("-------------------------------------");
};

export function mostraItensDoPersonagem(personagem) {
    for (let item of personagem.inventario) {
        console.log('');
        mostraItem(item);
    };
};

export function mostraItensDoPersonagemPorCategoria(personagem) {
    for (let item of personagem.inventario) {
        console.log('');
        mostraItem(item);
    };
};

export function compraItem(personagem, item, localStorage) {
    for (let i = 0; i < personagem.inventario.length; i++) {
        if (personagem.inventario[i].nome === item.nome) {
            return -1
        };
    };
    if (personagem.saldo >= item.preco) {
        personagem.inventario = [...personagem.inventario, item];
        personagem.saldo = personagem.saldo - item.preco;
        let i = localStorage.returnObjectPositionInListById('lista-de-personagens', personagem.id);
        localStorage.updateList('lista-de-personagens', i, personagem);
        return 1
    } else {
        return -2
    };
};

export function loja(categoria, personagem, itens) {
    let itensRecebidos;
    itensRecebidos = retornaItensPorCategoria(categoria, itens);
    for (let i = 0; i < itensRecebidos.length; i++) {
        mostraItem(itensRecebidos[i]);
    };
    console.log("");
    console.log("                         $" + personagem.saldo);
    console.log("");
};

export function acaoCompra(opcaoAcao, itens, personagem, categoria) {
    if (opcaoAcao === '0') {
        console.clear();
        return 0
    } else if (opcaoAcao >= 1 && opcaoAcao <= 3) {
        const itensCategoria = retornaItensPorCategoria(categoria, itens);
        for (let i = 0; i < itensCategoria.length; i++) {
            if (itensCategoria[i].id == opcaoAcao) {
                const realizouCompra = compraItem(personagem, itensCategoria[i]);
                switch (realizouCompra) {
                    case 1:
                        console.clear()
                        arteCompraBemSucedida()
                        return 1
                    case -1:
                        console.clear()
                        arteItemJaPossuido()
                        return 2
                    case -2:
                        console.clear()
                        arteSaldoInsuficiente()
                        return 3
                };
            };
        };
    } else if (opcaoAcao < 1 || opcaoAcao > 3) {
        console.clear();
        console.log(chalk.redBright("Opção inválida, tente novamente."));
        return 4
    };
};

