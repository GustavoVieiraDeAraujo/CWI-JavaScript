import { useLocalStorage } from "./services/local-storage/use-local-storage.js"
import { useQuestion } from './services/question/use-question.js'
import axios from "axios";




export async function getItens() {
    const itens = await axios.get('https://emilyspecht.github.io/the-cresim/itens-habilidades.json')
    return itens.data
}

export function getPersonagemById(id) {
    const localStorage = useLocalStorage();
    const personagens = localStorage.getObject('lista-de-personagens')
    const posicao = localStorage.returnObjectPositionInListById('lista-de-personagens', id)
    return personagens[posicao]
}

// export const criaPersonagem = (nomePersonagem, aspiracaoPersonagem) => {
//     const localStorage = useLocalStorage();

//     let objetoPersonagem = {
//         id: retornaTamanhoDaLista(localStorage.getObject('lista-de-personagens')) + 1,
//         nome: nomePersonagem,
//         tempoDeVida: 3600,
//         saldo: 4000,
//         aspiracao: aspiracaoPersonagem,
//         higiene: 28,
//         energia: 32,
//         habilidades: {
//             gastronomia: ["JUNIOR", 0],
//             pintura: ["JUNIOR", 0],
//             jogos: ["JUNIOR", 0],
//             jardinagem: ["JUNIOR", 0],
//             musica: ["JUNIOR", 0]
//         },
//         relacionamentos: {},
//         inventario: []
//     }

//     if (localStorage.getObject('lista-de-personagens') === null) {
//         localStorage.setObject('lista-de-personagens', [{ ...objetoPersonagem }])
//     } else {
//         localStorage.setObject('lista-de-personagens', [...localStorage.getObject('lista-de-personagens'), { ...objetoPersonagem }])
//     }
// }

export function retornaTamanhoDaLista(lista) {
    if (lista === null) {
        return 0;
    } else {
        return lista.length;
    }
}

export function retornaItensPorCategoria(categoria, itens) {
    let itensSelecionados = []
    let categoriaRecebida = categoria.toUpperCase()
    for (let i = 0; i < itens[categoriaRecebida].length; i++) {
        itensSelecionados.push(itens[categoriaRecebida][i])
    }
    return itensSelecionados
}

export function mostraItem(item) {
    console.log("-------------------------------------")
    console.log("   ID: " + item.id)
    console.log("   Nome: " + item.nome)
    console.log("   Pontos: " + item.pontos)
    console.log("   Preço: $" + item.preco)
}

export function compraItem(personagem, item) {
    for (let i = 0; i < personagem.inventario.length; i++) {
        if (personagem.inventario[i].id === item.id) {
            return -1;
        }
    }
    if (personagem.saldo >= item.preco) {
        personagem.inventario = [...personagem.inventario, item]
        personagem.saldo = personagem.saldo - item.preco
        atualizaPersonagemNaLista(personagem)
        return 1
    } else {
        return -2
    }
}

export function atualizaPersonagemNaLista(personagem) {
    const localStorage = useLocalStorage();
    let i = localStorage.returnObjectPositionInListById('lista-de-personagens', personagem.id)
    localStorage.updateList('lista-de-personagens', i, personagem)
}

export function loja(categoria, personagem, itens) {
    let itensRecebidos
    itensRecebidos = retornaItensPorCategoria(categoria, itens)
    for (let i = 0; i < itensRecebidos.length; i++) {
        mostraItem(itensRecebidos[i])
    }
    console.log("")
    console.log("                         $" + personagem.saldo)
    console.log("")
}

// export async function montaLojaDaCategoria(personagemSelecionado, categoria, itens) {
//     console.clear()
//     let loopLojaCategoria = true
//     while (loopLojaCategoria) {

//         loja(categoria, personagemSelecionado, itens)
//         let opcaoAcao = await useQuestion('Digite o ID do produto desejado ou "0" para voltar')

//         if (opcaoAcao === '0') {
//             console.clear()
//             loopLojaCategoria = false
//             break
//         } else if (opcaoAcao >= 1 && opcaoAcao <= 3) {
//             const itensCategoria = retornaItensPorCategoria(categoria, itens)

//             for (let i = 0; i < itensCategoria.length; i++) {
//                 if (itensCategoria[i].id == opcaoAcao) {
//                     const realizouCompra = compraItem(personagemSelecionado, itensCategoria[i])
//                     switch (realizouCompra) {
//                         case 1:
//                             console.clear()
//                             console.log("Compra bem sucedida")
//                             personagemSelecionado = getPersonagemById(personagemSelecionado.id)
//                             break
//                         case -1:
//                             console.clear()
//                             console.log(personagemSelecionado.nome + " já tem " + itensCategoria[i].nome)
//                             break
//                         case -2:
//                             console.clear()
//                             console.log(personagemSelecionado.nome + " não tem saldo suficiente.")
//                     }
//                 }
//             }

//         } else {
//             console.clear()
//             console.log(chalk.redBright("Opção inválida, tente novamente."))
//         }
//         loopLojaCategoria = false
    }
}




// O que dá para requisitar:
// "itens-habilidades"
// "empregos"
// "interacoes"
// "cheats"
// export const get = async (OQueEstaRequisitando) => {
//     try {
//         const request = await axios.get(`https://emilyspecht.github.io/the-cresim/${OQueEstaRequisitando}.json`)
//         return request.data
//     } catch (e) {
//         console.log(e)
//     }
// }



// export const pegaUmCheatPeloCodigo = async (codigoCheat) => {
//     try {
//         const jsonCheats = await retornaUmJsonDoQueEstaRequisitando("cheats")
//         for (let i = 0; i < jsonCheats.length; i++) {
//             if (jsonCheats[i].codigo === codigoCheat) {
//                 return jsonCheats[i]
//             }
//         }
//         return `Cheat ${codigoCheat} não existe`
//     } catch (e) {
//         console.log(e)
//     }
// }

