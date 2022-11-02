import { LocalStorage } from "node-localstorage"

export const useLocalStorage = () => {
  const localStorage = new LocalStorage("./src/db")

  // até agora não foi usado
  const setString = (key, value) => {
    localStorage.setItem(key, value)
  }

  const setObject = (key, object) => {
    const stringFormattedObject = JSON.stringify(object)
    localStorage.setItem(key, stringFormattedObject)
  }

  const addToList = (key, value) => {
    setObject(key, [...getObject(key), value])
  }

  const returnObjectPositionInListById = (key, id) => {
    const lista = getObject(key)
    for (let i = 0; i < lista.length; i++) {
      if (lista[i].id === id) {
        return i
      }
    }
    return -1
  }

  const updateList = (key, position, newValue) => {
    let lista = getObject(key)
    lista[position] = newValue
    setObject(key, lista)
  }

  // até agora não foi usado
  const removeFromListByPosition = (key, posicao) => {
    if (posicao > -1) {
      let lista = getObject(key)
      lista.splice(posicao, 1)
      setObject(key, lista)
    }
  }

  const deleteStorageByKey = (key) => {
    localStorage.removeItem(key)
  }

  const returnListSize = (key) => {
    const lista = getObject(key)
    if (lista === null) {
      return 0
    } else {
      return lista.length;
    }
  }

  // até agora não foi usado
  const getString = (key) => {
    return localStorage.getItem(key)
  }

  const getObject = (key) => {
    const json = localStorage.getItem(key)
    if (json) {
      return JSON.parse(json)
    }
    return null
  }

  return {
    setString,
    setObject,
    addToList,
    updateList,
    returnListSize,
    returnObjectPositionInListById,
    removeFromListByPosition,
    getString,
    getObject,
    deleteStorageByKey
  }
}
