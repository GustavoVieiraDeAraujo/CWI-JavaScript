let ENERGIA_MAXIMA = 32
let PERDA_ENERGIA_TREINO = - 4
let GANHO_ENERGIA_DORMIR_1 = 4
let GANHO_ENERGIA_DORMIR_SEGUINTES = 6
let GANHO_ENERGIA_CHEAT_DEITADONAREDE = 5
let PERDA_ENERGIA_ATIVIDADE_INTEIRA = - 10

export function alteraEnergia(personagem, atividade, ciclos) {
    let novaEnergia = 0
    let permissao
    let finalizadaCorretamente = true
    let atividadesRealizadas = 1
    switch (atividade) {
        case "Dormir":
            novaEnergia = alteraEnergiaDormir(personagem, ciclos)[0]
            atividadesRealizadas = alteraEnergiaDormir(personagem, ciclos)[1]
            if (atividadesRealizadas != ciclos) {
                finalizadaCorretamente = false
            }
            personagem.energia = personagem.energia + novaEnergia
            return [personagem, finalizadaCorretamente, atividadesRealizadas]
        case "Trabalho":
            if (personagem.energia < 4) {
                finalizadaCorretamente = false
                atividadesRealizadas = 0
                return [personagem, finalizadaCorretamente, atividadesRealizadas]
            } else {
                if (verificaEnergia(personagem, (PERDA_ENERGIA_ATIVIDADE_INTEIRA - 5))) {
                    novaEnergia = alteraEnergiaTrabalhoCompleto()
                    personagem.energia = personagem.energia + novaEnergia
                    return [personagem, finalizadaCorretamente, atividadesRealizadas]
                } else {
                    finalizadaCorretamente = false
                    novaEnergia = alteraEnergiaTrabalhoIncompleto(personagem)[0]
                    atividadesRealizadas = alteraEnergiaTrabalhoIncompleto(personagem)[1]
                    personagem.energia = personagem.energia + novaEnergia
                    return [personagem, finalizadaCorretamente, atividadesRealizadas]
                }
            }
        case "Treino":
            novaEnergia = alteraEnergiaTreino()
            permissao = verificaEnergia(personagem, novaEnergia)
            if (!permissao) {
                finalizadaCorretamente = false
                atividadesRealizadas = 0

            } else {
                personagem.energia = personagem.energia + novaEnergia
                return [personagem, finalizadaCorretamente, atividadesRealizadas]
            }
            break
        case "DEITADONAREDE":
            novaEnergia = alteraEnergiaCheat()
            permissao = verificaEnergia(personagem, novaEnergia)
            if (!permissao) {
                finalizadaCorretamente = false
                atividadesRealizadas = 0

            } else {
                personagem.energia = personagem.energia + novaEnergia
                return personagem
            }
            break
    }
}
export function alteraEnergiaDormir(personagem, ciclos) {
    let energiaGanha = 0
    let ciclosCompletos = 0
    if ((verificaEnergia(personagem, GANHO_ENERGIA_DORMIR_1))) {
        ciclosCompletos = ciclosCompletos + 1
        energiaGanha = energiaGanha + GANHO_ENERGIA_DORMIR_1
    }
    for (let i = 1; i < ciclos; i++) {
        if ((verificaEnergia(personagem, (energiaGanha + GANHO_ENERGIA_DORMIR_SEGUINTES)))) {
            ciclosCompletos = ciclosCompletos + 1
            energiaGanha = energiaGanha + GANHO_ENERGIA_DORMIR_SEGUINTES
        }
    }
    return [energiaGanha, ciclosCompletos]
}
export function alteraEnergiaTreino() {
    return PERDA_ENERGIA_TREINO
}
export function alteraEnergiaCheat() {
    return GANHO_ENERGIA_CHEAT_DEITADONAREDE
}
export function verificaEnergia(personagem, alteracao) {
    if (personagem.energia + alteracao >= 0 && personagem.energia + alteracao <= ENERGIA_MAXIMA) {
        return true
    }else {
        return false
    }
}
