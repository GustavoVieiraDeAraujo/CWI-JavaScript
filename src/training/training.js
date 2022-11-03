import { alteraTempo, verificaTempo } from '../time/time.js'
import { alteraEnergia, verificaEnergia } from '../energy/energy.js'
import { alteraHigiene, verificaHigieneNegativa } from '../hygiene/hygiene.js'

export function verificaPromocaoHabilidade(personagem, categoria) {
    switch (categoria) {
        case "Gastronomia":
            if (personagem.habilidades.gastronomia[1] > 27) {
                personagem.habilidades.gastronomia[0] = "SENIOR"
                personagem.trabalho.AssistentedoJacquin["SENIOR", 280]
            }else if (personagem.habilidades.gastronomia[1] > 16) {
                personagem.habilidades.gastronomia[0] = "PLENO"
                personagem.trabalho.AssistentedoJacquin["PLENO", 220]
            }
            return personagem
        case "Pintura":
            if (personagem.habilidades.pintura[1] > 27) {
                personagem.habilidades.pintura[0] = "SENIOR"
                personagem.trabalho.Seguradordepinceis["SENIOR", 270]
            }else if (personagem.habilidades.pintura[1] > 16) {
                personagem.habilidades.pintura[0] = "PLENO"
                personagem.trabalho.Seguradordepinceis["PLENO", 230]
            }
            return personagem
        case "Jogos":
            if (personagem.habilidades.jogos[1] > 27) {
                personagem.habilidades.jogos[0] = "SENIOR"
                personagem.trabalho.JogadordeDota["SENIOR", 340]
            }else if (personagem.habilidades.gastronomia[1] > 16) {
                personagem.habilidades.gastronomia[0] = "PLENO"
                personagem.trabalho.JogadordeDota["PLENO", 250]
            }
            return personagem
        case "Jardinagem":
            if (personagem.habilidades.jardinagem[1] > 27) {
                personagem.habilidades.jardinagem[0] = "SENIOR"
                personagem.trabalho.Ladraodeplanta["SENIOR", 340]
            }else if (personagem.habilidades.gastronomia[1] > 16) {
                personagem.habilidades.gastronomia[0] = "PLENO"
                personagem.trabalho.Ladraodeplanta["PLENO", 250]
            }
            return personagem
        case "Musica":
            if (personagem.habilidades.musica[1] > 27) {
                personagem.habilidades.musica[0] = "SENIOR"
                personagem.trabalho.Desafinador["SENIOR", 410]
            }else if (personagem.habilidades.gastronomia[1] > 16) {
                personagem.habilidades.gastronomia[0] = "PLENO"
                personagem.trabalho.Desafinador["PLENO", 300]
            }
            return personagem
        default:
            return "Categoria não existe"
    }
}

export function personagemTreinar(personagem, categoria, objeto) {

    let personagemAspiracao = personagem.aspiracao
    let bonusAspiracao
    if (categoria === personagemAspiracao) {
        bonusAspiracao = true
    } else {
        bonusAspiracao = false
    }
    let verificacaoEnergia = verificaEnergia(personagem, -4)
    let verificacaoHigiene = verificaHigieneNegativa(personagem, -2)
    let verificacaoTempo = verificaTempo(personagem, -8000)
    if (verificacaoEnergia && verificacaoHigiene && verificacaoTempo) {

        personagem = alteraEnergia(personagem, "Treino", 0)[0]

        personagem = alteraHigiene(personagem, "Treino")

        personagem = alteraTempo(personagem, "Treino", 0)
        personagem = alteraNivelHabilidade(personagem, bonusAspiracao, categoria, objeto) //erro

        personagem = verificaPromocaoHabilidade(personagem, categoria)

        return [personagem, true]
    }
    else {
        return [personagem, false]
    }
}
export function alteraNivelHabilidade(personagem, bonusAspiracao, categoria, objeto) {
    let pontosGanhos;
    let pontoBonus = 0;
    if (objeto === "cheat") {

        pontosGanhos = 5
    } else {
        pontosGanhos = objeto.pontos
    }
    if (bonusAspiracao) {
        pontoBonus = 1
    }


    switch (categoria) {
        case "GASTRONOMIA":
            personagem.habilidades.gastronomia[1] = personagem.habilidades.gastronomia[1] + pontosGanhos + pontoBonus
            return personagem

        case "PINTURA":

            personagem.habilidades.pintura[1] = personagem.habilidades.pintura[1] + pontosGanhos + pontoBonus

            return personagem


        case "JOGOS":
            personagem.habilidades.jogos[1] = personagem.habilidades.jogos[1] + pontosGanhos + pontoBonus
            return personagem



        case "JARDINAGEM":
            personagem.habilidades.jardinagem[1] = personagem.habilidades.jardinagem[1] + pontosGanhos + pontoBonus
            return personagem


        case "MUSICA":
            personagem.habilidades.musica[1] = personagem.habilidades.musica[1] + pontosGanhos + pontoBonus
            return personagem
        default:
            return "Categoria não existe"

    }

}


// export function verificaPromocaoHabilidade(personagem, categoria) {
//     console.log(categoria)

//     switch (categoria) {
//         case "GASTRONOMIA":
//             if (personagem.habilidades.gastronomia[1] > 27) {
//                 personagem.habilidades.gastronomia[0] = "SENIOR"
//             }
//             else {
//                 if (personagem.habilidades.gastronomia[1] > 16) {
//                     personagem.habilidades.gastronomia[0] = "PLENO"
//                 }
//                 else {
//                     personagem.habilidades.gastronomia[0] = "JUNIOR"
//                 }
//             }
//             return personagem

//         case "PINTURA":
//             if (personagem.habilidades.pintura[1] > 27) {
//                 personagem.habilidades.pintura[0] = "SENIOR"
//             }
//             else {
//                 if (personagem.habilidades.pintura[1] > 16) {
//                     personagem.habilidades.pintura[0] = "PLENO"
//                 }
//                 else {
//                     personagem.habilidades.pintura[0] = "JUNIOR"
//                 }
//             }
//             return personagem

//         case "JOGOS":
//             if (personagem.habilidades.jogos[1] > 27) {
//                 personagem.habilidades.jogos[0] = "SENIOR"
//             }
//             else {
//                 if (personagem.habilidades.jogos[1] > 16) {
//                     personagem.habilidades.jogos[0] = "PLENO"
//                 }
//                 else {
//                     personagem.habilidades.jogos[0] = "JUNIOR"
//                 }
//             }
//             return personagem

//         case "JARDINAGEM":
//             if (personagem.habilidades.jardinagem[1] > 27) {
//                 personagem.habilidades.jardinagem[0] = "SENIOR"
//             }
//             else {
//                 if (personagem.habilidades.jardinagem[1] > 16) {
//                     personagem.habilidades.jardinagem[0] = "PLENO"
//                 }
//                 else {
//                     personagem.habilidades.jardinagem[0] = "JUNIOR"
//                 }
//             }
//             return personagem

//         case "MUSICA":
//             if (personagem.habilidades.musica[1] > 27) {
//                 personagem.habilidades.musica[0] = "SENIOR"
//             }
//             else {
//                 if (personagem.habilidades.musica[1] > 16) {
//                     personagem.habilidades.musica[0] = "PLENO"
//                 }
//                 else {
//                     personagem.habilidades.musica[0] = "JUNIOR"
//                 }
//             }
//             return personagem
//     }
// }

