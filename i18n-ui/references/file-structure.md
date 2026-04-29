# i18n Reference: File Structure, JSON Schema & Tooling

## Recommended Directory Layout

```
project-root/
├── public/
│   └── locales/                  ← translation JSON files (served statically)
│       ├── en/
│       │   ├── common.json       ← shared: nav, errors, forms, buttons
│       │   ├── auth.json         ← login, register, profile pages
│       │   ├── products.json     ← product catalog feature
│       │   ├── checkout.json     ← checkout flow (lazy loaded)
│       │   └── admin.json        ← admin panel (lazy loaded, role-gated)
│       ├── vi/
│       │   ├── common.json
│       │   ├── auth.json
│       │   └── products.json
│       ├── ar/                   ← RTL locale
│       │   ├── common.json
│       │   └── ...
│       └── ja/
│           └── ...
├── src/
│   ├── i18n/
│   │   ├── index.ts              ← library init & config
│   │   ├── types.ts              ← TypeScript key types (optional)
│   │   └── locales.ts            ← SUPPORTED_LOCALES, RTL_LOCALES constants
│   └── components/
│       └── LanguageSwitcher/
│           ├── index.tsx
│           └── LanguageSwitcher.test.tsx
├── scripts/
│   └── check-translations.js     ← CI script: find missing keys
└── .i18n-config.json             ← shared config for tooling
```

---

## JSON Schema & Conventions

### Naming Convention for Keys

```
[namespace].[section].[element]
```

```json
{
  "nav": {
    "home": "Home",
    "about": "About Us"
  },
  "auth": {
    "login": {
      "title": "Sign In",
      "button": "Log In",
      "error_invalid": "Invalid email or password",
      "link_forgot": "Forgot password?"
    }
  },
  "forms": {
    "required": "This field is required",
    "email_invalid": "Enter a valid email address",
    "submit": "Submit",
    "cancel": "Cancel"
  },
  "product": {
    "add_to_cart": "Add to Cart",
    "out_of_stock": "Out of Stock",
    "item_count": "{{count}} item",
    "item_count_plural": "{{count}} items",
    "price": "{{amount, currency}}"
  },
  "time": {
    "just_now": "Just now",
    "minutes_ago": "{{count}} minute ago",
    "minutes_ago_plural": "{{count}} minutes ago"
  }
}
```

### Pluralization Keys Convention

i18next uses `_plural` suffix (or `_zero`, `_one`, `_two`, `_few`, `_many`, `_other` for ICU):

```json
{
  "item_count_zero": "No items",
  "item_count_one": "{{count}} item",
  "item_count_other": "{{count}} items"
}
```

---

## Missing Key Detection Script

```js
// scripts/check-translations.js
// Run in CI to catch missing translation keys

const fs = require('fs')
const path = require('path')

const BASE_LOCALE = 'en'
const LOCALES_DIR = './public/locales'

function flattenKeys(obj, prefix = '') {
  return Object.entries(obj).reduce((acc, [k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k
    if (typeof v === 'object') return { ...acc, ...flattenKeys(v, key) }
    acc[key] = v
    return acc
  }, {})
}

const namespaces = fs.readdirSync(path.join(LOCALES_DIR, BASE_LOCALE))
const locales = fs.readdirSync(LOCALES_DIR)
let hasErrors = false

for (const ns of namespaces) {
  const baseKeys = flattenKeys(
    JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, BASE_LOCALE, ns), 'utf8'))
  )

  for (const locale of locales) {
    if (locale === BASE_LOCALE) continue
    const filePath = path.join(LOCALES_DIR, locale, ns)
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Missing file: ${locale}/${ns}`)
      hasErrors = true
      continue
    }

    const localeKeys = flattenKeys(JSON.parse(fs.readFileSync(filePath, 'utf8')))
    const missing = Object.keys(baseKeys).filter(k => !localeKeys[k])
    if (missing.length) {
      console.error(`❌ [${locale}/${ns}] Missing keys:\n   ${missing.join('\n   ')}`)
      hasErrors = true
    } else {
      console.log(`✅ [${locale}/${ns}] All keys present`)
    }
  }
}

if (hasErrors) process.exit(1)
```

```json
// package.json
{
  "scripts": {
    "i18n:check": "node scripts/check-translations.js",
    "i18n:extract": "i18next-scanner --config i18next-scanner.config.js"
  }
}
```

---

## Key Extraction with i18next-scanner

Automatically extract `t('key')` usages from code into JSON files:

```bash
npm install --save-dev i18next-scanner
```

```js
// i18next-scanner.config.js
module.exports = {
  input: ['src/**/*.{ts,tsx,vue,js}'],
  output: './',
  options: {
    func: { list: ['t', 'i18next.t', '$t'], extensions: ['.ts', '.tsx', '.vue', '.js'] },
    lngs: ['en', 'vi', 'ar', 'ja'],
    ns: ['common', 'auth', 'products'],
    defaultLng: 'en',
    defaultNS: 'common',
    resource: {
      loadPath: 'public/locales/{{lng}}/{{ns}}.json',
      savePath: 'public/locales/{{lng}}/{{ns}}.json',
    },
    defaultValue: '__MISSING__',  // flag untranslated keys visibly
  },
}
```

---

## Recommended VS Code Extensions

```json
// .vscode/extensions.json
{
  "recommendations": [
    "lokalise.i18n-ally",      // inline preview of translations, missing key warnings
    "dbaeumer.vscode-eslint"   // with eslint-plugin-i18next for hardcoded string detection
  ]
}
```

### i18n Ally Config

```json
// .vscode/settings.json
{
  "i18n-ally.locales": ["en", "vi", "ar", "ja"],
  "i18n-ally.sourceLanguage": "en",
  "i18n-ally.keystyle": "nested",
  "i18n-ally.pathMatcher": "{locale}/{namespace}.json",
  "i18n-ally.enabledParsers": ["json"]
}
```

---

## ESLint Rule: Catch Hardcoded Strings

```bash
npm install --save-dev eslint-plugin-i18next
```

```js
// .eslintrc.js
module.exports = {
  plugins: ['i18next'],
  rules: {
    'i18next/no-literal-string': ['error', {
      markupOnly: false,
      ignoreAttribute: ['className', 'href', 'src', 'type', 'rel'],
      ignore: [/^\s*$/, /^[0-9]+$/, /^[A-Z_]+$/],  // ignore numbers, constants
    }]
  }
}
```

---

## CI Pipeline Integration

```yaml
# .github/workflows/i18n.yml
name: i18n Check
on: [push, pull_request]

jobs:
  check-translations:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run i18n:check
        name: Check for missing translation keys
      - run: npm run i18n:extract -- --dry-run
        name: Check for unextracted hardcoded strings
```

---

## Pseudo-Localization for Testing

Test text expansion and encoding without real translations:

```js
// scripts/pseudo-locale.js — generates a pseudo locale that expands EN text by ~40%
const fs = require('fs')

function pseudolocalize(str) {
  const map = { a:'à',e:'ê',i:'î',o:'ô',u:'û',A:'À',E:'Ê',I:'Î',O:'Ô',U:'Û' }
  const base = str.replace(/[aeiouAEIOU]/g, c => map[c] || c)
  return `[!!${base}!!]`  // brackets help spot untranslated strings
}

function processFile(input, output) {
  const obj = JSON.parse(fs.readFileSync(input, 'utf8'))
  const pseudo = JSON.stringify(obj, (k, v) =>
    typeof v === 'string' ? pseudolocalize(v) : v, 2)
  fs.writeFileSync(output, pseudo)
}

processFile('public/locales/en/common.json', 'public/locales/pseudo/common.json')
```

Add `pseudo` to your supported locales during development to catch layout issues early.
