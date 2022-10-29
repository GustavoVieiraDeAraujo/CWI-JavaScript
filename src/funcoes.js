import { useLocalStorage } from "./services/local-storage/use-local-storage"


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
        relacionamentos: {}
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

