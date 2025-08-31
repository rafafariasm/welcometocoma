const sections = Array.from(document.querySelectorAll('.section'));
let currentIndex = 0;

function showPage(idx) {
  if (idx < 0 || idx >= sections.length) return;
  sections.forEach((s, i) => s.classList.toggle('active', i === idx));
  document.body.className = `page${idx + 1}`;
  currentIndex = idx;
}

function nextPage() { showPage(Math.min(currentIndex + 1, sections.length - 1)); }
function prevPage() { showPage(Math.max(currentIndex - 1, 0)); }
function goHome() { showPage(0); }

document.getElementById('enterBtn')?.addEventListener('click', () => showPage(1));
document.querySelectorAll('[data-nav="next"]').forEach(btn => btn.addEventListener('click', nextPage));
document.querySelectorAll('[data-nav="back"]').forEach(btn => btn.addEventListener('click', prevPage));
document.querySelectorAll('[data-nav="home"]').forEach(btn => btn.addEventListener('click', goHome));

showPage(0);

/* YouTube API */
window.onYouTubeIframeAPIReady = function () {
  document.querySelectorAll('.yt-player').forEach(div => {
    const videoId = div.getAttribute('data-video-id') || '';
    new YT.Player(div.id, {
      videoId,
      playerVars: {
        autoplay: 0, // sem autoplay
        controls: 1,
        rel: 0,
        modestbranding: 1
      }
    });
  });
};
