// =====================================================
// GAGB — lógica del sitio
// Conserva toda la funcionalidad original:
//   - contador regresivo
//   - verificación de contraseña
//   - mostrar/ocultar el contenido completo
// Se añade: formulario de contraseña accesible (reemplaza
// window.prompt), partículas sutiles y aparición progresiva
// de las entradas del diario al hacer scroll.
// =====================================================

const PASSWORD = "GAGB";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Contador de tiempo (igual que el original) ---------- */
function updateCountdown() {
  const targetDate = new Date('2025-03-21T16:00:00-05:00'); // Hora de Colombia (UTC-5)
  const now = new Date();
  const timeDifference = targetDate - now;
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return;

  if (timeDifference > 0) {
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    countdownEl.textContent = `Debes esperar: ${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos`;
  } else {
    countdownEl.textContent = "¡Ha llegado el momento!";
  }
}
setInterval(updateCountdown, 1000);
updateCountdown();

/* ---------- Puerta de acceso (sello + formulario) ---------- */
const cover = document.getElementById('cover');
const openSealBtn = document.getElementById('open-seal');
const gateForm = document.getElementById('gate-form');
const passwordInput = document.getElementById('password-input');
const gateError = document.getElementById('gate-form-error');
const musicEl = document.getElementById('background-music');
const contentEl = document.getElementById('content');

if (openSealBtn) {
  openSealBtn.addEventListener('click', () => {
    const revealing = gateForm.hasAttribute('hidden');
    if (revealing) {
      gateForm.removeAttribute('hidden');
      openSealBtn.setAttribute('aria-expanded', 'true');
      passwordInput.focus();
    } else {
      passwordInput.focus();
    }
  });
}

if (gateForm) {
  gateForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = passwordInput.value.trim();

    if (value === PASSWORD) {
      gateError.textContent = '';
      openGateSuccess();
    } else {
      gateError.textContent = 'Esa no es la palabra correcta. Intenta de nuevo.';
      passwordInput.value = '';
      passwordInput.focus();
    }
  });
}

function openGateSuccess() {
  if (reduceMotion) {
    cover.setAttribute('hidden', '');
  } else {
    cover.classList.add('is-leaving');
    setTimeout(() => cover.setAttribute('hidden', ''), 700);
  }
  contentEl.style.display = 'flex';
  if (musicEl) {
    musicEl.play().catch(() => {
      /* el navegador puede bloquear el autoplay; no es crítico */
    });
  }
}

/* ---------- Navegación entre teaser y carta completa ---------- */
function showFullContent() {
  document.querySelector('.pre-opening').style.display = 'none';
  document.querySelector('.full-content').style.display = 'block';
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  observeDiaryEntries();
}

function goBack() {
  document.querySelector('.full-content').style.display = 'none';
  document.querySelector('.pre-opening').style.display = 'flex';
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
}

/* ---------- Aparición progresiva de las entradas del diario ---------- */
function observeDiaryEntries() {
  const entries = document.querySelectorAll('.diary .image-container');
  if (!entries.length) return;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    entries.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((items) => {
    items.forEach((item) => {
      if (item.isIntersecting) {
        item.target.classList.add('is-visible');
        observer.unobserve(item.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  entries.forEach((el) => observer.observe(el));
}

/* ---------- Pétalos y corazones flotando (muy sutil) ---------- */
function createPetals() {
  const container = document.getElementById('petals');
  if (!container || reduceMotion) return;

  const TOTAL = 7;
  for (let i = 0; i < TOTAL; i++) {
    const el = document.createElement('span');
    const isHeart = i % 3 === 0;
    el.className = `petal ${isHeart ? 'petal--heart' : 'petal--leaf'}`;

    const left = Math.round(Math.random() * 96) + 2;
    const duration = (14 + Math.random() * 10).toFixed(1);
    const delay = (Math.random() * 12).toFixed(1);
    const driftX = Math.round((Math.random() - 0.5) * 120);

    el.style.left = `${left}%`;
    el.style.animationDuration = `${duration}s`;
    el.style.animationDelay = `${delay}s`;
    el.style.setProperty('--drift-x', `${driftX}px`);

    container.appendChild(el);
  }
}

createPetals();
