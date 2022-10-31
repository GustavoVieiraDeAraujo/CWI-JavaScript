export const personagemTrabalha = (personagemQueEstaSendoUsado, qualTrabalhoVaiExecutar, localStorage) => {
    if(personagemQueEstaSendoUsado.energia >= 5){
        const custoDeUmCresceleonEmTempo = Math.round((20000 / personagemQueEstaSendoUsado.trabalho[qualTrabalhoVaiExecutar][1]))
        const custoDeUmPontoDeEnergiaEmTempo = Math.round(20000 / personagemQueEstaSendoUsado.energia)
        const custoDeUmPontoDeEnergiaEmCresceleon = Math.round(custoDeUmPontoDeEnergiaEmTempo / custoDeUmCresceleonEmTempo)
        const custoDeHigiene = Math.round((4 * (personagemQueEstaSendoUsado.energia - 2)) / 10)
        if( personagemQueEstaSendoUsado.energia >= 15){
            personagemQueEstaSendoUsado.energia -= 10
            personagemQueEstaSendoUsado.tempoDeVida -= Math.round(10 * custoDeUmPontoDeEnergiaEmTempo)
            personagemQueEstaSendoUsado.saldo += personagemQueEstaSendoUsado.trabalho[qualTrabalhoVaiExecutar][1]
            if ((personagemQueEstaSendoUsado.higiene - 4) >= 0){
                personagemQueEstaSendoUsado.higiene -= 4
            }else{
                return "Personagem atual não possui a higiene minima para trabalhar"
            }
        } else if (personagemQueEstaSendoUsado.energia >= 12){ 
            personagemQueEstaSendoUsado.saldo += Math.round(((10 - (personagemQueEstaSendoUsado.energia - 5)) * custoDeUmPontoDeEnergiaEmCresceleon * 0.9) + ((personagemQueEstaSendoUsado.energia - 5) * custoDeUmPontoDeEnergiaEmCresceleon))
            personagemQueEstaSendoUsado.tempoDeVida -= Math.round(10 * custoDeUmPontoDeEnergiaEmTempo)
            personagemQueEstaSendoUsado.energia -= 4
            if ((personagemQueEstaSendoUsado.higiene - 4) >= 0) {
                personagemQueEstaSendoUsado.higiene -= 4
            } else {
                return "Personagem atual não possui a higiene minima para trabalhar"
            }
        } else if (personagemQueEstaSendoUsado.energia >= 6){
            if ((personagemQueEstaSendoUsado.higiene - custoDeHigiene) >= 0){
                if(personagemQueEstaSendoUsado.higiene >= 4){
                    personagemQueEstaSendoUsado.saldo += Math.round((3 * custoDeUmPontoDeEnergiaEmCresceleon * 0.9) + ((personagemQueEstaSendoUsado.energia - 5) * custoDeUmPontoDeEnergiaEmCresceleon))
                }else{
                    personagemQueEstaSendoUsado.saldo += Math.round(((3 * custoDeUmPontoDeEnergiaEmCresceleon * 0.9) + ((personagemQueEstaSendoUsado.energia - 5) * custoDeUmPontoDeEnergiaEmCresceleon))*0.9)
                }
                personagemQueEstaSendoUsado.higiene -= custoDeHigiene
                personagemQueEstaSendoUsado.tempoDeVida -= Math.round((personagemQueEstaSendoUsado.energia - 2) * custoDeUmPontoDeEnergiaEmTempo)
                personagemQueEstaSendoUsado.energia -= (personagemQueEstaSendoUsado.energia - 2)
            } else {
                return "Personagem atual não possui a higiene minima para trabalhar"
            }
        } else {
            personagemQueEstaSendoUsado.energia -= 3
            personagemQueEstaSendoUsado.tempoDeVida -= (3 * custoDeUmPontoDeEnergiaEmTempo)
            personagemQueEstaSendoUsado.saldo += Math.round(3*(custoDeUmPontoDeEnergiaEmCresceleon * 0.9))
            personagemQueEstaSendoUsado.higiene -= custoDeHigiene
        }
        const posicaoPersonagemQueEstaSendoUsado = localStorage.returnObjectPositionInListById("lista-de-personagens", personagemQueEstaSendoUsado.id)
        localStorage.updateList("lista-de-personagens", posicaoPersonagemQueEstaSendoUsado, personagemQueEstaSendoUsado)
    }else{
        return "Personagem atual não possui a energia minima para trabalhar"
    }
}


