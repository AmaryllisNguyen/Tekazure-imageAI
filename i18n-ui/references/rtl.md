# i18n Reference: RTL (Right-to-Left) Support

RTL languages: Arabic (ar), Hebrew (he), Persian/Farsi (fa), Urdu (ur)

---

## Step 1: HTML Foundation

```html
<!-- Always set dir dynamically on the root element -->
<html lang="ar" dir="rtl">

<!-- For mixed content (e.g., Arabic page with English product names) -->
<p dir="rtl">مرحباً <span dir="ltr">iPhone 15 Pro</span> جهاز رائع</p>
```

```js
// Update dynamically on locale change
function applyLocaleToDOM(locale: string) {
  const RTL = new Set(['ar', 'he', 'fa', 'ur'])
  document.documentElement.lang = locale
  document.documentElement.dir = RTL.has(locale) ? 'rtl' : 'ltr'
}
```

---

## Step 2: CSS Logical Properties (Core RTL Rule)

Replace ALL physical directional CSS with logical equivalents.
This is the single most important RTL rule — do it from day one.

```css
/* ❌ PHYSICAL — breaks in RTL */
.card { margin-left: 16px; padding-right: 24px; border-left: 2px solid blue; float: right; }

/* ✅ LOGICAL — auto-adapts to RTL */
.card { margin-inline-start: 16px; padding-inline-end: 24px; border-inline-start: 2px solid blue; float: inline-end; }
```

### Full Mapping Reference

| Physical (❌ avoid) | Logical (✅ use) |
|---|---|
| `margin-left` | `margin-inline-start` |
| `margin-right` | `margin-inline-end` |
| `padding-left` | `padding-inline-start` |
| `padding-right` | `padding-inline-end` |
| `border-left` | `border-inline-start` |
| `border-right` | `border-inline-end` |
| `left: 0` (in positioned) | `inset-inline-start: 0` |
| `right: 0` | `inset-inline-end: 0` |
| `text-align: left` | `text-align: start` |
| `text-align: right` | `text-align: end` |
| `float: left` | `float: inline-start` |
| `float: right` | `float: inline-end` |
| `border-radius` top-left | `border-start-start-radius` |
| `border-radius` top-right | `border-start-end-radius` |

### Flexbox & Grid — Already RTL-Aware

```css
/* Flexbox respects dir attribute automatically */
.nav { display: flex; gap: 16px; }
/* LTR: items flow left-to-right */
/* RTL: items flow right-to-left — no extra code needed */

/* Grid is also direction-aware */
.sidebar-layout {
  display: grid;
  grid-template-columns: 240px 1fr;  /* sidebar always on "start" side */
}
```

---

## Step 3: Icon Mirroring Rules

**DO mirror** (directional meaning changes in RTL):
- Back/Forward arrows → `▶` becomes `◀`
- Pagination arrows
- Progress bars
- Breadcrumb separators (`>` becomes `<`)
- Media play/rewind controls
- Reading direction indicators
- Expand/collapse chevrons on horizontal layouts

**DO NOT mirror** (universal meaning):
- Checkboxes and radio buttons
- Close (×) buttons
- Warning/info icons (⚠ ℹ)
- Heart, star, share icons
- Clock icons
- Upload/download icons

```css
/* CSS approach for conditional mirroring */
[dir="rtl"] .icon-arrow-next {
  transform: scaleX(-1);
}

/* Or use separate icon assets per direction */
```

```tsx
// React approach — explicit RTL icons
function ChevronRight() {
  const { i18n } = useTranslation()
  const isRTL = ['ar', 'he', 'fa'].includes(i18n.language)
  return isRTL ? <ChevronLeftIcon /> : <ChevronRightIcon />
}
```

---

## Step 4: Typography Considerations for RTL Scripts

```css
/* Arabic text often needs slightly larger font size for readability */
[dir="rtl"] body {
  font-size: 1.05em;          /* Arabic glyphs are slightly smaller visually */
  line-height: 1.8;           /* Arabic has diacritics above/below baseline */
  font-family: 'Segoe UI', 'Tahoma', 'Arabic UI', sans-serif;
}

/* Container height must accommodate diacritics */
[dir="rtl"] .button {
  min-height: 44px;           /* prevent Arabic character clipping */
}
```

### Font Recommendations for RTL

| Language | Primary | Fallback |
|---|---|---|
| Arabic | Noto Sans Arabic, Cairo | Segoe UI, Tahoma |
| Hebrew | Noto Sans Hebrew, Rubik | Arial |
| Persian | Vazirmatn, IRANSans | Tahoma |

```css
/* Load Arabic font only when needed */
@font-face {
  font-family: 'NotoArabic';
  src: url('/fonts/NotoSansArabic.woff2') format('woff2');
  unicode-range: U+0600-06FF;  /* Arabic block only */
}
```

---

## Step 5: Bidirectional (BiDi) Mixed Content

Pages often mix RTL and LTR content (e.g., Arabic UI with English product names or URLs).

```html
<!-- Isolate LTR content within RTL page -->
<p dir="rtl">
  السعر: <bdi>$29.99</bdi>
  الرابط: <a href="..." dir="ltr">https://example.com</a>
</p>

<!-- bdi tag = Bidirectional Isolation — use for user-generated content -->
<span>مرحباً <bdi>Alice Johnson</bdi></span>
```

```css
/* For numbers and prices, force LTR within RTL context */
.price { unicode-bidi: isolate; direction: ltr; display: inline-block; }
```

---

## Step 6: RTL Testing Checklist

Run through this for every component when adding RTL support:

```
□ Set <html dir="rtl"> and verify — does layout mirror correctly?
□ Navigation menu appears on correct side (right in RTL)
□ Sidebar appears on correct side (right in RTL for primary nav)
□ Breadcrumb separators point correct direction
□ Form labels align to correct side
□ Input fields have correct text alignment (right for RTL)
□ Dropdown menus open toward correct edge
□ Modal dialogs are centered (usually fine)
□ Toast/notification appears on correct corner
□ Progress bars fill from correct direction (right-to-left in RTL)
□ Carousel/slider moves in correct direction
□ Back button text/icon points correct direction
□ Animated transitions are direction-aware
□ Keyboard arrow key navigation feels natural
□ Copy-pasted Arabic text does not corrupt layout
□ Numbers and prices display correctly (usually LTR even in RTL)
```

---

## Quick RTL Debug: Force RTL in Dev

Add this to test any page without changing locale:

```js
// Browser console — instant RTL preview
document.documentElement.dir = 'rtl'
document.documentElement.lang = 'ar'

// Revert
document.documentElement.dir = 'ltr'
document.documentElement.lang = 'en'
```

---

## Existing CSS Codebase: Using rtlcss

For retrofitting large codebases with physical CSS:

```bash
npm install rtlcss postcss-rtlcss

# Generates RTL variant of your entire stylesheet automatically
# postcss.config.js
module.exports = { plugins: [require('postcss-rtlcss')({ mode: 'combined' })] }
```

This generates both `.ltr` and `.rtl` classes automatically from your existing stylesheet.
Use as a migration bridge — the goal is still to move to logical properties.
