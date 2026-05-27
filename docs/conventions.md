# Monority UI Conventions

## Package Boundaries

- `@monority/ui` owns React APIs, types, refs, and accessibility behavior.
- `@monority/styles` owns CSS source: tokens, base, recipes, utilities, themes, vendors, and debug layers.
- `@monority/web` owns documentation, examples, navigation, and registry-driven discovery.
- New component CSS goes in `packages/styles/src/recipes/*.recipe.css`.
- Component files must not import local CSS from `packages/ui/src/components`.

## CSS Contract

- Public CSS hooks use the `mr-` prefix (migrated from `ui-`).
- Prefer recipe selectors with stable `data-*` hooks for variants and state.
- Use tokens before raw values.
- Use `@layer recipes` for component recipes.

## Component Contract

- Split public props into `<Component>.types.ts`.
- Export component from `index.ts` and public types from the type file.
- Add focused tests for default rendering, variants, state hooks, and refs where relevant.
- Keep behavior in React, visual styling in recipes.
- Avoid adding abstractions until at least two components need the same helper.

## Docs Contract

- Docs navigation comes from `apps/web/src/docs/components/registry.ts`.
- Component docs should use public package imports.
- Document import path, usage, API, CSS hooks, tokens, and accessibility notes.
- Generated components must update the docs registry.

## TypeScript

- Keep `strict` and `noUncheckedIndexedAccess` enabled.
- Defer `exactOptionalPropertyTypes` until remaining legacy component cleanup is complete.
- When enabling it later, do it as a dedicated change with focused component fixes.
