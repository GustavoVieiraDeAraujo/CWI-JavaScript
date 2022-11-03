import { LocalStorage } from "node-localstorage";

export function useLocalStorage(){
  const localStorage = new LocalStorage("./src/db");

  function getObject(key){
    const json = localStorage.getItem(key)
    if (json) {
      return JSON.parse(json)
    }
    return null
  }

  function returnListSize(key){
    const lista = getObject(key)
    if (lista === null) {
      return 0
    } else {
      return lista.length;
    }
  }

  function getPersonagemById(id){
    const personagens = getObject('lista-de-personagens')
    const posicao = returnObjectPositionInListById('lista-de-personagens', id)
    return personagens[posicao]
  }
 
  function addToList(key, value){
    setObject(key, [...getObject(key), value])
  }

  function setObject(key, object){
    const stringFormattedObject = JSON.stringify(object);
    localStorage.setItem(key, stringFormattedObject);
  };

  function deleteStorageByKey(key){
    localStorage.removeItem(key)
  }

  function updateList(key, position, newValue){
    let lista = getObject(key)
    lista[position] = newValue
    setObject(key, lista)
  }
  // até agora não foi usado
  function removeFromListByPosition(key, posicao){
    if (posicao > -1) {
      let lista = getObject(key)
      lista.splice(posicao, 1)
      setObject(key, lista)
    }
  }

  function returnObjectPositionInListById(key, id){
    const lista = getObject(key)
    for (let i = 0; i < lista.length; i++) {
      if (lista[i].id === id) {
        return i
      }
    }
    return -1
  }

  return {
    getObject,
    setObject,
    addToList,
    updateList,
    returnListSize,
    getPersonagemById,
    deleteStorageByKey,
    removeFromListByPosition,
    returnObjectPositionInListById,
  }
}
