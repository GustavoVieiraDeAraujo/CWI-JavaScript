import { getPersonagemById } from "../src/funcoes"
import { personagemTrabalha } from "../src/work/work"
import { useLocalStorage } from "../src/services/local-storage/use-local-storage.js"
import { criaPersonagem } from '../src/character-creation/character-creation.js'



describe('Exemplo teste suite', () => {
  it('Exemplo', () => {
    expect(true).toBeTruthy()
  })
}
)

describe('testes trabalho', () => {


  afterEach(() => {
    const localStorage = useLocalStorage()
    localStorage.deleteStorageByKey("lista-de-personagens")
  });

  it('Deve perder os pontos de energia ao trabalhar uma jornada padrão', () => {

    const localStorage = useLocalStorage()
    criaPersonagem('teste1', 'Gastronomia', localStorage);
    let personagens = localStorage.getObject('lista-de-personagens')
    let personagem = personagens[0]

    personagemTrabalha(personagem, 'Seguradordepinceis', localStorage)
    personagem = getPersonagemById(personagem.id)

    expect(personagem.energia).toBe(22)
  })

  it('Deve receber o salario do dia ao trabalhar uma jornada padrão', () => {

    const localStorage = useLocalStorage()
    criaPersonagem('teste1', 'Gastronomia', localStorage);
    let personagens = localStorage.getObject('lista-de-personagens')
    let personagem = personagens[0]

    personagemTrabalha(personagem, 'Seguradordepinceis', localStorage)
    personagem = getPersonagemById(personagem.id)

    expect(personagem.saldo).toBe(1610)
  })

  // it('Deve receber o salario equivalente quando começar a trabalhar com os pontos de energia menores que 10 ', () => {
  //   expect().toBe()
  // })

  // it('Deve receber o salario equivalente quando começar a trabalhar com os pontos de energia menores que 10 e pontos de higiene menores que 4 ', () => {
  //   expect().toBe()
  // })

  // it('Deve validar para que o Cresim não consiga começar a trabalhar com os pontos de energia menores que 4', () => {
  //   expect().toBe()
  // })
}
)

describe('testes relacionamento', () => {
  it('Exemplo', () => {
    expect(true).toBeTruthy()
  })
}
)