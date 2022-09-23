export const SuperArray = (itens = []) => {

  const array = {
    itens: [...itens]
  }

  array.push = item => {
    array.itens = [...array.itens, item]

  }
  array.forEach = callback => {
    for(let i = 0; i < array.itens.length; i++) {
      callback(array.itens[i], i, array.itens)
    }
  }

  array.map = callback => {
    let novoArray = [];
    for (let i = 0; i < array.itens.length; i++) {
      const resultado = callback(array.itens[i], i, array.itens)
      novoArray.push(resultado)
    }
    return novoArray;
  }

  array.filter = callback => {
    let novoArray = []
    for (let i = 0; i < array.itens.length; i++) {
      const resultado = callback(array.itens[i], i, array.itens)
      if (resultado) {
        novoArray.push(array.itens[i])
      }
    }
    return novoArray;
  }

  array.find = callback => {
    for (let i = 0; i < array.itens.length; i++) {
      const resultado = callback(array.itens[i], i, array.itens)
      if(resultado){
        return array.itens[i]
      }
    }
    return undefined
  }

  array.reduce = (callback, valorInicial) => {
    if(valorInicial === undefined){
      valorInicial = array[0]
    }
    for (let i = 0; i < array.itens.length; i++) {
      valorInicial = callback(valorInicial, array.itens[i], i, array.itens)
    }
    return valorInicial
  }

  return array
}


