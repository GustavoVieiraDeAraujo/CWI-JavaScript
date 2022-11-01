import chalk from 'chalk';

// import { get } from "./services/requests/requests.js"
import { useQuestion } from './services/question/use-question.js'
import { useLocalStorage } from "./services/local-storage/use-local-storage.js"
import { criaPersonagem } from './character-creation/character-creation.js'
import {
  retornaTamanhoDaLista,
  retornaItensPorCategoria,
  compraItem,
  loja,
  getItens,
  getPersonagemById,
  acaoCompra,
  mostraItensDoPersonagem,
  atualizaPersonagemNaLista,
  // montaLojaDaCategoria
} from './funcoes.js'
import { alteraHigiene, } from "./hygiene/hygiene.js"


// Função para usar ação de 'trabalhar'
// import { personagemTrabalha } from "./work/work.js"



// Funções para usar ação de 'interagir'
// import {
//   definiORelacionamento,
//   retornaUmaListaDeTodasAsInteracoesComBaseNoNivelDeInteracao,
//   personagemInteragi
// } from "./relationships/relationships.js"

const main = async () => {

  const itens = await getItens()
  // const empregos = await get('https://emilyspecht.github.io/the-cresim/empregos.json').data
  // const interacoes = await get('https://emilyspecht.github.io/the-cresim/interacoes.json').data
  // const cheats = await get('https://emilyspecht.github.io/the-cresim/empregos.json').data

  const localStorage = useLocalStorage();

  // requisições
  // const jsonCheats = await get("cheats")
  // const jsonEmpregos = await get("empregos")
  // const jsonInteracoes = await get("interacoes")
  // const jsonItensHabilidades = await get("itens-habilidades")

  let jogoRodando = true;
  let personagens = localStorage.getObject('lista-de-personagens');

  console.clear()
  while (jogoRodando) {
    // console.clear();
    console.log(chalk.yellow('  _______ _             _____               _           '))
    console.log(chalk.yellow(' |__   __| |           / ____|             (_)          '))
    console.log(chalk.yellow('    | |  | |__   ___  | |     _ __ ___  ___ _ _ __ ___  '))
    console.log(chalk.yellow("    | |  | '_ \\ / _ \\ | |    | '__/ _ \\/ __| | '_ ` _ \\ "))
    console.log(chalk.yellow('    | |  | | | |  __/ | |____| | |  __/\\__ \\ | | | | | |'))
    console.log(chalk.yellow('    |_|  |_| |_|\\___|  \\_____|_|  \\___||___/_|_| |_| |_|'))

    console.log('--------------------')
    console.log('O QUE DESEJA FAZER?');
    console.log('1 - Criar novo personagem');
    console.log('2 - Selecionar personagem');
    console.log('0 - Sair')
    console.log('--------------------')
    let respostaUsuario = await useQuestion('      SELECIONE UMA OPÇÃO')
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
        let selecaoPersonagem = true;
        console.clear();
        while (selecaoPersonagem) {
          let menuAcoes = false;
          personagens = localStorage.getObject('lista-de-personagens');
          console.log(chalk.blue("   ___________________________________________________________________"))
          console.log(chalk.blue("   |  ") + chalk.yellow('  _____                                                     ') + chalk.blue("   |"))
          console.log(chalk.blue("   |  ") + chalk.yellow(' |  __ \\                                                    ') + chalk.blue("   |"))
          console.log(chalk.blue("   |  ") + chalk.yellow(' | |__) |__ _ __ ___  ___  _ __   __ _  __ _  ___ _ __  ___ ') + chalk.blue("   |"))
          console.log(chalk.blue("   |  ") + chalk.yellow(" |  ___/ _ \\ '__/ __|/ _ \\| '_ \\ / _` |/ _` |/ _ \\ '_ \\/ __|") + chalk.blue("   |"))
          console.log(chalk.blue("   |  ") + chalk.yellow(" | |  |  __/ |  \\__ \\ (_) | | | | (_| | (_| |  __/ | | \\__ \\") + chalk.blue("   |"))
          console.log(chalk.blue("   |  ") + chalk.yellow(' |_|   \\___|_|  |___/\\___/|_| |_|\\__,_|\\__, |\\___|_| |_|___/') + chalk.blue("   |"))
          console.log(chalk.blue("   |  ") + chalk.yellow('                                        __/ |               ') + chalk.blue("   |"))
          console.log(chalk.blue("   |  ") + chalk.yellow('                                       |___/                ') + chalk.blue("   |"))
          console.log(chalk.blue("   |_________________________________________________________________|"))
          for (let i = 0; i < retornaTamanhoDaLista(personagens); i++) {
            console.log(personagens[i].id + " - " + personagens[i].nome);
          }
          let personagemSelecionado = await useQuestion('Digite o ID do personagem desejado ou 0 para voltar:')

          if (personagemSelecionado === '0') {
            console.clear()
            break;
          } else if (personagemSelecionado >= 1 && personagemSelecionado <= retornaTamanhoDaLista(personagens)) {
            menuAcoes = true;
            for (let personagem of personagens) {
              if (personagem.id.toString() === personagemSelecionado) {
                personagemSelecionado = personagem;
              }
            }
          } else {
            console.clear();
            console.log("Personagem Inválido, tente novamente")
          }

          //console.clear();
          while (menuAcoes) {
            console.clear()
            console.log(chalk.yellowBright("___       ___     __   __   ___  __          "))
            console.log(chalk.yellowBright(" |  |__| |__     /  ` |__) |__  /__` |  |\\/| "))
            console.log(chalk.yellowBright(" |  |  | |___    \\__, |  \\ |___ .__/ |  |  | "))
            console.log("")
            console.log('O QUE ' + personagemSelecionado.nome.toUpperCase() + ' DESEJA FAZER?')
            console.log("")
            console.log("1 - Praticar");
            console.log("2 - Trabalhar");
            console.log("3 - Dormir");
            console.log("4 - Interagir com outro Cresim");
            console.log("5 - Tomar banho");
            console.log("6 - Ver Stats de " + personagemSelecionado.nome);
            console.log("0 - Voltar")
            console.log("")
            let opcaoAcao = await useQuestion('SELECIONE UMA OPÇÃO');
            //personagemSelecionado = verificaCheat(personagemSelecionado, cheats, opcaoAcao)

            switch (opcaoAcao) {
              case '1':
                console.clear();
                let loopPraticar = true
                while (loopPraticar) {
                  console.log("PRATICAR");
                  console.log("-------")
                  console.log("1 - Escolher item")
                  console.log("2 - Ver itens")
                  console.log("3 - Comprar itens")
                  console.log("0 - Voltar")
                  opcaoAcao = await useQuestion('SELECIONE UMA OPÇÃO');
                  switch (opcaoAcao) {
                    case '1':
                      //escolher item
                      break;
                    case '2':
                      console.clear()
                      console.log(chalk.green("###########################################################"))
                      console.log(chalk.green("#   ") + chalk.blueBright("  _____                      _    __       _       ") + chalk.green("   #"))
                      console.log(chalk.green("#   ") + chalk.blueBright(" |_   _|                    | |  /_/      (_)      ") + chalk.green("   #"))
                      console.log(chalk.green("#   ") + chalk.blueBright("   | |  _ ____   _____ _ __ | |_ __ _ _ __ _  ___  ") + chalk.green("   #"))
                      console.log(chalk.green("#   ") + chalk.blueBright("   | | | '_ \\ \\ / / _ \\ '_ \\| __/ _` | '__| |/ _ \\ ") + chalk.green("   #"))
                      console.log(chalk.green("#   ") + chalk.blueBright("  _| |_| | | \\ V /  __/ | | | || (_| | |  | | (_) |") + chalk.green("   #"))
                      console.log(chalk.green("#   ") + chalk.blueBright(" |_____|_| |_|\\_/ \\___|_| |_|\\__\\__,_|_|  |_|\\___/ ") + chalk.green("   #"))
                      console.log(chalk.green("#                                                         #"))
                      console.log(chalk.green("###########################################################"))
                      mostraItensDoPersonagem(personagemSelecionado)
                      console.log("")
                      opcaoAcao = await useQuestion('Aperte ENTER para voltar')
                      console.clear()
                      break;
                    case '3':
                      console.clear()
                      let loopLoja = true;
                      let opcaoValida = true;
                      let itensRecebidos = [];
                      let loopLojaCategoria = true
                      while (loopLoja) {
                        loopLoja = true
                        console.log(chalk.yellowBright("##############################"))
                        console.log(chalk.yellowBright("#   ") + chalk.green("  _           _       ") + chalk.yellowBright("   #"))
                        console.log(chalk.yellowBright("#   ") + chalk.green(" | |         (_)      ") + chalk.yellowBright("   #"))
                        console.log(chalk.yellowBright("#   ") + chalk.green(" | |     ___  _  __ _ ") + chalk.yellowBright("   #"))
                        console.log(chalk.yellowBright("#   ") + chalk.green(" | |    / _ \\| |/ _` |") + chalk.yellowBright("   #"))
                        console.log(chalk.yellowBright("#   ") + chalk.green(" | |___| (_) | | (_| |") + chalk.yellowBright("   #"))
                        console.log(chalk.yellowBright("#   ") + chalk.green(" |______\\___/| |\\__,_|") + chalk.yellowBright("   #"))
                        console.log(chalk.yellowBright("#   ") + chalk.green("            _/ |      ") + chalk.yellowBright("   #"))
                        console.log(chalk.yellowBright("#   ") + chalk.green("           |__/       ") + chalk.yellowBright("   #"))
                        console.log(chalk.yellowBright("##############################"))
                        console.log("-----")
                        console.log("1 - Gastronomia")
                        console.log("2 - Pintura")
                        console.log("3 - Jogos")
                        console.log("4 - Jardinagem")
                        console.log("5 - Música")
                        console.log("0 - Voltar")
                        let opcaoAcaoLoja = await useQuestion('Qual categoria gostaria de dar uma olhadinha?')
                        loopLojaCategoria = true

                        switch (opcaoAcaoLoja) {
                          case '1':
                            // montaLojaDaCategoria(personagemSelecionado, 'Gastronomia', itens)
                            console.clear()
                            // let categoriaSelecionada = 'Gastronomia'
                            while (loopLojaCategoria) {

                              loja('Gastronomia', personagemSelecionado, itens)
                              opcaoAcao = await useQuestion('Digite o ID do produto desejado ou "0" para voltar')

                              const resultado = acaoCompra(opcaoAcao, itens, personagemSelecionado, 'Gastronomia')

                              switch (resultado) {
                                case 0:
                                  loopLojaCategoria = false
                                  break
                                case 1:
                                  personagemSelecionado = getPersonagemById(personagemSelecionado.id)
                                  break
                                case 2:
                                  break
                                case 3:
                                  break
                                case 4:
                                  break
                              }

                            }

                            break
                          case '2':
                            console.clear()
                            while (loopLojaCategoria) {

                              loja('Pintura', personagemSelecionado, itens)
                              opcaoAcao = await useQuestion('Digite o ID do produto desejado ou "0" para voltar')

                              const resultado = acaoCompra(opcaoAcao, itens, personagemSelecionado, 'Pintura')

                              switch (resultado) {
                                case 0:
                                  loopLojaCategoria = false
                                  break
                                case 1:
                                  personagemSelecionado = getPersonagemById(personagemSelecionado.id)
                                  break
                                case 2:
                                  break
                                case 3:
                                  break
                                case 4:
                                  break
                              }

                            }
                            break
                          case '3':
                            console.clear()
                            while (loopLojaCategoria) {

                              loja('Jogos', personagemSelecionado, itens)
                              opcaoAcao = await useQuestion('Digite o ID do produto desejado ou "0" para voltar')

                              const resultado = acaoCompra(opcaoAcao, itens, personagemSelecionado, 'Jogos')

                              switch (resultado) {
                                case 0:
                                  loopLojaCategoria = false
                                  break
                                case 1:
                                  personagemSelecionado = getPersonagemById(personagemSelecionado.id)
                                  break
                                case 2:
                                  break
                                case 3:
                                  break
                                case 4:
                                  break
                              }

                            }
                            break
                          case '4':
                            console.clear()
                            while (loopLojaCategoria) {

                              loja('Jardinagem', personagemSelecionado, itens)
                              opcaoAcao = await useQuestion('Digite o ID do produto desejado ou "0" para voltar')

                              const resultadoCompra = acaoCompra(opcaoAcao, itens, personagemSelecionado, 'Jardinagem')

                              switch (resultadoCompra) {
                                case 0:
                                  //console.log("caiu aqui")
                                  loopLojaCategoria = false
                                  break
                                case 1:
                                  personagemSelecionado = getPersonagemById(personagemSelecionado.id)
                                  break
                                case 2:
                                  break
                                case 3:
                                  break
                                case 4:
                                  console.log("aaaa")
                                  break
                              }

                            }
                            break
                          case '5':
                            console.clear()
                            while (loopLojaCategoria) {

                              loja('Musica', personagemSelecionado, itens)
                              opcaoAcao = await useQuestion('Digite o ID do produto desejado ou "0" para voltar')

                              const resultado = acaoCompra(opcaoAcao, itens, personagemSelecionado, 'Musica')

                              switch (resultado) {
                                case 0:
                                  loopLojaCategoria = false
                                  break
                                case 1:
                                  personagemSelecionado = getPersonagemById(personagemSelecionado.id)
                                  break
                                case 2:
                                  break
                                case 3:
                                  break
                                case 4:
                                  break
                              }

                            }
                            break
                          case '0':
                            console.clear()
                            loopLoja = false
                            opcaoValida = false
                            break
                          default:
                            console.clear()
                            console.log(chalk.redBright("Opção inválida, tente novamente."))
                            opcaoValida = false
                            break
                        }
                      }
                      break;
                    case '0':
                      console.clear()
                      loopPraticar = false;
                      break;
                    default:
                      console.clear();
                      console.log(chalk.redBright("Opção inválida, tente novamente."));
                  }
                }
                break;
              case '2':
                //trabalhar
                break;
              case '3':
                //dormir
                break;
              case '4':
                //interagir
                break;
              case '5':
                if (personagemSelecionado.saldo >= 10) {
                  console.clear()
                  console.log(chalk.blueBright("          .    (      )"))
                  console.log(chalk.blueBright("        '   . (  (  )"))
                  console.log(chalk.blueBright("       ,___________."))
                  console.log(chalk.blueBright("       | _________ |"))
                  console.log(chalk.blueBright("       ||  ,###   ||"))
                  console.log(chalk.blueBright("       ||  ####' %||"))
                  console.log(chalk.blueBright("       ||   ##`  #||"))
                  console.log(chalk.blueBright("       ||  :### # ||"))
                  console.log(chalk.blueBright("       ||  '####/ ||"))
                  console.log(chalk.blueBright("       ||   ##`   ||"))
                  console.log(chalk.blueBright("       ||  ###;   ||"))
                  console.log(chalk.blueBright("       ||-_-_-_-_-||"))
                  console.log(chalk.blueBright("       ||  '###;  ||"))
                  console.log(chalk.blueBright("       ||   '6#'  ||"))
                  console.log(chalk.blueBright("       ||    ;#'  ||"))
                  console.log(chalk.blueBright("       ||  ;#`#;  ||"))
                  console.log(chalk.blueBright("       || #!' #   ||"))
                  console.log(chalk.blueBright("       ||%____#___||"))
                  console.log(chalk.blueBright("       |___________|"))
                  console.log(chalk.whiteBright("BANHO TOMADO"))
                  personagemSelecionado = alteraHigiene(personagemSelecionado, "Tomar banho")
                  personagemSelecionado.saldo -= 10
                  atualizaPersonagemNaLista(personagemSelecionado)
                  opcaoAcao = await useQuestion('Aperte ENTER para voltar');
                } else {

                }
                break;
              case '6':
                console.log("Nome: " + personagemSelecionado.nome)
                console.log("")
                console.log("Tempo de vida: " + personagemSelecionado.tempoDeVida)
                console.log("")
                console.log("Saldo: $" + personagemSelecionado.saldo)
                console.log("")
                console.log("Aspiração: " + personagemSelecionado.aspiracao)
                console.log("")
                console.log("Pontos de higiene: " + personagemSelecionado.higiene)
                console.log("")
                console.log("Pontos de energia: " + personagemSelecionado.energia)
                console.log("")
                console.log("Trabalhos: ")
                console.log("      Jogador de Dota: ")
                console.log("            Nivel: " + personagemSelecionado.trabalho.JogadorDeDota[0])
                console.log("            Salário: " + personagemSelecionado.trabalho.JogadorDeDota[1])
                console.log("      Assistente Do Jacquin: ")
                console.log("            Nivel: " + personagemSelecionado.trabalho.AssistenteDoJacquin[0])
                console.log("            Salário: " + personagemSelecionado.trabalho.AssistenteDoJacquin[1])
                console.log("      Segurador De Pinceis: ")
                console.log("            Nivel: " + personagemSelecionado.trabalho.SeguradorDePinceis[0])
                console.log("            Salário: " + personagemSelecionado.trabalho.SeguradorDePinceis[1])
                console.log("      Desafinador: ")
                console.log("            Nivel: " + personagemSelecionado.trabalho.Desafinador[0])
                console.log("            Salário: " + personagemSelecionado.trabalho.Desafinador[1])
                console.log("      Ladrão De Planta: ")
                console.log("            Nivel: " + personagemSelecionado.trabalho.LadrãoDePlanta[0])
                console.log("            Salário: " + personagemSelecionado.trabalho.LadrãoDePlanta[1])
                break;
              case '0':
                console.clear()
                menuAcoes = false;
                break;
              default:
                console.clear();
                console.log(chalk.redBright("Opção inválida, tente novamente."));
            }
          }
        }
        break;
      case '0':
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
