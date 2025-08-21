/* Bloqueia menu de contexto sobre players para desincentivar download */
document.addEventListener("contextmenu", (e) => {
  if (e.target.closest("audio, video")) e.preventDefault();
});

/* Evita arrastar as imagens de fundo em alguns navegadores */
document.addEventListener("dragstart", (e) => {
  if (e.target === document.body) e.preventDefault();
});

document.addEventListener("DOMContentLoaded", function () {
  // Verifica se é mobile (largura <= 820px)
  if (window.innerWidth <= 820) {
    const body = document.querySelector("body.bg");
    if (body) {
      // pega o background atual
      let bg = body.style.backgroundImage;

      // troca para versão CELULAR
      if (bg.includes("0-INICIO.jpg")) body.style.backgroundImage = "url('img/CELULAR/9-BEM VINDO -CELULAR-1.jpg')";
      if (bg.includes("1-COMA.jpg")) body.style.backgroundImage = "url('img/CELULAR/10-COMA -CELULAR-2.jpg')";
      if (bg.includes("2-BORN-AGAIN.jpg")) body.style.backgroundImage = "url('img/CELULAR/11- BORN - AGAIN - CELULAR-3.jpg')";
      if (bg.includes("3-THE-VOICE.jpg")) body.style.backgroundImage = "url('img/CELULAR/12- THE -VOICE - CELULAR-4.jpg')";
      if (bg.includes("4-NO-MORE-CHAINS.jpg")) body.style.backgroundImage = "url('img/CELULAR/13- NO-MORE - CELULAR-5.jpg')";
      if (bg.includes("5-SILENCE.jpg")) body.style.backgroundImage = "url('img/CELULAR/14 - SILENCE -CELULAR-6.jpg')";
      if (bg.includes("6-release.jpg")) body.style.backgroundImage = "url('img/CELULAR/15- RELEASE - CELULAR-7.jpg')";
      if (bg.includes("7-GALERIA-FOTOS.jpg")) body.style.backgroundImage = "url('img/CELULAR/16- GALLERY - CELULAR-8.jpg')";
      if (bg.includes("8-FUNDO-VIDEO.jpg")) body.style.backgroundImage = "url('img/CELULAR/17- FUNDO VIDEO - CELULAR-9.jpg')";
    }
  }
});
