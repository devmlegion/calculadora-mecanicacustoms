const motor = document.getElementById('motor');
const freio = document.getElementById('freio');
const transmissao = document.getElementById('transmissao');
const suspensao = document.getElementById('suspensao');
const blindagem = document.getElementById('blindagem');

const fullTuning = document.getElementById('fullTuning');
const fullTuningBlind = document.getElementById('fullTuningBlind');

function maxSelect(select) {
  select.selectedIndex = select.options.length - 1;
}

/* FULL TUNING */
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

/* FULL TUNING + BLINDAGEM */
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

function calculateTotal() {
  let total = 0;

  document.querySelectorAll('input[type="checkbox"]:checked')
    .forEach(el => {
      if (!el.id.includes('fullTuning')) {
        total += Number(el.dataset.price || 0);
      }
    });

  document.querySelectorAll('select')
    .forEach(el => {
      total += Number(el.value);
    });

  document.querySelectorAll('[data-qty]')
    .forEach(el => {
      total += Number(el.textContent) * Number(el.dataset.price);
    });

  document.getElementById('total').textContent =
    total.toLocaleString('pt-BR');
}

function changeQty(btn, val) {
  const span = btn.parentElement.querySelector('[data-qty]');
  span.textContent = Math.max(0, Number(span.textContent) + val);
  calculateTotal();
}

function resetCalculator() {
  document.querySelectorAll('input[type="checkbox"]').forEach(el => el.checked = false);
  document.querySelectorAll('select').forEach(el => el.selectedIndex = 0);
  document.querySelectorAll('[data-qty]').forEach(el => el.textContent = 0);
  document.getElementById('total').textContent = '0';
}

function toggleTheme() {
  document.body.classList.toggle('light');
}

document.addEventListener('change', calculateTotal);

function setTheme(theme) {
  if(theme === 'dark') {
    document.body.classList.add('dark');
    document.body.classList.remove('light');
  } else if(theme === 'light') {
    document.body.classList.add('light');
    document.body.classList.remove('dark');
  }
}
