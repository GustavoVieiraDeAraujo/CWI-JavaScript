let HIGIENE_MAXIMA = 28
let PERDA_HIGIENE_TREINO = - 2
let PERDA_HIGIENE_ATIVIDADE_INTEIRA = - 4


export function alteraHigiene(personagem, atividade) {
    let novaHigiene = 0
    let permissao
    switch (atividade) {
        case "Tomar banho":
            novaHigiene = alteraHigieneTomarBanho()
            personagem.saldo -= 10
            personagem.higiene = novaHigiene
            return personagem
        case "Atividade":
            if (personagem.energia > 11) {
                novaHigiene = alteraHigieneTrabalhoCompleto()
                permissao = verificaHigieneNegativa(personagem, novaHigiene)
                if (permissao) {
                    personagem.higiene = novaHigiene
                    return personagem
                }
            }
            else {
                novaHigiene = alteraHigieneTrabalhoIncompleto() //alterar
                permissao = verificaHigieneNegativa(personagem, novaHigiene)
                if (permissao) {
                    personagem.higiene = novaHigiene
                    return personagem
                }
                break
            }
        case "Treino":
            novaHigiene = personagem.higiene +
                alteraHigieneTreino()
            permissao = verificaHigieneNegativa(personagem, novaHigiene)
            if (permissao) {
                personagem.higiene = novaHigiene
                return personagem
            }
            break
    }
}

export function alteraHigieneTomarBanho() {
    return HIGIENE_MAXIMA
}

export function alteraHigieneTrabalhoCompleto() {
    return PERDA_HIGIENE_ATIVIDADE_INTEIRA
}

export function alteraHigieneTreino() {
    return PERDA_HIGIENE_TREINO
}

export function alteraHigieneTrabalhoIncompleto() {
    let perdaHigieneIncompleta = 0
    return perdaHigieneIncompleta
}

export function verificaHigieneNegativa(personagem, perda) {
    if (personagem.higiene + perda > 0) {
        return true
    } else {
        return false
    }
}

