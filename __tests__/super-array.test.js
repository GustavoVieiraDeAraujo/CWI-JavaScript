import instrutores from './instrutores.json'
import { SuperArray } from '../src/super-array'

let INSTRUTORES;

beforeEach(()=>{
  INSTRUTORES = SuperArray(instrutores)
})

describe('push', () => {
  it('push deve adicionar um novo instrutor ao meu super array', () => {
    const esperado = [...INSTRUTORES.itens, { "nome": "Batata Batata Batata", "dandoAula": true }]
    INSTRUTORES.push({ "nome": "Batata Batata Batata", "dandoAula": true })

    expect(INSTRUTORES.itens).toEqual(esperado)
  })

})

describe('forEach', () => {
  it('forEach deve passar por todos os instrutores e chamando o callback esperado', () => {
    let listaNova = []
    const esperado = [
      { "nome": "Gustavo Büttenbender Rodrigues", "dandoAula": true },
      { "nome": "William Cardozo", "dandoAula": true },
    ]
    INSTRUTORES.forEach(item => { if (item.dandoAula === true) { listaNova.push(item) } })

    expect(listaNova).toEqual(esperado)
  })
})

describe('filter', () => {
  it('filter deve retornar um novo array apenas com os instrutores que estão dando aula', () => {
    const esperado = [
      { "nome": "Gustavo Büttenbender Rodrigues", "dandoAula": true },
      { "nome": "William Cardozo", "dandoAula": true },
    ]
    const dandoAula = INSTRUTORES.filter(item => { return item.dandoAula === true })

    expect(dandoAula).toEqual(esperado)
  })
})

describe('map', () => {
  it('map deve retornar um novo array com o numero de nomes que o instrutor tem', () => {
    const esperado = [2, 2, 2, 3, 2, 2, 2, 3]
    const quant_nomes = INSTRUTORES.map(item => {
      const nome = item.nome.split(" ")
      return nome.length
    })

    expect(quant_nomes).toEqual(esperado)
  })
})

describe('find', () => {
  it('find deve retornar o primeiro instrutor que está dando aula', () => {
    const esperado = { "nome": "Gustavo Büttenbender Rodrigues", "dandoAula": true }
    const primeiroIntrutorDandoAula = INSTRUTORES.find(item => { return item.dandoAula === true })

    expect(primeiroIntrutorDandoAula).toEqual(esperado)
  })
})

describe('reduce', () => {
  it('reduce deve retornar o total de letras no nome dos instrutores', () => {
    const esperado = [14, 13, 13, 28, 14, 12, 15, 17]
    const tamanhoNomes = INSTRUTORES.itens.map((element) => {
      return element.nome.replace(/ /g, "").split('').reduce((acumulador) => { return acumulador += 1 }, 0)
    })

    expect(tamanhoNomes).toEqual(esperado)
  })

  it('reduce deve retornar um boolean se todos os instrutores estão dando aula', () => {
    const esperado = false
    const todosDaoAula = INSTRUTORES.reduce((acumulador, item) => {
      if (acumulador !== false && item.dandoAula === false) {
        return false
      }
    }, true)

    expect(todosDaoAula).toBe(esperado)
  })
})
