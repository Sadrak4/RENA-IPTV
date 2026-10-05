const PHONE_RAW = '(11) 96457-2959';
const PHONE_LINK = '5511964572959';
const STORAGE_KEY = 'rena:selectedAction';
const SCREEN_STORAGE_KEY = 'rena:selectedScreens';

const messages = {
  teste: 'Olá! Vim pelo site da RENA IPTV e gostaria de solicitar um teste de 12 horas.',
  programacao: 'Olá! Vim pelo site da RENA IPTV e gostaria de consultar a programação disponível, principalmente esportes e futebol.',
  renovar: 'Olá! Já sou cliente da RENA IPTV e gostaria de renovar meu plano.',
  duvida: 'Olá! Vim pelo site da RENA IPTV e gostaria de tirar uma dúvida.',
};

const planConfig = {
  mensal: { label: 'mensal', basePrice: 25, months: 1 },
  trimestral: { label: 'trimestral de 3 meses', basePrice: 60, months: 3 },
};

const selectedScreens = {
  mensal: 1,
  trimestral: 1,
};

const selectedPlanText = document.getElementById('selectedPlanText');
const finalWhatsApp = document.getElementById('finalWhatsApp');
const yearEl = document.getElementById('year');
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

const formatBRL = (value) => new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
}).format(value);

const calculatePlanTotal = (type, screens = 1) => {
  const config = planConfig[type];
  if (!config) return 0;
  const extras = Math.max(0, screens - 1);
  return config.basePrice + (extras * 5 * config.months);
};

const planMessage = (type) => {
  const config = planConfig[type];
  const screens = selectedScreens[type] || 1;
  const total = calculatePlanTotal(type, screens);
  const telaWord = screens === 1 ? 'tela' : 'telas';

  return `Olá! Vim pelo site da RENA IPTV. Quero o plano ${config.label} com ${screens} ${telaWord}. Valor total: ${formatBRL(total)}.`;
};

const buildWhatsAppUrl = (type) => {
  const message = planConfig[type] ? planMessage(type) : (messages[type] || messages.duvida);
  return `https://wa.me/${PHONE_LINK}?text=${encodeURIComponent(message)}`;
};

const updateScreenPicker = (type, screens, animate = true) => {
  const picker = document.querySelector(`[data-screen-picker="${type}"]`);
  if (!picker) return;

  selectedScreens[type] = screens;

  picker.querySelectorAll('[data-screens]').forEach((button) => {
    button.classList.toggle('active', Number(button.dataset.screens) === screens);
  });

  const countEl = picker.querySelector('[data-screen-count]');
  const countStrong = countEl?.parentElement;
  if (countEl) countEl.textContent = screens;
  if (countStrong) {
    countStrong.lastChild.textContent = screens === 1 ? ' tela' : ' telas';
  }

  const totalEl = picker.querySelector('[data-plan-total]');
  if (totalEl) {
    totalEl.textContent = formatBRL(calculatePlanTotal(type, screens));
    if (animate) {
      totalEl.classList.remove('price-flash');
      void totalEl.offsetWidth;
      totalEl.classList.add('price-flash');
    }
  }

  try {
    localStorage.setItem(SCREEN_STORAGE_KEY, JSON.stringify(selectedScreens));
  } catch (_) {}
};

const initScreenPickers = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(SCREEN_STORAGE_KEY) || '{}');
    ['mensal', 'trimestral'].forEach((type) => {
      const value = Number(saved[type]);
      if (value >= 1 && value <= 5) selectedScreens[type] = value;
    });
  } catch (_) {}

  document.querySelectorAll('[data-screen-picker]').forEach((picker) => {
    const type = picker.dataset.screenPicker;
    updateScreenPicker(type, selectedScreens[type] || 1, false);

    picker.querySelectorAll('[data-screens]').forEach((button) => {
      button.addEventListener('click', () => {
        updateScreenPicker(type, Number(button.dataset.screens));
        setFinalCta(type);
      });
    });
  });
};

const setFinalCta = (type = 'duvida') => {
  let text = 'Atendimento direto pelo WhatsApp.';

  if (type === 'mensal') {
    const screens = selectedScreens.mensal;
    text = `Plano mensal com ${screens} ${screens === 1 ? 'tela' : 'telas'} selecionado • ${formatBRL(calculatePlanTotal('mensal', screens))}.`;
  }
  if (type === 'trimestral') {
    const screens = selectedScreens.trimestral;
    text = `Plano trimestral com ${screens} ${screens === 1 ? 'tela' : 'telas'} selecionado • ${formatBRL(calculatePlanTotal('trimestral', screens))}.`;
  }
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

initScreenPickers();
bindWhatsAppLinks();
if (yearEl) yearEl.textContent = new Date().getFullYear();

try {
  setFinalCta(localStorage.getItem(STORAGE_KEY) || 'duvida');
} catch (_) {
  setFinalCta('duvida');
}

console.log(`Atendimento WhatsApp: ${PHONE_RAW}`);

// Interações visuais da V2.4+
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

const rippleTargets = document.querySelectorAll('.btn, .mini-btn, .mobile-cta-btn, .screen-option');
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
