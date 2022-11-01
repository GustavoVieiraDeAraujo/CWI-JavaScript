import { alteraEnergia } from '../energy/energy.js'

export function personagemTreinar(personagem, categoria, objeto) {
    let personagemAspiracao = personagem.aspiracao
    let bonusAspiracao 
    if (categoria === personagemAspiracao) {
        bonusAspiracao = true
    }
    else {
        bonusAspiracao = false
    }

    let verificaEnergia = verificaEnergia(personagem, -4)
    let verificaHigiene =  verificaHigieneNegativa(personagem, -2)
    if (verificaEnergia && verificaHigiene) {
        personagem = alteraEnergia(personagem, "Treino", 0)[0]
        personagem = alteraHigiene(personagem, "Treino")
        personagem = 
    }
     energia = alteraEnergia(personagem, "Treino", 0)

}

export function alteraNivelHabilidade(personagem,)