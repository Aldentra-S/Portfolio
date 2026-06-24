/* ===========================
   SHARED JS — portfolio
=========================== */

// Loading screen
window.addEventListener('load', () => {
  const loader = document.getElementById('loading-screen');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 1500);
  }
});

// Navbar scroll effect
const nav = document.querySelector('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  });
}

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  // close on link click
  mobileMenu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

// Back to top
const btt = document.getElementById('back-to-top');
if (btt) {
  window.addEventListener('scroll', () => {
    btt.classList.toggle('visible', window.scrollY > 300);
  });
  btt.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' }),
  );
}

// Scroll reveal
const revealEls = document.querySelectorAll(
  '.reveal, .reveal-left, .reveal-right',
);
if (revealEls.length) {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  revealEls.forEach((el) => obs.observe(el));
}

// Active nav link
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach((a) => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// Counter animation
function animateCount(el, target, duration = 1800) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + (el.dataset.suffix || '');
  };
  requestAnimationFrame(step);
}
document.querySelectorAll('[data-count]').forEach((el) => {
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        animateCount(el, parseInt(el.dataset.count), 1600);
        io.unobserve(el);
      }
    },
    { threshold: 0.5 },
  );
  io.observe(el);
});

// Skills tab (skills.html)
document.querySelectorAll('.skills-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document
      .querySelectorAll('.skills-tab')
      .forEach((t) => t.classList.remove('active'));
    document
      .querySelectorAll('.skills-tab-panel')
      .forEach((p) => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById(tab.dataset.panel);
    if (panel) panel.classList.add('active');
  });
});

// Projects filter (projects.html)
document.querySelectorAll('.filter-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document
      .querySelectorAll('.filter-btn')
      .forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach((card) => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.display = show ? 'flex' : 'none';
    });
  });
});

// Contact form validation (contact.html)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const showError = (id, msg) => {
    const el = document.getElementById(id + '-error');
    const input = document.getElementById(id);
    if (el) {
      el.textContent = msg;
      el.classList.add('show');
    }
    if (input) input.classList.add('error');
  };
  const clearError = (id) => {
    const el = document.getElementById(id + '-error');
    const input = document.getElementById(id);
    if (el) el.classList.remove('show');
    if (input) input.classList.remove('error');
  };

  ['name', 'email', 'subject', 'message'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => clearError(id));
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const subject = document.getElementById('subject')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name) {
      showError('name', 'Nama lengkap wajib diisi.');
      valid = false;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('email', 'Masukkan alamat email yang valid.');
      valid = false;
    }
    if (!subject) {
      showError('subject', 'Subjek pesan wajib diisi.');
      valid = false;
    }
    if (!message || message.length < 10) {
      showError('message', 'Pesan minimal 10 karakter.');
      valid = false;
    }

    if (valid) {
      const btn = contactForm.querySelector('button[type=submit]');
      if (btn) {
        btn.textContent = 'Mengirim...';
        btn.disabled = true;
      }
      setTimeout(() => {
        const success = document.getElementById('form-success');
        if (success) success.classList.add('show');
        contactForm.reset();
        if (btn) {
          btn.textContent = 'Kirim Pesan';
          btn.disabled = false;
        }
      }, 1400);
    }
  });
}

// Typed text effect (home page)
function typeWriter(el, texts, speed = 80) {
  if (!el) return;
  let i = 0,
    j = 0,
    deleting = false;
  const loop = () => {
    const current = texts[i];
    if (deleting) {
      el.textContent = current.substring(0, j--);
      if (j < 0) {
        deleting = false;
        i = (i + 1) % texts.length;
        setTimeout(loop, 500);
        return;
      }
    } else {
      el.textContent = current.substring(0, j++);
      if (j > current.length) {
        deleting = true;
        setTimeout(loop, 1800);
        return;
      }
    }
    setTimeout(loop, deleting ? 40 : speed);
  };
  loop();
}
typeWriter(document.getElementById('typed-text'), [
  'Web Developer',
  'UI/UX Enthusiast',
  'Game Developer',
  'Problem Solver',
]);
