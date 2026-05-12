# Mise en Place Golf — Design & Build Specification
### "Modern Heritage" E-Commerce & Lifestyle Site
**Version 1.0 | For Cursor / Next.js Build**

---

## 0. Brand Philosophy

> *"Mise en Place" — French culinary term meaning "everything in its place."*
> Applied to golf: the ritual of preparation, the discipline of craft, the quiet confidence of someone who belongs on the course.

This site should feel like picking up a 1973 *Golf Digest* at a Nantucket inn — analog warmth, editorial authority, unhurried pace. Nothing shouts. Everything suggests.

**Three Brand Pillars:**
1. **The Film** — 35mm warmth, grain, crushed blacks. Photography that feels discovered, not produced.
2. **The Prep** — Asymmetric magazine grid. Text as texture. White (cream) space as luxury.
3. **The Quiet** — Restraint is the loudest statement. No gradients, no drop shadows, no noise.

---npm 

## 1. Color System

### Primary Palette

```css
:root {
  /* ── Backgrounds ── */
  --color-cream:        #F9F7F2;   /* Page background — warm off-white */
  --color-cream-deep:   #F0EDE4;   /* Card backgrounds, subtle section breaks */
  --color-cream-border: #E2DDD4;   /* 1px dividers, input borders */

  /* ── Primary Accent ── */
  --color-forest:       #1B3022;   /* Primary green — deep, muted, mossy */
  --color-forest-mid:   #2C4A35;   /* Hover states, secondary buttons */
  --color-forest-light: #3D6147;   /* Subtle accents, icons */

  /* ── Typography ── */
  --color-charcoal:     #2D2D2D;   /* All body text — never pure black */
  --color-charcoal-mid: #5A5A5A;   /* Captions, meta labels, secondary text */
  --color-charcoal-light:#8A8A8A;  /* Placeholders, disabled states */

  /* ── Accent Tones ── */
  --color-brass:        #B8975A;   /* Sparingly — price points, star ratings, CTAs */
  --color-ivory:        #FAF8F3;   /* Hero overlays, modal backgrounds */

  /* ── Film / Grain Overlay ── */
  --color-grain-overlay: rgba(249, 247, 242, 0.04); /* For CSS grain texture */
}
```

### Color Usage Rules
- **Never** use `#000000` (pure black) or `#FFFFFF` (pure white) anywhere
- Forest green appears **only** as accent — never as a background fill for full sections
- Brass (`#B8975A`) is the "gold star" — reserve for price, selected states, one CTA per page
- All section backgrounds alternate between `--color-cream` and `--color-cream-deep` only

---

## 2. Typography System

### Font Stack

```css
/* Import in layout.tsx or globals.css */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

:root {
  /* ── Serif Display — Cormorant Garamond ── */
  --font-serif:         'Cormorant Garamond', 'Adobe Caslon Pro', Georgia, serif;

  /* ── Sans-Serif Body — Montserrat ── */
  --font-sans:          'Montserrat', 'Futura PT', Helvetica, sans-serif;

  /* ── Type Scale ── */
  --text-hero:          clamp(3.5rem, 8vw, 7rem);      /* Hero headline */
  --text-display:       clamp(2.5rem, 5vw, 4.5rem);    /* Section headers */
  --text-headline:      clamp(1.75rem, 3vw, 2.5rem);   /* Card titles, subheads */
  --text-subhead:       clamp(1.125rem, 2vw, 1.375rem);/* Pull quotes, labels */
  --text-body:          1rem;                            /* 16px base */
  --text-caption:       0.75rem;                         /* 12px */
  --text-label:         0.6875rem;                       /* 11px — all-caps labels */

  /* ── Line Heights ── */
  --leading-tight:      1.1;
  --leading-display:    1.15;
  --leading-body:       1.7;
  --leading-loose:      2;

  /* ── Letter Spacing ── */
  --tracking-tight:     -0.02em;   /* Hero/display serif */
  --tracking-normal:    0;
  --tracking-wide:      0.08em;    /* All-caps sans labels */
  --tracking-widest:    0.18em;    /* NAV items, category tags */
}
```

### Typography Rules
```css
/* ── Headings: Serif, Light Weight, Tight Tracking ── */
h1, h2, h3 {
  font-family: var(--font-serif);
  font-weight: 300;
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-display);
  color: var(--color-charcoal);
}

/* ── Body: Sans, Light, Generous Leading ── */
p, li, td {
  font-family: var(--font-sans);
  font-weight: 300;
  font-size: var(--text-body);
  line-height: var(--leading-body);
  color: var(--color-charcoal);
}

/* ── Labels: Sans, All-Caps, Widest Tracking ── */
.label, .nav-item, .category-tag {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: var(--text-label);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
}

/* ── Pull Quotes / Italic Serif ── */
.pull-quote, blockquote {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 300;
  font-size: var(--text-subhead);
  line-height: var(--leading-loose);
}
```

---

## 3. Layout Architecture

### Spacing Scale (8px grid)
```css
:root {
  --space-1:   0.25rem;  /* 4px  */
  --space-2:   0.5rem;   /* 8px  */
  --space-3:   0.75rem;  /* 12px */
  --space-4:   1rem;     /* 16px */
  --space-6:   1.5rem;   /* 24px */
  --space-8:   2rem;     /* 32px */
  --space-12:  3rem;     /* 48px */
  --space-16:  4rem;     /* 64px */
  --space-20:  5rem;     /* 80px */
  --space-24:  6rem;     /* 96px */
  --space-32:  8rem;     /* 128px */
  --space-40:  10rem;    /* 160px */

  /* ── Container Widths ── */
  --container-max:      1440px;
  --container-wide:     1280px;
  --container-default:  1140px;
  --container-narrow:   720px;
  --container-text:     580px;

  /* ── Grid ── */
  --grid-gutter:        clamp(1rem, 2.5vw, 2rem);
  --grid-cols:          12;
}
```

### Section Breathing Room
Every section gets **minimum** `--space-24` top and bottom padding on desktop, `--space-16` on mobile. Never compress sections — cream space is the luxury signal.

---

## 4. Global CSS Foundation

```css
/* ── globals.css ── */

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: var(--color-cream);
  color: var(--color-charcoal);
  font-family: var(--font-sans);
  font-weight: 300;
  line-height: var(--leading-body);
  min-height: 100vh;
  overflow-x: hidden;
}

/* ── Film Grain Texture (CSS-only, no image needed) ── */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 128px;
}

/* ── 1px Dividers ── */
.divider {
  width: 100%;
  height: 1px;
  background-color: var(--color-cream-border);
  border: none;
}

.divider--forest {
  background-color: var(--color-forest);
  width: 48px;
  margin: var(--space-6) 0;
}

/* ── Section Wrapper ── */
.section {
  width: 100%;
  padding-block: var(--space-24);
}

.section--alt {
  background-color: var(--color-cream-deep);
}

/* ── Container ── */
.container {
  width: min(var(--container-default), 100% - var(--space-8));
  margin-inline: auto;
}

.container--wide {
  width: min(var(--container-wide), 100% - var(--space-8));
  margin-inline: auto;
}

.container--narrow {
  width: min(var(--container-narrow), 100% - var(--space-8));
  margin-inline: auto;
}

/* ── Selection ── */
::selection {
  background-color: var(--color-forest);
  color: var(--color-cream);
}

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--color-cream); }
::-webkit-scrollbar-thumb { background: var(--color-cream-border); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--color-charcoal-light); }
```

---

## 5. Component Library

### 5.1 Navigation

```css
/* ── nav.css ── */

.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: var(--space-6) var(--space-8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.4s ease, backdrop-filter 0.4s ease;
}

.nav--scrolled {
  background-color: rgba(249, 247, 242, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-cream-border);
}

.nav__logo {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-charcoal);
  text-decoration: none;
}

/* Logo lockup: "MISE EN PLACE" above "GOLF" with thin divider */
.nav__logo-lockup {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-align: center;
}

.nav__logo-top {
  font-size: var(--text-label);
  letter-spacing: var(--tracking-widest);
  font-family: var(--font-sans);
  font-weight: 500;
}

.nav__logo-bottom {
  font-family: var(--font-serif);
  font-size: 1.375rem;
  font-style: italic;
  font-weight: 300;
  letter-spacing: 0.05em;
}

/* ── Center Nav Links (Desktop) ── */
.nav__links {
  display: flex;
  gap: var(--space-8);
  list-style: none;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.nav__link {
  font-family: var(--font-sans);
  font-size: var(--text-label);
  font-weight: 500;
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-charcoal);
  text-decoration: none;
  position: relative;
  padding-bottom: 2px;
}

.nav__link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--color-forest);
  transition: width 0.3s ease;
}

.nav__link:hover::after {
  width: 100%;
}

/* ── Hamburger (Mobile) ── */
.nav__hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  background: none;
  border: none;
  padding: var(--space-2);
}

.nav__hamburger span {
  display: block;
  width: 24px;
  height: 1px;
  background-color: var(--color-charcoal);
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .nav__links { display: none; }
  .nav__hamburger { display: flex; }
}
```

**React Component Structure:**
```tsx
// components/Nav.tsx
<nav className="nav">
  <button className="nav__cart">Bag (0)</button>
  <div className="nav__logo-lockup">
    <span className="nav__logo-top">Mise en Place</span>
    <hr className="divider" style={{width:'40px', margin:'2px auto'}} />
    <span className="nav__logo-bottom">Golf</span>
  </div>
  <button className="nav__hamburger" aria-label="Menu">
    <span/><span/><span/>
  </button>
</nav>
```

---

### 5.2 Buttons

```css
/* ── buttons.css ── */

/* Ghost Button — Primary */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-8);
  font-family: var(--font-sans);
  font-size: var(--text-label);
  font-weight: 500;
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
}

/* Ghost / Outline */
.btn--ghost {
  background: transparent;
  border: 1px solid var(--color-charcoal);
  color: var(--color-charcoal);
}

.btn--ghost:hover {
  background-color: var(--color-charcoal);
  color: var(--color-cream);
}

/* Ghost Forest */
.btn--ghost-forest {
  background: transparent;
  border: 1px solid var(--color-forest);
  color: var(--color-forest);
}

.btn--ghost-forest:hover {
  background-color: var(--color-forest);
  color: var(--color-cream);
}

/* Solid Forest */
.btn--solid {
  background-color: var(--color-forest);
  border: 1px solid var(--color-forest);
  color: var(--color-cream);
}

.btn--solid:hover {
  background-color: var(--color-forest-mid);
  border-color: var(--color-forest-mid);
}

/* Text Button / Link */
.btn--text {
  background: transparent;
  border: none;
  color: var(--color-charcoal);
  padding-inline: 0;
  border-bottom: 1px solid transparent;
}

.btn--text:hover {
  border-bottom-color: var(--color-charcoal);
}

/* Sizes */
.btn--sm { padding: var(--space-2) var(--space-6); }
.btn--lg { padding: var(--space-4) var(--space-12); font-size: 0.75rem; }
```

---

### 5.3 Product Cards

```css
/* ── product-card.css ── */

.product-card {
  display: flex;
  flex-direction: column;
  background: transparent;
  position: relative;
  cursor: pointer;
}

/* Image Container — Fixed Aspect Ratio */
.product-card__image-wrap {
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background-color: var(--color-cream-deep);
  position: relative;
}

.product-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  filter: contrast(1.02) saturate(0.9); /* Film-look */
}

.product-card:hover .product-card__image {
  transform: scale(1.04);
}

/* Quick Add — appears on hover */
.product-card__quick-add {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-4);
  background: rgba(249, 247, 242, 0.9);
  backdrop-filter: blur(4px);
  border-top: 1px solid var(--color-cream-border);
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.product-card:hover .product-card__quick-add {
  transform: translateY(0);
}

/* Card Body */
.product-card__body {
  padding: var(--space-4) 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.product-card__category {
  font-family: var(--font-sans);
  font-size: var(--text-label);
  font-weight: 500;
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-charcoal-mid);
}

.product-card__name {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: var(--tracking-tight);
  color: var(--color-charcoal);
  line-height: 1.3;
}

.product-card__price {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--color-brass);
  letter-spacing: 0.03em;
  margin-top: var(--space-1);
}

/* Badge */
.product-card__badge {
  position: absolute;
  top: var(--space-3);
  left: var(--space-3);
  font-family: var(--font-sans);
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  padding: var(--space-1) var(--space-3);
  background-color: var(--color-forest);
  color: var(--color-cream);
}
```

**Product Grid Layout:**
```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--grid-gutter);
  row-gap: calc(var(--grid-gutter) * 2);
}

@media (max-width: 1024px) {
  .product-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 768px) {
  .product-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .product-grid { grid-template-columns: 1fr; }
}

/* ── Featured / Asymmetric Grid (Magazine Style) ── */
.product-grid--editorial {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: var(--grid-gutter);
}

.product-grid--editorial .product-card:first-child {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}

.product-grid--editorial .product-card:first-child .product-card__image-wrap {
  aspect-ratio: unset;
  height: 100%;
  min-height: 600px;
}
```

---

### 5.4 Hero Section

```css
/* ── hero.css ── */

.hero {
  position: relative;
  height: 100svh;
  min-height: 640px;
  display: grid;
  place-items: center;
  overflow: hidden;
}

/* Full-Bleed Background Image */
.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Film look: crush blacks, warm highlights, desaturate slightly */
  filter: contrast(1.08) saturate(0.75) brightness(0.88);
}

/* Multi-layer Overlay: warm cream vignette + film grain */
.hero__overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    radial-gradient(ellipse at center, transparent 30%, rgba(27,48,34,0.35) 100%),
    linear-gradient(to bottom, transparent 40%, rgba(27,48,34,0.2) 100%);
}

/* CSS Film Grain on Hero Specifically */
.hero__grain {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  opacity: 0.08;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 180px;
  animation: grain-shift 0.5s steps(2) infinite;
}

@keyframes grain-shift {
  0%, 100% { transform: translate(0, 0); }
  25%       { transform: translate(-1%, 1%); }
  50%       { transform: translate(1%, -1%); }
  75%       { transform: translate(-0.5%, 0.5%); }
}

/* Hero Content */
.hero__content {
  position: relative;
  z-index: 3;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
  padding: var(--space-8);
  max-width: 900px;
}

.hero__eyebrow {
  font-family: var(--font-sans);
  font-size: var(--text-label);
  font-weight: 500;
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: rgba(249, 247, 242, 0.7);
}

.hero__headline {
  font-family: var(--font-serif);
  font-size: var(--text-hero);
  font-weight: 300;
  font-style: italic;
  letter-spacing: -0.03em;
  line-height: 1.0;
  color: var(--color-cream);
}

.hero__subline {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 400;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: rgba(249, 247, 242, 0.65);
  max-width: 360px;
  line-height: var(--leading-loose);
}

/* Scroll Indicator */
.hero__scroll {
  position: absolute;
  bottom: var(--space-8);
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.hero__scroll-line {
  width: 1px;
  height: 48px;
  background: rgba(249, 247, 242, 0.5);
  animation: scroll-pulse 2s ease-in-out infinite;
}

@keyframes scroll-pulse {
  0%, 100% { transform: scaleY(1); opacity: 0.5; }
  50%       { transform: scaleY(0.6); opacity: 1; }
}
```

---

### 5.5 Journal / Editorial Section

```css
/* ── journal.css ── */

.journal {
  padding-block: var(--space-32);
}

.journal__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: var(--space-16);
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--color-cream-border);
}

.journal__title {
  font-family: var(--font-serif);
  font-size: var(--text-display);
  font-weight: 300;
  font-style: italic;
  letter-spacing: var(--tracking-tight);
}

/* ── Magazine Asymmetric Grid ── */
.journal__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: var(--grid-gutter);
}

/* Feature Article — Left, Full Height */
.journal-card--feature {
  grid-column: 1;
  grid-row: 1 / 3;
}

.journal-card--feature .journal-card__image-wrap {
  aspect-ratio: unset;
  height: 680px;
}

/* Right Column — Two Stacked Articles */
.journal-card--secondary {
  grid-column: 2;
}

.journal-card__image-wrap {
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background-color: var(--color-cream-deep);
}

.journal-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  /* Film preset: warm, slightly faded */
  filter: contrast(1.04) saturate(0.8) sepia(0.08);
}

.journal-card:hover .journal-card__image {
  transform: scale(1.03);
}

.journal-card__body {
  padding: var(--space-6) 0 var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  border-bottom: 1px solid var(--color-cream-border);
}

.journal-card__meta {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  font-family: var(--font-sans);
  font-size: var(--text-label);
  font-weight: 500;
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-charcoal-mid);
}

.journal-card__meta-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: var(--color-charcoal-light);
}

.journal-card__title {
  font-family: var(--font-serif);
  font-size: clamp(1.375rem, 2.5vw, 2rem);
  font-weight: 300;
  line-height: 1.2;
  letter-spacing: var(--tracking-tight);
}

.journal-card__excerpt {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 300;
  line-height: var(--leading-body);
  color: var(--color-charcoal-mid);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ── Pull Quote Block ── */
.pull-quote-block {
  padding: var(--space-12) var(--space-16);
  border-left: 1px solid var(--color-forest);
  margin: var(--space-16) 0;
}

.pull-quote-block blockquote {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 300;
  line-height: 1.35;
  color: var(--color-charcoal);
}

.pull-quote-block cite {
  display: block;
  margin-top: var(--space-4);
  font-family: var(--font-sans);
  font-style: normal;
  font-size: var(--text-label);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-charcoal-mid);
}
```

---

### 5.6 Product Detail Page

```css
/* ── product-detail.css ── */

.pdp {
  padding-top: calc(80px + var(--space-16)); /* nav height + breathing */
  padding-bottom: var(--space-32);
}

.pdp__layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-20);
  align-items: start;
}

/* Image Gallery */
.pdp__gallery {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: var(--space-3);
  position: sticky;
  top: calc(80px + var(--space-8));
}

.pdp__thumbs {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.pdp__thumb {
  aspect-ratio: 1;
  overflow: hidden;
  cursor: pointer;
  opacity: 0.55;
  transition: opacity 0.2s;
  background-color: var(--color-cream-deep);
}

.pdp__thumb.active,
.pdp__thumb:hover { opacity: 1; }

.pdp__main-image {
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background-color: var(--color-cream-deep);
}

.pdp__main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.03) saturate(0.88);
}

/* Product Info */
.pdp__info {
  padding-top: var(--space-4);
}

.pdp__breadcrumb {
  font-family: var(--font-sans);
  font-size: var(--text-label);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-charcoal-mid);
  margin-bottom: var(--space-6);
}

.pdp__name {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: var(--tracking-tight);
  margin-bottom: var(--space-3);
}

.pdp__price {
  font-family: var(--font-sans);
  font-size: 1.125rem;
  font-weight: 400;
  color: var(--color-brass);
  letter-spacing: 0.02em;
  margin-bottom: var(--space-8);
}

/* Size Selector */
.pdp__size-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-2);
  margin-bottom: var(--space-8);
}

.pdp__size-btn {
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  border: 1px solid var(--color-cream-border);
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.pdp__size-btn:hover,
.pdp__size-btn.selected {
  border-color: var(--color-forest);
  background-color: var(--color-forest);
  color: var(--color-cream);
}

.pdp__size-btn.unavailable {
  opacity: 0.3;
  cursor: not-allowed;
  text-decoration: line-through;
}

/* Material Details Accordion */
.pdp__accordion {
  border-top: 1px solid var(--color-cream-border);
  margin-top: var(--space-8);
}

.pdp__accordion-item {
  border-bottom: 1px solid var(--color-cream-border);
}

.pdp__accordion-trigger {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) 0;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: var(--text-label);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-charcoal);
}
```

---

### 5.7 Form Elements

```css
/* ── forms.css ── */

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-label {
  font-family: var(--font-sans);
  font-size: var(--text-label);
  font-weight: 500;
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-charcoal-mid);
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background-color: transparent;
  border: 1px solid var(--color-cream-border);
  border-radius: 0; /* No radius — angular = luxury */
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 300;
  color: var(--color-charcoal);
  outline: none;
  transition: border-color 0.2s;
  appearance: none;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: var(--color-forest);
}

.form-input::placeholder {
  color: var(--color-charcoal-light);
  font-style: italic;
}

/* Newsletter Bar */
.newsletter {
  padding-block: var(--space-20);
  background-color: var(--color-forest);
  text-align: center;
}

.newsletter__eyebrow {
  font-family: var(--font-sans);
  font-size: var(--text-label);
  font-weight: 500;
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: rgba(249, 247, 242, 0.6);
  margin-bottom: var(--space-4);
}

.newsletter__headline {
  font-family: var(--font-serif);
  font-size: var(--text-display);
  font-weight: 300;
  font-style: italic;
  color: var(--color-cream);
  margin-bottom: var(--space-8);
  letter-spacing: var(--tracking-tight);
}

.newsletter__form {
  display: flex;
  gap: 0;
  max-width: 480px;
  margin-inline: auto;
}

.newsletter__input {
  flex: 1;
  padding: var(--space-4) var(--space-6);
  background: transparent;
  border: 1px solid rgba(249, 247, 242, 0.4);
  border-right: none;
  color: var(--color-cream);
  font-family: var(--font-sans);
  font-size: 0.875rem;
  outline: none;
}

.newsletter__input::placeholder {
  color: rgba(249, 247, 242, 0.4);
  font-style: italic;
}

.newsletter__submit {
  padding: var(--space-4) var(--space-8);
  background: var(--color-cream);
  border: 1px solid var(--color-cream);
  color: var(--color-forest);
  font-family: var(--font-sans);
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.25s;
}

.newsletter__submit:hover {
  background: transparent;
  color: var(--color-cream);
}
```

---

### 5.8 Footer

```css
/* ── footer.css ── */

.footer {
  background-color: var(--color-charcoal);
  color: var(--color-cream);
  padding-block: var(--space-20);
}

.footer__top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: var(--space-12);
  padding-bottom: var(--space-16);
  border-bottom: 1px solid rgba(249, 247, 242, 0.1);
}

.footer__brand-name {
  font-family: var(--font-serif);
  font-size: 1.75rem;
  font-weight: 300;
  font-style: italic;
  letter-spacing: var(--tracking-tight);
  color: var(--color-cream);
  margin-bottom: var(--space-4);
}

.footer__tagline {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 300;
  line-height: var(--leading-body);
  color: rgba(249, 247, 242, 0.5);
  max-width: 260px;
}

.footer__col-title {
  font-family: var(--font-sans);
  font-size: var(--text-label);
  font-weight: 500;
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: rgba(249, 247, 242, 0.4);
  margin-bottom: var(--space-6);
}

.footer__links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer__link {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 300;
  color: rgba(249, 247, 242, 0.65);
  text-decoration: none;
  transition: color 0.2s;
}

.footer__link:hover { color: var(--color-cream); }

.footer__bottom {
  padding-top: var(--space-8);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer__legal {
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  color: rgba(249, 247, 242, 0.3);
}
```

---

## 6. Page Layouts

### 6.1 Homepage Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│  NAV: [Cart]     MISE EN PLACE / GOLF     [☰ Menu]              │
│       ← logo centered, cart+hamburger flanking                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ██████████████████████████████████████████████████████████    │
│  █                                                        █    │
│  █     [35mm film-style landscape — golden hour golf]     █    │
│  █                                                        █    │
│  █           Everything in its place.                     █    │
│  █           [italic serif, large, centered]              █    │
│  █                                                        █    │
│  █     SS 2025 Collection                                 █    │
│  █     [all-caps sans, ghost button]                      █    │
│  █                                                        █    │
│  █                      │ [scroll line]                   █    │
│  ██████████████████████████████████████████████████████████    │
│                      [100vh hero]                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [thin 1px border divider]                                      │
│                                                                 │
│  SECTION: "New Arrivals"                                        │
│  label top-left ——————————————— [View All Collection →] right  │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │          │  │          │  │          │  │          │       │
│  │  3:4 img │  │  3:4 img │  │  3:4 img │  │  3:4 img │       │
│  │          │  │          │  │          │  │          │       │
│  │          │  │          │  │          │  │          │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│  Category      Category      Category      Category            │
│  Product Name  Product Name  Product Name  Product Name        │
│  $185          $220          $165          $195                 │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SECTION ALT BG (cream-deep):                                   │
│  EDITORIAL SPLIT — Full-bleed image left / text right          │
│                                                                 │
│  ┌──────────────────────┐  │  The Round.                       │
│  │                      │  │  [large italic serif]             │
│  │   Full-bleed 35mm    │  │                                   │
│  │   film photography   │  │  A collection built around the    │
│  │   — wide landscape   │  │  morning tee time. The ritual     │
│  │                      │  │  of the game. [body text]         │
│  │                      │  │                                   │
│  │                      │  │  [Ghost Button: Shop The Look]    │
│  └──────────────────────┘  │                                   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SECTION: "The Journal" — Asymmetric Magazine Grid             │
│                                                                 │
│  ┌──────────────────────┐  ┌─────────────┐                     │
│  │                      │  │             │                     │
│  │   FEATURE ARTICLE    │  │  Secondary  │                     │
│  │   full height image  │  │  Article 1  │                     │
│  │   (left, tall)       │  │             │                     │
│  │                      │  ├─────────────┤                     │
│  │   On Heritage,       │  │             │                     │
│  │   Craft & Links      │  │  Secondary  │                     │
│  │   [serif title]      │  │  Article 2  │                     │
│  │   Apr 2025 / Read→  │  │             │                     │
│  └──────────────────────┘  └─────────────┘                     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SECTION: Lookbook Strip — Full-width horizontal scroll        │
│  [oversized film photos, continuous horizontal scroll]          │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SECTION: Newsletter — Forest Green BG                         │
│                                                                 │
│        The Caddie Bag                                           │
│    [italic serif large]                                         │
│    Field notes, lookbooks & early access.                       │
│    [ email input ————————————————— ] [ Subscribe ]             │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  FOOTER — Charcoal BG                                           │
│  Mise en Place Golf [italic] | Shop | Journal | About | Legal  │
│  © 2025 Mise en Place Golf                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7. Next.js Project Structure

```
mise-en-place-golf/
├── app/
│   ├── layout.tsx              # Root layout, fonts, global meta
│   ├── page.tsx                # Homepage
│   ├── shop/
│   │   ├── page.tsx            # Collection grid
│   │   └── [slug]/page.tsx     # Product detail
│   ├── journal/
│   │   ├── page.tsx            # Journal index
│   │   └── [slug]/page.tsx     # Article
│   ├── about/page.tsx
│   └── cart/page.tsx
├── components/
│   ├── layout/
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Divider.tsx
│   │   └── Badge.tsx
│   ├── homepage/
│   │   ├── Hero.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── EditorialSplit.tsx
│   │   ├── JournalGrid.tsx
│   │   ├── LookbookStrip.tsx
│   │   └── Newsletter.tsx
│   ├── shop/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── Filters.tsx
│   └── journal/
│       ├── JournalCard.tsx
│       └── PullQuote.tsx
├── styles/
│   ├── globals.css             # Variables, resets, base
│   ├── nav.css
│   ├── hero.css
│   ├── product-card.css
│   ├── journal.css
│   ├── buttons.css
│   ├── forms.css
│   └── footer.css
├── lib/
│   ├── shopify.ts              # Storefront API
│   └── sanity.ts               # CMS (Journal)
├── public/
│   └── images/
│       └── placeholder/        # Film-style placeholder images
└── tailwind.config.ts
```

---

## 8. Tailwind Config Extension

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{tsx,ts}', './components/**/*.{tsx,ts}'],
  theme: {
    extend: {
      colors: {
        cream:         '#F9F7F2',
        'cream-deep':  '#F0EDE4',
        'cream-border':'#E2DDD4',
        forest:        '#1B3022',
        'forest-mid':  '#2C4A35',
        'forest-light':'#3D6147',
        charcoal:      '#2D2D2D',
        'charcoal-mid':'#5A5A5A',
        'charcoal-lt': '#8A8A8A',
        brass:         '#B8975A',
        ivory:         '#FAF8F3',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['Montserrat', 'Helvetica', 'sans-serif'],
      },
      fontSize: {
        'hero':    ['clamp(3.5rem,8vw,7rem)', { lineHeight: '1.0' }],
        'display': ['clamp(2.5rem,5vw,4.5rem)', { lineHeight: '1.15' }],
        'label':   ['0.6875rem', { letterSpacing: '0.18em' }],
      },
      letterSpacing: {
        widest: '0.18em',
        wide:   '0.08em',
        tight:  '-0.02em',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '28': '7rem',
        '36': '9rem',
      },
      maxWidth: {
        'container':       '1140px',
        'container-wide':  '1280px',
        'container-narrow':'720px',
        'text':            '580px',
      },
      animation: {
        'grain-shift': 'grain-shift 0.5s steps(2) infinite',
        'scroll-pulse': 'scroll-pulse 2s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
      },
      keyframes: {
        'grain-shift': {
          '0%, 100%': { transform: 'translate(0,0)' },
          '25%': { transform: 'translate(-1%,1%)' },
          '50%': { transform: 'translate(1%,-1%)' },
          '75%': { transform: 'translate(-0.5%,0.5%)' },
        },
        'scroll-pulse': {
          '0%, 100%': { transform: 'scaleY(1)', opacity: '0.5' },
          '50%': { transform: 'scaleY(0.6)', opacity: '1' },
        },
        'fadeUp': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

---

## 9. Photography & Image Direction

Every image on this site must adhere to the **Film Preset** — apply these CSS filters as a baseline:

```css
/* ── Film Look Baseline ── */
.img-film {
  filter:
    contrast(1.06)    /* Slightly punchy */
    saturate(0.78)    /* Desaturate for that faded film stock feel */
    sepia(0.07)       /* Warm cast — like Kodak Portra 400 */
    brightness(0.94); /* Pull highlights down slightly */
}

/* ── Hero / Full-Bleed ── */
.img-hero {
  filter:
    contrast(1.1)
    saturate(0.72)
    sepia(0.1)
    brightness(0.88)
    hue-rotate(-3deg); /* Slight warm shift */
}
```

**Image Art Direction Briefs for Placeholders:**
- **Hero**: Golden hour, wide fairway, single figure mid-swing. Low angle. Strong leading lines. Warm. Slightly underexposed.
- **Product Cards**: Flat lay on linen or grass. Overhead 45°. No distracting background. Natural light only.
- **Journal Feature**: Reportage style. Candid. Could be: bag on cart, shoes being laced, scorecard + pencil, clubhouse exterior. Black & white acceptable.
- **Lookbook Strip**: Action + portrait mix. Clothing worn on course. Models should look like they belong, not like they're posing.

---

## 10. Animation & Motion Principles

```css
/* ── Scroll-Triggered Fade Up (use with Intersection Observer) ── */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.animate-on-scroll.in-view {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger children */
.animate-stagger > *:nth-child(1) { transition-delay: 0s; }
.animate-stagger > *:nth-child(2) { transition-delay: 0.1s; }
.animate-stagger > *:nth-child(3) { transition-delay: 0.2s; }
.animate-stagger > *:nth-child(4) { transition-delay: 0.3s; }
```

**Motion Rules:**
- All transitions: `ease` or `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — never `linear`
- Image zoom on hover: `0.8s` — intentionally slow, feels luxurious
- Button transitions: `0.25s` — snappy feedback
- Page transitions: `0.4s` fade — never a jump
- No bounce. No spring. No playful easing. This brand is composed.

---

## 11. Tech Stack Recommendations

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js 14+ (App Router) | Edge-fast, good for e-com SEO |
| Styling | CSS Modules + Tailwind | Custom CSS for design-heavy components |
| E-commerce | Shopify Storefront API | Headless, best ecosystem |
| CMS (Journal) | Sanity.io | Flexible, great DX |
| Images | Next/Image + Cloudinary | Film filter processing at CDN level |
| Animations | CSS + Intersection Observer | No GSAP needed for this restraint level |
| Deployment | Vercel | Optimal for Next.js |
| Analytics | Plausible | Privacy-first, fits brand ethos |

---

## 12. Accessibility & Performance Notes

- Minimum contrast: all text on cream backgrounds passes WCAG AA (charcoal on cream = 9.7:1)
- Forest green on cream = 8.2:1 ✓
- All `img` elements require `alt` text written as editorial captions
- `prefers-reduced-motion`: disable grain animation and scroll animations
  ```css
  @media (prefers-reduced-motion: reduce) {
    .hero__grain { animation: none; }
    .animate-on-scroll { transition: none; opacity: 1; transform: none; }
  }
  ```
- All font weights loaded via `font-display: swap`
- Target LCP < 2.5s: hero image must be `priority` in `next/image`
- Grain texture uses inline SVG data URI — zero external requests

---

## 13. Do's & Don'ts

### ✅ Do
- Use cream space aggressively — empty space equals luxury
- Let serif typography be the hero on text-heavy sections
- Keep the 1px border language consistent throughout
- Use film-filtered images everywhere, no exceptions
- Stack italic serif + all-caps sans for visual contrast in headers

### ❌ Don't
- No drop shadows or box shadows (use borders instead)
- No border-radius > 0 (zero radius throughout — angular = premium)
- No gradients (flat color only)
- No pure black or pure white anywhere
- No icons except thin-line (stroke, not fill)
- No more than 2 fonts at any viewport
- No bright green — only `#1B3022` and its tints

---

*End of Specification — Mise en Place Golf v1.0*
*"In the right place, at the right time, with the right preparation."*
