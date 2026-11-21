const cover = document.getElementById('cover');
const letter = document.getElementById('letter');
const startButton = document.getElementById('startButton');
const backButton = document.getElementById('backButton');
const replayButton = document.getElementById('replayButton');
const music = document.getElementById('backgroundMusic');
const sparkleLayer = document.getElementById('sparkleLayer');

function showScreen(nextScreen) {
  const isLetter = nextScreen === letter;
  cover.classList.toggle('active', !isLetter);
  letter.classList.toggle('active', isLetter);
  cover.setAttribute('aria-hidden', String(isLetter));
  letter.setAttribute('aria-hidden', String(!isLetter));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function startExperience() {
  showScreen(letter);
  try {
    await music.play();
  } catch (error) {
    // Browser bisa menolak autoplay; tombol putar ulang tersedia di halaman kedua.
    console.info('Musik belum dapat diputar otomatis. Tekan tombol putar ulang musik.');
  }
  burstSparkles(24);
}

startButton.addEventListener('click', startExperience);
replayButton.addEventListener('click', async () => {
  try {
    if (music.paused) await music.play();
    else { music.currentTime = 0; await music.play(); }
  } catch (error) {
    console.info('Musik belum dapat diputar. Periksa file MP3.');
  }
});
backButton.addEventListener('click', () => showScreen(cover));

function burstSparkles(amount = 12) {
  const symbols = ['✦', '✧', '♡', '·'];
  for (let i = 0; i < amount; i++) {
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle';
    sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${35 + Math.random() * 60}%`;
    sparkle.style.setProperty('--duration', `${2.2 + Math.random() * 2.5}s`);
    sparkle.style.fontSize = `${10 + Math.random() * 17}px`;
    sparkleLayer.appendChild(sparkle);
    sparkle.addEventListener('animationend', () => sparkle.remove());
  }
}

setInterval(() => {
  if (!document.hidden) burstSparkles(2);
}, 1700);

const dateLabel = document.getElementById('dateLabel');
dateLabel.textContent = new Intl.DateTimeFormat('id-ID', {
  day: '2-digit', month: 'short', year: 'numeric'
}).format(new Date());
