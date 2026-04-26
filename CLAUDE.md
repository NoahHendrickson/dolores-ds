# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`@noey-17/dolores-ds` — a React 19 design system published to npm. Components are forks/derivatives of [Untitled UI React](https://github.com/untitleduico/react), restyled with a chunky-shadow brand-blue look on top of Tailwind CSS v4 + React Aria Components.

## Commands

```sh
npm run dev              # Vite dev server for src/App.tsx (sandbox, not the library)
npm run storybook        # Storybook on :6006 — primary dev surface for components
npm run build            # tsc -b && vite build (builds the App.tsx demo)
npm run build:lib        # Library build → dist/index.js + dist/style.css + dist/**/*.d.ts
npm run lint             # eslint .
npm test -- --run        # Run the Vitest + Storybook browser test suite once (Playwright/Chromium)
```

There is no separate unit-test directory — tests run via `@storybook/addon-vitest`, which executes every `*.stories.tsx` as a browser test in headless Chromium. To run a single component's tests, target its story file: `npx vitest --run src/components/base/buttons/button.stories.tsx`.

`prepublishOnly` runs `build:lib`, so `npm publish` produces the library bundle automatically.

## Architecture

### Two Vite configs, two purposes

- **`vite.config.ts`** — dev/Storybook/test config. Includes the Storybook Vitest plugin and Playwright browser runner. `npm run dev` and `npm test` use this.
- **`vite.lib.config.ts`** — library build only (`npm run build:lib`). Externalizes all peer deps (react, react-aria*, @untitledui/icons, tailwind-merge, optional input-otp/react-hook-form), emits a single ESM bundle + a single `style.css`, and uses `vite-plugin-dts` to emit declaration files. `publicDir: false` keeps `public/` (favicon, demo icons) out of the npm package.

The `App.tsx` / `main.tsx` / `public/` content is a **demo sandbox** — it is *not* part of the published package. The published surface is `src/index.ts` only.

### Public API boundary

`src/index.ts` is the single source of truth for what the package exports. When adding a component, you must add an explicit re-export there or it won't be in the published bundle. The dts plugin in `vite.lib.config.ts` excludes `*.stories.*`, `App.tsx`, `main.tsx`, and `src/stories/**` from declaration emission.

### Component organization

```
src/components/
├── base/           # Atomic primitives (buttons, input, checkbox, select, slider, ...)
├── application/    # Composite/app-level (modals, tabs)
└── foundations/    # Iconography (featured-icon, payment-icons, integration-icons)
```

Most base components wrap React Aria Components (`react-aria-components`) for accessibility and behavior, then layer Tailwind classes for the dolores-ds visual identity. Example: `Button` composes `AriaButton`/`AriaLink` and switches between them based on whether `href` is passed.

### Styling system (Tailwind CSS v4)

There is **no `tailwind.config.js`** — this is Tailwind v4, configured entirely through CSS:

- `src/styles/globals.css` — entry point. Imports Tailwind, `theme.css`, `typography.css`; registers plugins (`@tailwindcss/typography`, `tailwindcss-react-aria-components`, `tailwindcss-animate`); declares custom variants.
- `src/styles/theme.css` — design tokens via `@theme { ... }`. Defines fonts, type scale (including `text-display-*`), spacing, and a large semantic color system (`--color-bg-primary`, `--color-text-secondary`, `--color-border-brand`, `--color-utility-*`, `--color-brand-*`, etc.). All tokens have light + dark values.
- Dark mode is **class-based on `<html>`**: the variant is `@custom-variant dark (&:where(.dark-mode, .dark-mode *))`. Toggle by adding/removing the `dark-mode` class on `documentElement`. Storybook's preview is wired up via `@storybook/addon-themes` with the same class.
- Other custom variants: `label` (targets `[data-label]` descendants) and `focus-input-within` (`:has(input:focus)`).

When writing component styles, use semantic token classes (`bg-primary`, `text-secondary`, `ring-brand`) rather than raw palette values so dark mode and theme changes flow through automatically. The `text-display-*` sizes are extended into `tailwind-merge` via `src/utils/cx.ts` — always merge classes through `cx` (or `sortCx` for static style maps) to avoid conflicts.

### Visual identity

The signature look is the **chunky button shadow**: outer drop shadow + inset top white highlight + 1px dark inner rim + inset bottom 4px dark "shelf". Content inside such buttons is shifted up 2px (`*:data-text:-translate-y-[2px]`) to visually center above the shelf, and pressed state nudges the whole button down 1px (`data-pressed:translate-y-px`). When restyling new components to match, replicate this pattern. See `src/components/base/buttons/button.tsx` for the canonical implementation. The same chunky-shadow + 12px-radius treatment was extended to fields, destructive buttons, and checkbox (commit `55739aa`).

### Path alias

`@/*` → `./src/*` is configured in `tsconfig.app.json` and both Vite configs. Use `@/utils/cx`, `@/components/...` rather than relative paths.

### Storybook

Stories live next to their components (`*.stories.tsx`). `tags: ['autodocs']` is set globally, so every story renders an autodocs page. The `@storybook/addon-themes` decorator provides the light/dark toggle. The `addon-a11y` test mode is currently `'todo'` — violations show but don't fail CI.
