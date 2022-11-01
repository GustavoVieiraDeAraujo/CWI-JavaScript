import { alteraEnergia } from '../energy/energy.js'
import { alteraTempo } from '../time/time.js'

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
            personagem = alteraNivelHabilidade(personagem, false, personagem.aspiracao, "cheat")
            personagem = verificaPromocaoHabilidade(personagem)
            return personagem

            break
    
        case "CAROLINAS":
            personagem = alteraTempo(personagem, cheatEscolhido, 0)
            return personagem
    
        case "SINUSITE":
            personagem = alteraTempo(personagem, cheatEscolhido, 0)
            return personagem

    }
}