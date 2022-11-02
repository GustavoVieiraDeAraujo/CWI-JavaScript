import { realizaCheat } from '../src/cheats/cheats.js'
import { alteraEnergia } from '../src/energy/energy.js'
import { personagemTrabalha } from '../src/work/work.js'
import { personagemTreinar } from '../src/train/train.js'
import { alteraHigiene } from '../src/hygiene/hygiene.js'
import { compraItem , getPersonagemById} from '../src/funcoes.js'
import { criaPersonagem } from '../src/character-creation/character-creation.js';
import { useLocalStorage } from '../src/services/local-storage/use-local-storage.js';

describe("Testes de Criação de Personagem", ()=>{
  let personagemEsperado;
  let localStorage;

  beforeEach(() => {
    personagemEsperado = {
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
    localStorage.deleteStorageByKey("lista-de-personagens");
  })

  it('Deve conseguir criar um novo Cresim com nome, pontos de higiene e energia carregados e 1500 Cresceleons', () => {
    criaPersonagem("Teste", "Gastronomia", localStorage);
    const personagemCriado = localStorage.getObject("lista-de-personagens")[0];

    expect(personagemCriado).toEqual(personagemEsperado)
  })

  it('Deve conseguir atribuir uma aspiração ao Cresim', () => {
    criaPersonagem("Teste", "Gastronomia", localStorage);
    const personagemCriado = localStorage.getObject("lista-de-personagens")[0];

    expect(personagemCriado.aspiracao).toBe("Gastronomia")
  })
})

describe("Testes de Energia", ()=>{
  let personagemTeste;

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
  })

  it('Deve validar os pontos de energia do personagem para que não passem de 32 pontos', () => {
    alteraEnergia(personagemTeste, "Dormir", 2)

    expect(personagemTeste.energia).toBe(32)
  })

  it('Deve validar os pontos de energia do personagem para que não fiquem negativados', () => {
    personagemTeste.energia = 0
    alteraEnergia(personagemTeste, "Treino", 99999)

    expect(personagemTeste.energia).toBe(0)
  })

  it('Deve conseguir dormir e receber seus pontos de energia ', () => {
    personagemTeste.energia = 0
    alteraEnergia(personagemTeste, "Dormir", 10)

    expect(personagemTeste.energia).toBe(32)
  })
})

describe("Teste de Compra de Item de Habilidade", () => {
  let item;
  let localStorage;

  beforeEach(() => {
    item = {
      id: 1,
      nome: "Makita cortadora de cebola",
      pontos: 3,
      preco: 1800
    }
    localStorage = useLocalStorage();
    localStorage.deleteStorageByKey("lista-de-personagens");
  })

  it('Deve conseguir comprar um item de habilidade', () => {
    criaPersonagem("Teste", "Gastronomia", localStorage);
    const personagemCriado = localStorage.getObject("lista-de-personagens")[0];
    personagemCriado.saldo = 2000
    compraItem(personagemCriado, item);
    const personagemAtualizado = localStorage.getObject("lista-de-personagens")[0];

    expect(personagemAtualizado.inventario).toEqual([item])
  })

  it('Deve validar ao tentar comprar um item de habilidade sem Cresceleons suficientes', () => {
    criaPersonagem("Teste", "Gastronomia", localStorage);
    const personagemCriado = localStorage.getObject("lista-de-personagens")[0];
    const conseguiuComprar = compraItem(personagemCriado, item);

    expect(conseguiuComprar).toBe(-2)
  })
})

describe("Teste de Treino", () => {
  let personagemTeste;

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
  })

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

  it('Deve conseguir concluir um ciclo de treino com habilidade que é sua aspiração e receber os pontos corretamente', () => {
    const item = {
      id: 1,
      nome: "Makita cortadora de cebola",
      pontos: 3,
      preco: 1800
    }
    personagemTreinar(personagemTeste, "Gastronomia", item)

    expect(personagemTeste.habilidades["gastronomia"][1]).toBe(4)
  })

  it('Deve perder pontos de energia ao terminar um ciclo de treino', () => {
    for(let i = 0; i <3; i++){
      alteraEnergia(personagemTeste, "Treino")
    }

    expect(personagemTeste.energia).toBe(20)
  })

  it('Deve perder pontos de higiene ao terminar um ciclo de treino', () => {
    for (let i = 0; i < 3; i++) {
      alteraHigiene(personagemTeste, "Treino")
    }

    expect(personagemTeste.higiene).toBe(22)
  })

  it('Deve avançar o nivel de habilidade quando completar os pontos necessarios', () => {
    const item = {
      id: 3,
      nome: "Tinta a óleo dos Alpes suiços",
      pontos: 8,
      preco: 3800
    }
    personagemTeste.habilidades.pintura[1] = 9
    personagemTreinar(personagemTeste, "Pintura", item)

    expect(personagemTeste.habilidades["pintura"][0]).toBe("PLENO")
  })
})

describe("Testes de Trabalho", () => {
  let localStorage;

  beforeEach(() => {
    localStorage = useLocalStorage();
    localStorage.deleteStorageByKey("lista-de-personagens");
  })

  it('Deve perder os pontos de energia ao trabalhar uma jornada padrão', () => {
    criaPersonagem('teste1', 'Gastronomia', localStorage);
    let personagem = localStorage.getObject('lista-de-personagens')[0];
    personagemTrabalha(personagem, 'Seguradordepinceis', localStorage)
    personagem = getPersonagemById(personagem.id)

    expect(personagem.energia).toBe(22)
  })

  it('Deve receber o salario do dia ao trabalhar uma jornada padrão', () => {
    criaPersonagem('teste1', 'Gastronomia', localStorage);
    let personagem = localStorage.getObject('lista-de-personagens')[0]
    personagemTrabalha(personagem, 'Seguradordepinceis', localStorage)
    personagem = getPersonagemById(personagem.id)

    expect(personagem.saldo).toBe(1610)
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
})

describe("Teste de Tomar Banho", ()=>{
  it('Deve descontar 10 Cresceleons ao tomar banho', () => {
    const personagemTeste = {
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
    alteraHigiene(personagemTeste, "Tomar banho")
    expect(personagemTeste.saldo).toBe(1490)
  })
})

describe("Testes do Relacionamento", () => {
  it('Deve evoluir o relacionamento de dois Cresims para AMIZADE', () => {
    expect().toBe()
  })

  it('Deve recuar o relacionamento de dois Cresims para INIMIZADE', () => {
    expect().toBe()
  })

  it('Deve descontar os pontos de energia em uma interação entre dois Cresims', () => {
    expect().toBe()
  })
})

describe("Testes dos Cheats", ()=>{
  let personagemTeste;

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
  })

  it('Deve conseguir aplicar o cheat SORTENAVIDA e receber as recompensas', () => {
    const esperado = {
      JogadordeDota: ['JUNIOR', 176],
      AssistentedoJacquin: ['JUNIOR', 143],
      Seguradordepinceis: ['JUNIOR', 121],
      Desafinador: ['JUNIOR', 231],
      Ladraodeplanta: ['JUNIOR', 176]
    }
    realizaCheat(personagemTeste, "SORTENAVIDA")

    expect(personagemTeste.trabalho).toEqual(esperado)
  })

  it('Deve conseguir aplicar o cheat DEITADONAREDE e receber as recompensas', () => {
    personagemTeste.energia = 0
    realizaCheat(personagemTeste, "DEITADONAREDE")
    expect(personagemTeste.energia).toBe(5)
  })

  it('Deve conseguir aplicar o cheat JUNIM e receber as recompensas para a habilidade escolhida', () => {
    realizaCheat(personagemTeste, "JUNIM")

    expect(personagemTeste.habilidades.gastronomia[1]).toBe(5)
  })

  it('Deve conseguir aplicar o cheat CAROLINAS e receber as recompensas', () => {
    realizaCheat(personagemTeste, "CAROLINAS")

    expect(personagemTeste.tempoDeVida).toBe(3700000)
  })

  it('Deve conseguir aplicar o cheat SINUSITE ter a vida zerada', () => {
    realizaCheat(personagemTeste, "SINUSITE")

    expect(personagemTeste.tempoDeVida).toBe(0)
  })
})

