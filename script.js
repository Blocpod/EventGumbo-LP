const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
revealElements.forEach((el) => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

const chips = [...document.querySelectorAll('.mix-chip')];
const count = document.getElementById('mix-count');
chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chip.classList.toggle('is-active');
    const activeCount = chips.filter((item) => !item.classList.contains('is-active')).length;
    count.textContent = String(activeCount).padStart(2, '0');
  });
});

const planForm = document.getElementById('plan-form');
const toast = document.getElementById('toast');
planForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const eventType = document.getElementById('event-type');
  const eventLocation = document.getElementById('location');

  if (!eventType.value.trim()) {
    eventType.focus();
    eventType.animate([
      { transform: 'translateX(0)' },
      { transform: 'translateX(-5px)' },
      { transform: 'translateX(5px)' },
      { transform: 'translateX(0)' }
    ], { duration: 260 });
    return;
  }

  toast.querySelector('strong').textContent = 'Your mix is started.';
  toast.querySelector('small').textContent = eventLocation.value.trim()
    ? `Building options for ${eventLocation.value.trim()}.`
    : 'We’ll show you the right next step.';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3600);
});

const signupForm = document.querySelector('.signup-form');
const formNote = document.getElementById('form-note');
signupForm.addEventListener('submit', (event) => {
  if (window.location.protocol === 'file:') {
    event.preventDefault();
    const email = signupForm.querySelector('input[type="email"]');
    if (!email.checkValidity()) {
      email.reportValidity();
      return;
    }
    formNote.textContent = 'You’re on the early list. Welcome to the mix.';
    signupForm.reset();
  }
});
