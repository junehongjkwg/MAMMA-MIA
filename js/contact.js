/* ============================================
   MAMMA MIA — Contact Page JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ---- Form Validation & Submission ---- */
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');

  if (!form) return;

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setError(inputId, errorId, show) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (!input || !error) return;
    if (show) {
      input.classList.add('error');
      error.classList.add('visible');
    } else {
      input.classList.remove('error');
      error.classList.remove('visible');
    }
  }

  function validateForm() {
    let valid = true;

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name) { setError('name', 'nameError', true); valid = false; }
    else { setError('name', 'nameError', false); }

    if (!email || !validateEmail(email)) { setError('email', 'emailError', true); valid = false; }
    else { setError('email', 'emailError', false); }

    if (!message) { setError('message', 'messageError', true); valid = false; }
    else { setError('message', 'messageError', false); }

    return valid;
  }

  // Live validation on blur
  ['name', 'email', 'message'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('blur', () => {
      if (id === 'email') {
        setError('email', 'emailError', !validateEmail(el.value.trim()));
      } else {
        setError(id, id + 'Error', !el.value.trim());
      }
    });
    el.addEventListener('input', () => {
      if (el.classList.contains('error')) {
        if (id === 'email') {
          setError('email', 'emailError', !validateEmail(el.value.trim()));
        } else {
          setError(id, id + 'Error', !el.value.trim());
        }
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Show loading state
    const btnText = submitBtn.querySelector('.form-submit__text');
    const btnArrow = submitBtn.querySelector('.form-submit__arrow');
    const btnSpinner = submitBtn.querySelector('.form-submit__spinner');

    submitBtn.disabled = true;
    if (btnText) btnText.textContent = 'Sending...';
    if (btnArrow) btnArrow.style.display = 'none';
    if (btnSpinner) btnSpinner.style.display = 'inline-flex';

    // Simulate send (since this is a static site - replace with your backend/Formspree/Netlify Forms)
    await new Promise(resolve => setTimeout(resolve, 1800));

    // Show success
    submitBtn.style.display = 'none';
    if (formSuccess) {
      formSuccess.style.display = 'flex';
      formSuccess.style.animation = 'fadeUp 0.5s ease forwards';
    }
    form.reset();
  });

  /* ---- FAQ Accordion ---- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.getAttribute('data-open') === 'true';

      // Close all others
      faqItems.forEach(other => {
        if (other !== item) {
          other.setAttribute('data-open', 'false');
        }
      });

      // Toggle current
      item.setAttribute('data-open', isOpen ? 'false' : 'true');
    });
  });

  /* ---- Input Label Float Effect ---- */
  const formControls = document.querySelectorAll('.form-control');
  formControls.forEach(input => {
    // Add focus glow
    input.addEventListener('focus', () => {
      const group = input.closest('.form-group');
      if (group) group.style.transform = 'translateY(-1px)';
    });
    input.addEventListener('blur', () => {
      const group = input.closest('.form-group');
      if (group) group.style.transform = '';
    });
  });

  /* ---- Budget option keyboard accessibility ---- */
  const budgetOptions = document.querySelectorAll('.budget-option');
  budgetOptions.forEach(opt => {
    opt.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        opt.querySelector('input[type="radio"]').click();
      }
    });
  });

  /* ---- Portfolio Mosaic — random images ---- */
  const portfolioImages = [
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=700&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=700&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=700&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=700&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=700&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=700&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1492692494035-7c2d5f0c9f4e?w=700&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=700&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=700&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=700&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80&auto=format&fit=crop',
  ];

  // Grid layout: 9 cells — item 0 is wide (spans 2 cols), item 2 is tall (spans 2 rows)
  const mosaicLayouts = [
    { wide: 0, tall: 3 }, // first cell wide, 4th cell tall
    { wide: 1, tall: 5 }, // 2nd wide, 6th tall
    { wide: 2, tall: 0 }, // 3rd wide, 1st tall
  ];

  function buildMosaic() {
    const mosaic = document.getElementById('contactMosaic');
    if (!mosaic) return;

    // Shuffle images
    const shuffled = [...portfolioImages].sort(() => Math.random() - 0.5);
    const layout = mosaicLayouts[Math.floor(Math.random() * mosaicLayouts.length)];

    mosaic.innerHTML = '';

    // Create 7 cells (wide = 2 cols, tall = 2 rows, rest = 1×1)
    // Grid is 3 cols × 3 rows = 9 units; wide eats 2, tall eats 2, so 2+2+5×1 = 9 ✓
    const cells = 7;
    for (let i = 0; i < cells; i++) {
      const item = document.createElement('div');
      item.className = 'portfolio-mosaic__item';
      if (i === layout.wide) item.classList.add('portfolio-mosaic__item--wide');
      if (i === layout.tall) item.classList.add('portfolio-mosaic__item--tall');

      const img = document.createElement('img');
      img.src = shuffled[i % shuffled.length];
      img.alt = 'Portfolio work by MAMMA MIA';
      img.loading = 'lazy';
      img.addEventListener('load', () => img.classList.add('loaded'));
      // If already cached
      if (img.complete) img.classList.add('loaded');

      item.appendChild(img);
      mosaic.appendChild(item);
    }
  }

  buildMosaic();

})();
