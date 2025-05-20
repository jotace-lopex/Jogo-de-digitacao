const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
const letraDiv = document.getElementById("letraAlvo");
const msgDiv = document.getElementById("mensagem");
const proximoBtn = document.getElementById("proximoBtn");
let letraAtual = "A";
let acertos = 0;

function gerarNovaLetra() {
  letraAtual = letras[Math.floor(Math.random() * letras.length)];
  letraDiv.textContent = letraAtual;
  msgDiv.textContent = "";
  msgDiv.style.color = "#119B3A";
}

function getEventKey(e) {
  if (e.code === "Space") return "Space";
  if (e.code === "Semicolon" && e.key === "ç") return "Semicolon";
  if (e.code === "Quote" && e.key === "'") return "Quote";
  if (e.code === "IntlBackslash" || (e.key === "~" && e.code !== "Backquote")) return "IntlBackslash";
  return e.code;
}

document.addEventListener("keydown", function(e) {
  const tecla = e.key.toUpperCase();
  const eventKey = getEventKey(e);
  const teclaEl = document.querySelector(`.tecla[data-key="${eventKey}"]`);

  document.querySelectorAll('.tecla').forEach(el => {
    el.classList.remove('certa', 'errada');
  });

  if (teclaEl) {
    teclaEl.classList.add("ativa");
    setTimeout(() => teclaEl.classList.remove("ativa"), 300);
  }

  if (tecla === letraAtual) {
    msgDiv.textContent = "Parabéns! Você acertou!";
    msgDiv.style.color = "#18D262";
    if (teclaEl) {
      teclaEl.classList.add('certa');
      setTimeout(() => teclaEl.classList.remove('certa'), 500);
    }
    acertos++;
    if (acertos >= 5) {
      proximoBtn.style.display = "inline-block";
      msgDiv.textContent += " Nível completo!";
    } else {
      setTimeout(gerarNovaLetra, 1000);
    }
  } else {
    msgDiv.textContent = "Tente novamente.";
    msgDiv.style.color = "#FF3030";
    if (teclaEl) {
      teclaEl.classList.add('errada');
      setTimeout(() => teclaEl.classList.remove('errada'), 500);
    }
  }
});

function reiniciar() {
  acertos = 0;
  proximoBtn.style.display = "none";
  gerarNovaLetra();
}

gerarNovaLetra();
