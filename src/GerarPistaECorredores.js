import axios from "axios"

export const geraUmaPistaAleatoria = async () => {
    try {
        const requisicao = await axios.get('https://gustavobuttenbender.github.io/gus.github/corrida-maluca/pistas.json')
        return requisicao.data[Math.floor(Math.random() * requisicao.data.length)]
    } catch (e) {
        console.log(e)
    }
}

export const geraUmaListaDeCorredoresAleatorios = async (quantidadeDeCorredores) => {
    try {
        let listaDeCorredores = []
        const requisicao = await axios.get('https://gustavobuttenbender.github.io/gus.github/corrida-maluca/personagens.json')
        while (listaDeCorredores.length != quantidadeDeCorredores) {
            const corredor = requisicao.data[Math.floor(Math.random() * requisicao.data.length)]
            corredor.posicao = 0
            if (!(listaDeCorredores.includes(corredor))) {
                listaDeCorredores.push(corredor)
            }
        }
        return listaDeCorredores.sort(function (a, b) { return a.id > b.id ? 1 : -1 });
    } catch (e) {
        console.log(e)
    }
}


export const pegaUmaPistaPeloNome = async (nomePista) => {
    try {
        const requisicao = await axios.get('https://gustavobuttenbender.github.io/gus.github/corrida-maluca/pistas.json')
        return requisicao.data.filter(pista => pista.nome === nomePista).pop()
    } catch (e) {
        console.log(e)
    }
}

export const geraUmAliadoEInimigoAleatorio = (listaCorredores, nomeCorredor) => {
    try {
        const aliadoEInimigo = []
        while (aliadoEInimigo.length !== 2) {
            const corredor = listaCorredores[Math.floor(Math.random() * listaCorredores.length)]
            if (corredor.nome !== nomeCorredor && !(aliadoEInimigo.includes(corredor.nome))) {
                aliadoEInimigo.push(corredor.nome)
            }
        }
        return aliadoEInimigo
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

