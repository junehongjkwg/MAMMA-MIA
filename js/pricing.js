/* ============================================
   MAMMA MIA — Pricing Page JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ---- Tab Navigation ---- */
  const tabs = document.querySelectorAll('.pricing-tab');
  const sections = {
    branding: document.getElementById('branding'),
    social:   document.getElementById('social'),
    photo:    document.getElementById('photo'),
    video:    document.getElementById('video'),
  };

  // 안전한 nav 높이 계산 (NaN 방지)
  function getNavHeight() {
    const nav = document.getElementById('mainNav');
    return nav ? nav.offsetHeight : 72;
  }
  function getTabsHeight() {
    const tabsEl = document.querySelector('.pricing-tabs');
    return tabsEl ? tabsEl.offsetHeight : 52;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = sections[tab.getAttribute('data-target')];
      if (target) {
        const offset = getNavHeight() + getTabsHeight() + 8;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- Highlight active tab on scroll ---- */
  const sectionIds = ['branding', 'social', 'photo', 'video'];
  const navH = getNavHeight();
  const tabH = getTabsHeight();

  function updateActiveTab() {
    const scrollY = window.scrollY + navH + tabH + 40;
    let current = 'branding';

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) current = id;
    });

    tabs.forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-target') === current);
    });
  }

  window.addEventListener('scroll', updateActiveTab, { passive: true });

  /* ---- Pricing card hover price animation ---- */
  const pricingAmounts = document.querySelectorAll('.pricing-card__amount');
  pricingAmounts.forEach(el => {
    const card = el.closest('.pricing-card');
    card?.addEventListener('mouseenter', () => {
      el.style.transform = 'scale(1.05)';
      el.style.transition = 'transform 0.3s ease';
    });
    card?.addEventListener('mouseleave', () => {
      el.style.transform = 'scale(1)';
    });
  });

  /* ---- Branding list hover number increment effect ---- */
  const brandingListNums = document.querySelectorAll('.branding-list__num');
  brandingListNums.forEach(num => {
    const li = num.closest('li');
    li?.addEventListener('mouseenter', () => {
      num.style.color = 'var(--color-accent)';
      num.style.transform = 'translateX(4px)';
      num.style.transition = 'all 0.2s ease';
    });
    li?.addEventListener('mouseleave', () => {
      num.style.color = '';
      num.style.transform = '';
    });
  });

})();
