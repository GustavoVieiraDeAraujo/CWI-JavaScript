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

describe('Exemplo com instrutores', () => {

  it('Adicionar um item novo ao final do SuperArray.', () => {
    const meuArray = SuperArray(instrutores)
    const esperado = [...instrutores, "He Man"]
    meuArray.push("He Man")

    expect(meuArray.itens).toEqual(esperado)
  })

  it('Percorre todos os items do array.', () => {
    let listaNova = []
    const meuArray = SuperArray(instrutores)
    const esperado = [
      { "nome": "Gustavo Büttenbender Rodrigues", "dandoAula": true },
      { "nome": "William Cardozo", "dandoAula": true },
    ]
    meuArray.forEach(item => { if(item.dandoAula === true){listaNova.push(item)} })

    expect(listaNova).toEqual(esperado)
  })

  it('Retorna um novo SuperArray com os elementos que passaram no teste implementado pela função fornecida.', () => {
    const meuArray = SuperArray(instrutores)
    const esperado = [
      { "nome": "Gustavo Büttenbender Rodrigues", "dandoAula": true },
      { "nome": "William Cardozo", "dandoAula": true },
    ]
    const meuArrayImpares = meuArray.filter(item => { return item.dandoAula === true })

    expect(meuArrayImpares).toEqual(esperado)
  })

  it('Retorna um novo SuperArray com os elementos remapeados.', () => {
    const meuArray = SuperArray(instrutores)
    const esperado = [
      'Batata', 
      'Batata',
      'Batata', 
      'Batata',
      'Batata', 
      'Batata',
      'Batata', 
      'Batata'
    ]
    const meuArrayDobrado = meuArray.map(item => { return item.nome = "Batata" })
    console.log(meuArrayDobrado)

    expect(meuArrayDobrado).toEqual(esperado)
  })

  it('Retorna o primeiro valor do SuperArray que satisfaça o callback fornecido. Nao encontrando, deve retornar undefined.', () => {
    const meuArray = SuperArray(instrutores)
    const esperado = { "nome": "Batata", "dandoAula": true }
    const primeiroNumeroMarioQue1 = meuArray.find(item => { return item.dandoAula === true })
    console.log(primeiroNumeroMarioQue1)

    expect(primeiroNumeroMarioQue1).toEqual(esperado)
  })

  it('Reduz todo o array em um único valor.', () => {
    const meuArray = SuperArray(instrutores)
    const esperado = 28
    const somaMeuArray = meuArray.reduce((acumulador, _, index) => { return acumulador += index}, 0)
 
    expect(somaMeuArray).toBe(esperado)
  })
})