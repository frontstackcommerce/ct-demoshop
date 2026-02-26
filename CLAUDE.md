# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Commands

```bash
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm preview          # Preview production build
pnpm typecheck        # Type checking
pnpm lint             # ESLint check
pnpm lint:fix         # ESLint auto-fix
pnpm format           # Prettier format all files
pnpm format:check     # Check formatting
nuxt prepare          # Regenerate .nuxt/types (run after dependency changes)
```

Package manager: **pnpm** (required). No test framework is configured.

## Architecture

Nuxt 4.3 storefront using **@frontic/nuxt** as the headless commerce backend,
**@nuxt/content** for static content, and **@nuxtjs/i18n** for English + German.

### Routing

Explicit page files (`search.vue`, `brands.vue`, `cart.vue`) are matched first by
Nuxt's file-based router. Everything else goes through `[...slug].vue` in order:

1. **Content page** — `@nuxt/content` collections matched by slug
2. **Frontic page** — `useFronticPage()` returns `type` (`Product`, `Brand`,
   `Category`) and a `route.code` (200, 301, 404). Handle 301 as redirect, 404
   as error. 200 without type = homepage.
3. **Home** — Fallback when Frontic returns `EmptyPage` (200, no type)
4. **Error** — When nothing matches or Frontic returns 404

### Frontic composables

All commerce data flows through auto-imported Frontic composables:

- **`useFronticPage()`** — Page resolution by URL. Returns
  `{ data, type, status, route }`
- **`useFronticSearch(name, params, options?)`** — Search/filter/sort/paginate.
  Returns
  `{ result, state, searchTerm, filterResult, resetFilter, sortResult, ... }`.
  `result` is `ShallowRef<Responses[TSearch]>` — access items via `result.items`
- **`useFronticListing(name, params)`** — Simple data listing. Returns
  `{ listing, status }`
- **`useFronticContext()`** — Store/region context switching. Returns
  `{ contexts, current, update }`

Generated types live in `.frontic/` — never edit these files manually.

**Data sourcing rule**: Always prefer Frontic for product presentation data
(title, images, page route, description). Use commerce backends only for
transactional data (price, quantity, stock). This ensures correct localization,
routing, and consistent rendering across the storefront.

### Content tiers

| Tier       | Source                   | Example                                 |
| ---------- | ------------------------ | --------------------------------------- |
| Dynamic    | Frontic API              | Products, categories, brands, menu tree |
| Structured | `content/{locale}/*.yml` | `navigation.yml`, `home.yml`, `faq.yml` |
| Simple     | `content/{locale}/*.md`  | About, shipping, privacy, careers       |
| Interface  | `i18n/locales/*.json`    | All UI labels, buttons, errors          |

Content collections are defined with Zod schemas in `content.config.ts`. Query
with locale suffix: `queryCollection('navigation_en')`.

### UI components

`app/components/ui/` contains components from the **Frontic UI registry** built on
**reka-ui** (headless). These are auto-imported and excluded from ESLint/Prettier.
Customize them when the change benefits the whole library (e.g., adding a new
color variant to Button that every page will use). For context-specific needs,
compose `ui/` components in `app/components/` instead — e.g., a `CheckoutSummary`
goes in `app/components/checkout/`, not as a new Card variant in `ui/`. Use the
`cn()` utility from `app/lib/utils.ts` for conditional Tailwind classes.

### Custom composables

Located in `app/composables/`, all auto-imported:

- `useCart` — localStorage-based demo cart (not Frontic)
- `useFavorites` — localStorage keys + `useFronticListing('FavoritesProducts')`
- `useNavContent` — Navigation data from content collections
- `useNotify` — vue-sonner toast wrapper
- `useMenuState` / `useShopNav` — UI state for navigation drawers

## Code conventions

### Auto-imports

Nuxt auto-imports Vue APIs, composables, utils, and types everywhere. Components
are auto-imported in `<template>` only — if you need a component ref in
`<script setup>`, import it explicitly. Component names follow folder path with
duplicate segments skipped (e.g., `components/checkout/CheckoutCartItem.vue` →
`<CheckoutCartItem />`). Do not add manual import statements for anything that's auto-imported
(components in templates, utils, types, composables, Vue APIs) — this clutters
the code and ESLint will flag it.

### Types and utils location

| Scope | Utils | Types |
|-------|-------|-------|
| Client/app | `app/utils/` | `app/types/` |
| Server | `server/utils/` | `server/types/` |
| Shared | `shared/utils/` | `shared/types/` |

Type files (`.d.ts`) must use bare interfaces — no `export` or `declare`. A
single `export` turns the file into a module and breaks auto-import for every
type in it.

### Vue SFC order

`<script setup>` then `<template>` then `<style>` (enforced by
`vue/block-order`).

### i18n rules

- All i18n keys must be **kebab-case** with dot separators (e.g.,
  `search.no-results`)
- All visible text in templates must use `$t()` — raw text triggers ESLint
  errors
- Locale files: `i18n/locales/en.json` and `i18n/locales/de.json`

### TypeScript

- Use `type` imports: `import type { Foo } from '...'` (enforced)
- `@typescript-eslint/no-explicit-any` is off — `any` is allowed
- Unused vars must be prefixed with `_`

### Formatting

Prettier with `printWidth: 100`, single quotes, no semicolons, trailing commas.
Tailwind class sorting via `prettier-plugin-tailwindcss`.

### ESLint ignores

`app/components/ui/`, `content/`, and `.frontic/` are excluded from linting.
