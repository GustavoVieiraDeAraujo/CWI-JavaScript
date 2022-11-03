function verificaSeTemRelacionamentoEntreOsPersonagens(personagemQueInterage, personagemQueSofreInteracao) {
    if (personagemQueInterage.relacionamentos[personagemQueSofreInteracao.id]) {
        return [personagemQueInterage.id, personagemQueInterage.relacionamentos[personagemQueSofreInteracao.id]];
    } else if (personagemQueSofreInteracao.relacionamentos[personagemQueInterage.id]) {
        return [personagemQueSofreInteracao.id, personagemQueSofreInteracao.relacionamentos[personagemQueInterage.id]];
    } else {
        return false
    };
};

function criaRelacionamentoSeNãoExistir(personagemQueInterage, personagemQueSofreInteracao){
    personagemQueInterage.relacionamentos[personagemQueSofreInteracao.id] = ["NEUTRO", 0];
    return [personagemQueInterage.id, personagemQueInterage.relacionamentos[personagemQueSofreInteracao.id]]
};

function atualizaOsPontosDeInteracaoDoPersonagem(personagemQueInterage, personagemQueSofreInteracao, quantidadeDePontos) {
    personagemQueInterage.relacionamentos[personagemQueSofreInteracao.id][1] += quantidadeDePontos;
};

function atualizaONivelDeInteracao(personagemQueInterage, personagemQueSofreInteracao) {
    const quantidadeDePontosDeInterecao = personagemQueInterage.relacionamentos[personagemQueSofreInteracao.id][1];
    if (quantidadeDePontosDeInterecao < 0) {
        personagemQueInterage.relacionamentos[personagemQueSofreInteracao.id][0] = "INIMIZADE";
    } else if (quantidadeDePontosDeInterecao >= 0 && quantidadeDePontosDeInterecao <= 10) {
        personagemQueInterage.relacionamentos[personagemQueSofreInteracao.id][0] = "NEUTRO";
    } else if (quantidadeDePontosDeInterecao >= 11 && quantidadeDePontosDeInterecao <= 25) {
        personagemQueInterage.relacionamentos[personagemQueSofreInteracao.id][0] = "AMIZADE";
    } else if (quantidadeDePontosDeInterecao > 25) {
        personagemQueInterage.relacionamentos[personagemQueSofreInteracao.id][0] = "AMOR";
    };
};

function atualizaPontosDeEnergia(personagemQueInterage, personagemQueSofreInteracao, quantidadeDeEnergia){
    const energiaAtual = personagemQueSofreInteracao.energia;
    personagemQueInterage.energia -= quantidadeDeEnergia;
    personagemQueSofreInteracao.energia = Math.round((energiaAtual / 2));
    return energiaAtual
};

function atualizaTempoDeVida(personagemQueInterage, personagemQueSofreInteracao, quantidadeDeEnergia, valorAntigo) {
    personagemQueInterage.tempoDeVida -= (quantidadeDeEnergia * 2000);
    personagemQueSofreInteracao.tempoDeVida -= ((valorAntigo - personagemQueSofreInteracao.energia) * 2000);
};

export function definiORelacionamento(personagemQueInterage, personagemQueSofreInteracao) {
    let relacionamento = verificaSeTemRelacionamentoEntreOsPersonagens(personagemQueInterage, personagemQueSofreInteracao);
    if (relacionamento === false) {
        relacionamento = criaRelacionamentoSeNãoExistir(personagemQueInterage, personagemQueSofreInteracao);
    }
    return relacionamento
};

export function retornaUmaListaDeTodasAsInteracoesComBaseNoNivelDeInteracao(nivelDeInteracao, jsonInteracoes) {
    switch (nivelDeInteracao) {
        case 'INIMIZADE':
            return [...jsonInteracoes["NEUTRO"], ...jsonInteracoes["INIMIZADE"]]
        case 'NEUTRO':
            return [...jsonInteracoes["NEUTRO"]]
        case 'AMIZADE':
            return [...jsonInteracoes["NEUTRO"], ...jsonInteracoes["AMIZADE"]]
        case 'AMOR':
            return [...jsonInteracoes["NEUTRO"], ...jsonInteracoes["AMIZADE"], ...jsonInteracoes["AMOR"]]
        default:
            return `Nivel de interação ${nivelDeInteracao} não existe`
    };
};

export function personagemInteragi(personagemQueInterage, personagemQueSofreInteracao, relacionamento, interacaoEscolhida, localStorage){
    if (relacionamento[0] === personagemQueInterage.id) {
        atualizaOsPontosDeInteracaoDoPersonagem(personagemQueInterage, personagemQueSofreInteracao, interacaoEscolhida.pontos);
        atualizaONivelDeInteracao(personagemQueInterage, personagemQueSofreInteracao);
        const valorAntigo = atualizaPontosDeEnergia(personagemQueInterage, personagemQueSofreInteracao, interacaoEscolhida.energia);
        atualizaTempoDeVida(personagemQueInterage, personagemQueSofreInteracao, interacaoEscolhida.energia, valorAntigo);
    } else {
        atualizaOsPontosDeInteracaoDoPersonagem(personagemQueSofreInteracao, personagemQueInterage, interacaoEscolhida.pontos);
        atualizaONivelDeInteracao(personagemQueSofreInteracao, personagemQueInterage);
        const valorAntigo = atualizaPontosDeEnergia(personagemQueSofreInteracao, personagemQueInterage, interacaoEscolhida.energia);
        atualizaTempoDeVida(personagemQueSofreInteracao, personagemQueInterage, interacaoEscolhida.energia, valorAntigo);
    };

    const posicaoPersonagemQueInterage = localStorage.returnObjectPositionInListById("lista-de-personagens", personagemQueInterage.id);
    const posicaoPersonagemQueSofreInteracao = localStorage.returnObjectPositionInListById("lista-de-personagens", personagemQueSofreInteracao.id);
    localStorage.updateList("lista-de-personagens", posicaoPersonagemQueInterage, personagemQueInterage);
    localStorage.updateList("lista-de-personagens", posicaoPersonagemQueSofreInteracao, personagemQueSofreInteracao);
};