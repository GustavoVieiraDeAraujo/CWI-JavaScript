export const criaPersonagem = (nomePersonagem, aspiracaoPersonagem, localStorage) => {
    let novoPersonagem = {
        id: localStorage.returnListSize('lista-de-personagens') + 1,
        nome: nomePersonagem,
        tempoDeVida: 3600000,
        saldo: 1500,
        aspiracao: aspiracaoPersonagem,
        higiene: 28,
        energia: 32,
        inventario: [],
        trabalho: {
            JogadordeDota: ["JUNIOR", 160],
            AssistentedoJacquin: ["JUNIOR", 130],
            Seguradordepinceis: ["JUNIOR", 110],
            Desafinador: ["JUNIOR", 210],
            Ladraodeplanta: ["JUNIOR", 160]
        },
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
        localStorage.setObject('lista-de-personagens', [novoPersonagem])
    } else {
        localStorage.addToList('lista-de-personagens', novoPersonagem)
    }
}