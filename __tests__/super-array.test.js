import instrutores from './instrutores.json'
import { SuperArray } from '../src/super-array'

describe('testes das funções de array', () => {

  it('deve adicionar um novo instrutor ao meu super array.', () => {
    const meuArray = SuperArray(instrutores)
    const esperado = [...instrutores, { "nome": "Batata Batata Batata", "dandoAula": true }]
    meuArray.push({ "nome": "Batata Batata Batata", "dandoAula": true })

    expect(meuArray.itens).toEqual(esperado)
  })

  it('deve passar por todos os instrutores e chamando o callback esperado', () => {
    let listaNova = []
    const meuArray = SuperArray(instrutores)
    const esperado = [
      { "nome": "Gustavo Büttenbender Rodrigues", "dandoAula": true },
      { "nome": "William Cardozo", "dandoAula": true },
    ]
    meuArray.forEach(item => { if(item.dandoAula === true){listaNova.push(item)} })
  
    expect(listaNova).toEqual(esperado)
  })

  it('deve retornar um novo array apenas com os instrutores que estão dando aula', () => {
    const meuArray = SuperArray(instrutores)
    const esperado = [
      { "nome": "Gustavo Büttenbender Rodrigues", "dandoAula": true },
      { "nome": "William Cardozo", "dandoAula": true },
    ]
    const dandoAula = meuArray.filter(item => { return item.dandoAula === true })
    
    expect(dandoAula).toEqual(esperado)
  })

  it('deve retornar um novo array com o numero de nomes que o instrutor tem', () => {
    const meuArray = SuperArray(instrutores)
    const esperado = [2,2,2,3,2,2,2,3]
    const quant_nomes = meuArray.map(item => {
      const nome = item.nome.split(" ")
      return nome.length
    })
    
    expect(quant_nomes).toEqual(esperado)
  })

  it('deve retornar o primeiro instrutor que está dando aula', () => {
    const meuArray = SuperArray(instrutores)
    const esperado = {"nome": "Gustavo Büttenbender Rodrigues", "dandoAula": true }
    const primeiroIntrutorDandoAula = meuArray.find(item => { return item.dandoAula === true })
    
    expect(primeiroIntrutorDandoAula).toEqual(esperado)
  })
  
  it('deve retornar o total de letras no nome dos instrutores', () => {
    const meuArray = SuperArray(instrutores)
    const esperado = [14,13,13,28,14,12,15,17]
    const tamanhoNomes = meuArray.itens.map((element)=>{
      return element.nome.replace(/ /g, "").split('').reduce((acumulador) => { return acumulador += 1 } , 0)
    })
    
    expect(tamanhoNomes).toEqual(esperado)
  })

  it('deve retornar um boolean se todos os instrutores estão dando aula', () => {
    const meuArray = SuperArray(instrutores)
    const esperado = false
    const todosDaoAula = meuArray.reduce((acumulador, item) => {
      if (acumulador !== false && item.dandoAula === false) {
        return false
      }
    }, true)

    expect(todosDaoAula).toBe(esperado)
  })
})
