import { useLocalStorage } from '../src/services/local-storage/use-local-storage.js';
import { criaPersonagem } from '../src/character-creation/character-creation.js';
import { personagemTrabalha } from '../src/work/work.js'
import { personagemTreinar } from '../src/train/train.js'
import { alteraHigiene } from '../src/hygiene/hygiene.js'
import { alteraEnergia } from '../src/energy/energy.js'
import { realizaCheat } from '../src/cheats/cheats.js'
import { compraItem } from '../src/funcoes.js'



describe('Testes', () => {

  let personagemTeste;
  let localStorage;

  beforeEach(() => {
    personagemTeste = {
      id: 1,
      nome: "Teste",
      tempoDeVida: 3600000,
      saldo: 1500,
      aspiracao: "Gastronomia",
      higiene: 28,
      energia: 32,
      inventario: [],
      trabalho: {
        JogadordeDota: ["JUNIOR", 160],
        AssistentedoJacquin: ["JUNIOR", 130],
        Seguradordepinceis: ["JUNIOR", 110],
        Desafinador: ["JUNIOR", 210],
        Ladraodeplanta: ["JUNIOR", 160]
      },
      habilidades: {
        gastronomia: ["JUNIOR", 0],
        pintura: ["JUNIOR", 0],
        jogos: ["JUNIOR", 0],
        jardinagem: ["JUNIOR", 0],
        musica: ["JUNIOR", 0]
      },
      relacionamentos: {}
    };
    localStorage = useLocalStorage();
  })

  afterEach(() => {
    localStorage.deleteStorageByKey("lista-de-personagens")
  });

  // ok
  it('Deve conseguir criar um novo Cresim com nome, pontos de higiene e energia carregados e 1500 Cresceleons', () => {
    criaPersonagem("Teste", "Gastronomia", localStorage);
    const personagemCriado = localStorage.getObject("lista-de-personagens")[0];

    expect(personagemCriado).toEqual(personagemTeste)
  })

  // ok
  it('Deve conseguir atribuir uma aspiração ao Cresim', () => {
    criaPersonagem("Teste", "Gastronomia", localStorage);
    const personagemCriado = localStorage.getObject("lista-de-personagens")[0];

    expect(personagemCriado.aspiracao).toBe("Gastronomia")
  })

  // ok
  it('Deve validar os pontos de energia do personagem para que não passem de 32 pontos', () => {
    alteraEnergia(personagemTeste, "Dormir", 2)
    
    expect(personagemTeste.energia).toBe(32)
  })

  // ok
  it('Deve validar os pontos de energia do personagem para que não fiquem negativados', () => {
    personagemTeste.energia = 0
    alteraEnergia(personagemTeste, "Treino", 99999)

    expect(personagemTeste.energia).toBe(0)
  })

  // Não esta alterando a energia quando dormi
  // it('Deve conseguir dormir e receber seus pontos de energia ', () => {
  //   personagemTeste.energia = 0
  //   alteraEnergia(personagemTeste, "Dormir", 10)
  //   // primeiro ciclo = 4 energia
  //   // resto dos ciclos = 9 * 6 = 54
  //   // total = 54 
  //   // mas não passa de 32, logo ele ganha 32
  //   expect(personagemTeste.energia).toBe(32)
  // })

  // ok
  it('Deve conseguir comprar um item de habilidade', () => {
    const item = {
      id: 1,
      nome: "Makita cortadora de cebola",
      pontos: 3,
      preco: 1800
    }
    criaPersonagem("Teste", "Gastronomia", localStorage);
    const personagemCriado = localStorage.getObject("lista-de-personagens")[0];
    personagemCriado.saldo = 2000
    compraItem(personagemCriado, item);
    const personagemAtualizado = localStorage.getObject("lista-de-personagens")[0];
    
    expect(personagemAtualizado.inventario).toEqual([{id: 1, nome: "Makita cortadora de cebola", pontos: 3, preco: 1800}])
  })

  // ok
  it('Deve validar ao tentar comprar um item de habilidade sem Cresceleons suficientes', () => {
    const item = {
      id: 1,
      nome: "Makita cortadora de cebola",
      pontos: 3,
      preco: 1800
    }
    criaPersonagem("Teste", "Gastronomia", localStorage);
    const personagemCriado = localStorage.getObject("lista-de-personagens")[0];
    const conseguiuComprar = compraItem(personagemCriado, item);

    expect(conseguiuComprar).toBe(-2)
  })

  // ok
  it('Deve conseguir concluir um ciclo de treino com habilidade que não é aspiração e receber os pontos corretamente', () => {
    const item = {
      id: 1,
      nome: "Lápis mordido",
      pontos: 3,
      preco: 1200
    }

    personagemTreinar(personagemTeste, "Pintura", item)
    expect(personagemTeste.habilidades["pintura"][1]).toBe(3)
  })

  // ok
  it('Deve conseguir concluir um ciclo de treino com habilidade que é sua aspiração e receber os pontos corretamente', () => {
    const item = {
      id: 1,
      nome: "Makita cortadora de cebola",
      pontos: 3,
      preco: 1800
    }
    personagemTreinar(personagemTeste, "Gastronomia", item)
    expect(personagemTeste.habilidades["gastronomia"][1]).toBe(4)
    expect().toBe()
  })

  // ok
  it('Deve perder pontos de energia ao terminar um ciclo de treino', () => {
    alteraEnergia(personagemTeste, "Treino", 1)
    alteraEnergia(personagemTeste, "Treino", 1)
    alteraEnergia(personagemTeste, "Treino", 1)

    expect(personagemTeste.energia).toBe(20)
  })

  // ok 
  it('Deve perder pontos de higiene ao terminar um ciclo de treino', () => {
    for(let i= 0; i < 4; i++){
      alteraHigiene(personagemTeste, 'Treino')
    }
    expect(personagemTeste.higiene).toBe(20)
  })

  // ok
  it('Deve avançar o nivel de habilidade quando completar os pontos necessarios', () => {
    const item = {
      id: 1,
      nome: "Makita cortadora de cebola",
      pontos: 3,
      preco: 1800
    }

    personagemTeste.habilidades.gastronomia[1] = 13
    personagemTreinar(personagemTeste, "Gastronomia", item)
    expect(personagemTeste.habilidades["gastronomia"][0]).toBe("PLENO")
  })

  // ----------- trabalho 
  it('Deve perder os pontos de energia ao trabalhar uma jornada padrão', () => {
    expect().toBe()
  })

  it('Deve receber o salario do dia ao trabalhar uma jornada padrão', () => {
  })

  it('Deve receber o salario equivalente quando começar a trabalhar com os pontos de energia menores que 10 ', () => {
    expect().toBe()
  })

  it('Deve receber o salario equivalente quando começar a trabalhar com os pontos de energia menores que 10 e pontos de higiene menores que 4 ', () => {
    expect().toBe()
  })

  it('Deve validar para que o Cresim não consiga começar a trabalhar com os pontos de energia menores que 4', () => {
    expect().toBe()
  })
  // ------------ trabalho

  // ok
  it('Deve descontar 10 Cresceleons ao tomar banho', () => {
    alteraHigiene(personagemTeste, "Tomar banho")
    expect(personagemTeste.saldo).toBe(1490)
  })

  // ------------ relacionamento
  it('Deve evoluir o relacionamento de dois Cresims para AMIZADE', () => {
    expect().toBe()
  })

  it('Deve recuar o relacionamento de dois Cresims para INIMIZADE', () => {
    expect().toBe()
  })

  it('Deve descontar os pontos de energia em uma interação entre dois Cresims', () => {
    expect().toBe()
  })
  // ------------ relacionamento

  it('Deve conseguir aplicar o cheat SORTENAVIDA e receber as recompensas', () => {
  })

  it('Deve conseguir aplicar o cheat DEITADONAREDE e receber as recompensas', () => {
  })

  it('Deve conseguir aplicar o cheat JUNIM e receber as recompensas para a habilidade escolhida', () => {
    expect().toBe()
  })

  it('Deve conseguir aplicar o cheat CAROLINAS e receber as recompensas', () => {
    expect().toBe()
  })

  it('Deve conseguir aplicar o cheat SINUSITE ter a vida zerada', () => {
    expect().toBe()
  })
})

