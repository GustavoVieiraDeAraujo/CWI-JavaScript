import { alteraEnergia } from '../energy/energy.js'
import { alteraTempo } from '../time/time.js'
import { alteraNivelHabilidade, verificaPromocaoHabilidade } from '../train/train.js'
import { atualizaPersonagemNaLista } from '../funcoes.js'
import { useQuestion } from '../services/question/use-question.js'
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

export async function cheatOuMensagemDeErro(cheats, opcaoAcao, personagemSelecionado) {
    const cheatInserido = verificaCheat(cheats, opcaoAcao)
    if (cheatInserido[0]) {
        personagemSelecionado = realizaCheat(personagemSelecionado, opcaoAcao)
        atualizaPersonagemNaLista(personagemSelecionado)
        console.clear()
        console.log(chalk.red('█─▄▄▄─█─█─█▄─▄▄─██▀▄─██─▄─▄─████▀▄─██─▄─▄─█▄─▄█▄─█─▄██▀▄─██▄─▄▄▀█─▄▄─█'))
        console.log(chalk.red('█─███▀█─▄─██─▄█▀██─▀─████─██████─▀─████─████─███▄▀▄███─▀─███─██─█─██─█'))
        console.log(chalk.red('▀▄▄▄▄▄▀▄▀▄▀▄▄▄▄▄▀▄▄▀▄▄▀▀▄▄▄▀▀▀▀▄▄▀▄▄▀▀▄▄▄▀▀▄▄▄▀▀▀▄▀▀▀▄▄▀▄▄▀▄▄▄▄▀▀▄▄▄▄▀'))
        return [personagemSelecionado, "cheat"]
    } else {
        console.clear();
        console.log(chalk.redBright("Opção inválida, tente novamente."));
        return [personagemSelecionado, "erro"]
    }
}