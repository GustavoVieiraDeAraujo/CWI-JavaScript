// funcionando
const verificarSeOCorredorEstaNaCorrida = (listaDeCorredores, nomeCorredor) => {
    for (let i = 0; i < listaDeCorredores.length; i++){
        if (listaDeCorredores[i].nome === nomeCorredor){
            return true
        }
    }
    return false
}

// funcionando
const verificarSeOAliadoEInimigoDosCorredoresEstaoNaCorrida = (listaDeCorredores) =>{
    listaDeCorredores.forEach(corredor => {
        if (!(verificarSeOCorredorEstaNaCorrida(listaDeCorredores, corredor.aliado))){
            corredor.aliado = ''
        }
        if (!(verificarSeOCorredorEstaNaCorrida(listaDeCorredores, corredor.inimigo))){
            corredor.inimigo = ''
        }
    })
}

// funcionando
export const aplicarBuffDeVantagemDeTerreno = (listaDeCorredores, pista) =>{
    listaDeCorredores.forEach(corredor => {
        if(corredor.vantagem === pista.tipo){
            corredor.velocidade += 2
            corredor.drift += 2 
            corredor.aceleracao +=2
        }
    })
    return listaDeCorredores
}

// funcionando
const pegaPosicaoDoCorredor = (listaDeCorredores ,nomeCorredor) =>{
    for (let i = 0; i < listaDeCorredores.length; i++) {
        if (listaDeCorredores[i].nome === nomeCorredor) {
            return listaDeCorredores[i].posicao
        }
    }
}

// funcionando
const pegaCorredor = (listaDeCorredores, nomeCorredor) =>{
    for (let i = 0; i < listaDeCorredores.length; i++) {
        if (listaDeCorredores[i].nome === nomeCorredor) {
            return listaDeCorredores[i]
        }
    }
}

// funcionando
const verificaSeTemAliadoProximo = (listaDeCorredores, corredor) =>{
    if (corredor.aliado != ''){
        let diferencaAteOAliado
        const posicaoAliado = pegaPosicaoDoCorredor(listaDeCorredores, corredor.aliado)

        if (posicaoAliado > corredor.posicao){
            diferencaAteOAliado = posicaoAliado - corredor.posicao
        }else{
            diferencaAteOAliado = corredor.posicao - posicaoAliado
        }
        
        if (diferencaAteOAliado <= 2){
            return true
        }
    }
}

// funcionando
const verificaSeTemInimigoProximo = (listaDeCorredores, corredor) => {
    if (corredor.aliado != '') {
        let diferencaAteOInimigo
        const posicaoInimigo = pegaPosicaoDoCorredor(listaDeCorredores, corredor.inimigo)

        if (posicaoInimigo > corredor.posicao) {
            diferencaAteOInimigo = posicaoInimigo - corredor.posicao
        } else {
            diferencaAteOInimigo = corredor.posicao - posicaoInimigo
        }

        if (diferencaAteOInimigo <= 2) {
           return true
        }
    }
}

// funcionando
const construirDicionarioComAsPosicoesDeBuff = (pista) => {
    const dic = {}
    pista.posicoesBuffs.forEach((posicao) => {
        dic[posicao] = []
    })
    return dic
}

// funcionando
const atualizarDicionarioDePosicoesComBuff = (dicionarioDePosicoes, listaDeCorredores) =>{
    for (const posicao in dicionarioDePosicoes) {
        listaDeCorredores.forEach(corredor => {
            if (!(dicionarioDePosicoes[posicao].includes(corredor.nome)) && corredor.posicao > posicao){
                dicionarioDePosicoes[posicao].push(corredor.nome)
            }
        })
    }
}

// funcionando
const adicionaBuffDePosicao = (corredor, dicionarioDePosicoes) => {
    for (const posicao in dicionarioDePosicoes) {
        if (!(dicionarioDePosicoes[posicao].includes(corredor.nome)) && corredor.posicao > parseInt(posicao)){
            corredor.posicao += dicionarioDePosicoes[posicao].length
        }
    }
}

// funcionando
const verificaSeHaGanhador = (listaDeCorredores, pista) => {
    for (let i = 0; i < listaDeCorredores.length; i++) {
        if (listaDeCorredores[i].posicao >= pista.tamanho) {
            return [true, listaDeCorredores[i]]
        }
    }
    return [false,'']
} 

// funcionando
export const executaRodada = (listaDeCorredores, pista, posicoesComBuff, atributo) => {
    listaDeCorredores.forEach(corredor => {
        const temAliado = verificaSeTemAliadoProximo(listaDeCorredores, pegaCorredor(listaDeCorredores, corredor.nome))
        const temInimigo = verificaSeTemInimigoProximo(listaDeCorredores, pegaCorredor(listaDeCorredores, corredor.nome))
        if (!(corredor.nome === 'Dick Vigarista' && corredor.posicao === (pista.tamanho - 1))) {
            if ( !(temAliado && temInimigo)){
                if (temAliado){
                    corredor.posicao += 1
                }
                if (temInimigo && corredor.posicao >= 1){
                    corredor.posicao -= 1
                }}
            switch(atributo){
                case 'aceleração':
                    if (corredor.aceleracao + pista.debuff > 0) {
                        corredor.posicao += (corredor.aceleracao + pista.debuff)
                    }
                    break;
                case 'velocidade':
                    if (corredor.velocidade + pista.debuff > 0) {
                        corredor.posicao += (corredor.velocidade + pista.debuff)
                    }
                    break
                case 'drift':
                    if (corredor.drift + pista.debuff > 0) {
                        corredor.posicao += (corredor.drift + pista.debuff)
                    }
                    break;
            }
            adicionaBuffDePosicao(pegaCorredor(listaDeCorredores, corredor.nome), posicoesComBuff)
        }
    })
    atualizarDicionarioDePosicoesComBuff(posicoesComBuff, listaDeCorredores)
    return listaDeCorredores
}

// funcionando
export const iniciarPreparosDaCorrida = (listaDeCorredores, pista) =>{
    verificarSeOAliadoEInimigoDosCorredoresEstaoNaCorrida(listaDeCorredores)
    aplicarBuffDeVantagemDeTerreno(listaDeCorredores, pista)
    return construirDicionarioComAsPosicoesDeBuff(pista)
}

// funcionando
export const começaCorrida = (listaDeCorredores, pista, posicoesComBuff) =>{
    for(let i = 0; i < 3; i++){
        executaRodada(listaDeCorredores, pista, posicoesComBuff, 'aceleração')
        const temGanhador = verificaSeHaGanhador(listaDeCorredores, pista)
        if ( temGanhador[0] === true){
            return temGanhador[1]
        }
    }
    return false
}

// funcionando
export const restoDaCorrida = (listaDeCorredores, pista, posicoesComBuff) => {
    while(true){
        executaRodada(listaDeCorredores, pista, posicoesComBuff,'drift')
        for(let i = 0; i < 4; i++){
            executaRodada(listaDeCorredores, pista, posicoesComBuff, 'velocidade')
        }
        const temGanhador = verificaSeHaGanhador(listaDeCorredores, pista)
        if (temGanhador[0] === true) {
            return temGanhador[1]
        }
    }
}






