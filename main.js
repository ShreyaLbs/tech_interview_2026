// FOSS Club — main.js
// Shreya Ajith, LBSITW 2026

// Highlight active nav link on scroll
window.addEventListener('scroll', function () {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');

  let current = '';
  sections.forEach(function (section) {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.id;
    }
  });

  links.forEach(function (link) {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    var target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Contact form
var form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = document.getElementById('submitBtn');
    var success = document.getElementById('formSuccess');

    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(function () {
      form.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
      if (success) {
        success.classList.add('visible');
        setTimeout(function () {
          success.classList.remove('visible');
        }, 4000);
      }
    }, 1000);
  });
}