# i18n Reference: React (react-i18next)

## Installation

```bash
npm install i18next react-i18next i18next-http-backend i18next-browser-languagedetector
```

## Core Setup — `src/i18n/index.ts`

```ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(HttpBackend)           // loads JSON files from /public/locales
  .use(LanguageDetector)      // detects browser language
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',        // ALWAYS set a fallback
    defaultNS: 'common',      // default namespace
    ns: ['common'],           // loaded namespaces (add feature namespaces lazily)
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['localStorage', 'cookie'],
      lookupQuerystring: 'lang',
    },
    interpolation: {
      escapeValue: false,     // React already escapes XSS
    },
    react: {
      useSuspense: true,      // wrap app in <Suspense> for async loading
    },
  })

export default i18n
```

## App Entry Point — `src/main.tsx`

```tsx
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './i18n'  // import before App
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>
)
```

## Using Translations in Components

```tsx
import { useTranslation } from 'react-i18next'

// Basic usage
function NavBar() {
  const { t } = useTranslation('common')
  return (
    <nav>
      <a href="/">{t('nav.home')}</a>
      <a href="/about">{t('nav.about')}</a>
    </nav>
  )
}

// With interpolation
function WelcomeMessage({ name }: { name: string }) {
  const { t } = useTranslation('common')
  return <h1>{t('auth.welcome', { name })}</h1>
}

// With pluralization
function ItemCount({ count }: { count: number }) {
  const { t } = useTranslation('common')
  return <span>{t('product.item_count', { count })}</span>
}

// Multiple namespaces
function ProductPage() {
  const { t: tc } = useTranslation('common')
  const { t: tp } = useTranslation('products')
  return <div>...</div>
}
```

## Lazy Loading Namespaces

```tsx
// Load a namespace only when the component mounts
function AdminDashboard() {
  const { t, ready } = useTranslation('admin', { useSuspense: false })
  if (!ready) return <Spinner />
  return <div>{t('dashboard.title')}</div>
}
```

## Language Switcher Component

```tsx
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

const LOCALES = [
  { code: 'en', label: 'English', dir: 'ltr' as const },
  { code: 'vi', label: 'Tiếng Việt', dir: 'ltr' as const },
  { code: 'ar', label: 'العربية', dir: 'rtl' as const },
  { code: 'ja', label: '日本語', dir: 'ltr' as const },
]

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const switchLocale = (code: string, dir: 'ltr' | 'rtl') => {
    i18n.changeLanguage(code)
    document.documentElement.lang = code
    document.documentElement.dir = dir
  }

  // Sync dir on initial mount
  useEffect(() => {
    const locale = LOCALES.find(l => l.code === i18n.language) ?? LOCALES[0]
    document.documentElement.lang = locale.code
    document.documentElement.dir = locale.dir
  }, [])

  return (
    <select
      value={i18n.language}
      onChange={e => {
        const locale = LOCALES.find(l => l.code === e.target.value)!
        switchLocale(locale.code, locale.dir)
      }}
      aria-label="Select language"
    >
      {LOCALES.map(l => (
        <option key={l.code} value={l.code} lang={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  )
}
```

## Locale-Aware Formatting Hook

```tsx
import { useTranslation } from 'react-i18next'

export function useLocaleFormat() {
  const { i18n } = useTranslation()
  const locale = i18n.language

  return {
    formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat(locale, options ?? { dateStyle: 'medium' }).format(date),

    formatCurrency: (amount: number, currency: string) =>
      new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount),

    formatNumber: (n: number) =>
      new Intl.NumberFormat(locale).format(n),

    formatRelative: (date: Date) =>
      new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(
        Math.round((date.getTime() - Date.now()) / 86400000), 'day'
      ),
  }
}

// Usage
function ProductPrice({ price }: { price: number }) {
  const { formatCurrency } = useLocaleFormat()
  return <span>{formatCurrency(price, 'USD')}</span>
}
```

## TypeScript: Type-Safe Translation Keys

```ts
// src/i18n/types.ts — auto-complete and compile-time errors for missing keys
import common from '../public/locales/en/common.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: {
      common: typeof common
    }
  }
}
```

## SSR / Next.js Pattern

```tsx
// For Next.js App Router, use next-intl or next-i18next
// npm install next-intl

// middleware.ts
import createMiddleware from 'next-intl/middleware'
export default createMiddleware({
  locales: ['en', 'vi', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'always'
})
export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] }

// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

export default async function LocaleLayout({ children, params: { locale } }) {
  const messages = await getMessages()
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

## Translation File Structure for React

```
public/locales/
├── en/
│   ├── common.json    ← nav, errors, forms, buttons
│   ├── auth.json      ← login, register, profile
│   ├── products.json  ← product-specific strings
│   └── admin.json     ← admin panel (lazy loaded)
└── vi/
    ├── common.json
    ├── auth.json
    ├── products.json
    └── admin.json
```
