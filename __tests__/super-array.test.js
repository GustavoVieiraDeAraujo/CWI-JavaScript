import instrutores from './instrutores.json'
import { SuperArray } from '../src/super-array'

describe('Exemplos de testes', () => {
  it('Adicionar um item novo ao final do SuperArray.', () => {
    const meuArrayComHeMan = SuperArray([1, 2, 3])
    const esperado = [1, 2, 3, "He Man"]
    meuArrayComHeMan.push("He Man")

    expect(meuArrayComHeMan.itens).toEqual(esperado)
  })
  it('Percorre todos os items do array.', () => {
    let acumulador = 0;
    const meuArray = SuperArray([1, 2, 3])
    const esperado = 6
    meuArray.forEach(item => { acumulador += item })

    expect(acumulador).toBe(esperado)
  })
  it('Retorna um novo SuperArray com os elementos que passaram no teste implementado pela função fornecida.', () => {
    const meuArray = SuperArray([1, 2, 3])
    const esperado = [1, 3]
    const meuArrayImpares = meuArray.filter(item => { return item % 2 !== 0 })

    expect(meuArrayImpares).toEqual(esperado)
  })
  it('Retorna um novo SuperArray com os elementos remapeados.', () => {
    const meuArray = SuperArray([1, 2, 3])
    const esperado = [2, 4, 6]
    const meuArrayDobrado = meuArray.map(item => { return item * 2 })

    expect(meuArrayDobrado).toEqual(esperado)
  })
  it('Retorna o primeiro valor do SuperArray que satisfaça o callback fornecido. Nao encontrando, deve retornar undefined.', () => {
    const meuArray = SuperArray([1, 2, 3])
    const esperado = 2
    const primeiroNumeroMarioQue1 = meuArray.find(item => {return item > 1 })

    expect(primeiroNumeroMarioQue1).toBe(esperado)
  })
  it('Reduz todo o array em um único valor.', () => {
    const meuArray = SuperArray([1, 2, 3])
    const esperado = 6
    const somaMeuArray = meuArray.reduce((acumulador, item) => { return acumulador += item}, 0)

    expect(somaMeuArray).toBe(esperado)
  })
})

describe('push', () => {
  it('deve adicionar um novo instrutor ao meu super array.', () => {
    const meuArray = SuperArray(instrutores)
    const esperado = [...instrutores, { "nome": "Batata Batata Batata", "dandoAula": true }]
    meuArray.push({ "nome": "Batata Batata Batata", "dandoAula": true })

    expect(meuArray.itens).toEqual(esperado)
  })

})

describe('forEach', () => {
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
})

describe('filter', () => {
  it('deve retornar um novo array apenas com os instrutores que estão dando aula', () => {
    const meuArray = SuperArray(instrutores)
    const esperado = [
      { "nome": "Gustavo Büttenbender Rodrigues", "dandoAula": true },
      { "nome": "William Cardozo", "dandoAula": true },
    ]
    const dandoAula = meuArray.filter(item => { return item.dandoAula === true })
    
    expect(dandoAula).toEqual(esperado)
  })
})

describe('map', () => {
  it('deve retornar um novo array com o numero de nomes que o instrutor tem', () => {
    const meuArray = SuperArray(instrutores)
    const esperado = [2,2,2,3,2,2,2,3]
    const quant_nomes = meuArray.map(item => {
      const nome = item.nome.split(" ")
      return nome.length
    })
    
    expect(quant_nomes).toEqual(esperado)
  })
})

describe('find', () => {
  it('deve retornar o primeiro instrutor que está dando aula', () => {
    const meuArray = SuperArray(instrutores)
    const esperado = {"nome": "Gustavo Büttenbender Rodrigues", "dandoAula": true }
    const primeiroIntrutorDandoAula = meuArray.find(item => { return item.dandoAula === true })
    
    expect(primeiroIntrutorDandoAula).toEqual(esperado)
  })
})

describe('reduce', () => {
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
