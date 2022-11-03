import { alteraTempo } from '../time/time.js'
import { alteraEnergia } from '../energy/energy.js';

import { alteraNivelHabilidade, verificaPromocaoHabilidade } from '../training/training.js'
import { atualizaPersonagemNaLista } from '../funcoes.js'

import chalk from 'chalk';

export function verificaCheat(listaCheat, inputPassado) {

    for (let i = 0; i < listaCheat.length; i++) {
        if (inputPassado === listaCheat[i].codigo) {
            return [true, listaCheat[i].codigo]
        }
    }
    return [false, "nada"]
}
export function realizaCheat(personagem, cheatEscolhido) {
    switch (cheatEscolhido) {
        case "SORTENAVIDA":
            for (const trabalho in personagem.trabalho) {
                personagem.trabalho[trabalho][1] = Math.round(personagem.trabalho[trabalho][1] * 1.1)
            }
            return personagem

        case "DEITADONAREDE":
            personagem = alteraEnergia(personagem, cheatEscolhido, 0)
            return personagem
        case "JUNIM":
            personagem = alteraNivelHabilidade(personagem, false, personagem.aspiracao.toUpperCase(), "cheat")
            personagem = verificaPromocaoHabilidade(personagem, personagem.aspiracao.toUpperCase())

            return personagem

        case "CAROLINAS":
            personagem = alteraTempo(personagem, cheatEscolhido, 0)
            return personagem
        case "SINUSITE":
            personagem = alteraTempo(personagem, cheatEscolhido, 0)
            return personagem
        default:
            return "Cheat não existe"
    }
}

export function cheatWrapper(opcaoAcao, personagemSelecionado) {
    personagemSelecionado = realizaCheat(personagemSelecionado, opcaoAcao)
    atualizaPersonagemNaLista(personagemSelecionado)
    console.clear()
    console.log(chalk.red('█─▄▄▄─█─█─█▄─▄▄─██▀▄─██─▄─▄─████▀▄─██─▄─▄─█▄─▄█▄─█─▄██▀▄─██▄─▄▄▀█─▄▄─█'))
    console.log(chalk.red('█─███▀█─▄─██─▄█▀██─▀─████─██████─▀─████─████─███▄▀▄███─▀─███─██─█─██─█'))
    console.log(chalk.red('▀▄▄▄▄▄▀▄▀▄▀▄▄▄▄▄▀▄▄▀▄▄▀▀▄▄▄▀▀▀▀▄▄▀▄▄▀▀▄▄▄▀▀▄▄▄▀▀▀▄▀▀▀▄▄▀▄▄▀▄▄▄▄▀▀▄▄▄▄▀'))
    return personagemSelecionado
}

