const PHONE_RAW = '(11) 96457-2959';
const PHONE_LINK = '5511964572959';
const STORAGE_KEY = 'rena:selectedAction';

const messages = {
  mensal: 'Olá! Vim pelo site da RENA IPTV e tenho interesse no plano mensal de R$ 25,00.',
  trimestral: 'Olá! Vim pelo site da RENA IPTV e tenho interesse no plano de 3 meses por R$ 60,00.',
  teste: 'Olá! Vim pelo site da RENA IPTV e gostaria de solicitar um teste de 12 horas.',
  programacao: 'Olá! Vim pelo site da RENA IPTV e gostaria de consultar a programação disponível, principalmente esportes e futebol.',
  renovar: 'Olá! Já sou cliente da RENA IPTV e gostaria de renovar meu plano.',
  duvida: 'Olá! Vim pelo site da RENA IPTV e gostaria de tirar uma dúvida.',
};

const selectedPlanText = document.getElementById('selectedPlanText');
const finalWhatsApp = document.getElementById('finalWhatsApp');
const yearEl = document.getElementById('year');
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

const buildWhatsAppUrl = (type) => {
  const message = messages[type] || messages.duvida;
  return `https://wa.me/${PHONE_LINK}?text=${encodeURIComponent(message)}`;
};

const setFinalCta = (type = 'duvida') => {
  let text = 'Atendimento direto pelo WhatsApp.';

  if (type === 'mensal') text = 'Plano mensal selecionado. Continue pelo WhatsApp.';
  if (type === 'trimestral') text = 'Plano trimestral selecionado. Continue pelo WhatsApp.';
  if (type === 'teste') text = 'Seu pedido de teste de 12 horas está pronto para envio.';
  if (type === 'programacao') text = 'Consulte a programação disponível pelo WhatsApp.';
  if (type === 'renovar') text = 'Solicite sua renovação pelo WhatsApp.';

  if (selectedPlanText) selectedPlanText.textContent = text;
  if (finalWhatsApp) finalWhatsApp.href = buildWhatsAppUrl(type);

  try {
    localStorage.setItem(STORAGE_KEY, type);
  } catch (_) {}
};

const bindWhatsAppLinks = () => {
  document.querySelectorAll('[data-whatsapp]').forEach((el) => {
    const type = el.dataset.whatsapp || 'duvida';
    el.href = buildWhatsAppUrl(type);
    el.addEventListener('click', () => setFinalCta(type));
  });

  document.querySelectorAll('[data-plan]').forEach((button) => {
    button.addEventListener('click', () => {
      const type = button.dataset.plan;
      setFinalCta(type);
      window.open(buildWhatsAppUrl(type), '_blank', 'noopener,noreferrer');
    });
  });
};

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

bindWhatsAppLinks();
if (yearEl) yearEl.textContent = new Date().getFullYear();

try {
  setFinalCta(localStorage.getItem(STORAGE_KEY) || 'duvida');
} catch (_) {
  setFinalCta('duvida');
}

console.log(`Atendimento WhatsApp: ${PHONE_RAW}`);


// Interações visuais da V2.4
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.body.classList.add('reveal-ready');

const revealItems = document.querySelectorAll('.reveal-item');
if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const primaryButtons = document.querySelectorAll('.btn-primary');
primaryButtons.forEach((button, index) => {
  if (index < 2) button.classList.add('attention-pulse');
});

const rippleTargets = document.querySelectorAll('.btn, .mini-btn, .mobile-cta-btn');
rippleTargets.forEach((target) => {
  target.addEventListener('pointerdown', (event) => {
    if (reduceMotion) return;
    const rect = target.getBoundingClientRect();
    const dot = document.createElement('span');
    dot.className = 'ripple-dot';
    dot.style.left = `${event.clientX - rect.left}px`;
    dot.style.top = `${event.clientY - rect.top}px`;
    dot.style.width = dot.style.height = '18px';
    target.appendChild(dot);
    setTimeout(() => dot.remove(), 600);
  });
});
