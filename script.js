// Science Guru – minimal JS: mobile menu, scroll reveal, demo form -> WhatsApp (until a backend is connected)
document.documentElement.classList.add('js');
document.getElementById('yr').textContent = new Date().getFullYear();

// Mobile navigation
const btn = document.querySelector('.menu-btn'), nav = document.getElementById('nav');
btn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
  btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
nav.addEventListener('click', e => { if (e.target.tagName === 'A') { nav.classList.remove('open'); btn.setAttribute('aria-expanded', false); } });

// Scroll reveal
const els = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  els.forEach(el => io.observe(el));
} else els.forEach(el => el.classList.add('in'));

// Demo form. No backend exists yet, so by default the details are sent as a WhatsApp message.
// To use a form service later: set the form's action URL and data-backend="true" in index.html.
const form = document.getElementById('demoForm'), note = document.getElementById('formNote');
form.addEventListener('submit', e => {
  if (form.dataset.backend === 'true') return; // normal POST to your form service
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  const msg = `Hello Science Guru, I would like to book a demo class.\nStudent: ${d.student}\nParent/Guardian: ${d.parent || '-'}\nPhone: ${d.phone}\nClass: ${d.class}\nBoard: ${d.board}\nSubject: ${d.subject || '-'}\nBranch: ${d.branch}\nMessage: ${d.message || '-'}`;
  window.open('https://wa.me/919016095933?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  note.textContent = 'WhatsApp has opened with your details. Please press send there to complete your enquiry.';
});
