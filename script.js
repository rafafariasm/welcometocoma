/* ---------- SPA / NAVEGAÇÃO ---------- */
const sections = Array.from(document.querySelectorAll('.section'));
let currentIndex = 0;

function showPage(idx) {
  if (idx < 0 || idx >= sections.length) return;
  
  // Pausar vídeo da página atual antes de mudar
  const currentSec = sections[currentIndex];
  const currentPlayerDiv = currentSec.querySelector('.yt-player');
  if (currentPlayerDiv) {
    const currentPlayer = ytPlayers.get(currentPlayerDiv.id);
    if (currentPlayer && typeof currentPlayer.pauseVideo === 'function') {
      try {
        currentPlayer.pauseVideo();
      } catch (_) {}
    }
  }
  
  sections.forEach((s, i) => s.classList.toggle('active', i === idx));
  currentIndex = idx;

  // Atualiza classe no body para aplicar fundos por página
  document.body.className = `page${idx + 1}`;
}

function nextPage() { showPage(Math.min(currentIndex + 1, sections.length - 1)); }
function prevPage() { showPage(Math.max(currentIndex - 1, 0)); }
function goHome()   { showPage(0); }

document.getElementById('enterBtn')?.addEventListener('click', () => showPage(1));

document.querySelectorAll('[data-nav="next"]').forEach(btn => btn.addEventListener('click', nextPage));
document.querySelectorAll('[data-nav="back"]').forEach(btn => btn.addEventListener('click', prevPage));
document.querySelectorAll('[data-nav="home"]').forEach(btn => btn.addEventListener('click', goHome));

/* Inicia na página 1 */
showPage(0);

/* ---------- YOUTUBE IFRAME API ---------- */
const ytPlayers = new Map();

// A API chamará esta função global quando carregar
window.onYouTubeIframeAPIReady = function () {
  // Cria players para TODAS as divs .yt-player
  document.querySelectorAll('.yt-player').forEach((div) => {
    const videoId = div.getAttribute('data-video-id') || 'dQw4w9WgXcQ'; // placeholder
    const player = new YT.Player(div.id, {
      width: '100%',
      height: '100%',
      videoId,
      playerVars: {
        autoplay: 0,
        controls: 1,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        enablejsapi: 1,
        origin: window.location.origin
      },
      events: {
        onReady: (ev) => {
          ev.target.unMute(); // garante que o áudio estará habilitado
        },
        onStateChange: (ev) => {
          // Avança automaticamente ao terminar (somente páginas 2 a 6)
          if (ev.data === YT.PlayerState.ENDED) {
            const sec = div.closest('.section');
            const id = sec?.id || '';
            const pageNum = Number(id.replace('page', '')); // 1..n
            if (pageNum >= 2 && pageNum <= 6) {
              nextPage();
            }
          }
        }
      }
    });
    ytPlayers.set(div.id, player);
  });
};

/* ---------- TECLADO (opcional) ---------- */
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextPage();
  if (e.key === 'ArrowLeft') prevPage();
  if (e.key.toLowerCase() === 'h') goHome();
});
