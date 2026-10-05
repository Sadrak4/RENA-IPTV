const PHONE_RAW = '(11) 96457-2959';
const PHONE_LINK = '5511964572959';
const STORAGE_KEY = 'rena:selectedAction';

const messages = {
  mensal: 'Olá! Vim pelo site da RENA IPTV e tenho interesse no plano mensal de R$ 25,00.',
  trimestral: 'Olá! Vim pelo site da RENA IPTV e tenho interesse no plano de 3 meses por R$ 60,00.',
  teste: 'Olá! Vim pelo site da RENA IPTV e gostaria de solicitar um teste de 12 horas.',
  renovar: 'Olá! Já sou cliente da RENA IPTV e gostaria de renovar meu plano.',
  duvida: 'Olá! Vim pelo site da RENA IPTV e gostaria de tirar uma dúvida.',
};

const selectedPlanText = document.getElementById('selectedPlanText');
const finalWhatsApp = document.getElementById('finalWhatsApp');
const yearEl = document.getElementById('year');
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

const setFinalCta = (type = 'duvida') => {
  let text = 'Escolha um plano, solicite um teste ou fale diretamente com a equipe.';

  if (type === 'mensal') text = 'Plano mensal selecionado. Fale no WhatsApp para continuar.';
  if (type === 'trimestral') text = 'Plano trimestral selecionado. Fale no WhatsApp para continuar.';
  if (type === 'teste') text = 'Solicitação de teste de 12 horas pronta para envio.';
  if (type === 'renovar') text = 'Renovação pronta para ser solicitada pelo WhatsApp.';

  if (selectedPlanText) selectedPlanText.textContent = text;
  if (finalWhatsApp) {
    finalWhatsApp.href = buildWhatsAppUrl(type);
  }

  try {
    localStorage.setItem(STORAGE_KEY, type);
  } catch (error) {
    // ignore storage issues
  }
};

const buildWhatsAppUrl = (type) => {
  const message = messages[type] || messages.duvida;
  return `https://wa.me/${PHONE_LINK}?text=${encodeURIComponent(message)}`;
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
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

bindWhatsAppLinks();

if (yearEl) yearEl.textContent = new Date().getFullYear();

try {
  const saved = localStorage.getItem(STORAGE_KEY);
  setFinalCta(saved || 'duvida');
} catch (error) {
  setFinalCta('duvida');
}

console.log(`Atendimento WhatsApp: ${PHONE_RAW}`);
