const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};

const player2 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
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
  console.log(
    `${characterName} 🎲 rolou um dado de ${atributo}: ${diceResult} + ${attributeValue} = ${
      diceResult + attributeValue
    }`
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`\n🏁 Rodada ${round}`);

    let block = await getRandomBlock();
    console.log(`Bloco sorteado: ${block}`);

    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

      await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
      await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
    }

    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
      await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
    }

    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;

      totalTestSkill1 = powerResult1;
      totalTestSkill2 = powerResult2;

      console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);
      await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
      await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

      if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
        console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto! 🐢`);
        character2.PONTOS--;
      }

      if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
        console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto! 🐢`);
        character1.PONTOS--;
      }

      if (powerResult1 === powerResult2) {
        console.log("O confronto terminou empatado! Nenhum ponto foi marcado. 🤝");
      } else {
        console.log("O confronto terminou! 🏁");
      }
    }

    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.NOME} marcou um ponto! ✨`);
      character1.PONTOS++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.NOME} marcou um ponto! ✨`);
      character2.PONTOS++;
    } else {
      console.log("Empate nesta rodada! Ninguém marcou ponto. 🤷‍♂️");
    }

    console.log("------------------------------------------------");
  }

  console.log(`\n🏁 Placar final: ${character1.NOME}: ${character1.PONTOS} | ${character2.NOME}: ${character2.PONTOS}`);

  if (character1.PONTOS > character2.PONTOS) {
    console.log(`🏆 ${character1.NOME} venceu a corrida! ⭐`);
  } else if (character2.PONTOS > character1.PONTOS) {
    console.log(`🏆 ${character2.NOME} venceu a corrida! ⭐`);
  } else {
    console.log("⏱️ A corrida terminou empatada! 🤝");
  }
}

(async function main() {
  console.log(`\n🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);
  await playRaceEngine(player1, player2);
})();
