# MAMMA MIA — Vancouver Marketing Agency Website

A premium, interactive static website for **MAMMA MIA**, a Vancouver-based marketing agency specializing in Social Media Marketing, Branding, Video Production, and Photo Production.

---

## 🌐 Live Pages

| Page | File | Description |
|------|------|-------------|
| About Us (Home) | `index.html` | Landing page with hero, services, process, stats |
| Price Plan | `price-plan.html` | Transparent pricing for all 4 service categories |
| Portfolio | `portfolio.html` | Filterable project grid with lightbox modal |
| Contact Us | `contact.html` | Contact form, map, FAQ accordion |

---

## 🕐 Version History
| Draft | Key Changes |
|-------|-------------|
| v11 (Current) | CTA 버튼 문구 통일 (Book a Call), Price Plan 히어로 INVESTMENT IN GROWTH 부각, Contact 비전 섹션 + 랜덤 포트폴리오 모자이크, 전 페이지 footer 2026 |
| v10 | Hero 슬라이드쇼 5장, 3초 간격 크로스페이드 |
| v9 | Hero SEE OUR WORK 버튼 제거 |
| v7 | Sticky Services 슬라이드 0.5s → 1s 전환 |
| v5 | Price Plan NaN 수정, Recent Work 화살표 네비, Services 이미지 멀티슬라이드 |

---

## ✅ Completed Features

### Global
- Custom animated cursor (desktop only)
- Page load animation with logo reveal
- Fixed navigation with scroll-triggered background
- Mobile hamburger menu with full-screen overlay
- Scroll progress bar
- Scroll-reveal animation on all content sections
- Sticky navigation with dark/light mode per page
- Shared footer with brand name, links, contact info

### About Us (index.html)
- Full-screen hero with animated headline, parallax on scroll
- Running marquee strip with service names
- 4 service cards with hover tilt + dark mode toggle
- Animated counter stats (120+ projects, 85% retention, etc.)
- 4-column process steps with hover interaction
- CTA band linking to contact page

### Price Plan (price-plan.html)
- Sticky tab navigation (Social / Branding / Video / Photo)
- Social Media Marketing: 4 pricing tiers (Basic, Standard, Premium, Start-Up)
- Branding: price + feature list with hover animation
- Video Production: 3 tiers (Short Form, Full Production, Event Coverage)
- Photo Production: 4 tiers (Wedding, Starter, Product, AI Model)
- Bespoke CTA section
- Auto-highlight active tab on scroll

### Portfolio (portfolio.html)
- 24 sample projects across 4 categories
- Filter buttons: ALL / Social Media Marketing / Branding / Video Production / Photo Production
- Staggered animation on filter change
- Project count updates dynamically
- Card hover: scale image + reveal overlay + project title
- Click → Lightbox modal with project details
- Responsive masonry-style grid (wide and tall cards)

### Contact Us (contact.html)
- Split-layout hero with contact info cards
- Full form: service selector, name, email, company, budget radio buttons, message
- Client-side form validation with real-time error handling
- Loading spinner → success message on submit
- Google Maps embed (Burnaby, BC)
- Office hours & response time info
- FAQ accordion (5 questions, smooth expand/collapse)

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary Font | Bebas Neue (Display) |
| Body Font | Inter (Sans-serif) |
| Background | `#f5f5f2` (warm off-white) |
| Black | `#0a0a0a` |
| Accent | `#2a3bff` (electric blue) |
| Navy | `#0d1b4b` |

**Design Reference:** takt.com — editorial, monochrome-first, oversized typography, generous whitespace, strong grid discipline.

---

## 📁 File Structure

```
mammamia/
├── index.html              # About Us / Landing
├── price-plan.html         # Pricing Page
├── portfolio.html          # Portfolio Page
├── contact.html            # Contact Page
│
├── css/
│   ├── style.css           # Global styles, design system, nav, footer
│   ├── index.css           # About Us / Hero specific styles
│   ├── pricing.css         # Pricing page styles
│   ├── portfolio.css       # Portfolio grid and card styles
│   └── contact.css         # Contact form and FAQ styles
│
└── js/
    ├── main.js             # Shared JS: cursor, loader, nav, reveal, counters
    ├── index.js            # About page: hero parallax, card tilt, marquee
    ├── pricing.js          # Pricing: tab nav, scroll-sync, hover effects
    ├── portfolio.js        # Portfolio: filter, lightbox modal, card tilt
    └── contact.js          # Contact: form validation, FAQ accordion
```

---

## 🚀 Publishing to a `.com` Domain (~$10–20/year)

### Recommended Setup: GitHub Pages (Free Hosting) + Namecheap/Cloudflare (.com domain ~$10–15/year)

---

### Step 1 — Register a Domain (~$10–15/year)

**Option A: Cloudflare Registrar** *(Best value — at-cost pricing, ~$9.77/year for .com)*
1. Go to [cloudflare.com/products/registrar](https://www.cloudflare.com/products/registrar/)
2. Create a free Cloudflare account
3. Search for `mammamia.com` (or `mammamia-agency.com` etc.)
4. Purchase — includes free WHOIS privacy, free SSL, free CDN

**Option B: Namecheap** *(~$10–16/year for .com)*
1. Go to [namecheap.com](https://www.namecheap.com)
2. Search and purchase your `.com` domain
3. Includes free WhoisGuard privacy

---

### Step 2 — Deploy to GitHub Pages (Free Hosting)

1. **Create a GitHub account** at [github.com](https://github.com) (free)

2. **Create a new public repository** named `mammamia-website` (or any name)

3. **Upload all files** (drag & drop in browser, or use Git CLI):
   ```bash
   git init
   git add .
   git commit -m "Initial MAMMA MIA website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/mammamia-website.git
   git push -u origin main
   ```

4. **Enable GitHub Pages:**
   - Go to your repository → **Settings** → **Pages**
   - Source: `Deploy from a branch` → Branch: `main` → Folder: `/ (root)`
   - Click **Save**
   - Your site will be live at: `https://YOUR_USERNAME.github.io/mammamia-website/`

---

### Step 3 — Connect Your Custom Domain

#### If using **Cloudflare Registrar + Cloudflare DNS** (Recommended):

1. In Cloudflare Dashboard → **DNS** → Add records:
   | Type | Name | Content |
   |------|------|---------|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `YOUR_USERNAME.github.io` |

2. In GitHub repo → **Settings → Pages → Custom domain**: enter `mammamia.com`

3. Check **Enforce HTTPS** ✅

4. Add a file named `CNAME` (no extension) in the root of your repo with content:
   ```
   mammamia.com
   ```

#### If using **Namecheap + External DNS:**
1. In Namecheap → **Domain List** → **Manage** → **Advanced DNS**
2. Add the same A records above (pointing to GitHub Pages IPs)
3. Add CNAME for `www` → `YOUR_USERNAME.github.io`
4. Follow GitHub Pages custom domain setup (same as above)

> ⏳ DNS propagation takes 24–48 hours. Use [dnschecker.org](https://dnschecker.org) to verify.

---

### Alternative: Deploy to Netlify (Even Easier)

1. Go to [netlify.com](https://www.netlify.com) → **Sign up free**
2. Drag & drop your project folder onto the Netlify dashboard
3. Netlify gives you a free URL like `mammamia.netlify.app`
4. Go to **Domain settings** → Add custom domain → follow DNS instructions
5. Netlify auto-provisions HTTPS via Let's Encrypt

**Total cost: ~$10–15/year** (just the domain — hosting is free on both GitHub Pages and Netlify)

---

## 📧 Connecting the Contact Form

The contact form currently simulates submission (static site). To make it functional:

### Option A: Netlify Forms (Free — if hosted on Netlify)
Add `netlify` attribute to your `<form>` tag:
```html
<form name="contact" method="POST" data-netlify="true" id="contactForm">
  <input type="hidden" name="form-name" value="contact" />
  <!-- rest of form fields -->
</form>
```

### Option B: Formspree (Free up to 50 submissions/month)
1. Go to [formspree.io](https://formspree.io) → Create account
2. Create a new form → Get your endpoint (e.g. `https://formspree.io/f/xabc1234`)
3. In `js/contact.js`, replace the simulated submit with:
```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  })
});
```

---

## 📊 Agency Information

| Field | Value |
|-------|-------|
| Agency Name | MAMMA MIA |
| Location | 6511 Sussex Ave, Burnaby, BC V5H 0K5 |
| Email | inquiry.mammamia@gmail.com |
| Services | Social Media Marketing, Branding, Video Production, Photo Production |

---

## 🔧 Recommended Next Steps

1. **Add real portfolio images** — Replace gradient placeholders in `portfolio.html` with actual project photos
2. **Connect contact form** — Integrate Formspree or Netlify Forms for real email delivery
3. **Add Google Analytics** — Track visitors: insert GA4 script before `</head>`
4. **SEO optimization** — Add Open Graph meta tags, sitemap.xml, robots.txt
5. **Add Instagram feed** — Embed live Instagram posts on About Us page via third-party widget
6. **Cookie banner** — Add GDPR/CASL consent banner if collecting user data
7. **Favicon** — Add `favicon.ico` using the MAMMA MIA logo

---

*Built with HTML5, CSS3, and vanilla JavaScript. No frameworks required.*
