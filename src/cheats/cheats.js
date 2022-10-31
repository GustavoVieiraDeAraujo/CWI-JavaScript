import { alteraEnergia } from '../energy/energy.js'

export function verificaCheat( listaCheat, inputPassado) {

    for (let i = 0; i < listaCheat.length; i ++) {
        if (inputPassado === listaCheat[i].codigo) {
            return [true, listaCheat[i].codigo]
        }

    }
    return [false, "nada"]
}

export function realizaCheat(personagem, listaCheat, cheatEscolhido) {
    switch (cheatEscolhido) {
        case "SORTENAVIDA":


            break

        case "DEITADONAREDE":
            personagem = alteraEnergia(personagem, cheatEscolhido, 0)
            return personagem

        case "JUNIM":


            break
    
        case "CAROLINAS":
            personagem.tempoDeVida  = personagem.tempoDeVida + 100000
            return personagem
    
        case "SINUSITE":
            personagem.tempoDeVida  = 0
            return personagem

    }
}