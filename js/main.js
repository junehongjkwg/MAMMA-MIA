/* ============================================
   MAMMA MIA — Main JS (shared, all pages)
   Magnetic cursor · Page transition · Reveal
   ============================================ */
(function () {
  'use strict';

  /* ================================================================
     1. PAGE TRANSITION CURTAIN
     - 페이지 진입 시 검은 커튼이 위로 올라가며 열림
     - 링크 클릭 시 커튼이 내려오고 페이지 이동
  ================================================================ */
  const curtain = document.getElementById('pageCurtain');

  // 진입 애니메이션 — 커튼 올리기
  if (curtain) {
    window.addEventListener('DOMContentLoaded', () => {
      requestAnimationFrame(() => {
        curtain.classList.add('curtain--out');
      });
    });

    // 내부 링크 클릭 → 커튼 내리고 이동
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link) return;
      const href = link.getAttribute('href');
      // 외부 링크, 앵커, mailto, tel 제외
      if (!href || href.startsWith('#') || href.startsWith('http') ||
          href.startsWith('mailto') || href.startsWith('tel')) return;

      e.preventDefault();
      curtain.classList.remove('curtain--out');
      curtain.classList.add('curtain--in');

      setTimeout(() => {
        window.location.href = href;
      }, 680);
    });
  }

  /* ================================================================
     2. PAGE LOADER
  ================================================================ */
  const loader = document.getElementById('pageLoader');
  if (loader) {
    const hideLoader = () => {
      setTimeout(() => loader.classList.add('hidden'), 1100);
    };
    if (document.readyState === 'complete') {
      hideLoader();
    } else {
      window.addEventListener('load', hideLoader);
    }
  }

  /* ================================================================
     3. MAGNETIC CURSOR
     - 커서 dot: 즉시 이동
     - 커서 ring: 부드러운 lag 추적
     - 버튼/링크 위: magnetic pull + ring 확대 + 텍스트 표시
  ================================================================ */
  const cursorDot  = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');

  if (cursorDot && cursorRing && window.matchMedia('(pointer:fine)').matches) {
    let mx = -200, my = -200;
    let rx = -200, ry = -200;
    let magnetEl = null;
    let magnetStrength = 0.35;
    let rafId;

    // 마우스 이동
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursorDot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });

    // Magnetic targets
    const getMagTargets = () =>
      document.querySelectorAll('a, button, .work-card, .pricing-card, .branding-v3__card');

    function applyMagnet() {
      getMagTargets().forEach(el => {
        el.addEventListener('mouseenter', () => {
          magnetEl = el;
          cursorDot.classList.add('cursor--hover');
          cursorRing.classList.add('cursor-ring--hover');
        });
        el.addEventListener('mouseleave', () => {
          magnetEl = null;
          el.style.transform = '';
          cursorDot.classList.remove('cursor--hover');
          cursorRing.classList.remove('cursor-ring--hover');
        });
        el.addEventListener('mousemove', (e) => {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top  + rect.height / 2;
          const dx = (e.clientX - cx) * magnetStrength;
          const dy = (e.clientY - cy) * magnetStrength;
          // 버튼 자체도 살짝 끌림
          if (el.tagName === 'A' || el.tagName === 'BUTTON') {
            el.style.transform = `translate(${dx * 0.3}px, ${dy * 0.3}px)`;
          }
        });
      });
    }
    applyMagnet();

    // Re-apply after any dynamic content changes
    const domObserver = new MutationObserver(() => applyMagnet());
    domObserver.observe(document.body, { childList: true, subtree: true });

    // Ring lerp loop
    function loopRing() {
      if (magnetEl) {
        const rect = magnetEl.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top  + rect.height / 2;
        rx += (cx - rx) * 0.18;
        ry += (cy - ry) * 0.18;
      } else {
        rx += (mx - rx) * 0.11;
        ry += (my - ry) * 0.11;
      }
      cursorRing.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      rafId = requestAnimationFrame(loopRing);
    }
    loopRing();

    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity  = '0';
      cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity  = '1';
      cursorRing.style.opacity = '1';
    });
  }

  /* ================================================================
     4. PROGRESS BAR
  ================================================================ */
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const max  = document.documentElement.scrollHeight - window.innerHeight;
      const pct  = max > 0 ? window.scrollY / max : 0;
      progressBar.style.transform = `scaleX(${pct})`;
    }, { passive: true });
  }

  /* ================================================================
     5. NAV — scroll hide/show + theme switch
  ================================================================ */
  const nav = document.getElementById('mainNav');
  if (nav) {
    let lastY = 0;
    let hidden = false;

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      // scrolled 스타일 토글
      nav.classList.toggle('scrolled', y > 60);
      // 아래로 스크롤 시 숨기기 (200px 이상 스크롤 후)
      if (y > 200) {
        if (y > lastY + 6 && !hidden) {
          nav.classList.add('nav--hidden');
          hidden = true;
        } else if (y < lastY - 4 && hidden) {
          nav.classList.remove('nav--hidden');
          hidden = false;
        }
      } else {
        nav.classList.remove('nav--hidden');
        hidden = false;
      }
      lastY = y;
    }, { passive: true });
  }

  /* ================================================================
     6. HAMBURGER / MOBILE MENU
  ================================================================ */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('.nav__mobile-link').forEach(l => {
      l.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && hamburger.classList.contains('open')) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ================================================================
     7. SCROLL REVEAL  (staggered children support)
  ================================================================ */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach(el => revealObs.observe(el));
  }

  /* ================================================================
     8. SPLIT-TEXT REVEAL
     - .split-text 요소의 텍스트를 문자 단위로 쪼개고
       스크롤 시 char-by-char 등장
  ================================================================ */
  function splitTextInit() {
    document.querySelectorAll('.split-text').forEach(el => {
      if (el.dataset.split) return; // 이미 처리됨
      el.dataset.split = '1';
      const text = el.textContent;
      el.textContent = '';
      text.split('').forEach((ch, i) => {
        const span = document.createElement('span');
        span.className = 'split-char';
        span.textContent = ch === ' ' ? '\u00A0' : ch;
        span.style.setProperty('--i', i);
        el.appendChild(span);
      });
    });

    const splitObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('split-text--visible');
          splitObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.split-text').forEach(el => splitObs.observe(el));
  }
  splitTextInit();

  /* ================================================================
     9. COUNTER ANIMATION
  ================================================================ */
  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start    = performance.now();
    const ease     = t => 1 - Math.pow(1 - t, 3);
    const tick     = now => {
      const t   = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(ease(t) * target).toLocaleString();
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  // data-target이 숫자인 요소만 선택 (pricing 탭 버튼 등 문자열 data-target 제외)
  const counters = Array.from(document.querySelectorAll('[data-target]')).filter(
    el => !isNaN(parseInt(el.dataset.target, 10))
  );
  if (counters.length) {
    const cntObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); cntObs.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach(el => cntObs.observe(el));
  }

  /* ================================================================
     10. SMOOTH ANCHOR SCROLL
  ================================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id  = a.getAttribute('href').slice(1);
      const tgt = document.getElementById(id);
      if (tgt) { e.preventDefault(); tgt.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

})();
