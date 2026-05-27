# Monority Architecture 10/10

Goal: scalable, clean, publishable React UI monorepo. Same spirit as shadcn/radix: strong primitives, stable CSS, typed API, living docs, useful tests.

## Product Split

- `@monority/ui`: public npm package. React components, hooks, providers, typed exports.
- `@monority/web`: docs/showcase app. Demonstrates components for users.
- `@monority/styles`: CSS source of truth. Tokens, layers, recipes, utilities, themes.
- `@monority/tokens`: design-token source and generated outputs.
- `@monority/generators`: component/docs/test scaffolding.

Core rule: `ui` consumes `styles`; `web` consumes `ui`; docs never become source of component logic.

## Target Tree

```txt
.
|-- apps/
|   `-- web/
|       |-- src/
|       |   |-- app/
|       |   |   |-- App.tsx
|       |   |   |-- providers/
|       |   |   |-- routes/
|       |   |   `-- seo/
|       |   |-- docs/
|       |   |   |-- components/
|       |   |   |   `-- button/
|       |   |   |       |-- Button.docs.tsx
|       |   |   |       |-- Button.examples.tsx
|       |   |   |       |-- Button.meta.ts
|       |   |   |       `-- index.ts
|       |   |   |-- foundations/
|       |   |   |-- guides/
|       |   |   |-- layouts/
|       |   |   `-- registry.ts
|       |   |-- shared/
|       |   |   |-- components/
|       |   |   |-- hooks/
|       |   |   |-- lib/
|       |   |   `-- test/
|       |   |-- styles/
|       |   |   `-- app.css
|       |   `-- main.tsx
|       |-- public/
|       |-- vite.config.mjs
|       `-- vitest.config.ts
|
|-- packages/
|   |-- ui/
|   |   |-- src/
|   |   |   |-- components/
|   |   |   |   |-- actions/
|   |   |   |   |-- data-display/
|   |   |   |   |-- display/
|   |   |   |   |-- feedback/
|   |   |   |   |-- forms/
|   |   |   |   |-- layout/
|   |   |   |   |-- navigation/
|   |   |   |   |-- overlays/
|   |   |   |   `-- typography/
|   |   |   |-- internal/
|   |   |   |-- hooks/
|   |   |   |-- providers/
|   |   |   |-- lib/
|   |   |   |-- types/
|   |   |   `-- index.ts
|   |   |-- test/
|   |   |-- tsup.config.ts
|   |   `-- package.json
|   |
|   |-- styles/
|   |   |-- src/
|   |   |   |-- index.css
|   |   |   |-- layers/
|   |   |   |-- base/
|   |   |   |-- tokens/
|   |   |   |   |-- core/
|   |   |   |   |-- semantic/
|   |   |   |   `-- component/
|   |   |   |-- recipes/
|   |   |   |-- utilities/
|   |   |   |-- themes/
|   |   |   |-- debug/
|   |   |   `-- vendors/
|   |   `-- package.json
|   |
|   |-- tokens/
|   |   |-- src/tokens.json
|   |   |-- dist/
|   |   `-- sd.config.js
|   |
|   `-- generators/
|       |-- src/
|       `-- templates/
|
|-- tooling/
|   |-- eslint/
|   |-- scripts/
|   `-- tsconfig/
|-- docs/
|-- .changeset/
|-- package.json
|-- pnpm-workspace.yaml
|-- turbo.json
|-- biome.json
`-- tsconfig.base.json
```

## Component Contract

Each public component:

```txt
button/
|-- Button.tsx
|-- Button.types.ts
|-- Button.test.tsx
|-- Button.fixtures.tsx
|-- index.ts
`-- README.md
```

Rules:

- `forwardRef` when DOM node is exposed.
- Export `ButtonProps`, `ButtonVariant`, `ButtonSize`.
- Prefer native semantics. Add ARIA only when needed.
- Use controlled/uncontrolled pattern clearly for form components.
- State exposed with `data-state`, `data-disabled`, `data-size`, `data-variant`.
- No app logic in `ui`: no router, auth, fetch, localStorage direct.
- Polymorphism only when useful. Future ideal: `asChild` with Slot.
- One CSS prefix: `mr-` (migrated from `ui-`).

## Package Exports

Keep root export, add sub-path exports for tree-shaking.

```txt
@monority/ui
@monority/ui/button
@monority/ui/input
@monority/ui/styles.css
```

Target `package.json` shape:

```json
{
  "sideEffects": ["**/*.css"],
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./button": {
      "types": "./dist/components/actions/button/index.d.ts",
      "import": "./dist/components/actions/button/index.js"
    },
    "./styles.css": "./dist/styles.css"
  }
}
```

## CSS Architecture

`@monority/styles` becomes only CSS source. Long term, remove duplicate `packages/ui/src/styles/*`.

Layer order:

```css
@layer reset, tokens, base, components, recipes, utilities, overrides;
```

Responsibilities:

- `tokens/`: core, semantic, component variables.
- `base/`: reset, root, typography, focus, scrollbar, reduced motion.
- `recipes/`: component classes: button, input, card, modal.
- `utilities/`: small opt-in classes only.
- `themes/`: light, dark, dim, oled, high-contrast, density.
- `debug/`: outlines, grids, spacing helpers.
- `vendors/`: isolated external CSS.

Rules:

- No hardcoded colors in components.
- Component dimensions use component tokens: `--mr-button-height`, `--mr-input-radius`.
- Use `:where()` to keep specificity low.
- Use container queries for complex responsive components.
- Motion respects `prefers-reduced-motion`.
- No `!important` outside utilities/debug.

## Tokens

`packages/tokens/src/tokens.json` is canonical data.

Target outputs:

```txt
dist/
|-- css/
|   |-- core.css
|   |-- semantic.css
|   `-- themes.css
|-- json/tokens.json
`-- ts/tokens.ts
```

Rules:

- `styles` imports generated CSS tokens.
- `ui` does not read token JSON at runtime.
- Token changes with public visual impact need changeset.

## Docs App

Docs page per component:

```txt
docs/components/button/
|-- Button.docs.tsx
|-- Button.examples.tsx
|-- Button.meta.ts
`-- index.ts
```

Docs must include:

- Overview.
- Install/import.
- Basic usage.
- Variants and sizes.
- States: disabled, loading, invalid, empty when relevant.
- Accessibility notes.
- API table.
- CSS hooks: classes, data attrs, tokens.

`Button.meta.ts` example:

```ts
export const buttonMeta = {
  title: 'Button',
  status: 'stable',
  package: '@monority/ui/button',
  import: "import { Button } from '@monority/ui/button'",
  anatomy: ['root', 'icon', 'label'],
  accessibility: ['Native button semantics', 'Keyboard accessible'],
}
```

## Tests

Minimum per stable component:

- Renders without crash.
- Variant/size class mapping.
- Ref works.
- Disabled/loading semantics.
- Keyboard behavior for menus, dialogs, tabs, selects.
- Controlled/uncontrolled behavior for forms.

Test files:

```txt
Button.test.tsx
Button.a11y.test.tsx
```

Use:

- Vitest for unit/component tests.
- Testing Library for behavior.
- Optional later: Playwright visual snapshots.
- Optional later: axe smoke tests for complex interactive components.

## TypeScript

Add root `tsconfig.base.json`.

Rules:

- `strict: true`.
- `noUncheckedIndexedAccess: true`.
- `exactOptionalPropertyTypes: true`.
- `moduleResolution: "bundler"`.
- Migrate app `.js/.jsx` to `.ts/.tsx`.
- Internal aliases stay inside each package.

## Build

UI:

- ESM only is fine.
- `react` and `react-dom` stay peer deps.
- CSS marked as side effect.
- DTS generated.
- Sourcemaps generated.
- Sub-path entries for tree-shaking.

Target `tsup`:

```ts
entry: [
  'src/index.ts',
  'src/components/actions/button/index.ts',
  'src/components/forms/input/index.ts',
]
```

Web:

- Lazy docs routes.
- Single docs registry for nav/search/status.
- Code snippets generated from examples when possible.
- No imports from `packages/ui/src`.

## Generator

Target command:

```bash
pnpm generate:component button --category actions
```

Generated files:

- component TSX.
- types.
- test.
- index export.
- recipe CSS stub in `packages/styles`.
- docs meta/examples/page.
- docs registry update.

## CI Gates

Minimum pipeline:

```txt
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm pack --dry-run
```

Rules:

- No public component without tests.
- No public export without types.
- No new component CSS inside `packages/ui/src/styles`.
- No docs page without runnable example.
- Changeset required for public API/visual change.

## Migration Plan

Phase 1: lock conventions.

- Add `tsconfig.base.json`.
- Pick CSS prefix final: `mr-`.
- Update generator templates.
- Migrate `.js/.jsx` app files to TS/TSX.

Phase 2: make CSS canonical.

- Move `packages/ui/src/styles/*` into `packages/styles/src`.
- Make `@monority/ui/styles.css` point to built styles.
- Keep temporary compat export `@monority/ui/index.css`.

Phase 3: improve exports.

- Add component sub-path exports.
- Split tsup entries.
- Verify package content with `pnpm pack --dry-run`.

Phase 4: rebuild docs structure.

- Move docs into `docs/components/<name>`.
- Add meta/examples files.
- Build central registry.

Phase 5: raise test bar.

- Add component tests to stable components.
- Add keyboard tests for overlays/forms/navigation.
- Add visual regression after UI stabilizes.

## Definition Of Done

Component is `stable` when:

- TS strict passes.
- Behavior tests pass.
- Accessibility basics pass.
- CSS lives in `@monority/styles`.
- Tokens documented.
- Docs include import, examples, API, states.
- Root export and sub-path export exist.
- Ref works.
- Controlled/uncontrolled behavior documented when relevant.
- Keyboard behavior works when interactive.
- Changeset exists for public changes.

## Strong Decision

Final architecture:

- `@monority/styles` owns CSS.
- `@monority/ui` owns React API.
- `@monority/web` owns documentation/showcase.
- `@monority/tokens` owns design data.
- `@monority/generators` enforces consistency.

This keeps current repo shape, removes duplication, and gives clean path toward serious npm package quality.
