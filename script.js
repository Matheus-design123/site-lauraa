// ===============================
// PERSONALIZAÇÃO
// ===============================
// Coloque aqui a data e o horário do início da prova.
// Formato: "AAAA-MM-DDTHH:MM:SS-03:00"
// Exemplo para 27/09/2026 às 08:00 em Goiânia:
// "2026-09-27T13:00:00-03:00"
//
// Se o horário oficial da prova for diferente, altere SOMENTE esta linha.
const EXAM_DATE = "2026-09-27T08:00:00-03:00";

const startBtn = document.getElementById("startBtn");
const truthBtn = document.getElementById("truthBtn");
const truthBox = document.getElementById("truthBox");
const loveBtn = document.getElementById("loveBtn");
const loveReveal = document.getElementById("loveReveal");
const celebrateBtn = document.getElementById("celebrateBtn");
const hearts = document.getElementById("hearts");
const musicBtn = document.getElementById("musicBtn");
const music = document.getElementById("music");

startBtn.addEventListener("click", () => {
  document.getElementById("carta").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => createHearts(10), 500);
});

truthBtn.addEventListener("click", () => {
  truthBox.classList.toggle("open");
  truthBtn.textContent = truthBox.classList.contains("open") ? "Eu precisava ouvir isso ❤️" : "Quero saber";
});

loveBtn.addEventListener("click", () => {
  loveReveal.classList.add("open");
  loveBtn.style.display = "none";
  createHearts(25);
});

celebrateBtn.addEventListener("click", () => {
  createHearts(65);
  celebrateBtn.textContent = "É isso. Você consegue. ❤️";
});

musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play().then(() => {
      musicBtn.textContent = "❚❚ Pausar música";
    }).catch(() => {
      musicBtn.textContent = "Coloque assets/musica.mp3";
    });
  } else {
    music.pause();
    musicBtn.textContent = "▶ Ouvir nossa música";
  }
});

function createHearts(amount = 12) {
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = Math.random() > .5 ? "♥" : "♡";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (10 + Math.random() * 22) + "px";
    heart.style.animationDuration = (5 + Math.random() * 5) + "s";
    heart.style.animationDelay = (Math.random() * .8) + "s";
    hearts.appendChild(heart);
    setTimeout(() => heart.remove(), 11000);
  }
}

function updateCountdown() {
  const target = new Date(EXAM_DATE).getTime();
  const now = Date.now();
  const diff = target - now;
  const status = document.getElementById("countdownStatus");

  if (isNaN(target)) {
    status.textContent = "Configure a data da prova no arquivo script.js.";
    return;
  }

  if (diff <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    status.textContent = "É hora. Respira fundo. Você consegue. ❤️";
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = String(d).padStart(2, "0");
  document.getElementById("hours").textContent = String(h).padStart(2, "0");
  document.getElementById("minutes").textContent = String(m).padStart(2, "0");
  document.getElementById("seconds").textContent = String(s).padStart(2, "0");
  status.textContent = "Só mais um pouquinho. ❤️";
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Aparecer elementos suavemente conforme a página rola.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Pequenos corações ocasionais, sem exagerar.
setInterval(() => {
  if (Math.random() > .45) createHearts(1);
}, 3500);
