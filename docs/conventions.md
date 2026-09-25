# Monority UI Conventions

> `docs/design/` fait foi. Une convention qui le contredit est une erreur.

## Package Boundaries

- `@monority/ui` owns React APIs, types, refs, and accessibility behavior.
- `@monority/styles` owns CSS source: tokens, base, recipes, utilities, themes, vendors, and debug layers.
- `@monority/web` owns documentation, examples, navigation, and registry-driven discovery.
- New component CSS goes in `packages/styles/src/recipes/*.recipe.css`.
- Component files must not import local CSS from `packages/ui/src/components`.

## CSS Contract

- Public CSS hooks use the `mr-` prefix (migrated from `ui-`).
- Un seul jeu de sélecteurs : variantes et états sont stylés par attributs `data-*` (`[data-variant="primary"]`, `[data-size="md"]`, `[data-invalid]`). Une seule classe de base par composant (`.mr-btn`) reste le crochet de classe. Aucune classe modificatrice BEM (`.mr-btn--primary`) : elles sont supprimées.
- Aucune valeur visuelle en dur dans les composants : couleur, espacement, rayon, taille de police, graisse, hauteur, largeur, durée, ombre et z-index passent par un token `--mr-*`. Exceptions : `0`, `1px` et `2px` (bordure, rail, focus) et les pourcentages de mise en page.
- Use tokens before raw values.
- `@keyframes` reste à l'intérieur de son `@layer`.
- `@layer recipes` for component recipes.

## Component Contract

- Split public props into `<Component>.types.ts`.
- Export component from `index.ts` and public types from the type file.
- Add focused tests for default rendering, variants, state hooks, and refs where relevant.
- Keep behavior in React, visual styling in recipes.
- `as` est interdit sur tout composant interactif (règle P3) ; il n'est autorisé que sur les primitives de mise en page et de texte, avec une union fermée de balises.
- État désactivé : par couleurs (`--mr-text-disabled`, `--mr-bg-hover`, `--mr-border-subtle`), jamais par opacité.
- Overlays (Modal, AlertDialog, Drawer, Popover, menus, Tooltip) : couche native `<dialog>` + `showModal()` ou attribut `popover` ; aucun `createPortal`. Animations par tokens de durée (`--mr-duration-*`), jamais par délai fixe en JavaScript.
- Tooltip : couche `popover="manual"`, ouverture au survol après `--mr-tooltip-delay` et immédiate au focus, `Escape` ferme (spec 7.11) — plus de CSS `hover`/`focus-within` seul.
- Import path des composants : `@monority/ui/<composant>`.
- Tout attribut `data-*` du JSX a son sélecteur CSS correspondant.
- Pattern contrôlé / non contrôlé : `value`/`defaultValue`, `checked`/`defaultChecked`, `open`/`defaultOpen`, `pressed`/`defaultPressed` avec `isControlled`.
- `title != null` pour les enfants `ReactNode` (évite de traiter une valeur nulle comme un titre).
- Valeurs par défaut des variantes déclarées dans `defaultVariants` de `cva()`.
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
