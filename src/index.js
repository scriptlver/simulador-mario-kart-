const readline = require("readline");

const personagens = {
  "Mario": { NOME: "Mario", VELOCIDADE: 4, MANOBRABILIDADE: 3, PODER: 3, PONTOS: 0 },
  "Peach": { NOME: "Peach", VELOCIDADE: 3, MANOBRABILIDADE: 4, PODER: 2, PONTOS: 0 },
  "Yoshi": { NOME: "Yoshi", VELOCIDADE: 2, MANOBRABILIDADE: 4, PODER: 3, PONTOS: 0 },
  "Bowser": { NOME: "Bowser", VELOCIDADE: 5, MANOBRABILIDADE: 2, PODER: 5, PONTOS: 0 },
  "Luigi": { NOME: "Luigi", VELOCIDADE: 3, MANOBRABILIDADE: 4, PODER: 4, PONTOS: 0 },
  "Donkey Kong": { NOME: "Donkey Kong", VELOCIDADE: 2, MANOBRABILIDADE: 2, PODER: 5, PONTOS: 0 },
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  if (random < 0.33) return "RETA";
  if (random < 0.66) return "CURVA";
  return "CONFRONTO";
}

async function logRollResult(characterName, atributo, diceResult, attributeValue) {
  console.log(`${characterName} 🎲 rolou um dado de ${atributo}: ${diceResult} + ${attributeValue} = ${diceResult + attributeValue}`);
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`\n🏁 Rodada ${round}`);
    let block = await getRandomBlock();
    console.log(`Bloco sorteado: ${block}`);

    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    let total1 = 0;
    let total2 = 0;

    if (block === "RETA") {
      total1 = diceResult1 + character1.VELOCIDADE;
      total2 = diceResult2 + character2.VELOCIDADE;
      await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
      await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
    }

    if (block === "CURVA") {
      total1 = diceResult1 + character1.MANOBRABILIDADE;
      total2 = diceResult2 + character2.MANOBRABILIDADE;
      await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
      await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
    }

    if (block === "CONFRONTO") {
      let power1 = diceResult1 + character1.PODER;
      let power2 = diceResult2 + character2.PODER;
      total1 = power1;
      total2 = power2;

      console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);
      await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
      await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

      const ataque = Math.random() < 0.5 ? { tipo: "casco", dano: 1 } : { tipo: "bomba", dano: 2 };

      if (power1 > power2) {
        console.log(`${character1.NOME} venceu! ${character2.NOME} levou um ${ataque.tipo}! 💥`);
        character2.PONTOS = Math.max(0, character2.PONTOS - ataque.dano);
        if (Math.random() < 0.5) {
          character1.PONTOS++;
          console.log(`${character1.NOME} ganhou um TURBO! 🚀`);
        }
      } else if (power2 > power1) {
        console.log(`${character2.NOME} venceu! ${character1.NOME} levou um ${ataque.tipo}! 💥`);
        character1.PONTOS = Math.max(0, character1.PONTOS - ataque.dano);
        if (Math.random() < 0.5) {
          character2.PONTOS++;
          console.log(`${character2.NOME} ganhou um TURBO! 🚀`);
        }
      } else {
        console.log("Empate no confronto! 🤝");
      }
    }

    if (total1 > total2) {
      character1.PONTOS++;
      console.log(`${character1.NOME} marcou ponto! ✨`);
    } else if (total2 > total1) {
      character2.PONTOS++;
      console.log(`${character2.NOME} marcou ponto! ✨`);
    } else {
      console.log("Rodada empatada! ⏱️");
    }

    console.log("------------------------------------------------");
  }

  console.log(`\n🏁 Placar final: ${character1.NOME}: ${character1.PONTOS} | ${character2.NOME}: ${character2.PONTOS}`);
  if (character1.PONTOS > character2.PONTOS) {
    console.log(`🏆 ${character1.NOME} venceu a corrida!`);
  } else if (character2.PONTOS > character1.PONTOS) {
    console.log(`🏆 ${character2.NOME} venceu a corrida!`);
  } else {
    console.log("A corrida terminou empatada! 🤝");
  }
}

function askCharacters() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log("🚗 Personagens disponíveis:");
  Object.keys(personagens).forEach(p => console.log(" - " + p));

  rl.question("Escolha o primeiro personagem: ", (nome1) => {
    rl.question("Escolha o segundo personagem: ", async (nome2) => {
      const p1 = structuredClone(personagens[nome1]);
      const p2 = structuredClone(personagens[nome2]);

      if (!p1 || !p2) {
        console.log("❌ Nome inválido! Tente novamente.");
        rl.close();
        return;
      }

      console.log(`\n🏁🚨 Corrida entre ${p1.NOME} e ${p2.NOME} começando...\n`);
      await playRaceEngine(p1, p2);
      rl.close();
    });
  });
}

askCharacters();
