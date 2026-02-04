const APP_URL = "https://atoms.dev/chat/87a71902b2b342d5919d99aa20890878";

const frame = document.getElementById("appFrame");
const openBtn = document.getElementById("openAppBtn");
const toggleBtn = document.getElementById("toggleEmbedBtn");
const copyBtn = document.getElementById("copyLinkBtn");
const embedWrap = document.getElementById("embedWrap");
const statusBadge = document.getElementById("embedStatus");

document.getElementById("year").textContent = new Date().getFullYear();

function setStatus(text, type) {
  statusBadge.textContent = text;
  if (type === "ok") statusBadge.style.background = "#22c55e";
  else if (type === "warn") statusBadge.style.background = "#f59e0b";
  else statusBadge.style.background = "#ef4444";
}

function init() {
  frame.src = APP_URL;

  frame.addEventListener("load", () => {
    setStatus("Carregado", "ok");
  });

  // Fallback: se demorar, orientar a abrir em nova aba
  setTimeout(() => {
    if (statusBadge.textContent.includes("Carreg")) {
      setStatus("Se não abrir aqui, use nova aba", "warn");
    }
  }, 4500);
}

openBtn.addEventListener("click", () => {
  window.open(APP_URL, "_blank", "noopener,noreferrer");
});

toggleBtn.addEventListener("click", () => {
  const isHidden = embedWrap.style.display === "none";
  embedWrap.style.display = isHidden ? "block" : "none";
  toggleBtn.textContent = isHidden ? "Mostrar/ocultar embed" : "Mostrar embed";
});

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(APP_URL);
    setStatus("Link copiado!", "ok");
    setTimeout(() => setStatus("Carregado", "ok"), 2000);
  } catch {
    setStatus("Falha ao copiar (permissão do browser)", "warn");
  }
});

init();
