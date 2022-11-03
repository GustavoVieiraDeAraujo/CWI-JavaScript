let HIGIENE_MAXIMA = 28;
let PERDA_HIGIENE_TREINO = -2;

export function alteraHigiene(personagem, atividade) {
    let novaHigiene = 0;
    let permissao;
    switch (atividade) {
        case "Tomar banho":
            personagem.saldo -= 10;
            novaHigiene = alteraHigieneTomarBanho();
            personagem.higiene = novaHigiene;
            return personagem
        case "Treino":
            novaHigiene = personagem.higiene + alteraHigieneTreino();
            permissao = verificaHigieneNegativa(personagem, novaHigiene);
            if (permissao) {
                personagem.higiene = novaHigiene;
                return personagem
            }
            break
    };
};

export function alteraHigieneTomarBanho() {
    return HIGIENE_MAXIMA
};

export function alteraHigieneTreino() {
    return PERDA_HIGIENE_TREINO
};

export function verificaHigieneNegativa(personagem, perda) {
    if ((personagem.higiene + perda ) > 0) {
        return true
    } else {
        return false
    };
};

