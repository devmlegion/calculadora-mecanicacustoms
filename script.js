/* ===== SELECTS ===== */
const motor = document.getElementById('motor');
const freio = document.getElementById('freio');
const transmissao = document.getElementById('transmissao');
const suspensao = document.getElementById('suspensao');
const blindagem = document.getElementById('blindagem');

/* ===== CHECKBOXES ===== */
const fullTuning = document.getElementById('fullTuning');
const fullTuningBlind = document.getElementById('fullTuningBlind');
const vendasSwitch = document.getElementById('vendasSwitch');

/* ===== FUNÇÃO PARA SETAR NÍVEL MÁXIMO ===== */
function maxSelect(select) {
  select.selectedIndex = select.options.length - 1;
}

/* ===== FULL TUNING ===== */
fullTuning.addEventListener('change', () => {
  if (fullTuning.checked) {
    fullTuningBlind.checked = false;

    maxSelect(motor);
    maxSelect(freio);
    maxSelect(transmissao);
    maxSelect(suspensao);
    blindagem.selectedIndex = 0;
  } else {
    motor.selectedIndex = 0;
    freio.selectedIndex = 0;
    transmissao.selectedIndex = 0;
    suspensao.selectedIndex = 0;
    blindagem.selectedIndex = 0;
  }
  calculateTotal();
});

/* ===== FULL TUNING + BLINDAGEM ===== */
fullTuningBlind.addEventListener('change', () => {
  if (fullTuningBlind.checked) {
    fullTuning.checked = false;

    maxSelect(motor);
    maxSelect(freio);
    maxSelect(transmissao);
    maxSelect(suspensao);
    maxSelect(blindagem);
  } else {
    motor.selectedIndex = 0;
    freio.selectedIndex = 0;
    transmissao.selectedIndex = 0;
    suspensao.selectedIndex = 0;
    blindagem.selectedIndex = 0;
  }
  calculateTotal();
});

/* ===== SWITCH VENDAS ===== */
vendasSwitch.addEventListener("change", () => {
  updateVendasValues();
  calculateTotal();
});

function updateVendasValues() {
  const labels = document.querySelectorAll('.counter-row .counter-label');
  labels.forEach(label => {
    if (label.textContent.trim().startsWith("Reparo") && !label.textContent.includes("Carro")) {
      label.nextElementSibling.querySelector("[data-qty]").dataset.price = vendasSwitch.checked ? 400 : 500;
    }
    if (label.textContent.trim().startsWith("Pneu")) {
      label.nextElementSibling.querySelector("[data-qty]").dataset.price = vendasSwitch.checked ? 200 : 250;
    }
  });
}

/* ===== CÁLCULO TOTAL ===== */
function calculateTotal() {
  let total = 0;

  document.querySelectorAll('input[type="checkbox"]:checked').forEach(el => {
    if (!el.id.includes('fullTuning')) {
      total += Number(el.dataset.price || 0);
    }
  });

  document.querySelectorAll('select').forEach(el => {
    total += Number(el.value);
  });

  document.querySelectorAll('[data-qty]').forEach(el => {
    total += Number(el.textContent) * Number(el.dataset.price);
  });

  document.getElementById('total').textContent =
    total.toLocaleString('pt-BR');
}

/* ===== CONTADORES ===== */
function changeQty(btn, val) {
  const span = btn.parentElement.querySelector('[data-qty]');
  span.textContent = Math.max(0, Number(span.textContent) + val);
  calculateTotal();
}

/* ===== RESET ===== */
function resetCalculator() {
  document.querySelectorAll('input[type="checkbox"]').forEach(el => el.checked = false);
  document.querySelectorAll('select').forEach(el => el.selectedIndex = 0);
  document.querySelectorAll('[data-qty]').forEach(el => {
    el.textContent = 0;
    el.dataset.price = el.parentElement.previousElementSibling.querySelector(".price") ? el.parentElement.previousElementSibling.querySelector(".price").textContent.replace(/\D/g,'') : el.dataset.price;
  });
  document.getElementById('total').textContent = '0';
}

/* ===== TEMA ESCURO / CLARO ===== */
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (prefersDark) {
  document.body.classList.remove('theme-light');
} else {
  document.body.classList.add('theme-light');
}

const themeToggleBtn = document.querySelector('.theme-toggle-btn');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('theme-light');
  });
}

/* =========================================================
   ACCORDION MOBILE - RESPONSIVO REAL
   ========================================================= */
(function () {

  function initAccordion() {

    if (window.innerWidth > 768) return;

    if (document.querySelector('.accordion-content')) return;

    const headers = document.querySelectorAll(
      'h2.servicos-header, h2.vendas-header'
    );

    headers.forEach(header => {

      const content = document.createElement('div');
      content.classList.add('accordion-content', 'closed');

      let next = header.nextElementSibling;

      while (
        next &&
        !next.matches('h2.servicos-header') &&
        !next.matches('h2.vendas-header')
      ) {
        const current = next;
        next = next.nextElementSibling;
        content.appendChild(current);
      }

      header.parentNode.insertBefore(content, next);

      header.addEventListener('click', () => {
        content.classList.toggle('closed');
      });

    });
  }

  window.addEventListener('load', initAccordion);
  window.addEventListener('resize', initAccordion);

})();

document.addEventListener('change', calculateTotal);
