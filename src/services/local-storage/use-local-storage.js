import { LocalStorage } from "node-localstorage"

export const useLocalStorage = () => {
  const localStorage = new LocalStorage("./src/db")

  const criaString = (chave, valor) => {
    localStorage.setItem(chave, valor)
  }

  const criaObjeto = (chave, objeto) => {
    const objetoFormatadoEmString = JSON.stringify(objeto)
    localStorage.setItem(chave, objetoFormatadoEmString)
  }

  const adicionarNaLista = (chave, valor) => {
    criaObjeto(chave, [...pegaObjeto(chave), valor])
  }

  const removerDaListaPorPosicao = (chave, posicao) => {
    if (posicao > -1){
      let lista = pegaObjeto(chave)
      lista.splice(posicao, 1)
      criaObjeto(chave, lista)
    }
  }

  const retornaTamanhoDaLista= (chave) =>{
    const lista = pegaObjeto(chave)
    return lista.length
  }

  const retornaTamanhoDoArmazenamento = () =>{
    return localStorage.length
  }

  const apagar = (chave) =>{
    localStorage.removeItem(chave)
  }

  const pegaString = (chave) => {
    return localStorage.getItem(chave)
  } 

  const pegaObjeto = (chave) => {
    const json = localStorage.getItem(chave)
    if (json) {
      return JSON.parse(json)
    }
    return null
  }

  return {
    criaString,
    criaObjeto,
    adicionarNaLista,
    removerDaListaPorPosicao,
    retornaTamanhoDaLista,
    retornaTamanhoDoArmazenamento,
    apagar,
    pegaString,
    pegaObjeto
  }
}
