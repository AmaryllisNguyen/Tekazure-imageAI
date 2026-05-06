# i18n Reference: Vue (vue-i18n v9)

## Installation

```bash
npm install vue-i18n@9
```

## Core Setup — `src/i18n/index.ts`

```ts
import { createI18n } from 'vue-i18n'

// Eager-load default locale; lazy-load others
import en from '@/locales/en/common.json'

export const SUPPORTED_LOCALES = ['en', 'vi', 'ar', 'ja'] as const
export type Locale = typeof SUPPORTED_LOCALES[number]

export const RTL_LOCALES = new Set(['ar', 'he', 'fa', 'ur'])

export const i18n = createI18n({
  legacy: false,              // use Composition API mode
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en },
  datetimeFormats: {
    en: { short: { year: 'numeric', month: 'short', day: 'numeric' } },
    vi: { short: { year: 'numeric', month: 'numeric', day: 'numeric' } },
    ar: { short: { year: 'numeric', month: 'long', day: 'numeric' } },
  },
  numberFormats: {
    en: { currency: { style: 'currency', currency: 'USD' } },
    vi: { currency: { style: 'currency', currency: 'VND' } },
    ar: { currency: { style: 'currency', currency: 'AED' } },
  },
})

// Lazy load locale messages
export async function loadLocaleMessages(locale: Locale) {
  if (!i18n.global.availableLocales.includes(locale)) {
    const messages = await import(`@/locales/${locale}/common.json`)
    i18n.global.setLocaleMessage(locale, messages.default)
  }
}

// Switch locale and update DOM
export async function setLocale(locale: Locale) {
  await loadLocaleMessages(locale)
  i18n.global.locale.value = locale
  document.documentElement.lang = locale
  document.documentElement.dir = RTL_LOCALES.has(locale) ? 'rtl' : 'ltr'
  localStorage.setItem('locale', locale)
}
```

## Main App Entry — `src/main.ts`

```ts
import { createApp } from 'vue'
import { i18n, setLocale, SUPPORTED_LOCALES } from './i18n'
import App from './App.vue'

const app = createApp(App)
app.use(i18n)

// Restore saved locale
const savedLocale = localStorage.getItem('locale')
const browserLocale = navigator.language.split('-')[0]
const initialLocale = SUPPORTED_LOCALES.find(l => l === savedLocale)
  ?? SUPPORTED_LOCALES.find(l => l === browserLocale)
  ?? 'en'

await setLocale(initialLocale)
app.mount('#app')
```

## Using Translations in Components

```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, d, n, locale } = useI18n()

// t() — translate
// d() — format date per locale
// n() — format number per locale
</script>

<template>
  <!-- Basic -->
  <h1>{{ t('nav.home') }}</h1>

  <!-- Interpolation -->
  <p>{{ t('auth.welcome', { name: user.name }) }}</p>

  <!-- Pluralization -->
  <span>{{ t('product.item_count', { count: items.length }) }}</span>

  <!-- Date formatting -->
  <time>{{ d(order.date, 'short') }}</time>

  <!-- Number/currency formatting -->
  <span>{{ n(price, 'currency') }}</span>
</template>
```

## Language Switcher Component

```vue
<!-- src/components/LanguageSwitcher.vue -->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { setLocale, SUPPORTED_LOCALES, type Locale } from '@/i18n'

const { locale } = useI18n()

const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  vi: 'Tiếng Việt',
  ar: 'العربية',
  ja: '日本語',
}
</script>

<template>
  <select
    :value="locale"
    @change="setLocale(($event.target as HTMLSelectElement).value as Locale)"
    aria-label="Select language"
  >
    <option
      v-for="code in SUPPORTED_LOCALES"
      :key="code"
      :value="code"
      :lang="code"
    >
      {{ LOCALE_LABELS[code] }}
    </option>
  </select>
</template>
```

## Vue Router Integration

```ts
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { setLocale, SUPPORTED_LOCALES, type Locale } from '@/i18n'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:locale(en|vi|ar|ja)',
      component: () => import('@/layouts/LocaleLayout.vue'),
      children: [
        { path: '', component: () => import('@/views/Home.vue') },
        { path: 'about', component: () => import('@/views/About.vue') },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/en' },
  ],
})

router.beforeEach(async (to) => {
  const locale = to.params.locale as Locale
  if (SUPPORTED_LOCALES.includes(locale)) {
    await setLocale(locale)
  }
})

export default router
```

## Nuxt 3 / SSR Pattern

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'en', file: 'en.json', dir: 'ltr' },
      { code: 'vi', file: 'vi.json', dir: 'ltr' },
      { code: 'ar', file: 'ar.json', dir: 'rtl' },
    ],
    defaultLocale: 'en',
    langDir: 'locales/',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'locale',
      redirectOn: 'root',
    },
  },
})
```

## Translation File Structure for Vue

```
src/locales/
├── en/
│   ├── common.json
│   ├── auth.json
│   └── products.json
└── vi/
    ├── common.json
    ├── auth.json
    └── products.json
```

## Composable: Locale-Aware Formatting

```ts
// src/composables/useLocaleFormat.ts
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

export function useLocaleFormat() {
  const { locale } = useI18n()

  const dateFormatter = computed(() =>
    new Intl.DateTimeFormat(locale.value, { dateStyle: 'medium' })
  )

  const numberFormatter = computed(() =>
    new Intl.NumberFormat(locale.value)
  )

  return {
    formatDate: (date: Date) => dateFormatter.value.format(date),
    formatNumber: (n: number) => numberFormatter.value.format(n),
    formatCurrency: (amount: number, currency: string) =>
      new Intl.NumberFormat(locale.value, { style: 'currency', currency }).format(amount),
  }
}
```
