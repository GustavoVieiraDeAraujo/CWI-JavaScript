import pokemons from './pokemons.json'
import { Treinador } from '../src/index.js'

let Junin;

beforeEach(()=>{
  Junin = Treinador("Junin", 10, {...pokemons[0]})
})

describe('testes da função Treinador', () => {

  it('Deve subir o nível do pokemon corretamente', () => {
    Junin.subirLevelPokemons()
    expect(Junin.pokemons[0].levelInicial).toBe(2)
  })

  it('Deve evoluir pokemon ao atingir o nível necessário', () => {
    for(let i = 0; i < 4; i++){
      Junin.subirLevelPokemons()
    }
    Junin.evoluirPokemons()
    expect(Junin.pokemons[0]).toEqual(pokemons[1])
  })

  it('Não deve evoluir pokemon caso não possua o level necessário', () => {
    for (let i = 0; i < 3; i++) {
      Junin.subirLevelPokemons()
    }
    Junin.evoluirPokemons()

    expect(Junin.pokemons[0].nome).toBe(pokemons[0].nome)
  })

  it('Treinador será criado com nome correto', () => {
    expect(Junin.nome).toBe('Junin')
  })

  it('Treinador será criado com a idade correta', () => {
    expect(Junin.idade).toBe(10)
  })
  
  it('Treinador será criado com o pokemon inicial correto', () => {
    expect(Junin.pokemons[0]).toEqual(pokemons[0])
  })

  it('Treinador terá seus pokemons atualizados após nova captura', () => {
    Junin.subirLevelPokemons()
    Junin.evoluirPokemons()
    const esperado = [...Junin.pokemons, pokemons[2]]
    Junin.pegaPokemon(pokemons[2])

    expect(Junin.pokemons).toEqual(esperado)
  })
})

