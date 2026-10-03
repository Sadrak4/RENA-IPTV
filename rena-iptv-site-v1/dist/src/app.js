const PHONE = '5511964572959'
const DISPLAY = '(11) 96457-2959'

const plans = {
  mensal: { label: 'Plano Mensal', period: '1 mês', price: 25 },
  trimestral: { label: 'Plano Trimestral', period: '3 meses', price: 60 }
}

function wa(message) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`
}

const messages = {
  duvida: 'Olá! Vim pelo site da RENA IPTV e gostaria de saber mais sobre os planos.',
  renovar: 'Olá! Já sou cliente da RENA IPTV e gostaria de renovar meu plano.'
}

document.querySelectorAll('[data-whatsapp]').forEach(el => {
  const key = el.dataset.whatsapp
  el.href = wa(messages[key] || messages.duvida)
})

document.querySelectorAll('[data-plan]').forEach(button => {
  button.addEventListener('click', () => {
    const plan = plans[button.dataset.plan]
    localStorage.setItem('rena:selected-plan', button.dataset.plan)
    window.open(wa(`Olá! Vim pelo site da RENA IPTV e quero assinar o ${plan.label} (${plan.period}) por R$ ${plan.price},00.`), '_blank', 'noopener,noreferrer')
  })
})

const lastPlanKey = localStorage.getItem('rena:selected-plan')
const lastPlan = plans[lastPlanKey]
const selectedText = document.getElementById('selectedPlanText')
const finalButton = document.getElementById('finalWhatsApp')
if (lastPlan) {
  selectedText.textContent = `Última opção escolhida: ${lastPlan.label} — R$ ${lastPlan.price},00.`
  finalButton.href = wa(`Olá! Vim pelo site da RENA IPTV e quero assinar o ${lastPlan.label} (${lastPlan.period}) por R$ ${lastPlan.price},00.`)
} else {
  finalButton.href = wa(messages.duvida)
}

const menuBtn = document.getElementById('menuBtn')
const nav = document.getElementById('nav')
menuBtn.addEventListener('click', () => nav.classList.toggle('open'))
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')))

document.getElementById('year').textContent = new Date().getFullYear()
