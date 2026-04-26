/* ============================================
   MAMMA MIA — Index Page JS  v5
   Sticky services · Horizontal drag scroll
   Parallax · Process bars · Work nav arrows
   ============================================ */
(function () {
  'use strict';

  /* ================================================================
     0. HERO SLIDESHOW — 3초 간격 자동 전환
  ================================================================ */
  const heroSlideEls = document.querySelectorAll('.hero__slide');
  if (heroSlideEls.length > 1) {
    let heroSlideIdx = 0;
    setInterval(() => {
      heroSlideEls[heroSlideIdx].classList.remove('active');
      heroSlideIdx = (heroSlideIdx + 1) % heroSlideEls.length;
      heroSlideEls[heroSlideIdx].classList.add('active');
    }, 3000);
  }

  /* ================================================================
     1. HERO PARALLAX
  ================================================================ */
  const heroParallax = document.getElementById('heroParallax');
  const heroContent  = document.querySelector('.hero__content');
  const heroScroll   = document.getElementById('heroScroll');

  if (heroParallax) {
    window.addEventListener('scroll', () => {
      const y  = window.scrollY;
      const vh = window.innerHeight;
      if (y < vh * 1.2) {
        heroParallax.style.transform = `translateY(${y * 0.28}px)`;
        if (heroContent) {
          heroContent.style.transform = `translateY(${y * 0.14}px)`;
          heroContent.style.opacity   = Math.max(0, 1 - y / (vh * 0.65));
        }
        if (heroScroll) {
          heroScroll.style.opacity = Math.max(0, 1 - y / 200);
        }
      }
    }, { passive: true });
  }

  /* ================================================================
     2. STICKY SERVICES — 스크롤로 서비스 전환 + 5장 자동 슬라이드쌌
  ================================================================ */
  const svcPanels     = document.querySelectorAll('.sticky-services__panel');
  const svcImgs       = document.querySelectorAll('.sticky-services__img');
  const svcCounterCur = document.getElementById('svcCounterCur');
  const svcDots       = document.querySelectorAll('.sticky-services__dot');

  // 현재 활성 서비스 인덱스
  let currentService  = 0;
  let slideIndex      = 0;    // 현재 서비스 내 슬라이드 번호
  let slideTimer      = null;

  // 특정 서비스의 슬라이드 이미지 배열을 반환
  function getServiceImgs(serviceIdx) {
    return Array.from(svcImgs).filter(
      img => parseInt(img.dataset.service, 10) === serviceIdx
    );
  }

  // 서비스 내 슬라이드를 slideIdx 번호로 전환
  function showSlide(serviceIdx, slideIdx) {
    const imgs = getServiceImgs(serviceIdx);
    svcImgs.forEach(img => img.classList.remove('active'));
    if (imgs[slideIdx]) imgs[slideIdx].classList.add('active');

    // 도트 업데이트
    svcDots.forEach((dot, i) => dot.classList.toggle('active', i === slideIdx));
  }

  // 자동 슬라이드쌌 시작 (5초 간격)
  function startAutoSlide(serviceIdx) {
    stopAutoSlide();
    const imgs = getServiceImgs(serviceIdx);
    if (imgs.length <= 1) return;
    slideIndex = 0;
    showSlide(serviceIdx, slideIndex);

    slideTimer = setInterval(() => {
      slideIndex = (slideIndex + 1) % imgs.length;
      showSlide(serviceIdx, slideIndex);
    }, 1000);
  }

  function stopAutoSlide() {
    if (slideTimer) { clearInterval(slideTimer); slideTimer = null; }
  }

  if (svcPanels.length && svcImgs.length) {
    // 초기 실행
    startAutoSlide(0);

    const panelObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const panel = entry.target;
        const idx   = parseInt(panel.dataset.index, 10);

        // 패널 텍스트 인트로
        panel.querySelector('.sticky-services__panel-inner')
             .classList.add('in-view');

        // 서비스 전환 시에만 슬라이드 리셋
        if (idx !== currentService) {
          currentService = idx;
          startAutoSlide(idx);
        }

        // 카운터 업데이트
        if (svcCounterCur) {
          svcCounterCur.textContent = String(idx + 1).padStart(2, '0');
        }
      });
    }, { threshold: 0.45, rootMargin: '0px 0px -10% 0px' });

    svcPanels.forEach(p => panelObs.observe(p));
  }

  /* ================================================================
     3. HORIZONTAL DRAG SCROLL — Recent Work
        드래그 + 관성 + 화살표 버튼 + 카운터
  ================================================================ */
  const hscroll      = document.getElementById('workHScroll');
  const htrack       = document.getElementById('workTrack');
  const btnPrev      = document.getElementById('workNavPrev');
  const btnNext      = document.getElementById('workNavNext');
  const navCurEl     = document.getElementById('workNavCur');
  const navTotalEl   = document.getElementById('workNavTotal');

  if (hscroll && htrack) {
    const cards        = htrack.querySelectorAll('.work-card');
    const totalCards   = cards.length;
    let currentX       = 0;
    let isDragging     = false;
    let startX         = 0;
    let velX           = 0;
    let lastX          = 0;
    let rafId          = null;
    let activeCardIdx  = 0;   // 현재 보이는 카드 인덱스

    // 총 카드 수 표시
    if (navTotalEl) navTotalEl.textContent = String(totalCards).padStart(2, '0');

    /* ---------- 유틸 ---------- */
    function getMaxScroll() {
      return -(htrack.scrollWidth - hscroll.clientWidth);
    }
    function clampX(x) {
      return Math.max(getMaxScroll(), Math.min(0, x));
    }
    function applyX(x, smooth) {
      currentX = clampX(x);
      htrack.style.transition = smooth ? 'transform 0.55s cubic-bezier(0.16,1,0.3,1)' : 'none';
      htrack.style.transform  = `translateX(${currentX}px)`;
    }
    function updateCounter() {
      // 카드 너비 기준으로 현재 인덱스 계산
      const cardW = cards[0] ? cards[0].offsetWidth + 24 : 300; // gap=24
      const idx   = Math.round(-currentX / cardW);
      activeCardIdx = Math.max(0, Math.min(totalCards - 1, idx));
      if (navCurEl) navCurEl.textContent = String(activeCardIdx + 1).padStart(2, '0');
      // 버튼 disabled 상태
      if (btnPrev) btnPrev.disabled = activeCardIdx === 0;
      if (btnNext) btnNext.disabled = activeCardIdx >= totalCards - 1;
    }
    updateCounter();

    /* ---------- 화살표 버튼 ---------- */
    function scrollToCard(idx) {
      const cardW = cards[0] ? cards[0].offsetWidth + 24 : 300;
      applyX(-(idx * cardW), true);
      activeCardIdx = Math.max(0, Math.min(totalCards - 1, idx));
      if (navCurEl) navCurEl.textContent = String(activeCardIdx + 1).padStart(2, '0');
      if (btnPrev) btnPrev.disabled = activeCardIdx === 0;
      if (btnNext) btnNext.disabled = activeCardIdx >= totalCards - 1;
    }

    if (btnPrev) {
      btnPrev.disabled = true; // 초기
      btnPrev.addEventListener('click', () => scrollToCard(activeCardIdx - 1));
    }
    if (btnNext) {
      btnNext.addEventListener('click', () => scrollToCard(activeCardIdx + 1));
    }

    /* ---------- 마우스 드래그 ---------- */
    hscroll.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX - currentX;
      lastX  = e.clientX;
      cancelAnimationFrame(rafId);
      htrack.style.transition = 'none';
      hscroll.style.cursor = 'grabbing';
    });
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      velX     = e.clientX - lastX;
      lastX    = e.clientX;
      currentX = clampX(e.clientX - startX);
      htrack.style.transform = `translateX(${currentX}px)`;
    });
    window.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      hscroll.style.cursor = 'grab';
      momentum();
    });

    /* ---------- 터치 ---------- */
    hscroll.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].clientX - currentX;
      lastX  = e.touches[0].clientX;
      cancelAnimationFrame(rafId);
      htrack.style.transition = 'none';
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      velX     = e.touches[0].clientX - lastX;
      lastX    = e.touches[0].clientX;
      currentX = clampX(e.touches[0].clientX - startX);
      htrack.style.transform = `translateX(${currentX}px)`;
    }, { passive: true });
    window.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;
      momentum();
    });

    /* ---------- 관성 + 카드 스냅 ---------- */
    function momentum() {
      if (Math.abs(velX) > 1.5) {
        velX    *= 0.91;
        currentX = clampX(currentX + velX);
        htrack.style.transition = 'none';
        htrack.style.transform  = `translateX(${currentX}px)`;
        rafId = requestAnimationFrame(momentum);
      } else {
        // 카드 스냅
        const cardW = cards[0] ? cards[0].offsetWidth + 24 : 300;
        const idx   = Math.round(-currentX / cardW);
        scrollToCard(Math.max(0, Math.min(totalCards - 1, idx)));
      }
      updateCounter();
    }
  }

  /* ================================================================
     4. PROCESS STEP BARS
  ================================================================ */
  const processSteps = document.querySelectorAll('.process__step');
  if (processSteps.length) {
    const stepObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.25 });
    processSteps.forEach(s => stepObs.observe(s));
  }

  /* ================================================================
     5. WORK CARD — 미세 parallax hover
  ================================================================ */
  document.querySelectorAll('.work-card').forEach(card => {
    const img = card.querySelector('img');
    if (!img) return;
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 8;
      img.style.transform = `scale(1.06) translate(${x * 0.4}px, ${y * 0.4}px)`;
    });
    card.addEventListener('mouseleave', () => { img.style.transform = ''; });
  });

  /* ================================================================
     6. MARQUEE — v13 dynamic clone for seamless infinite loop
     - 1세트(4 items) HTML로 시작
     - JS가 화면 폭 측정 → 필요한 만큼 자동 복제 (4K, 8K 자동 대응)
     - 정확한 1세트 픽셀 폭만큼 translateX → 완벽 seamless
     - 호버 시 일시정지
  ================================================================ */
  const mtrack = document.getElementById('marqueeTrack');
  if (mtrack) {

    // 마퀴 1세트(4개 서비스)를 만드는 함수
    function buildMarqueeSet() {
      const services = ['Social Media Marketing', 'Branding', 'Video Production', 'Photo Production'];
      const frag = document.createDocumentFragment();
      services.forEach(name => {
        const item = document.createElement('span');
        item.className = 'marquee-item';
        item.textContent = name;
        frag.appendChild(item);
        const dot = document.createElement('span');
        dot.className = 'marquee-dot';
        dot.textContent = '✦';
        frag.appendChild(dot);
      });
      return frag;
    }

    // 화면 폭에 맞춰 마퀴 세트를 동적으로 채움
    function setupMarquee() {
      // 1) 한 번 리셋: 1세트만 남김
      mtrack.innerHTML = '';
      mtrack.appendChild(buildMarqueeSet());

      // 2) 1세트 폭 측정 (gap 포함 — 마지막 dot까지 + gap 1번)
      const track = mtrack;
      const trackStyle = getComputedStyle(track);
      const gap = parseFloat(trackStyle.gap) || 52;

      // 1세트의 실제 폭 = 마지막 자식의 right - 첫 자식의 left + gap
      const children = track.children;
      let setWidth = 0;
      if (children.length > 0) {
        const firstRect = children[0].getBoundingClientRect();
        const lastRect  = children[children.length - 1].getBoundingClientRect();
        setWidth = (lastRect.right - firstRect.left) + gap;
      }

      // 3) 화면 폭 + 여유 1세트만큼 채워질 때까지 복제
      const viewportW = window.innerWidth;
      const targetW = viewportW * 2 + setWidth; // 최소 2배 + 1세트
      let currentW = setWidth;
      let cloneCount = 0;
      while (currentW < targetW && cloneCount < 50) { // 50 안전상한
        track.appendChild(buildMarqueeSet());
        currentW += setWidth;
        cloneCount++;
      }

      // 4) CSS 변수로 정확한 1세트 거리 + 속도 주입
      // 속도: 픽셀당 일정 시간 → 화면 크기와 무관하게 동일한 체감 속도
      const pxPerSecond = 60; // 60px/s 흐름 속도
      const duration = setWidth / pxPerSecond;
      track.style.setProperty('--marquee-distance', setWidth + 'px');
      track.style.setProperty('--marquee-duration', duration + 's');

      // 5) keyframe 재정의 (calc() 음수 적용 위해 직접 스타일로)
      // CSS의 --marquee-distance를 사용하도록 keyframe 보강
      // (이미 .marquee-track에 animation 선언됨 — 변수만 바뀌어도 자동 적용)
    }

    // 초기 셋업
    setupMarquee();

    // 리사이즈 시 재셋업 (debounce)
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setupMarquee, 200);
    });

    // hover pause
    mtrack.addEventListener('mouseenter', () => mtrack.style.animationPlayState = 'paused');
    mtrack.addEventListener('mouseleave', () => mtrack.style.animationPlayState = 'running');
  }

  /* ================================================================
     7. NAV THEME SWITCH — hero 벗어나면 밝은 nav
  ================================================================ */
  const nav  = document.getElementById('mainNav');
  const hero = document.querySelector('.hero');
  if (nav && hero) {
    const switchObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) nav.classList.remove('nav--dark');
        else nav.classList.add('nav--dark');
      });
    }, { threshold: 0.05 });
    switchObs.observe(hero);
  }

})();
