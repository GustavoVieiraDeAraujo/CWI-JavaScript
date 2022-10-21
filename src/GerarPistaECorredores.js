import axios from "axios"

export const pegaUmaPistaPeloNome = async (nomePista) => {
    try {
        const requisicao = await axios.get('https://gustavobuttenbender.github.io/gus.github/corrida-maluca/pistas.json')
        return requisicao.data.filter(pista => pista.nome === nomePista).pop()
    } catch (e) {
        console.log(e)
    }
}

export const pegaUmCorredorPeloNomeComOuSemAliadoEInimigo = async (nomeCorredor, nomeAliado, nomeInimigo) => {
    try {
        const requisicao = await axios.get('https://gustavobuttenbender.github.io/gus.github/corrida-maluca/personagens.json')
        let corredor = requisicao.data.filter(corredor => corredor.nome === nomeCorredor).pop()
        corredor.posicao = 0
        if (nomeAliado !== '' && nomeInimigo !== '') {
            corredor.aliado = nomeAliado 
            corredor.inimigo = nomeInimigo
        } else if (nomeAliado !== '' && !(nomeInimigo !== '')) {
            corredor.aliado = nomeAliado
            corredor.inimigo = ''
        } else if (nomeInimigo !== '' && !(nomeAliado !== '')) {
            corredor.aliado = ''
            corredor.inimigo = nomeInimigo
        } else {
            corredor.aliado = ''
            corredor.inimigo = ''
        }
        return corredor
    } catch (e) {
        console.log(e)
    }
}

