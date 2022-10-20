import axios from 'axios'

import {
  verificarSeAtorEstaEmSeriado,
  filtarPorAnoERetornarNome,
  calcularMediaTotalDeEpisodios,
  agruparTituloDasSeriesPorPropriedade,
} from '../src/metodos'

let series

beforeAll(async ()=> {
  try {
    const requisicao = await axios.get('https://gustavobuttenbender.github.io/film-array/data/films.json')
    series = requisicao.data
  } catch (e) {
    console.log(e)
  }
})

describe('Testes dos metodos', () => {

  it('Deve filtrar as series com ano de estreia maior ou igual a 2010 e retornar uma listagem com os nomes', () => {
    const esperado = [
      'Stranger Things',
      'Band of Brothers',
      'Gus and Will The Masters of the Wizards',
      'Mr. Robot',
      'Westworld'
    ] 

    expect(filtarPorAnoERetornarNome(series, 2016)).toEqual(esperado)
  })

  it('Deve retornar true ao procurar ator que está em elenco', () => {
    expect(verificarSeAtorEstaEmSeriado(series, "Winona Ryder")).toBe(true)
  })

  it('Deve retornar false ao procurar ator que não participa de elenco', () => {
    expect(verificarSeAtorEstaEmSeriado(series, "xxxxxxxx")).toBe(false)
  })
 

  it('Deve calcular corretamente a media total de episódios de todas as series', () => {
    const esperado = [
      ['Stranger Things', 8],
      ['Game Of Thrones', 7],
      ['The Walking Dead', 14],
      ['Band of Brothers', 10],
      ['Gus and Will The Masters of the Wizards', 40],
      ['10 Days Why', 1],
      ['Mr. Robot', 11],
      ['Narcos', 10],
      ['Westworld', 10],
      ['Breaking Bad', 12]
    ]

    expect(calcularMediaTotalDeEpisodios(series)).toEqual(esperado)
  })

  it('Deve agrupar corretamente em um objeto os titulos das series baseado na Distribuidora', () => {
    const esperado = {
      Netflix: ['Stranger Things', 'Narcos'],
      HBO: ['Game Of Thrones', 'Band of Brothers', 'Westworld'],
      AMC: ['The Walking Dead', 'Breaking Bad'],
      CWI: ['Gus and Will The Masters of the Wizards'],
      JS: ['10 Days Why'],
      'USA Network': ['Mr. Robot']
    }
    
    expect(agruparTituloDasSeriesPorPropriedade(series, "distribuidora")).toEqual(esperado)
  })

})

