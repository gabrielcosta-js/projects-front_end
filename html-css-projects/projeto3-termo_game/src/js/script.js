// ================== CONFIGURAÇÕES & SELECTORS ==================
const linhas = document.querySelectorAll(".div-secao-letras");
const teclado = document.querySelectorAll(".letras-icone");
const btnEnter = document.querySelector("#enter");
const btnApagar = document.querySelector("#apagar");

const modal = document.getElementById("resultado-modal");
const modalTitulo = document.getElementById("resultado-titulo");
const modalTexto = document.getElementById("resultado-texto");
const btnJogarNovamente = document.getElementById("btn-jogar-novamente");

const statVitorias = document.getElementById("stat-vitorias");
const statJogos = document.getElementById("stat-jogos");
const statSequencia = document.getElementById("stat-sequencia");
const statUltimas = document.getElementById("stat-ultimas");


// ===============================================================
//            CARREGAR DICIONÁRIO E BANCO DE PALAVRAS
// ===============================================================
let dicionario = [];
let bancoPalavras = [];
let palavraSecreta = "";
let jsonCarregado = false;

fetch("./src/js/palavras.txt")
  .then(resp => resp.text())
  .then(texto => {
    dicionario = texto
      .split("\n")
      .map(p => p.trim().toUpperCase())
      .filter(p => p.length === 5); // só palavras de 5 letras

    bancoPalavras = [...dicionario];

    palavraSecreta = bancoPalavras[Math.floor(Math.random() * bancoPalavras.length)];

    console.log("Palavras carregadas:", dicionario.length);
    console.log("Palavra sorteada:", palavraSecreta);

    jsonCarregado = true;
    atualizarLinhas();
  })
  .catch(err => {
    console.error("Erro ao carregar palavras.txt", err);
    alert("Erro ao carregar o banco de palavras!");
  });



// ================== ESTADO DO JOGO ==================
let linhaAtual = 0;
let indice = 0; 
let jogoAtivo = true;


// ===============================================================
//                     ESTATÍSTICAS
// ===============================================================
const STORAGE_KEY = "termo_stats_v1";
const statsDefault = { vitorias:0, jogos:0, sequencia:0, melhorSequencia:0, ultimas:[] };
let stats = loadStats();
renderStats();


// ===============================================================
//                        FUNÇÕES UI
// ===============================================================
function atualizarLinhas() {
  linhas.forEach((linha, i) => {
    const inputs = linha.querySelectorAll("input");
    inputs.forEach(inp => {
      inp.disabled = i !== linhaAtual || !jogoAtivo || !jsonCarregado;
      inp.classList.toggle("linha-atual-ativa", i === linhaAtual && jogoAtivo && jsonCarregado);
    });
  });
}

atualizarLinhas();


// ===============================================================
//                       INSERIR LETRA
// ===============================================================
function inserirLetra(letra) {
  if (!jogoAtivo || !jsonCarregado) return;
  const inputs = linhas[linhaAtual].querySelectorAll("input");
  if (indice < 5) {
    inputs[indice].value = letra.toUpperCase();
    indice++;
    playSound("type");
  }
}


// ===============================================================
//                   TECLADO VIRTUAL
// ===============================================================
teclado.forEach(key => {
  key.addEventListener("click", () => {
    if (!jsonCarregado) return;

    if (key.id === "enter") {
      confirmarPalavra();
      return;
    }
    if (key.querySelector("#apagar")) {
      apagarLetra();
      return;
    }
    inserirLetra(key.innerText.trim());
  });
});


// ===============================================================
//                   TECLADO FÍSICO
// ===============================================================
document.addEventListener("keydown", (e) => {
  if (!jogoAtivo || !jsonCarregado) return;

  if (e.key === "Backspace") {
    apagarLetra();
    return;
  }
  if (e.key === "Enter") {
    confirmarPalavra();
    return;
  }

  const k = e.key.toUpperCase();
  if (/^[A-Z]$/.test(k)) inserirLetra(k);
});


// ===============================================================
//                        APAGAR LETRA
// ===============================================================
function apagarLetra() {
  const inputs = linhas[linhaAtual].querySelectorAll("input");
  if (indice > 0) {
    indice--;
    inputs[indice].value = "";
    playSound("back");
  }
}


// ===============================================================
//                     VALIDAR PALAVRA
// ===============================================================
function palavraExiste(palavra) {
  return dicionario.includes(palavra);
}


// ===============================================================
//                   ANIMAÇÃO E CORES DO TECLADO
// ===============================================================
function aplicarCorNoTeclado(letra, corClasse) {
  teclado.forEach(k => {
    if (k.innerText.trim().toUpperCase() === letra.toUpperCase()) {

      if (k.classList.contains("cor-verde")) return;
      if (k.classList.contains("cor-amarelo") && corClasse === "cor-cinza") return;

      k.classList.remove("cor-verde", "cor-amarelo", "cor-cinza");
      k.classList.add(corClasse);
    }
  });
}

function animarFlipEAplicar(input, corHex, corClasse, delay) {
  setTimeout(() => {
    input.classList.add("flip");
    input.style.transform = "rotateX(90deg)";
  }, delay);

  setTimeout(() => {
    input.style.backgroundColor = corHex;
    input.style.transform = "rotateX(0deg)";
    input.classList.add("jump");
    setTimeout(() => input.classList.remove("jump"), 600);
  }, delay + 300);

  aplicarCorNoTeclado(input.value, corClasse);
}


// ===============================================================
//                     CONFIRMAR PALAVRA
// ===============================================================
function confirmarPalavra() {
  if (!jogoAtivo) return;
  if (!jsonCarregado) {
    alert("Carregando dicionário, aguarde...");
    return;
  }

  const inputs = linhas[linhaAtual].querySelectorAll("input");
  let palavra = "";

  for (let i = 0; i < 5; i++) {
    if (inputs[i].value === "") {
      linhas[linhaAtual].classList.add("shake");
      playSound("error");
      setTimeout(() => linhas[linhaAtual].classList.remove("shake"), 600);
      return;
    }
    palavra += inputs[i].value.toUpperCase();
  }

  if (!palavraExiste(palavra)) {
    linhas[linhaAtual].classList.add("shake");
    playSound("error");
    setTimeout(() => linhas[linhaAtual].classList.remove("shake"), 700);
    alert("Palavra não encontrada no dicionário.");
    return;
  }

  for (let i = 0; i < 5; i++) {
    const letra = inputs[i].value.toUpperCase();
    let corHex = "#312a2c";
    let corClasse = "cor-cinza";

    if (letra === palavraSecreta[i]) {
      corHex = "#3aa394";
      corClasse = "cor-verde";
    } else if (palavraSecreta.includes(letra)) {
      corHex = "#d3ad69";
      corClasse = "cor-amarelo";
    }

    inputs[i].disabled = true;
    animarFlipEAplicar(inputs[i], corHex, corClasse, i * 200);
  }

  setTimeout(() => {
    if (palavra === palavraSecreta) {
      playSound("win");
      endGame(true, palavra);
    } else {
      linhaAtual++;
      indice = 0;
      if (linhaAtual >= linhas.length) {
        playSound("lose");
        endGame(false, palavraSecreta);
      } else {
        atualizarLinhas();
      }
    }
  }, 1200);
}


// ===============================================================
//                         FIM DE JOGO
// ===============================================================
function endGame(vitoria, palavraFinal) {
  jogoAtivo = false;
  atualizarLinhas();

  stats.jogos++;

  if (vitoria) {
    stats.vitorias++;
    stats.sequencia++;
    if (stats.sequencia > stats.melhorSequencia) stats.melhorSequencia = stats.sequencia;
    modalTitulo.innerText = "Você venceu!";
    modalTexto.innerText = `Parabéns — a palavra era ${palavraFinal}`;
  } else {
    stats.sequencia = 0;
    modalTitulo.innerText = "Fim de jogo";
    modalTexto.innerText = `A palavra era ${palavraFinal}`;
  }

  stats.ultimas.unshift(palavraFinal);
  if (stats.ultimas.length > 10) stats.ultimas.pop();

  saveStats();
  renderStats();

  modal.classList.remove("hidden");
}


btnJogarNovamente.addEventListener("click", () => {
  modal.classList.add("hidden");
  reiniciarJogo();
});


// ===============================================================
//                        REINICIAR
// ===============================================================
function reiniciarJogo() {
  linhas.forEach(linha => {
    const inputs = linha.querySelectorAll("input");
    inputs.forEach(inp => {
      inp.value = "";
      inp.style.backgroundColor = "";
      inp.disabled = true;
      inp.style.transform = "";
      inp.classList.remove("flip", "jump");
    });
  });

  teclado.forEach(k => k.classList.remove("cor-verde", "cor-amarelo", "cor-cinza"));

  palavraSecreta = bancoPalavras[Math.floor(Math.random() * bancoPalavras.length)];
  console.log("Nova palavra:", palavraSecreta);

  linhaAtual = 0;
  indice = 0;
  jogoAtivo = true;
  atualizarLinhas();
}


// ===============================================================
//                      SONS
// ===============================================================
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(tipo) {
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.connect(g);
  g.connect(audioCtx.destination);

  if (tipo === "type") {
    o.frequency.value = 880;
    g.gain.setValueAtTime(0.02, audioCtx.currentTime);
    o.start();
    setTimeout(() => o.stop(), 80);
  } else if (tipo === "back") {
    o.frequency.value = 440;
    g.gain.setValueAtTime(0.02, audioCtx.currentTime);
    o.start();
    setTimeout(() => o.stop(), 60);
  } else if (tipo === "win") {
    sequence([880, 1100, 1320], 80, 0.03);
  } else if (tipo === "lose") {
    sequence([200, 160, 120], 130, 0.04);
  } else if (tipo === "error") {
    sequence([240, 200], 90, 0.03);
  }
}

function sequence(freqs, dur, gain) {
  let t = audioCtx.currentTime;
  freqs.forEach((f, i) => {
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.frequency.value = f;
    g.gain.value = gain;
    o.connect(g); g.connect(audioCtx.destination);
    o.start(t + i * (dur/1000));
    o.stop(t + i * (dur/1000) + (dur/1000));
  });
}


// ===============================================================
//                ESTATÍSTICAS LOCALSTORAGE
// ===============================================================
function loadStats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...statsDefault };
    return { ...statsDefault, ...JSON.parse(raw) };
  } catch {
    return { ...statsDefault };
  }
}

function saveStats() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

function renderStats() {
  statVitorias.innerText = stats.vitorias;
  statJogos.innerText = stats.jogos;
  statSequencia.innerText = stats.melhorSequencia;
  statUltimas.innerText = stats.ultimas.join(", ");
}

atualizarLinhas();
