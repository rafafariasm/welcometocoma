/* Bloqueia menu de contexto sobre players para desincentivar download */
document.addEventListener("contextmenu", (e) => {
  if (e.target.closest("audio, video")) e.preventDefault();
});

/* Evita arrastar as imagens de fundo em alguns navegadores */
document.addEventListener("dragstart", (e) => {
  if (e.target === document.body) e.preventDefault();
});

// --- MOBILE BG SWAP (não mexe no desktop) ---
(function () {
  // Mapeamento: arquivo desktop -> arquivo mobile (na pasta img/CELULAR)
  const mapDesktopToMobile = {
    "0-INICIO.jpg":        "img/CELULAR/1BEMVINDOCELULAR1.jpg",
    "1-COMA.jpg":          "img/CELULAR/2COMACELULAR2.jpg",
    "2-BORN-AGAIN.jpg":    "img/CELULAR/3BORNAGAINCELULAR3.jpg",
    "3-THE-VOICE.jpg":     "img/CELULAR/4THEVOICECELULAR4.jpg",
    "4-NO-MORE-CHAINS.jpg":"img/CELULAR/5NOMORECHAINSCELULAR5.jpg",
    "5-SILENCE.jpg":       "img/CELULAR/6SILENCECELULAR6.jpg",
    "6-release.jpg":       "img/CELULAR/7RELEASECELULAR7.jpg",
    "7-GALERIA-FOTOS.jpg": "img/CELULAR/8GALLERYCELULAR8.jpg",
    "8-FUNDO-VIDEO.jpg":   "img/CELULAR/9FUNDOCELULAR9.jpg",
  };

  function swapBGForMobile() {
    // Só aplica em telas pequenas
    if (!window.matchMedia("(max-width: 820px)").matches) return;

    const body = document.body;
    const inline = body.getAttribute("style") || "";

    // tenta extrair o caminho da imagem atual do inline style
    const match = inline.match(/background-image\s*:\s*url\(['"]?([^'")]+)['"]?\)/i);
    if (!match) return;

    const fullPath = match[1];
    const fileName = fullPath.split("/").pop(); // ex: "3-THE-VOICE.jpg"
    const mobilePath = mapDesktopToMobile[fileName];

    if (mobilePath) {
      body.style.backgroundImage = `url("${mobilePath}")`;
      // garante o mesmo comportamento visual do seu CSS base
      body.style.backgroundRepeat = "no-repeat";
      body.style.backgroundPosition = "center";
      body.style.backgroundSize = "cover";
      body.style.backgroundAttachment = "fixed";
    }
  }

  // roda ao carregar e quando redimensionar (troca portrait/landscape)
  window.addEventListener("DOMContentLoaded", swapBGForMobile);
  window.addEventListener("resize", swapBGForMobile);
})();


