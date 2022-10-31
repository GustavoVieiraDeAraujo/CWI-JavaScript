import chalk from 'chalk';

import { get } from "./services/requests/requests.js"
import { useQuestion } from './services/question/use-question.js'
import { useLocalStorage } from "./services/local-storage/use-local-storage.js"
import { criaPersonagem } from './character-creation/character-creation.js'


// Função para usar ação de 'trabalhar'
// import { personagemTrabalha } from "./work/work.js"


// Funções para usar ação de 'interagir'
// import {
//   definiORelacionamento,
//   retornaUmaListaDeTodasAsInteracoesComBaseNoNivelDeInteracao,
//   personagemInteragi
// } from "./relationships/relationships.js"

const main = async () => {

  // local storage
  const localStorage = useLocalStorage();

  // requisições
  const jsonCheats = await get("cheats")
  const jsonEmpregos = await get("empregos")
  const jsonInteracoes = await get("interacoes")
  const jsonItensHabilidades = await get("itens-habilidades")

  let jogoRodando = true;
  let personagens = localStorage.getObject('lista-de-personagens');


  while (jogoRodando) {
    // console.clear();
    console.log(chalk.yellow('  _______ _             _____               _           '))
    console.log(chalk.yellow(' |__   __| |           / ____|             (_)          '))
    console.log(chalk.yellow('    | |  | |__   ___  | |     _ __ ___  ___ _ _ __ ___  '))
    console.log(chalk.yellow("    | |  | '_ \\ / _ \\ | |    | '__/ _ \\/ __| | '_ ` _ \\ "))
    console.log(chalk.yellow('    | |  | | | |  __/ | |____| | |  __/\\__ \\ | | | | | |'))
    console.log(chalk.yellow('    |_|  |_| |_|\\___|  \\_____|_|  \\___||___/_|_| |_| |_|'))

    console.log('-------------------')
    console.log('O QUE DESEJA FAZER?');
    console.log('1 - Criar novo personagem');
    console.log('2 - Selecionar personagem');
    console.log('3 - Sair')
    console.log('-------------------')
    let respostaUsuario = await useQuestion('SELECIONE UMA OPÇÃO')
    console.clear();

    switch (respostaUsuario) {
      case '1':
        let criacaoPersonagem = true
        let chamarCriacao;


        while (criacaoPersonagem) {
          personagens = localStorage.getObject('lista-de-personagens')

          chamarCriacao = true;
          console.log('-------------------');
          const nome = await useQuestion('QUAL É O NOME DO(A) PERSONAGEM?');

          console.clear()
          console.log('QUAL É A ASPIRAÇÃO DE ' + nome.toUpperCase() + '?');
          console.log('-------------------');
          console.log('1 - Gastronomia');
          console.log('2 - Pintura');
          console.log('3 - Jogos');
          console.log('4 - Jardinagem');
          console.log('5 - Música');
          console.log('0 - Voltar');
          console.log('-------------------');
          let aspiracao = await useQuestion('SELECIONE UMA OPÇÃO');
          console.clear();

          if (aspiracao === '0') {
            criacaoPersonagem = false;
            break;
          }

          switch (aspiracao) {
            case '1':
              aspiracao = 'Gastronomia';
              break;
            case '2':
              aspiracao = 'Pintura';
              break;
            case '3':
              aspiracao = 'Jogos';
              break;
            case '4':
              aspiracao = 'Jardinagem';
              break;
            case '5':
              aspiracao = 'Música';
              break;
            default:
              console.log('Opção inválida, tente novamente.')
              chamarCriacao = false;
          }
          if (chamarCriacao) {
            criaPersonagem(nome, aspiracao, localStorage);
            criacaoPersonagem = false;
          }
        }
        break;

      case '2':
        personagens = localStorage.getObject('lista-de-personagens');
        console.clear();
        console.log(chalk.blue("___________________"));
        console.log(chalk.blue("|") + chalk.yellow("   PERSONAGENS   ") + chalk.blue("|"));
        for (let i = 0; i < localStorage.returnListSize('lista-de-personagens'); i++) {
          console.log(personagens[i].id + " - " + personagens[i].nome);
        }
        let personagemSelecionado = await useQuestion('Digite o ID do personagem desejado ou 0 para voltar:')
        if (personagemSelecionado === '0') {
          break;
        }
        break;
      case '3':
        jogoRodando = false;
        break;
      default:
        console.log('Opção inválida, por favor escolha dentre uma das opções disponibilizadas');
        break;
    }
  }
}

main()


// Exemplo de como usar ação 'trabalhar'
// const localStorage = useLocalStorage();
// let personagemQueEstaSendoUsado = localStorage.getObject("lista-de-personagens")[0]
// const mensagemSeNaoTiverEnergia = personagemTrabalha(personagemQueEstaSendoUsado, "JogadorDeDota", localStorage)
// if (mensagemSeNaoTiverEnergia !== undefined){
//   console.log(mensagemSeNaoTiverEnergia)
// }


// Exemplo de como usar ação 'interagir'
// const jsonInteracoes = await get("interacoes")
// const localStorage = useLocalStorage();
// let personagemQueEstaUsando = localStorage.getObject("lista-de-personagens")[2]
// let personagemAlvoDaInteracao = localStorage.getObject("lista-de-personagens")[1]
// const relacionamento = definiORelacionamento(personagemQueEstaUsando,personagemAlvoDaInteracao)
// const listaDeInteracoesDisponiveisDesseRelacionamento = retornaUmaListaDeTodasAsInteracoesComBaseNoNivelDeInteracao(relacionamento[1][0], jsonInteracoes)
// const interacaoEscolhida = listaDeInteracoesDisponiveisDesseRelacionamento[3]
// personagemInteragi(personagemQueEstaUsando, personagemAlvoDaInteracao, relacionamento, interacaoEscolhida, localStorage)
