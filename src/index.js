// Personagens
const personagens = {
  "Mario": { NOME: "Mario", VELOCIDADE: 4, MANOBRABILIDADE: 3, PODER: 3, PONTOS: 0 },
  "Peach": { NOME: "Peach", VELOCIDADE: 3, MANOBRABILIDADE: 4, PODER: 2, PONTOS: 0 },
  "Yoshi": { NOME: "Yoshi", VELOCIDADE: 2, MANOBRABILIDADE: 4, PODER: 3, PONTOS: 0 },
  "Bowser": { NOME: "Bowser", VELOCIDADE: 5, MANOBRABILIDADE: 2, PODER: 5, PONTOS: 0 },
  "Luigi": { NOME: "Luigi", VELOCIDADE: 3, MANOBRABILIDADE: 4, PODER: 4, PONTOS: 0 },
  "Donkey Kong": { NOME: "Donkey Kong", VELOCIDADE: 2, MANOBRABILIDADE: 2, PODER: 5, PONTOS: 0 },
};

let selected = [];
let p1, p2;
let round = 0;

// Seleção dos personagens
document.querySelectorAll(".character-card").forEach(card => {
  card.addEventListener("click", () => {
    if (selected.length < 2 || card.classList.contains("selected")) {
      card.classList.toggle("selected");

      selected = Array.from(document.querySelectorAll(".character-card.selected"))
        .map(el => el.dataset.name);

      document.getElementById("startBtn").disabled = selected.length !== 2;
    }
  });
});

// Botão iniciar corrida
document.getElementById("startBtn").addEventListener("click", () => {
  p1 = structuredClone(personagens[selected[0]]);
  p2 = structuredClone(personagens[selected[1]]);
  round = 0;

  logMessage(`🏁 Corrida entre ${p1.NOME} e ${p2.NOME} começou!`);
  updateScoreboard();

  document.getElementById("nextRoundBtn").disabled = false;
  document.getElementById("autoBtn").disabled = false;
});

// Próxima rodada
document.getElementById("nextRoundBtn").addEventListener("click", () => playRound());
document.getElementById("autoBtn").addEventListener("click", async () => {
  for (let i = 0; i < 5; i++) {
    await new Promise(res => setTimeout(res, 1200));
    playRound();
  }
});

// Funções da corrida
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function getRandomBlock() {
  let r = Math.random();
  if (r < 0.33) return "RETA";
  if (r < 0.66) return "CURVA";
  return "CONFRONTO";
}

function logMessage(msg) {
  const logs = document.getElementById("logs");
  logs.innerHTML += msg + "<br>";
  logs.scrollTop = logs.scrollHeight;
}

function updateScoreboard() {
  document.getElementById("scoreboard").innerText =
    `${p1.NOME}: ${p1.PONTOS} pontos | ${p2.NOME}: ${p2.PONTOS} pontos`;
}

function playRound() {
  round++;
  let block = getRandomBlock();
  logMessage(`<b>🏁 Rodada ${round} - Bloco: ${block}</b>`);

  let dice1 = rollDice();
  let dice2 = rollDice();
  let total1 = 0, total2 = 0;

  if (block === "RETA") {
    total1 = dice1 + p1.VELOCIDADE;
    total2 = dice2 + p2.VELOCIDADE;
  }
  if (block === "CURVA") {
    total1 = dice1 + p1.MANOBRABILIDADE;
    total2 = dice2 + p2.MANOBRABILIDADE;
  }
  if (block === "CONFRONTO") {
    total1 = dice1 + p1.PODER;
    total2 = dice2 + p2.PODER;
    logMessage(`${p1.NOME} confrontou ${p2.NOME}!`);
  }

  if (total1 > total2) {
    p1.PONTOS++;
    logMessage(`${p1.NOME} marcou ponto! ✨`);
  } else if (total2 > total1) {
    p2.PONTOS++;
    logMessage(`${p2.NOME} marcou ponto! ✨`);
  } else {
    logMessage("Rodada empatada! ⏱️");
  }

  updateScoreboard();
}
