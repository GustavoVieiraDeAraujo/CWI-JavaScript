import { useLocalStorage } from "./services/local-storage/use-local-storage.js"
import axios from "axios";



export async function getItens() {
    const itens = await axios.get('https://emilyspecht.github.io/the-cresim/itens-habilidades.json')
    return itens.data
}

export const criaPersonagem = (nomePersonagem, aspiracaoPersonagem) => {
    const localStorage = useLocalStorage();

    let objetoPersonagem = {
        id: retornaTamanhoDaLista(localStorage.getObject('lista-de-personagens')) + 1,
        nome: nomePersonagem,
        tempoDeVida: 3600,
        saldo: 1500,
        aspiracao: aspiracaoPersonagem,
        higiene: 28,
        energia: 32,
        habilidades: {
            gastronomia: ["JUNIOR", 0],
            pintura: ["JUNIOR", 0],
            jogos: ["JUNIOR", 0],
            jardinagem: ["JUNIOR", 0],
            musica: ["JUNIOR", 0]
        },
        relacionamentos: {},
        inventario: {}
    }

    if (localStorage.getObject('lista-de-personagens') === null) {
        localStorage.setObject('lista-de-personagens', [{ ...objetoPersonagem }])
    } else {
        localStorage.setObject('lista-de-personagens', [...localStorage.getObject('lista-de-personagens'), { ...objetoPersonagem }])
    }
}

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

