let PERDA_TEMPO_ATIVIDADE = - 20000
let PERDA_TEMPO_TREINO = - 8000
let PERDA_TEMPO_DORMIR = - 5000
let GANHO_TEMPO_CHEAT_CAROLINAS = 100000
let TEMPO_FINAL_CHEAT_SINUSITE = 0

export function alteraTempo(personagem, atividade, quantidade) {
    let alteracaoTempo = 0

    switch(atividade) {
        case "Dormir":
            alteracaoTempo = alteraTempoDormir(quantidade)
            personagem.tempoDeVida = personagem.tempoDeVida + alteracaoTempo
            return personagem

        // case "Trabalho":
        //     alteracaoTempo = alteraTempoTrabalho()
        //     personagem.tempoDeVida = personagem.tempoDeVida + alteracaoTempo
        //     return personagem
        
        case "Treino":
            alteracaoTempo = alteraTempoTreino()
            personagem.tempoDeVida = personagem.tempoDeVida + alteracaoTempo 
            return personagem

        case "CAROLINAS":
            alteracaoTempo = alteraTempoCheatCarolinas() 
            personagem.tempoDeVida = personagem.tempoDeVida + alteracaoTempo
            return personagem

        case "SINUSITE": 
            personagem.tempoDeVida = alteraTempoCheatSinusite() 
            return personagem

    }

    
    
}

// export function alteraTempoTrabalho() {
//     let perdaHigieneIncompleta = 0

//     return perdaHigieneIncompleta
// }

export function alteraTempoTreino() {
    return PERDA_TEMPO_TREINO
}

export function alteraTempoCheatCarolinas() {
    return GANHO_TEMPO_CHEAT_CAROLINAS
}

export function alteraTempoCheatSinusite() {
    return TEMPO_FINAL_CHEAT_SINUSITE
}

export function alteraTempoDormir(quantidade) {
    let perdaTempoDormirTotal = PERDA_TEMPO_DORMIR * quantidade
    return perdaTempoDormirTotal
}


export function verificaTempo(personagem, alteracao) {
    if (personagem.tempoDeVida + alteracao > 0) {
        return true
    }
    else {
        return false
    }
}
