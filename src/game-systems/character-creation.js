export const criaPersonagem = (nomePersonagem, aspiracaoPersonagem, armazenamentoLocal) =>{
    let objetoPersonagem = {
        id: armazenamentoLocal.retornaTamanhoDaLista("ListaDePersonagens")+1,
        nome: nomePersonagem,
        tempoDeVida: 3600,
        saldo: 1500,
        aspiracao: aspiracaoPersonagem,
        higiene: 28,
        energia: 32,
        habilidades:{
            gastronomia:["JUNIOR", 0],
            pintura:["JUNIOR", 0], 
            jogos:["JUNIOR", 0], 
            jardinagem:["JUNIOR", 0],
            musica:["JUNIOR", 0] 
        },
        relacionamentos:{}
    }
    armazenamentoLocal.adicionarNaLista("ListaDePersonagens", objetoPersonagem)
} 