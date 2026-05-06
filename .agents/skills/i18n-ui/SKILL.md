---
name: i18n-ui
description: >
  Design and implement multilingual, internationalized frontend UI components and applications.
  Use this skill whenever the user mentions: multilanguage, i18n, internationalization, localization,
  l10n, multiple languages, RTL support, Arabic/Hebrew layout, translation keys, locale switching,
  language detection, or building any UI that needs to work in more than one language.
  Also trigger when the user asks to "add language support", "support Vietnamese/Japanese/Arabic",
  "make the UI multilingual", or shows a design that will be used globally.
  This skill covers architecture decisions, code patterns, component structure, and common pitfalls
  for React, Vue, plain HTML/JS, and framework-agnostic scenarios.
---

# i18n UI Skill

This skill enables AI agents to design and build **production-grade multilingual frontend UIs**
with proper internationalization architecture from day one.

## How to Use This Skill

1. **Identify the scope** — Is this a new project or retrofitting existing code?
2. **Pick the right reference** — See the References section below for framework-specific guides.
3. **Follow the Decision Checklist** before writing any code.
4. **Apply the Universal Patterns** that work across all frameworks.

---

## Decision Checklist (Run Before Every i18n Task)

Before writing code, answer these questions and apply the corresponding action:

| Question | If YES → | If NO → |
|---|---|---|
| Does the UI have any hardcoded text strings? | Extract ALL to translation keys first | Proceed |
| Does the app need Arabic, Hebrew, Persian, or Urdu? | Apply RTL architecture (see `references/rtl.md`) | Skip RTL section |
| Are there buttons/labels with fixed pixel widths? | Switch to flexbox/min-width | Proceed |
| Does the UI show dates, numbers, or currency? | Use `Intl` API — never format manually | Proceed |
| Does the UI concatenate translated strings? | Refactor to interpolation immediately | Proceed |
| Is the user base > 1 language? | Set up namespace splitting + lazy loading | Single bundle is fine |
| Are there images/icons with embedded text? | Plan locale-specific asset strategy | Proceed |

---

## Universal Patterns (Framework-Agnostic)

### 1. Translation Key Architecture

Always use **hierarchical dot-notation keys**, never raw strings:

```json
// ✅ CORRECT — in en.json
{
  "nav": {
    "home": "Home",
    "about": "About Us",
    "contact": "Contact"
  },
  "auth": {
    "login": "Log In",
    "logout": "Log Out",
    "welcome": "Welcome, {{name}}!"
  },
  "errors": {
    "required": "This field is required",
    "email_invalid": "Please enter a valid email"
  },
  "product": {
    "item_count": "{{count}} item",
    "item_count_plural": "{{count}} items"
  }
}

// ❌ WRONG — hardcoded text anywhere in components
<button>Log In</button>
<p>Welcome, {user.name}!</p>
```

### 2. Interpolation — Never Concatenate

```js
// ✅ CORRECT — word order varies by language
t('auth.welcome', { name: user.name })
// → "Welcome, Alice!" (EN) | "Xin chào, Alice!" (VI) | "مرحباً، Alice!" (AR)

// ❌ WRONG — breaks in languages with different word order
t('auth.welcome_prefix') + user.name + t('auth.welcome_suffix')
```

### 3. Pluralization — Use Library Rules, Never Manual

```js
// ✅ CORRECT — library handles all plural forms per language
t('product.item_count', { count: n })
// Arabic has 6 plural forms; English has 2; Japanese has 1

// ❌ WRONG — only works for English
n === 1 ? 'item' : 'items'
```

### 4. Date, Number & Currency — Always Use Intl API

```js
// ✅ CORRECT — locale-aware formatting
const formatDate = (date, locale) =>
  new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(date)

const formatCurrency = (amount, locale, currency) =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount)

const formatNumber = (n, locale) =>
  new Intl.NumberFormat(locale).format(n)

// ❌ WRONG — hardcoded assumptions
`${month}/${day}/${year}`
`$${price.toFixed(2)}`
```

### 5. Language Detection Priority Chain

```js
// Standard priority: URL param → User preference (DB/cookie) → Browser → Default
const detectLocale = () =>
  urlParam('lang') ||
  userStoredPreference() ||
  navigator.language?.split('-')[0] ||
  'en'
```

### 6. Locale in URL for SEO

```
✅ /en/products     /vi/san-pham     /ar/products
✅ ?lang=vi (fallback for SPAs)
❌ No locale in URL — bad for SEO and sharing
```

---

## Text Expansion Budget

Design all containers with these expansion allowances:

| Source (EN) | Language | Expansion |
|---|---|---|
| English | German, Dutch | +30–40% |
| English | French, Spanish, Italian | +20–30% |
| English | Finnish, Hungarian | +50–60% |
| English | CJK (Chinese/Japanese/Korean) | -20% (shorter) |
| English | Arabic (transliterated content) | +25–35% |

**Rule of thumb**: If a button has fixed width, assume it will break. Use:
```css
/* ✅ Always prefer this */
button { min-width: 120px; padding: 0.5rem 1.25rem; }

/* ❌ Never this for i18n */
button { width: 120px; }
```

---

## Framework-Specific References

Read the relevant reference file before writing implementation code:

- **React** → `references/react.md` — react-i18next setup, hooks, lazy loading
- **Vue** → `references/vue.md` — vue-i18n v9, Composition API, SSR
- **Plain JS / HTML** → `references/vanilla.md` — i18next standalone, data-i18n attributes
- **RTL Support** → `references/rtl.md` — CSS logical props, dir attribute, icon mirroring
- **File Structure** → `references/file-structure.md` — namespace splitting, JSON schema, tooling

---

## Common Mistakes to Catch and Fix

When reviewing or generating UI code, always flag these:

### 🔴 Critical (Fix Immediately)
- Any string literal in JSX/template that a user will see → extract to key
- String concatenation to build translated sentences → use interpolation
- Manual `n === 1 ? ... : ...` pluralization → use library
- `margin-left` / `padding-right` / `float: right` in shared components → use logical props
- Fixed-width containers around text → use `min-width` + `flexbox`

### 🟡 Important (Fix Before Shipping)
- Missing `lang` attribute on `<html>` element
- No `dir` attribute handling for RTL locales
- Dates formatted with string templates instead of `Intl`
- No fallback locale configured
- Translation files loaded all at once for large apps

### 🟢 Best Practice (Improve When Possible)
- Add `hreflang` tags for SEO on all locale variants
- Use `<link rel="alternate" hreflang="...">` in `<head>`
- Add locale to `<html lang="">` dynamically
- Consider pseudo-localization testing in CI

---

## Minimal Working Setup (Any Framework)

This is the fastest path to a working i18n foundation:

```
project/
├── public/
│   └── locales/
│       ├── en/
│       │   ├── common.json      ← shared strings (nav, errors, forms)
│       │   └── [feature].json   ← per-feature namespaces
│       └── vi/
│           ├── common.json
│           └── [feature].json
├── src/
│   ├── i18n/
│   │   └── index.ts             ← library init + config
│   └── components/
│       └── LanguageSwitcher.tsx ← UI for switching locale
```

---

## Language Switcher Component Pattern

Every multilingual app needs one. Always implement:

```tsx
// Minimal accessible language switcher
// Full implementations in references/react.md and references/vue.md

const LOCALES = [
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'vi', label: 'Tiếng Việt', dir: 'ltr' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
  { code: 'ja', label: '日本語', dir: 'ltr' },
]

// When locale changes:
// 1. Update i18n library locale
// 2. Set document.documentElement.lang = code
// 3. Set document.documentElement.dir = dir  ← critical for RTL
// 4. Persist to localStorage or cookie
// 5. If using URL-based routing, navigate to new locale path
```

---

## Testing i18n Implementations

Always verify these before considering i18n done:

```
□ Switching language updates ALL visible text (including dynamic content)
□ Page reload preserves selected language
□ Dates and numbers reformat correctly per locale
□ RTL locale flips entire layout direction
□ Long German/French text doesn't overflow or truncate
□ Missing translation keys show fallback (not undefined/null/key string)
□ Pluralization works for 0, 1, and many counts
□ Form error messages are also translated
□ <html lang=""> updates on locale change
□ Images with text have locale-specific variants or use CSS text overlays
```
