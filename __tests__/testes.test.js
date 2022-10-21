import {
  pegaUmaPistaPeloNome,
  pegaUmCorredorPeloNomeComOuSemAliadoEInimigo
} from '../src/GerarPistaECorredores.js'

import {
  aplicarBuffDeVantagemDeTerreno,
  iniciarPreparosDaCorrida,
  executaRodadaComVelocidade,
  executaRodadaComDrift,
  executaRodadaComAceleracao,
  começaCorrida,
  restoDaCorrida,

} from '../src/SistemaDaCorrida.js'

describe('Testes', () => {

  // ok
  it('Deve conseguir obter a pista corretamente', async () => {
    const esperado = {
      id: 1,
      nome: 'Himalaia',
      tipo: 'MONTANHA',
      descricao: 'Uma montanha nevada, os corredores devem dar uma volta inteira nela, como existe muita neve eles terão dificuldade em enxergar',
      tamanho: 30,
      debuff: -2,
      posicoesBuffs: [6, 17]
    }

    expect(await pegaUmaPistaPeloNome('Himalaia')).toEqual(esperado)
  })

  // ok
  it('Deve conseguir obter o corredor corretamente', async () => {
    const esperado = {
      id: 1,
      nome: 'Dick Vigarista',
      velocidade: 5,
      drift: 2,
      aceleracao: 4,
      vantagem: 'CIRCUITO',
      posicao: 0,
      aliado: '',
      inimigo: ''
    }

    expect(await pegaUmCorredorPeloNomeComOuSemAliadoEInimigo('Dick Vigarista', '', '')).toEqual(esperado)
  })

  // ok
  it('Deve conseguir calcular a vantagem de tipo pista corretamente', async () => {

    const listaDeCorredores = [await pegaUmCorredorPeloNomeComOuSemAliadoEInimigo('Irmãos Rocha', '', '')]
    const pista = await pegaUmaPistaPeloNome('Himalaia')

    const esperado = [{
      id: 2,
      nome: "Irmãos Rocha",
      velocidade: 7,
      drift: 4,
      aceleracao: 5,
      vantagem: "MONTANHA",
      posicao: 0,
      aliado: '',
      inimigo: ''
    }]

    expect(aplicarBuffDeVantagemDeTerreno(listaDeCorredores, pista)).toEqual(esperado)
  })

  // ok
  it('Deve conseguir calcular o debuff de pista corretamente', async () => {
  
    const listaDeCorredores = [await pegaUmCorredorPeloNomeComOuSemAliadoEInimigo('Irmãos Rocha', '', '')]
    const pista = await pegaUmaPistaPeloNome('Himalaia')
    const dicionarioDePosicoes = iniciarPreparosDaCorrida(listaDeCorredores, pista)

    const esperado = [{
      id: 2,
      nome: "Irmãos Rocha",
      velocidade: 7,
      drift: 4,
      aceleracao: 5,
      vantagem: "MONTANHA",
      posicao: 3,
      aliado: '',
      inimigo: ''
    }]

    expect(executaRodadaComAceleracao(listaDeCorredores, pista, dicionarioDePosicoes)).toEqual(esperado)
  })

  // ok
  it('Deve conseguir calcular o buff de posição de pista para 3 corredores', async() => {
    const listaDeCorredores = [await pegaUmCorredorPeloNomeComOuSemAliadoEInimigo('Irmãos Rocha', '', '')]
    const pista = await pegaUmaPistaPeloNome('Himalaia')
    const dicionarioDePosicoes = iniciarPreparosDaCorrida(listaDeCorredores, pista)
    listaDeCorredores[0].posicao = 5
    dicionarioDePosicoes['6'] = ['Dick Vigarista', 'Irmãos Pavor', 'Professor Aéreo']

    const esperado = [{
      id: 2,
      nome: "Irmãos Rocha",
      velocidade: 7,
      drift: 4,
      aceleracao: 5,
      vantagem: "MONTANHA",
      posicao: 13,
      aliado: '',
      inimigo: ''
    }]

    expect(executaRodadaComVelocidade(listaDeCorredores, pista, dicionarioDePosicoes)).toEqual(esperado)
  })

  // ok
  it('Deve conseguir calcular a próxima posição corretamente se estiver sob o buff de um aliado', async() => {
    const listaDeCorredores = [
      await pegaUmCorredorPeloNomeComOuSemAliadoEInimigo('Irmãos Rocha', 'Barão Vermelho', ''),
      await pegaUmCorredorPeloNomeComOuSemAliadoEInimigo('Barão Vermelho', '', '')
    ]
    listaDeCorredores[0].posicao = 2
    const pista = await pegaUmaPistaPeloNome('Himalaia')
    const dicionarioDePosicoes = iniciarPreparosDaCorrida(listaDeCorredores, pista)

    const esperado = [
    {
      id: 2,
      nome: "Irmãos Rocha",
      velocidade: 7,
      drift: 4,
      aceleracao: 5,
      vantagem: "MONTANHA",
      posicao: 5,
      aliado: 'Barão Vermelho',
      inimigo: ''
    },
    {
      id: 5,
      nome: "Barão Vermelho",
      velocidade: 7,
      drift: 3,
      aceleracao: 4,
      vantagem: "MONTANHA",
      posicao: 1,
      aliado: '',
      inimigo: ''
    }
  ]

    expect(executaRodadaComDrift(listaDeCorredores, pista, dicionarioDePosicoes)).toEqual(esperado)
  })

  // ok
  it('Deve conseguir calcular a próxima posição corretamente se estiver sob o debuff de um inimigo', async() => {
    const listaDeCorredores = [
      await pegaUmCorredorPeloNomeComOuSemAliadoEInimigo('Irmãos Rocha', '', 'Barão Vermelho'),
      await pegaUmCorredorPeloNomeComOuSemAliadoEInimigo('Barão Vermelho', '', '')
    ]
    listaDeCorredores[0].posicao = 2
    const pista = await pegaUmaPistaPeloNome('Himalaia')
    const dicionarioDePosicoes = iniciarPreparosDaCorrida(listaDeCorredores, pista)

    const esperado = [
      {
        id: 2,
        nome: "Irmãos Rocha",
        velocidade: 7,
        drift: 4,
        aceleracao: 5,
        vantagem: "MONTANHA",
        posicao: 4,
        aliado: '',
        inimigo: 'Barão Vermelho'
      },
      {
        id: 5,
        nome: "Barão Vermelho",
        velocidade: 7,
        drift: 3,
        aceleracao: 4,
        vantagem: "MONTANHA",
        posicao: 1,
        aliado: '',
        inimigo: ''
      }
    ]

    expect(executaRodadaComDrift(listaDeCorredores, pista, dicionarioDePosicoes)).toEqual(esperado)
  })

  // ok
  it('Deve conseguir completar uma corrida com um vencedor', async() => {
    let resultado
    const listaDeCorredores = [
      await pegaUmCorredorPeloNomeComOuSemAliadoEInimigo('Irmãos Rocha', '', ''),
      await pegaUmCorredorPeloNomeComOuSemAliadoEInimigo('Barão Vermelho', '', '')
    ]
    const pista = await pegaUmaPistaPeloNome('Himalaia')
    const dicionarioDePosicoes = iniciarPreparosDaCorrida(listaDeCorredores, pista)
    const temGanhador = começaCorrida(listaDeCorredores, pista, dicionarioDePosicoes)

    if (temGanhador === false) {
      resultado = restoDaCorrida(listaDeCorredores, pista, dicionarioDePosicoes)
    }else{
      resultado = temGanhador
    }

    const esperado =
      {
        id: 2,
        nome: "Irmãos Rocha",
        velocidade: 7,
        drift: 4,
        aceleracao: 5,
        vantagem: "MONTANHA",
        posicao: 31,
        aliado: '',
        inimigo: ''
      }
      

    expect(resultado).toEqual(esperado)
  })

  // ok
  it('Deve conseguir criar corredor corretamente somente com aliado', async() => {
    const esperado = {
      id: 1,
      nome: 'Dick Vigarista',
      velocidade: 5,
      drift: 2,
      aceleracao: 4,
      vantagem: 'CIRCUITO',
      posicao: 0,
      aliado: 'Barão Vermelho',
      inimigo: ''
    }

    expect(await pegaUmCorredorPeloNomeComOuSemAliadoEInimigo('Dick Vigarista', 'Barão Vermelho', '')).toEqual(esperado)
  })

  // ok
  it('Deve conseguir criar corredor corretamente somente com inimigo', async() => {
    const esperado = {
      id: 1,
      nome: 'Dick Vigarista',
      velocidade: 5,
      drift: 2,
      aceleracao: 4,
      vantagem: 'CIRCUITO',
      posicao: 0,
      aliado: '',
      inimigo: 'Barão Vermelho'
    }

    expect(await pegaUmCorredorPeloNomeComOuSemAliadoEInimigo('Dick Vigarista', '', 'Barão Vermelho')).toEqual(esperado)
  })

  // ok
  it('Deve conseguir criar corredor corretamente com aliado e inimigo', async() => {
    const esperado = {
      id: 1,
      nome: 'Dick Vigarista',
      velocidade: 5,
      drift: 2,
      aceleracao: 4,
      vantagem: 'CIRCUITO',
      posicao: 0,
      aliado: 'Barão Vermelho',
      inimigo: 'Professor Aéreo'
    }

    expect(await pegaUmCorredorPeloNomeComOuSemAliadoEInimigo('Dick Vigarista', 'Barão Vermelho', 'Professor Aéreo')).toEqual(esperado)
  })

  // ok
  it('Deve conseguir calcular as novas posições corretamente de uma rodada para a próxima', async() => {
    const listaDeCorredores = [
      await pegaUmCorredorPeloNomeComOuSemAliadoEInimigo('Barão Vermelho', '', '')
    ]
    const pista = await pegaUmaPistaPeloNome('Himalaia')
    const dicionarioDePosicoes = iniciarPreparosDaCorrida(listaDeCorredores, pista)

    const esperado = [
      {
        id: 5,
        nome: "Barão Vermelho",
        velocidade: 7,
        drift: 3,
        aceleracao: 4,
        vantagem: "MONTANHA",
        posicao: 1,
        aliado: '',
        inimigo: ''
      }
    ]

    expect(executaRodadaComDrift(listaDeCorredores, pista, dicionarioDePosicoes)).toEqual(esperado)
  })

  // ok
  it('Deve impedir que corredor se mova negativamente mesmo se o calculo de velocidade seja negativo', async() => {
    const listaDeCorredores = [
      await pegaUmCorredorPeloNomeComOuSemAliadoEInimigo('Barão Vermelho', '', '')
    ]
    listaDeCorredores[0].posicao = 10
    const pista = await pegaUmaPistaPeloNome('Himalaia')
    pista.debuff = -999
    const dicionarioDePosicoes = iniciarPreparosDaCorrida(listaDeCorredores, pista)

    const esperado = [
      {
        id: 5,
        nome: "Barão Vermelho",
        velocidade: 7,
        drift: 3,
        aceleracao: 4,
        vantagem: "MONTANHA",
        posicao: 10,
        aliado: '',
        inimigo: ''
      }
    ]

    expect(executaRodadaComVelocidade(listaDeCorredores, pista, dicionarioDePosicoes)).toEqual(esperado)
  })

  // ok 
  it('Deve impedir que o Dick Vigarista vença a corrida se estiver a uma rodada de ganhar', async() => {
    let resultado
    const listaDeCorredores = [
      await pegaUmCorredorPeloNomeComOuSemAliadoEInimigo('Dick Vigarista', '', ''),
      await pegaUmCorredorPeloNomeComOuSemAliadoEInimigo('Barão Vermelho', '', '')
    ]
    const pista = await pegaUmaPistaPeloNome('Himalaia')
    listaDeCorredores[0].posicao = pista.tamanho - 1
    const dicionarioDePosicoes = iniciarPreparosDaCorrida(listaDeCorredores, pista)
    const temGanhador = começaCorrida(listaDeCorredores, pista, dicionarioDePosicoes)

    if (temGanhador === false) {
      resultado = restoDaCorrida(listaDeCorredores, pista, dicionarioDePosicoes)
    } else {
      resultado = temGanhador
    }

    const esperado =
    {
      id: 5,
      nome: "Barão Vermelho",
      velocidade: 7,
      drift: 3,
      aceleracao: 4,
      vantagem: "MONTANHA",
      posicao: 50,
      aliado: '',
      inimigo: ''
    }

    expect(resultado).toEqual(esperado)
  })

})



