/* Bloqueia menu de contexto sobre players para desincentivar download */
document.addEventListener("contextmenu", (e) => {
  if (e.target.closest("audio, video")) e.preventDefault();
});

/* Evita arrastar as imagens de fundo em alguns navegadores */
document.addEventListener("dragstart", (e) => {
  if (e.target === document.body) e.preventDefault();
});
