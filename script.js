// Variáveis globais
let currentPage = 1;
const totalPages = 9;
let players = [];
const videoIds = [
    'VIDEO_ID_1', // Substitua pelos IDs reais dos vídeos do YouTube
    'VIDEO_ID_2',
    'VIDEO_ID_3',
    'VIDEO_ID_4',
    'VIDEO_ID_5',
    'VIDEO_ID_6'
];

// Inicialização quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Configurar botão Enter
    document.getElementById('enterBtn').addEventListener('click', function() {
        navigateTo(2);
    });

    // Configurar botões de navegação
    setupNavigationButtons();
});

// Função para configurar a API do YouTube
function onYouTubeIframeAPIReady() {
    // Criar players do YouTube
    for (let i = 1; i <= 6; i++) {
        players[i-1] = new YT.Player('player' + i, {
            videoId: videoIds[i-1],
            playerVars: {
                'autoplay': 0,
                'controls': 1,
                'rel': 0,
                'showinfo': 0,
                'mute': 0 // Áudio normal (não mutado)
            },
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    }
}

// Função para lidar com mudanças de estado do player
function onPlayerStateChange(event) {
    // Removida a navegação automática após o término dos vídeos
    // O usuário só muda de página se escolher entre "back" ou "next"
}

// Configurar botões de navegação
function setupNavigationButtons() {
    // Botões Back
    const backButtons = document.querySelectorAll('.back-btn');
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pageSection = this.closest('.page');
            const pageId = pageSection.id;
            const pageNumber = parseInt(pageId.replace('page', ''));
            navigateTo(pageNumber - 1);
        });
    });

    // Botões Next
    const nextButtons = document.querySelectorAll('.next-btn');
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pageSection = this.closest('.page');
            const pageId = pageSection.id;
            const pageNumber = parseInt(pageId.replace('page', ''));
            navigateTo(pageNumber + 1);
        });
    });

    // Botão Home
    const homeButton = document.querySelector('.home-btn');
    if (homeButton) {
        homeButton.addEventListener('click', function() {
            navigateTo(1);
        });
    }
}

// Função para navegar entre páginas
function navigateTo(pageNumber) {
    if (pageNumber < 1 || pageNumber > totalPages) return;

    // Pausar todos os vídeos ao mudar de página
    players.forEach(player => {
        if (player && typeof player.pauseVideo === 'function') {
            player.pauseVideo();
        }
    });

    // Esconder página atual
    document.querySelector('.page.active').classList.remove('active');
    
    // Mostrar nova página
    const newPage = document.getElementById('page' + pageNumber);
    newPage.classList.add('active');
    
    // Atualizar página atual
    currentPage = pageNumber;
    
    // Removido o play automático dos vídeos
    // O usuário precisa dar play manualmente nos vídeos
}
