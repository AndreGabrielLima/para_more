const audio = document.getElementById("musica");
const playBtn = document.getElementById("playPauseBtn");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");
const currentTimeEl = document.getElementById("current");
const durationEl = document.getElementById("duration");

// Play / Pause
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️";
    console.log("Play iniciado");
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
    console.log("Pausado");
  }
});

// Quando carregar os metadados (duração)
audio.addEventListener("loadedmetadata", () => {
  console.log("Duração carregada:", audio.duration);
  if (!isNaN(audio.duration)) {
    durationEl.textContent = formatTime(audio.duration);
  }
});

// Atualizar barra e tempo
audio.addEventListener("timeupdate", () => {
  if (isNaN(audio.duration) || audio.duration === 0) {
    console.warn("Duração inválida:", audio.duration);
    return;
  }

  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + "%";
  currentTimeEl.textContent = formatTime(audio.currentTime);

  console.log("Atualizando:", audio.currentTime, "/", audio.duration, "=>", percent + "%");
});

// Permitir clicar na barra
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  if (!isNaN(duration) && duration > 0) {
    audio.currentTime = (clickX / width) * duration;
    console.log("Pulou para:", audio.currentTime);
  }
});

// Função para formatar mm:ss
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}
