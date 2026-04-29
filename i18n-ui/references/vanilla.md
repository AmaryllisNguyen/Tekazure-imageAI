# i18n Reference: Vanilla JS / Plain HTML

For projects without a frontend framework. Uses i18next standalone.

## Installation

```bash
npm install i18next i18next-http-backend i18next-browser-languagedetector
# Or CDN:
# <script src="https://unpkg.com/i18next/i18next.min.js"></script>
```

---

## Core Setup — `src/i18n.js`

```js
import i18next from 'i18next'
import HttpBackend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

const RTL_LOCALES = new Set(['ar', 'he', 'fa', 'ur'])

await i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      caches: ['localStorage'],
    },
  })

// Apply locale to DOM
function applyLocale(lng) {
  document.documentElement.lang = lng
  document.documentElement.dir = RTL_LOCALES.has(lng) ? 'rtl' : 'ltr'
}

applyLocale(i18next.language)

export { i18next, applyLocale }
```

---

## HTML: `data-i18n` Attribute Pattern

Mark elements for translation declaratively. Run `translatePage()` after each locale switch.

```html
<!-- Simple key -->
<h1 data-i18n="nav.home"></h1>

<!-- Attribute translation (e.g., placeholders, aria-labels) -->
<input data-i18n="[placeholder]forms.email_placeholder" type="email">
<button data-i18n="[aria-label]nav.close_menu"></button>

<!-- Multiple attributes -->
<img data-i18n="[alt]product.image_alt;[title]product.image_title" src="...">
```

```js
// translate-page.js — call after locale change
import { i18next } from './i18n.js'

export function translatePage() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n')

    // Handle attribute translations: [attr]key
    if (key.startsWith('[')) {
      key.split(';').forEach(part => {
        const match = part.match(/\[(.+?)\](.+)/)
        if (match) el.setAttribute(match[1], i18next.t(match[2]))
      })
    } else {
      el.textContent = i18next.t(key)
    }
  })
}
```

---

## Dynamic Content — Programmatic Translation

```js
import { i18next } from './i18n.js'
const { t } = i18next

// Render a localized card
function renderProductCard(product) {
  return `
    <div class="card">
      <h2>${t('product.title', { name: product.name })}</h2>
      <p>${formatCurrency(product.price)}</p>
      <span>${t('product.item_count', { count: product.stock })}</span>
      <button>${t('product.add_to_cart')}</button>
    </div>
  `
}

// Locale-aware formatting utilities
const formatDate = (date) =>
  new Intl.DateTimeFormat(i18next.language, { dateStyle: 'medium' }).format(date)

const formatCurrency = (amount, currency = 'USD') =>
  new Intl.NumberFormat(i18next.language, { style: 'currency', currency }).format(amount)

const formatNumber = (n) =>
  new Intl.NumberFormat(i18next.language).format(n)
```

---

## Language Switcher (Plain HTML/JS)

```html
<select id="lang-switcher" aria-label="Select language">
  <option value="en" lang="en">English</option>
  <option value="vi" lang="vi">Tiếng Việt</option>
  <option value="ar" lang="ar">العربية</option>
  <option value="ja" lang="ja">日本語</option>
</select>
```

```js
import { i18next, applyLocale } from './i18n.js'
import { translatePage } from './translate-page.js'

const switcher = document.getElementById('lang-switcher')
switcher.value = i18next.language

switcher.addEventListener('change', async (e) => {
  const newLang = e.target.value
  await i18next.changeLanguage(newLang)
  applyLocale(newLang)
  translatePage()           // re-render all data-i18n elements
  renderDynamicContent()    // re-render any JS-generated HTML
})
```

---

## Translation Files

```
public/
└── locales/
    ├── en/
    │   └── common.json
    └── vi/
        └── common.json
```

```json
// en/common.json
{
  "nav": { "home": "Home", "about": "About" },
  "auth": { "welcome": "Welcome, {{name}}!" },
  "product": {
    "item_count_one": "{{count}} item",
    "item_count_other": "{{count}} items"
  },
  "errors": { "required": "This field is required" }
}

// vi/common.json
{
  "nav": { "home": "Trang chủ", "about": "Giới thiệu" },
  "auth": { "welcome": "Xin chào, {{name}}!" },
  "product": {
    "item_count_one": "{{count}} sản phẩm",
    "item_count_other": "{{count}} sản phẩm"
  },
  "errors": { "required": "Trường này là bắt buộc" }
}
```

---

## SEO: `<link rel="alternate">` Tags

```html
<head>
  <link rel="alternate" hreflang="en" href="https://example.com/en/page">
  <link rel="alternate" hreflang="vi" href="https://example.com/vi/page">
  <link rel="alternate" hreflang="ar" href="https://example.com/ar/page">
  <link rel="alternate" hreflang="x-default" href="https://example.com/en/page">
</head>
```

---

## Server-Side Rendering Pattern (Express + i18next)

```js
const express = require('express')
const i18next = require('i18next')
const i18nextMiddleware = require('i18next-http-middleware')
const Backend = require('i18next-fs-backend')

i18next.use(Backend).use(i18nextMiddleware.LanguageDetector).init({
  fallbackLng: 'en',
  backend: { loadPath: './locales/{{lng}}/{{ns}}.json' },
  detection: { order: ['path', 'cookie', 'header'] }
})

const app = express()
app.use(i18nextMiddleware.handle(i18next))

app.get('/:lng/products', (req, res) => {
  const { t } = req           // i18next-http-middleware adds t() to req
  res.send(`
    <html lang="${req.language}" dir="${['ar','he'].includes(req.language) ? 'rtl' : 'ltr'}">
      <h1>${t('product.list_title')}</h1>
    </html>
  `)
})
```
