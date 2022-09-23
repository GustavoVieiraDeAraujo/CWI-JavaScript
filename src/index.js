import pokemons from '../__tests__/pokemons.json'
export const Treinador = (nome,idade,pokemonInicial) =>{

    const atributos = {
        nome: nome,
        idade: idade,
        pokemons: [pokemonInicial]
    }

    atributos.evoluirPokemons = () =>{
        atributos.pokemons.forEach((element, index) => {
            if (element.levelInicial === element.evolucao.level){
                pokemons.forEach(pokemon => {
                    if (parseInt(pokemon.id) === parseInt(element.evolucao.id)) {
                        atributos.pokemons[index] = pokemon;
                    }
                })
            }
        })
    }

    atributos.subirLevelPokemons = () =>{
        atributos.pokemons.forEach(element => {
            element.levelInicial += 1
        });
    }

    atributos.pegaPokemon = (pokemon) =>{
        atributos.pokemons = [...atributos.pokemons, pokemon]
    }

    return atributos
}