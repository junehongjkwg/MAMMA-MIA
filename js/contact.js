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

  /* ---- Portfolio Mosaic — MAMMA MIA actual work (mixed categories) ---- */
  const portfolioImages = [
    // Branding (9)
    'https://www.genspark.ai/api/files/s/SvH5hcFY', // Branding Anthracite
    'https://www.genspark.ai/api/files/s/VZpLI7wy', // Kitchen Il Forno
    'https://www.genspark.ai/api/files/s/6b2BcHLB', // El Molino Brand Deck
    'https://www.genspark.ai/api/files/s/Nuz0hH6o', // La Foret IG
    'https://www.genspark.ai/api/files/s/RaXI7gQ3', // New Menu Promo 1
    'https://www.genspark.ai/api/files/s/V4DeLbJm', // New Menu Promo 2
    'https://www.genspark.ai/api/files/s/Rg0WNRcA', // New Menu Promo 3
    'https://www.genspark.ai/api/files/s/sMcRCFhP', // Seasonal Promo
    'https://www.genspark.ai/api/files/s/NOMIoabp', // Uber Eats Promo

    // Social Media — Reels & Card News (19)
    'https://www.genspark.ai/api/files/s/9RKUHcNz', // Brand Launching
    'https://www.genspark.ai/api/files/s/hXWcpVLj', // Cafe Opening
    'https://www.genspark.ai/api/files/s/LW2X8LCq', // Cocktail 1
    'https://www.genspark.ai/api/files/s/RLwb3P5o', // Cocktail 2
    'https://www.genspark.ai/api/files/s/rB96Jwhe', // Egg Benedict
    'https://www.genspark.ai/api/files/s/S7T8Z70A', // Fashion Brand 1
    'https://www.genspark.ai/api/files/s/4dZlfrN2', // Fashion Brand 2
    'https://www.genspark.ai/api/files/s/UuKLjNc9', // Fashion Brand 3
    'https://www.genspark.ai/api/files/s/ko8IWjOl', // Fashion Brand 4
    'https://www.genspark.ai/api/files/s/HLB6rsrJ', // Fashion Brand 5
    'https://www.genspark.ai/api/files/s/8o3u0O8n', // New Coffee Bear
    'https://www.genspark.ai/api/files/s/pqyNZWhA', // New Dishes
    'https://www.genspark.ai/api/files/s/1s2ve7zA', // Sotbab
    'https://www.genspark.ai/api/files/s/3EehfBCn', // Venue
    'https://www.genspark.ai/api/files/s/gJeN23Xd', // Fashion Week
    'https://www.genspark.ai/api/files/s/qzXpxYuU', // Global Fashion Week
    'https://www.genspark.ai/api/files/s/Wnm3XVVJ', // Health Supplement
    'https://www.genspark.ai/api/files/s/yKU2goVp', // Korea Tourism
    'https://www.genspark.ai/api/files/s/j2Zfxe3v', // Seoulgift Brand

    // Photo Production — Food / Product / Portrait (40)
    'https://www.genspark.ai/api/files/s/neFGiniX', // Food Burger
    'https://www.genspark.ai/api/files/s/CYi4CdCy', // Food Chicken Wing
    'https://www.genspark.ai/api/files/s/0d7cYmcz', // Food Cocktail
    'https://www.genspark.ai/api/files/s/PN2kiG3P', // Food Cocktails
    'https://www.genspark.ai/api/files/s/mTF2wwlc', // Food Korean Spice Noodle
    'https://www.genspark.ai/api/files/s/Z3DGtmAR', // Food Martini Cocktail
    'https://www.genspark.ai/api/files/s/B5K3kAt2', // Food New Dessert
    'https://www.genspark.ai/api/files/s/ezbqtqhD', // Food Pasta
    'https://www.genspark.ai/api/files/s/bummHgw2', // Food Pizza
    'https://www.genspark.ai/api/files/s/Qb8F1hUK', // Food St Patrick
    'https://www.genspark.ai/api/files/s/X0hwByka', // Food Tacos
    'https://www.genspark.ai/api/files/s/I3QbnlId', // Apparel 1
    'https://www.genspark.ai/api/files/s/dRHC7EvK', // Apparel 2
    'https://www.genspark.ai/api/files/s/mPaEUCPu', // Apparel 3
    'https://www.genspark.ai/api/files/s/BxYgSeLf', // Apparel 4
    'https://www.genspark.ai/api/files/s/hpqQ5iyt', // Apparel 5
    'https://www.genspark.ai/api/files/s/059o0Sa1', // Apparel 6
    'https://www.genspark.ai/api/files/s/K9BTGp65', // Apparel 7
    'https://www.genspark.ai/api/files/s/WQdjq5Hy', // Apparel 8
    'https://www.genspark.ai/api/files/s/5MBkdwgN', // Arm Sleeve
    'https://www.genspark.ai/api/files/s/wOJs8rDZ', // Engagement Ring
    'https://www.genspark.ai/api/files/s/t0Awn76i', // Pantyhose
    'https://www.genspark.ai/api/files/s/pNXHXWCf', // Studio Concept 1
    'https://www.genspark.ai/api/files/s/n2QaqH3K', // Studio Concept 2
    'https://www.genspark.ai/api/files/s/ebTGy8kq', // Studio Concept 3
    'https://www.genspark.ai/api/files/s/zvGMriLE', // Retail Studio 1
    'https://www.genspark.ai/api/files/s/mUwP9eA6', // Retail Studio 2
    'https://www.genspark.ai/api/files/s/1LbUMaQZ', // Retail Studio 3
    'https://www.genspark.ai/api/files/s/gZoEIdT9', // Thermo 1
    'https://www.genspark.ai/api/files/s/Azx2mBDR', // Thermo 2
    'https://www.genspark.ai/api/files/s/8u2WGMoa', // Thermo 3
    'https://www.genspark.ai/api/files/s/oVpwLJJc', // Hani 1
    'https://www.genspark.ai/api/files/s/ruebyWVP', // Hani 2
    'https://www.genspark.ai/api/files/s/gLjRd4ei', // Hani 3
    'https://www.genspark.ai/api/files/s/hkN9y5ke', // Heather 1
    'https://www.genspark.ai/api/files/s/deQhz5hf', // Heather 2
    'https://www.genspark.ai/api/files/s/6ssJgL3v', // Heather 3
    'https://www.genspark.ai/api/files/s/kvRxwxYt', // Heather Sushi 1
    'https://www.genspark.ai/api/files/s/WumrLwpE', // Heather Sushi 2
    'https://www.genspark.ai/api/files/s/sX6vR2We', // Jeremy & Hani Sushi

    // Video Production — Stills / Posters (10)
    'https://www.genspark.ai/api/files/s/Yi5xqCBI', // Cars And Hoops
    'https://www.genspark.ai/api/files/s/Jnd0hdTD', // DL Acro 1
    'https://www.genspark.ai/api/files/s/tWPKsFss', // DL Acro 2
    'https://www.genspark.ai/api/files/s/LQ2uKYjv', // F Diary Perfume
    'https://www.genspark.ai/api/files/s/8CE5pvxK', // Hanyang Industrial
    'https://www.genspark.ai/api/files/s/zSrfbM1O', // MCST KOCCA Wild VR
    'https://www.genspark.ai/api/files/s/9QS2fsvd', // MCST Asean Doc
    'https://www.genspark.ai/api/files/s/1ikb4TIV', // Once Upon Shine Gala
    'https://www.genspark.ai/api/files/s/fhRWWxrV', // Fashion Film 1
    'https://www.genspark.ai/api/files/s/KedwCBN6', // Fashion Film 2
  ];

  /* ============================================================
     Mosaic Builder — Grid Matrix Algorithm (Method C)
     ------------------------------------------------------------
     1. 가상 행렬에 셀을 순서대로 배치 (big/wide/tall/sq)
     2. 각 셀은 빈 공간(0)에만 들어가고, 자기 영역(1)을 점유
     3. 그리드 채우는 도중 빈 칸이 남으면 1×1 sq 셀로 강제 채움
     4. 마지막 행이 미완성이면 sq로 끝까지 메움
     5. 뷰포트 폭에 따라 4 / 3 / 2 열로 반응형 동작
     => 빈 영역 0% 보장
  ============================================================ */
  function getMosaicCols() {
    const w = window.innerWidth;
    if (w <= 460) return 2;
    if (w <= 768) return 3;
    return 4;
  }
  function getMosaicRows(cols) {
    // 같은 셀 수(약 16칸)를 유지하기 위해 열에 따라 행 수 조정
    if (cols === 2) return 8;
    if (cols === 3) return 6;
    return 4;
  }

  // 가능한 셀 토큰과 각각의 (cols, rows) 크기
  const SIZE = {
    big:  { c: 2, r: 2 }, // 2×2
    wide: { c: 2, r: 1 }, // 2×1
    tall: { c: 1, r: 2 }, // 1×2
    sq:   { c: 1, r: 1 }, // 1×1
  };

  // 가중치: big은 가끔만 등장, wide/tall은 적당히, sq가 채움 역할
  const SHAPE_BAG = ['big', 'wide', 'tall', 'wide', 'tall', 'sq', 'sq', 'sq', 'sq'];

  function pickRandomShape() {
    return SHAPE_BAG[Math.floor(Math.random() * SHAPE_BAG.length)];
  }

  // 가상 행렬에서 (col, row) 위치에 size(c×r) 셀이 들어갈 수 있는지 확인
  function canFit(matrix, col, row, size, cols) {
    if (col + size.c > cols) return false;
    // 필요한 행이 부족하면 행을 확장 (자동 grow)
    while (matrix.length < row + size.r) {
      matrix.push(new Array(cols).fill(0));
    }
    for (let r = row; r < row + size.r; r++) {
      for (let c = col; c < col + size.c; c++) {
        if (matrix[r][c] === 1) return false;
      }
    }
    return true;
  }

  // 행렬에 셀을 표시 (점유)
  function place(matrix, col, row, size) {
    for (let r = row; r < row + size.r; r++) {
      for (let c = col; c < col + size.c; c++) {
        matrix[r][c] = 1;
      }
    }
  }

  // 가장 첫번째 빈 칸의 (col, row) 반환, 없으면 null
  function firstEmpty(matrix, cols) {
    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < cols; c++) {
        if (matrix[r][c] === 0) return { col: c, row: r };
      }
    }
    return null;
  }

  // 빈 칸 개수 (현재 행렬 기준)
  function countEmpty(matrix, cols) {
    let n = 0;
    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < cols; c++) {
        if (matrix[r][c] === 0) n++;
      }
    }
    return n;
  }

  function buildMosaic() {
    const mosaic = document.getElementById('contactMosaic');
    if (!mosaic) return;

    const cols = getMosaicCols();
    const targetRows = getMosaicRows(cols);

    const shuffled = [...portfolioImages].sort(() => Math.random() - 0.5);
    mosaic.innerHTML = '';

    // 1. 가상 행렬 생성 (목표 행 수만큼 미리 0으로 초기화)
    const matrix = [];
    for (let r = 0; r < targetRows; r++) {
      matrix.push(new Array(cols).fill(0));
    }

    // 2. 셀 배치 정보 수집 (col, row, size)
    const cells = [];
    let imageIdx = 0;
    let attempts = 0;
    const MAX_ATTEMPTS = 120; // 무한루프 방지

    while (firstEmpty(matrix, cols) && attempts < MAX_ATTEMPTS) {
      attempts++;
      const empty = firstEmpty(matrix, cols);
      if (!empty) break;

      // 2열에서는 big(2x2)이 너무 크니 제외
      let shape = pickRandomShape();
      if (cols < 3 && shape === 'big') shape = 'sq';
      let size = SIZE[shape];

      // 현재 위치에 fit 안 되면 더 작은 토큰으로 fallback
      if (!canFit(matrix, empty.col, empty.row, size, cols)) {
        const fallback = ['wide', 'tall', 'sq'];
        for (const f of fallback) {
          if (canFit(matrix, empty.col, empty.row, SIZE[f], cols)) {
            shape = f;
            size = SIZE[f];
            break;
          }
        }
      }

      // 마지막 안전장치: 무조건 sq로
      if (!canFit(matrix, empty.col, empty.row, size, cols)) {
        shape = 'sq';
        size = SIZE.sq;
      }

      place(matrix, empty.col, empty.row, size);
      cells.push({
        col: empty.col,
        row: empty.row,
        shape: shape,
        size: size,
        src: shuffled[imageIdx % shuffled.length],
      });
      imageIdx++;
    }

    // 3. 행렬에 빈 칸이 남아있으면 1×1로 강제 채우기 (안전망)
    let safety = 0;
    while (countEmpty(matrix, cols) > 0 && safety < 60) {
      safety++;
      const empty = firstEmpty(matrix, cols);
      if (!empty) break;
      place(matrix, empty.col, empty.row, SIZE.sq);
      cells.push({
        col: empty.col,
        row: empty.row,
        shape: 'sq',
        size: SIZE.sq,
        src: shuffled[imageIdx % shuffled.length],
      });
      imageIdx++;
    }

    // 4. DOM 렌더링 — 명시적 grid-area로 위치 고정
    cells.forEach((cell) => {
      const item = document.createElement('div');
      item.className = 'portfolio-mosaic__item';
      if (cell.shape === 'big')  item.classList.add('portfolio-mosaic__item--big');
      if (cell.shape === 'wide') item.classList.add('portfolio-mosaic__item--wide');
      if (cell.shape === 'tall') item.classList.add('portfolio-mosaic__item--tall');

      // grid-area: row-start / col-start / row-end / col-end
      item.style.gridArea =
        `${cell.row + 1} / ${cell.col + 1} / ${cell.row + 1 + cell.size.r} / ${cell.col + 1 + cell.size.c}`;

      const img = document.createElement('img');
      img.src = cell.src;
      img.alt = 'Portfolio work by MAMMA MIA';
      img.loading = 'lazy';
      img.addEventListener('load', () => img.classList.add('loaded'));
      if (img.complete) img.classList.add('loaded');

      item.appendChild(img);
      mosaic.appendChild(item);
    });
  }

  buildMosaic();

  // 5. 반응형 — 뷰포트 폭이 바뀌면 모자이크 재구성 (디바운스)
  let resizeTimer = null;
  let lastCols = getMosaicCols();
  window.addEventListener('resize', () => {
    const currentCols = getMosaicCols();
    if (currentCols === lastCols) return; // 열 수가 안 바뀌면 재빌드 X
    lastCols = currentCols;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildMosaic, 200);
  });

})();
