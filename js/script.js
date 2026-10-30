/**
 * AL DENTRA PORTFOLIO : CLIENT SCRIPT
 * Vanilla JavaScript (Zero Build / Zero Dependencies)
 * Handles: Scrollspy, Mobile Navigation Drawer, Skills Tabs, Form Validation, Dynamic Year, Back-to-top
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC FOOTER YEAR
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. MOBILE NAVIGATION DRAWER
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    const toggleDrawer = (open) => {
      const isExpanded = open !== undefined ? open : mobileToggle.getAttribute('aria-expanded') !== 'true';
      mobileToggle.setAttribute('aria-expanded', String(isExpanded));
      if (isExpanded) {
        mobileDrawer.removeAttribute('hidden');
      } else {
        mobileDrawer.setAttribute('hidden', '');
      }
    };

    mobileToggle.addEventListener('click', () => toggleDrawer());

    // Close when clicking any mobile link
    mobileDrawer.querySelectorAll('.mobile-nav-link, .btn').forEach((link) => {
      link.addEventListener('click', () => {
        toggleDrawer(false);
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileToggle.getAttribute('aria-expanded') === 'true') {
        toggleDrawer(false);
        mobileToggle.focus();
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!mobileToggle.contains(e.target) && !mobileDrawer.contains(e.target)) {
        if (mobileToggle.getAttribute('aria-expanded') === 'true') {
          toggleDrawer(false);
        }
      }
    });
  }

  // 3. SCROLLSPY (IntersectionObserver for Active Navigation Links)
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (sections.length > 0 && 'IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          const targetHref = `#${currentId}`;

          desktopLinks.forEach((link) => {
            if (link.getAttribute('href') === targetHref) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });

          mobileLinks.forEach((link) => {
            if (link.getAttribute('href') === targetHref) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
  }

  // 4. BACK TO TOP BUTTON
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.style.opacity = '1';
        backToTop.style.pointerEvents = 'auto';
      } else {
        backToTop.style.opacity = '0';
        backToTop.style.pointerEvents = 'none';
      }
    }, { passive: true });

    // Initial state
    backToTop.style.opacity = '0';
    backToTop.style.pointerEvents = 'none';

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 5. SKILLS TAB SWITCHER (WAI-ARIA COMPLIANT)
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillPanels = document.querySelectorAll('.skills-panel');

  if (skillTabs.length > 0) {
    skillTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        activateTab(tab);
      });

      tab.addEventListener('keydown', (e) => {
        let targetIndex = null;
        if (e.key === 'ArrowRight') {
          targetIndex = (index + 1) % skillTabs.length;
        } else if (e.key === 'ArrowLeft') {
          targetIndex = (index - 1 + skillTabs.length) % skillTabs.length;
        } else if (e.key === 'Home') {
          targetIndex = 0;
        } else if (e.key === 'End') {
          targetIndex = skillTabs.length - 1;
        }

        if (targetIndex !== null) {
          e.preventDefault();
          skillTabs[targetIndex].focus();
          activateTab(skillTabs[targetIndex]);
        }
      });
    });

    function activateTab(activeTab) {
      const targetPanelId = activeTab.getAttribute('aria-controls');

      skillTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });

      activeTab.classList.add('active');
      activeTab.setAttribute('aria-selected', 'true');
      activeTab.setAttribute('tabindex', '0');

      skillPanels.forEach((panel) => {
        if (panel.id === targetPanelId) {
          panel.classList.add('active');
          panel.removeAttribute('hidden');
        } else {
          panel.classList.remove('active');
          panel.setAttribute('hidden', '');
        }
      });
    }
  }

  // 6. CONTACT FORM VALIDATION & WHATSAPP REDIRECT
  const form = document.getElementById('contact-form');
  if (form) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const formSuccess = document.getElementById('form-success');
    const submitBtn = document.getElementById('submit-btn');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const setError = (input, msg) => {
      const errorEl = document.getElementById(`${input.id}-error`);
      if (errorEl) {
        errorEl.textContent = msg;
      }
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    };

    const clearError = (input) => {
      setError(input, '');
    };

    // Live validation on blur & input
    [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
      if (!input) return;
      input.addEventListener('input', () => clearError(input));
      input.addEventListener('blur', () => {
        if (input === nameInput && !nameInput.value.trim()) {
          setError(nameInput, 'Nama lengkap wajib diisi.');
        } else if (input === emailInput) {
          if (!emailInput.value.trim()) {
            setError(emailInput, 'Email wajib diisi.');
          } else if (!emailRegex.test(emailInput.value.trim())) {
            setError(emailInput, 'Format email tidak valid.');
          }
        } else if (input === subjectInput && !subjectInput.value.trim()) {
          setError(subjectInput, 'Subjek pesan wajib diisi.');
        } else if (input === messageInput) {
          if (!messageInput.value.trim()) {
            setError(messageInput, 'Pesan wajib diisi.');
          } else if (messageInput.value.trim().length < 10) {
            setError(messageInput, 'Pesan minimal 10 karakter.');
          }
        }
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      const nameVal = nameInput.value.trim();
      if (!nameVal) {
        setError(nameInput, 'Nama lengkap wajib diisi.');
        isValid = false;
      } else {
        clearError(nameInput);
      }

      // Validate Email
      const emailVal = emailInput.value.trim();
      if (!emailVal) {
        setError(emailInput, 'Email wajib diisi.');
        isValid = false;
      } else if (!emailRegex.test(emailVal)) {
        setError(emailInput, 'Format email tidak valid.');
        isValid = false;
      } else {
        clearError(emailInput);
      }

      // Validate Subject
      const subjectVal = subjectInput.value.trim();
      if (!subjectVal) {
        setError(subjectInput, 'Subjek pesan wajib diisi.');
        isValid = false;
      } else {
        clearError(subjectInput);
      }

      // Validate Message
      const messageVal = messageInput.value.trim();
      if (!messageVal) {
        setError(messageInput, 'Pesan wajib diisi.');
        isValid = false;
      } else if (messageVal.length < 10) {
        setError(messageInput, 'Pesan minimal 10 karakter.');
        isValid = false;
      } else {
        clearError(messageInput);
      }

      if (!isValid) {
        const firstError = form.querySelector('[aria-invalid="true"]');
        if (firstError) firstError.focus();
        return;
      }

      // Show success feedback
      if (formSuccess) {
        formSuccess.removeAttribute('hidden');
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Membuka WhatsApp...';
      }

      // Construct WhatsApp message
      const textMessage = `Halo Aldentra, saya ${nameVal} (${emailVal}).\nSubjek: ${subjectVal}\n\nPesan:\n${messageVal}`;
      const waNumber = '6281234567890';
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(textMessage)}`;

      // Redirect after brief delay
      setTimeout(() => {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            Kirim via WhatsApp
          `;
        }
      }, 700);
    });
  }
});
