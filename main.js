
(function () {
  const canvas = document.getElementById('grid-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, dots = [], mouse = { x: -999, y: -999 };
  const SPACING = 36, DOT_R = 1.5, REPEL = 80;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildDots();
  }

  function buildDots() {
    dots = [];
    for (let x = SPACING / 2; x < W; x += SPACING) {
      for (let y = SPACING / 2; y < H; y += SPACING) {
        dots.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 });
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(12,14,15,0.32)'; 
    for (const d of dots) {
      const dx = d.x - mouse.x, dy = d.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < REPEL) {
        const force = (REPEL - dist) / REPEL;
        d.vx += (dx / dist) * force * 1.8;
        d.vy += (dy / dist) * force * 1.8;
      }
      
      d.vx += (d.ox - d.x) * 0.08;
      d.vy += (d.oy - d.y) * 0.08;
      d.vx *= 0.78;
      d.vy *= 0.78;
      d.x += d.vx;
      d.y += d.vy;

      ctx.beginPath();
      ctx.arc(d.x, d.y, DOT_R, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  resize();
  draw();
})();

/* ── 2. Custom cursor ── */
(function () {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mx = -100, my = -100;
  let rx = -100, ry = -100;
  let entered = false;

  window.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    if (!entered) {
      rx = mx; ry = my;
      entered = true;
    }
  });

  function step() {
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(step);
  }
  step();

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.transform  = 'translate(-50%,-50%) scale(2.8)';
      ring.style.transform = 'translate(-50%,-50%) scale(1.6)';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.transform  = 'translate(-50%,-50%) scale(1)';
      ring.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });
})();


(function () {
  const target = document.getElementById('typeTarget');
  const output = document.getElementById('termOutput');
  const caret  = document.getElementById('caret');
  if (!target || !output) return;

  const text = 'cat welcome.txt';
  let i = 0;

  function type() {
    if (i < text.length) {
      target.textContent += text[i++];
      setTimeout(type, 80 + Math.random() * 60);
    } else {
      setTimeout(() => {
        caret.style.display = 'none';
        output.classList.add('visible');
      }, 500);
    }
  }

  setTimeout(type, 900);
})();

/* ── 4. Navbar: active link highlight on scroll ── */
(function () {
  const navbar   = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  function onScroll() {
    if (window.scrollY > 60) {
      navbar.style.borderBottomColor = 'rgba(0,0,0,0.14)';
    } else {
      navbar.style.borderBottomColor = 'rgba(0,0,0,0.10)';
    }
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();


(function () {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.card, .section-intro, .contact-left, .contact-right').forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    observer.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = '.in-view { opacity: 1 !important; transform: none !important; }';
  document.head.appendChild(style);
})();


document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});


(function () {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const btn     = document.getElementById('submitBtn');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      form.reset();
      btn.textContent = 'Send Message →';
      btn.disabled = false;
      if (success) success.classList.add('visible');
      setTimeout(() => success && success.classList.remove('visible'), 5000);
    }, 1200);
  });
})();