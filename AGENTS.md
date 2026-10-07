# AGENTS.md

# Component Library Engineering Contract

This repository is a reusable component library.

The primary goal is to provide **small, composable, accessible, predictable, stable, production-ready components** with excellent DX.

The library is infrastructure for applications.

Do not implement application-specific behavior inside the library.

---

# 1. Core Principles

Priority order:

1. Correctness
2. Public API stability
3. Accessibility
4. Composability
5. Maintainability
6. Simplicity
7. Performance
8. Developer experience

Prefer the smallest implementation that satisfies the contract.

Do not optimize for cleverness, abstraction count, or code volume.

---

# 2. Componentize Everything

## 2.1 Component-first

Meaningful UI concepts should be components.

Examples:

```text
Button
Input
SearchField
Dialog
Modal
Popover
Tooltip
Card
Avatar
Badge
Tabs
Table
Gallery
Lightbox
Sidebar
Logo
Spinner
```

If a visual or behavioral structure is likely to appear more than once, make it a reusable component with a focused API.

Prefer:

```tsx
<Card>
  <Card.Header />
  <Card.Content />
</Card>
```

over repeating the same structural markup throughout consumers.

---

## 2.2 Do Not Componentize Meaningless Markup

Componentization is not a contest to eliminate every HTML element.

Do not create components such as:

```text
Wrapper
Container2
Div
Section
BoxThing
StyledText
GenericElement
```

unless they represent a real reusable concept.

A component must have a clear responsibility or meaningful API.

The goal is:

> reusable concepts, not maximum component count.

---

# 3. Components Own Presentation

Components should own:

- rendering
- interaction primitives
- accessibility behavior
- visual variants
- composition
- local UI state when appropriate

Components must not own application-specific:

- business rules
- database logic
- authentication
- routing policy
- domain workflows
- persistence
- API orchestration

Prefer:

```text
application
    ↓
state / domain data
    ↓
component props
    ↓
component
    ↓
DOM
```

The library provides primitives.

The consuming application owns the product behavior.

---

# 4. Component Responsibility

Every component should have one clear conceptual responsibility.

A component may contain multiple internal elements when those elements form one coherent component.

For example:

```text
Dialog
 ├── Dialog.Trigger
 ├── Dialog.Content
 ├── Dialog.Header
 ├── Dialog.Body
 └── Dialog.Footer
```

is one coherent system.

Avoid components that simultaneously become:

```text
modal
+ router
+ data loader
+ form manager
+ API client
+ business workflow
```

---

# 5. Composition Over Configuration

Prefer composition when consumers need structural flexibility.

Prefer:

```tsx
<Card>
  <Card.Header />
  <Card.Content />
  <Card.Footer />
</Card>
```

over:

```tsx
<Card
  title="..."
  description="..."
  footer="..."
  showHeader
  showFooter
  ...
/>
```

Do not turn every component into a configuration object.

Use props for meaningful behavioral or visual variants.

Use composition for structural variation.

---

# 6. Props Are the Component API

Every prop must have a reason to exist.

Prefer small semantic APIs:

```tsx
<Button
  variant="primary"
  size="sm"
  disabled
/>
```

Avoid exposing internal implementation details:

```tsx
<Component
  internalClassName="..."
  implementationMode="..."
  domStrategy="..."
/>
```

Public props should describe what the component does, not how it happens to be implemented.

---

# 7. Avoid Prop Explosion

A component with many unrelated props is usually a design problem.

If a component requires a large collection of unrelated configuration values:

1. inspect its responsibility
2. consider composition
3. consider compound components
4. consider splitting the component

Do not solve poor component boundaries by adding more props.

---

# 8. Variants

Variants must be explicit and semantic.

Prefer:

```tsx
<Button variant="primary" />
<Button variant="ghost" />
<Button size="sm" />
```

over:

```tsx
<Button className="blue-small-button" />
```

Do not create variants for one-off consumer needs.

A variant should represent a stable design-system concept.

Avoid boolean-prop explosion:

```tsx
<Button
  isSmall
  isGhost
  isLoading
  isRounded
  isQuiet
  isCompact
  ...
/>
```

Prefer a coherent variant API.

---

# 9. Controlled and Uncontrolled Components

Interactive components must have an intentional state model.

For components where controlled usage is useful, support predictable controlled/uncontrolled patterns.

Example:

```tsx
<Tabs
  value={value}
  onValueChange={setValue}
/>
```

or:

```tsx
<Tabs defaultValue="overview" />
```

Do not create ambiguous state ownership.

Never maintain two competing sources of truth.

---

# 10. State

Keep state as local as possible.

Use internal state for genuinely component-owned behavior.

Expose state through props/callbacks when consumers need control.

Do not introduce global state into the component library merely for convenience.

A reusable component should remain usable without adopting a particular application state-management solution.

---

# 11. Accessibility Is a Contract

Accessibility is not optional polish.

Every interactive component must consider:

- semantic HTML
- keyboard interaction
- focus management
- focus visibility
- accessible names
- labels
- disabled states
- loading states
- error states
- screen-reader behavior
- appropriate ARIA
- reduced motion where applicable

Prefer native HTML semantics.

Use ARIA to describe behavior that native semantics cannot express.

Do not use ARIA to compensate for incorrect HTML.

---

# 12. Keyboard Behavior

Keyboard behavior must be deliberate.

Interactive components must remain usable without a mouse.

For overlays and dialogs, verify:

- Escape behavior
- focus entry
- focus return
- tab order
- focus trapping where required

Do not invent keyboard shortcuts globally inside reusable components.

Consumers should own application-level shortcuts.

---

# 13. DOM Contracts

Do not unnecessarily alter the DOM structure exposed by a component.

Changes to:

- element type
- nesting
- attributes
- focusability
- event behavior
- generated IDs

may be breaking changes.

When changing DOM structure, inspect:

- tests
- consumers
- styling
- accessibility
- snapshots
- selectors

---

# 14. Styling

Use the library's existing styling system.

Prefer:

```text
design token
    ↓
component variant
    ↓
component style
```

Avoid arbitrary values when an existing token represents the same concept.

Do not introduce a second styling strategy without strong justification.

Avoid:

- unnecessary specificity
- `!important`
- duplicated CSS
- deeply nested selectors
- consumer-hostile global styles

---

# 15. Design Tokens

Tokens are the source of truth for shared visual decisions.

Use tokens for:

- color
- spacing
- typography
- radius
- shadows
- borders
- motion
- sizing
- z-index/layers

Do not duplicate token values across components.

If a value is intentionally component-specific, keep it local and document the reason when non-obvious.

---

# 16. Responsive Behavior

Components must behave correctly across reasonable viewport sizes.

Do not assume:

- desktop width
- mouse input
- fixed text length
- a particular font
- a particular application layout

Components should degrade gracefully when content grows.

Avoid hard-coded dimensions that unnecessarily constrain consumers.

---

# 17. Content Flexibility

Never assume labels, text, icons, or user content have a fixed size.

Test:

- short content
- long content
- multiline content
- missing optional content
- large text
- localization-like expansion

Avoid layouts that only work with the example content.

---

# 18. Icons

Icons are presentation primitives.

Do not hard-code application-specific iconography into generic components.

Prefer composable icon slots:

```tsx
<Button leadingIcon={<SearchIcon />}>
  Search
</Button>
```

rather than coupling the component to a specific icon library.

Icons must have appropriate accessibility semantics.

Decorative icons should not create redundant screen-reader output.

---

# 19. Loading, Empty and Error States

Reusable components must expose predictable states where the concept requires them.

Examples:

```text
loading
disabled
empty
error
success
```

Do not hard-code application-specific messages when consumers need control.

Prefer:

```tsx
<AsyncContent
  loadingFallback={...}
  errorFallback={...}
/>
```

or explicit composition.

---

# 20. Animation and Motion

Motion must be purposeful and consistent.

Reuse the library's motion tokens/primitives.

Do not introduce arbitrary transition durations throughout components.

Respect:

```css
prefers-reduced-motion
```

when motion is non-essential.

Do not make component correctness depend on animation timing.

Tests should prefer deterministic state over arbitrary animation delays.

---

# 21. Component APIs Must Be Composable

Components should work well together.

Avoid hidden assumptions about:

- parent components
- global providers
- application routing
- application state
- specific CSS
- DOM ancestors

If a provider is required, make the dependency explicit and document it.

---

# 22. Escape Hatches

A reusable component should provide reasonable escape hatches without exposing its entire implementation.

Typical examples:

```tsx
className
style
children
render props
slots
as / asChild
```

Only expose an escape hatch when it solves a real consumer need.

Do not expose internal DOM nodes or implementation details merely for flexibility.

---

# 23. `as` / Polymorphism

Polymorphic APIs are powerful but increase type and maintenance complexity.

Do not introduce polymorphism by default.

Use it when the semantic element genuinely needs to vary.

Prefer a small predictable API over a highly generic type system.

---

# 24. Ref and DOM Access

Forward refs when consumers reasonably need access to the underlying DOM element.

In React 19 (used across this repository), `ref` is passed directly as a standard component prop (`{ ref, ...props }`). The legacy `forwardRef` wrapper is deprecated and must not be used in new code.

Typical cases:

- focus
- measurement
- integration with browser APIs
- imperative accessibility behavior

Do not expose refs to internal implementation details unnecessarily.

---

# 25. Public API Discipline

Everything exported from the package is potentially a contract.

Before exporting anything, ask:

> Should consumers reasonably depend on this?

Do not export:

- internal helpers
- temporary utilities
- implementation details
- test-only helpers
- unstable internals

Keep internal modules internal.

---

# 26. Exports

Maintain a clear public entry point.

Prefer:

```ts
import { Button, Dialog, Input } from "@monority/ui";
```

over forcing consumers to understand internal paths.

Do not accidentally expose internal files through package exports.

When changing exports, verify:

- TypeScript resolution
- ESM/CJS behavior if supported
- package exports
- tree-shaking
- generated declarations

---

# 27. Backwards Compatibility

Treat public API changes as potentially breaking.

Before changing or removing:

- props
- exported components
- exported types
- CSS contracts
- DOM contracts
- token names
- variant names

search all consumers and tests.

Prefer additive changes when possible.

Do not rename a public API merely because a different name looks cleaner.

---

# 28. No Duplicate Components

Before creating a component, search the library.

Do not create:

```text
PrimaryButton
ActionButton
MainButton
BlueButton
SubmitButton
```

if they are all variations of the same underlying concept.

Prefer one coherent component:

```tsx
<Button variant="primary" />
```

Likewise, do not create parallel implementations of:

- inputs
- dialogs
- buttons
- typography
- layout primitives
- icons
- loading states

without a demonstrated architectural reason.

---

# 29. Avoid God Components

Do not create components that become entire application frameworks.

Bad:

```text
Dashboard
Application
Page
FormManager
DataTableEverything
```

when they contain unrelated product behavior.

A component library should provide primitives and composable higher-level components.

Application orchestration belongs to applications.

---

# 30. TypeScript

Strict typing is mandatory.

Avoid `any`.

Prefer `unknown` with explicit narrowing for unknown values.

Avoid unnecessary type assertions.

Public component APIs must have intentional, readable types.

Do not use complex generic types merely to demonstrate type-system capability.

Type complexity is a maintenance cost.

---

# 31. Runtime Safety

Components must behave predictably with:

- missing optional props
- empty children
- nullish data where supported
- long content
- rapid interaction
- mount/unmount cycles
- controlled state changes
- disabled state changes

Do not rely on timing accidents.

---

# 32. Performance

The library is shared infrastructure.

Avoid unnecessary:

- renders
- DOM nodes
- effects
- event listeners
- subscriptions
- layout measurements
- observers
- allocations

Do not add `memo`, `useMemo`, or `useCallback` automatically.

Optimize demonstrated bottlenecks.

Measure when performance is important.

---

# 33. SSR / Hydration

Components must not assume browser APIs during server rendering unless explicitly documented.

Guard access to:

```text
window
document
localStorage
matchMedia
ResizeObserver
IntersectionObserver
```

Do not introduce hydration mismatches.

When a component is client-only, make that requirement explicit.

---

# 34. Effects

Effects are for synchronization with external systems.

Do not use effects merely to derive state.

Prefer:

```ts
const derived = calculate(value);
```

over:

```ts
useEffect(() => {
  setDerived(calculate(value));
}, [value]);
```

when the value can be derived synchronously.

---

# 35. Tests

Tests should validate the public contract.

Prefer behavior over implementation details.

Test:

- rendering
- interaction
- accessibility
- controlled/uncontrolled behavior
- keyboard behavior
- variants
- edge cases
- public API
- important DOM contracts

Avoid tests that merely reproduce implementation details.

---

# 36. Accessibility Tests

Interactive components should have automated accessibility coverage where practical.

At minimum verify:

- accessible name
- role
- keyboard operation
- disabled behavior
- focus behavior
- dialog semantics where applicable

Do not rely solely on snapshots for accessibility.

---

# 37. Visual Tests

Use visual regression testing for components where visual changes are important.

Test meaningful states:

```text
default
hover
focus
disabled
loading
error
open
selected
responsive
```

Do not generate enormous screenshot matrices without evidence.

Prefer a small set of high-value visual states.

---

# 38. Test the Package, Not Just the Source

Before release, verify the built package.

Test:

```text
source
→ build
→ package exports
→ consumer import
→ runtime
```

A library is not correct merely because its source tests pass.

Verify generated:

- JavaScript
- type declarations
- CSS/assets
- package exports

when applicable.

---

# 39. Tree-Shaking and Bundle Discipline

Avoid making consumers pay for unused components.

Prefer modular implementation and correct package exports.

Do not introduce unnecessary side effects.

Be careful with:

- barrel exports
- global initialization
- CSS imports
- large dependencies
- eagerly loaded assets

When relevant, verify bundle impact.

---

# 40. Dependencies

Before adding a dependency:

1. search existing dependencies
2. check whether the platform already provides the capability
3. assess bundle impact
4. assess maintenance quality
5. assess licensing
6. assess SSR compatibility
7. assess tree-shaking

Do not add a dependency for trivial functionality.

A dependency used by one tiny component must justify its cost.

---

# 41. Documentation

Every public component should have enough documentation for a consumer to understand:

- what it does
- important props
- variants
- composition
- accessibility expectations
- controlled/uncontrolled behavior where relevant
- important constraints

Prefer examples that demonstrate the public API.

Do not document internal implementation details unless they affect consumers.

---

# 42. Stories / Harnesses

If the repository uses Storybook, a component harness, or equivalent:

Every meaningful component state should be demonstrable there.

Use harnesses to inspect:

- layout
- interaction
- accessibility
- responsive behavior
- visual states

The harness must exercise the real component implementation.

Do not create fake implementations solely for documentation.

---

# 43. No Fake Implementations

Never create fake behavior to satisfy tests or examples.

Do not:

```ts
return true;
```

to make a test pass.

Do not create placeholder behavior that looks production-ready unless explicitly requested.

Tests must exercise real component behavior.

---

# 44. No Dead Code

Remove:

- unused exports
- unused props
- dead variants
- obsolete styles
- unused utilities
- commented-out implementations
- abandoned components

Do not keep old APIs indefinitely without an explicit compatibility requirement.

---

# 45. Read Before Editing

Before modifying a component:

1. inspect the component
2. inspect its tests
3. inspect its stories/harness
4. inspect its exports
5. search consumers
6. inspect related tokens
7. inspect related components

Understand the current contract before changing it.

---

# 46. Change Discipline

For every change:

```text
inspect
→ identify contract
→ implement minimal change
→ test
→ inspect generated/package behavior
→ review diff
```

Do not combine unrelated refactors with component changes.

---

# 47. Breaking Change Detection

Before considering a change complete, check whether it affects:

- TypeScript API
- runtime behavior
- DOM structure
- accessibility
- CSS selectors/classes
- tokens
- exports
- bundle behavior
- SSR/hydration
- controlled state behavior

If yes, treat it as an API-impacting change.

---

# 48. Browser Verification

For UI changes, verify the real component in a browser.

Do not rely only on unit tests.

Check the relevant:

- visual appearance
- interaction
- keyboard behavior
- focus
- responsive behavior
- scrolling
- overlays
- disabled/loading/error states
- console errors

Use deterministic assertions.

Do not replace real browser verification with arbitrary screenshots.

---

# 49. E2E Feedback Loop

During development, use the smallest validation capable of detecting the current failure.

Prefer:

```text
typecheck / lint
    ↓
targeted component test
    ↓
targeted browser test
    ↓
related suite
    ↓
full suite
```

Do not run the entire browser suite after every small change.

Do not repeatedly rerun expensive tests that cannot be affected by the latest change.

---

# 50. Git Safety

Before editing:

```bash
git status
```

Before finishing:

```bash
git diff
git status
```

Never destroy user work.

Do not use destructive git commands unless explicitly instructed.

Do not commit:

- secrets
- generated garbage
- unrelated changes
- local configuration
- debugging artifacts

---

# 51. Final Review

Before declaring a component change complete, verify:

### API

- Is the public API minimal?
- Are names semantic?
- Are props justified?
- Is compatibility preserved?

### Architecture

- Is the component responsibility clear?
- Is application logic absent?
- Is composition appropriate?
- Is there duplication?

### Accessibility

- Is semantic HTML used?
- Does keyboard interaction work?
- Is focus correct?
- Are accessible names correct?

### Visual

- Does it work at different sizes?
- Do long contents work?
- Are tokens reused?
- Are states coherent?

### Technical

- Typecheck passes
- tests pass
- browser verification passes where applicable
- package build passes where relevant
- exports work
- no unexpected runtime errors

---

# 52. Definition of Done

A component change is complete only when:

- the component solves the requested problem
- the public API is coherent
- the implementation is reusable
- application-specific logic is absent
- accessibility is addressed
- existing contracts are preserved
- tests prove important behavior
- browser verification is performed when relevant
- package/build validation passes when relevant
- no unnecessary dependency was introduced
- no unrelated refactor was introduced
- the final diff is clean

---

# Final Rule

**Build components that consumers can compose, understand, trust, and keep using.**

Prefer:

```text
small
composable
semantic
accessible
typed
stable
testable
```

over:

```text
clever
generic
configurable
magical
over-engineered
```

A component library is successful when consumers can build complex products from simple components without fighting the library.

---

# Operational Contract — Monority UI

Instructions operationnelles pour tout agent (IA ou humain) modifiant ce depot. En cas de conflit : ce document fait foi, puis `docs/foundation/`, puis `docs/design/`, puis le code existant. Aucun tableau, aucun emoji, dans les rapports comme dans les documents.

## O1. Le projet

Monority UI est une librairie de composants React 19 pilotee par des design tokens CSS : changement de theme au runtime, rebranding par client, densites adaptables. Seul `@monority/ui` est publie sur npm. Tout le reste sert a le produire, le tester ou le documenter.

Chantier en cours : base CSS ecrite a la main, organisee en couches (`@layer`), sur la branche `refactor/css-foundation`. L'ancien systeme (tokens en JSON, generateur Style Dictionary) est abandonne et archive par un tag `archive/tokens-json-*`. Il est supprime en phase 3 du chantier. N'y ajoute rien.

Emplacements :
- `packages/styles/` : tout le CSS source. La fondation (couches, reset, base, tokens, themes), les recettes (une par composant), les utilitaires.
- `packages/ui/` : composants React (`src/components/<categorie>/<composant>/`), primitives, providers, hooks internes.
- `apps/web/` : site de documentation, playground, moodboard, tests e2e (Playwright).
- `tooling/generators/` : generateur de composant et validation.
- `docs/foundation/` : architecture des couches, contrat de surcharge, guides "ajouter un token" et "ajouter un theme", glossaire.
- `docs/design/` : langage visuel (`language.md`) et specs par composant.

## O2. Commandes

- Tout construire (ordre gere par turbo) : `pnpm build`
- Porte unique de preuve : `pnpm verify` (8 etapes au plus, voir section O7)
- Tests : `pnpm test`
- Types : `pnpm typecheck`
- Format (bloquant en CI) : `pnpm format:check` puis `pnpm format`
- Lint JS/TS : `pnpm lint` ; lint CSS : `pnpm lint:css`
- Tests du package construit : `pnpm --filter @monority/ui test:dist`
- E2E : `pnpm --filter @monority/web test:e2e`

## O3. Architecture CSS

### O3.1 Couches
L'ordre des couches est declare une seule fois, dans `packages/styles/src/layers.css` : reset, base, tokens, themes, composants, utilitaires. Toute regle de la bibliotheque est dans une couche. Les noms de couches sont prefixes `mr.` (par exemple `mr.reset`, `mr.components`) pour ne pas entrer en collision avec ceux de l'application hote.

Contrat de surcharge : le CSS d'un consommateur qui n'est pas dans une couche gagne toujours sur les couches de la bibliotheque. Ne jamais contourner cet ordre avec `!important` ni avec des selecteurs plus specifiques pour "gagner".

### O3.2 Structure de `packages/styles/src/`
- `layers.css` : declaration de l'ordre.
- `reset.css` : reset minimal, tout via `:where()` (specificite nulle), scope a la portee `mr-*`. Jamais de reset global qui ecrase le CSS d'un consommateur.
- `base/` : fond et texte herites des tokens, typographie de base, `focus-visible`, `color-scheme` par theme, `prefers-reduced-motion`, `prefers-contrast`, `forced-colors`, geres une seule fois ici et non par recette.
- `tokens/ref.css` : primitives `--mr-ref-*` (teintes, echelles d'espacement, radius, typographie, durees, ombres, z-index).
- `tokens/semantic.css` : semantiques (`--mr-bg-*`, `--mr-text-*`, `--mr-border-*`, `--mr-accent-*`, `--mr-status-*`, `--mr-chart-*`, `--mr-focus-*`) avec leurs valeurs par defaut (theme clair) dans `:root`.
- `themes/<nom>.css` : un fichier par theme, `[data-theme="<nom>"]`, qui redefinit uniquement ce qui differe.
- `recipes/` : une recette par composant, dans la couche des composants.
- `utilities/` : utilitaires, dans la couche des utilitaires.

### O3.3 Regles
- Trois niveaux : primitives (`--mr-ref-*`), semantiques (`--mr-bg-*`...), composants (`--mr-<composant>-*`). Une recette ne lit jamais une primitive directement. Un token de composant n'existe que si au moins deux recettes ou deux variantes le lisent.
- Aucune valeur visuelle brute dans les recettes et les composants : uniquement des tokens `--mr-*` (exceptions : `0`, `1px`, `2px`, pourcentages de mise en page). Les valeurs brutes ne vivent que dans `tokens/ref.css` et `themes/`.
- Couleurs en OKLCH. Les themes neutres ne redefinissent pas les teintes. Les themes teintes (slate, ocean, night) redefinissent localement leurs primitives de teinte dans leur propre fichier. Ne jamais coder une chroma ou une hue en dur dans une recette.
- Teintes fixes de statut (succes 155, avertissement 80, danger 25, info 255) : pas de primitive dediee.
- Les etats hover, active, focus et disabled se derivent avec `color-mix(in oklch, ...)`, jamais declares comme tokens.
- Tout token dependant de la marque se reevalue sur `[data-brand]`, qui redefinit les primitives `--mr-ref-brand-*`.
- Proprietes logiques (`inline-start`, `block-size`) dans tout nouveau code. Densite par attribut `data-density`, pas de classes paralleles.
- Pas de `!important`, pas de selecteur d'identifiant, specificite maximale 0,2,0 dans les recettes via `:where()`.
- Identifiants de token, de categorie et de role en anglais, dans un vocabulaire ferme. Durees nommees par role (`state`, `panel`), pas par composant.
- Themes : light, dark, slate, oled, ocean, night, high-contrast. `dim` est un alias de `dark`. `system` est une preference resolue a l'execution dans `packages/ui`, jamais un theme CSS. La liste des themes se lit du dossier `themes/` par un glob, jamais d'une liste recopiee.
- Tokens deprecies et alias existants : ne jamais les utiliser dans du code nouveau, ne jamais changer la cible d'un alias. On migre les usages. Ils disparaissent avec l'ancien systeme en phase 3.

### O3.4 Contraste
WCAG 2.2 AA : 4,5:1 pour le texte, 3:1 pour les composants UI, pas d'APCA. Une valeur ne descend jamais sous son seuil ; le theme high-contrast a des seuils propres qui interdisent toute regression. Viser une marge (environ 3,3 pour un seuil de 3), pas le minimum. Les bordures de controle au repos atteignent 3:1 (WCAG 1.4.11) et un controle a bordure a toujours un fond opaque.

## O4. Composants React

- Une classe de base prefixee par composant (`.mr-button`, `.mr-input`...). Variantes et etats via attributs `data-*` (`[data-variant]`, `[data-size]`, `[data-state]`).
- Les modificateurs BEM (`.mr-btn--primary`) sont en cours de suppression : ne pas en ajouter.
- Anatomie : `Component.tsx`, `Component.types.ts`, `Component.test.tsx`, `index.ts`. Un nouveau composant public est aussi ajoute a `tsup.config.ts`, aux `exports` de `packages/ui/package.json` et aux tests d'exports.
- Etat controle ou non controle : `useControllableState` (`src/internal/`), pas de reimplementation locale.
- React 19 uniquement : `ref` est une prop standard, `forwardRef` n'est pas utilise dans du code nouveau.
- TypeScript strict. Pas de `any`, pas d'index signature `[key: string]: any`, pas de cast pour faire taire le compilateur.
- Accessibilite : roles implicites plutot qu'explicites redondants ; les tests verifient le comportement accessible (`getByRole`), pas les details d'implementation.

## O5. Regles du package publie

Tout ce qui part sur npm doit fonctionner chez un consommateur qui n'a pas ce monorepo.

- Aucun fichier de `dist/` ne reference un chemin hors du package.
- Pas de condition d'export pointant vers `./src` en dehors de `monority-source`, reservee au monorepo.
- Code partage entre points d'entree : jamais duplique (`splitting: true`). Un contexte React n'est defini qu'une fois dans tout le `dist/`.
- Detection de la production : uniquement la forme litterale `process.env.NODE_ENV`, jamais via `globalThis`.
- Ne pas imposer de styles globaux ni de noms generiques (couches, classes) qui entrent en collision avec l'application hote.

## O6. Fichiers generes et build

- Ordre : `styles -> ui -> web`, declare par les dependances workspace ; turbo l'applique.
- `apps/web` consomme le CSS construit de `@monority/ui`. Avant de conclure qu'un changement visuel fonctionne, le verifier par `getComputedStyle` dans le navigateur, pas seulement dans le code.
- Si du code TypeScript consomme les noms de tokens, un `tokens.d.ts` est genere depuis le CSS par un script de 30 lignes maximum. Sinon, il n'existe pas. Ne jamais modifier un fichier genere : modifier sa source.

## O7. Controles : budget strict

`pnpm verify` contient 8 etapes au plus, dans cet ordre fixe, arret au premier echec :
1. typecheck
2. lint JS/TS
3. Stylelint : pas de valeur brute hors `tokens/ref.css` et `themes/`, nommage `--mr-*` derive d'un seul fichier de vocabulaire, interdiction de regle hors couche et de selecteur global hors reset et base
4. test de contraste : lit les themes CSS, calcule les paires text/bg, text/border, danger et accent pour chaque theme, echoue sous WCAG AA
5. build du CSS
6. tests unitaires
7. tests du build : le CSS publie contient les 7 themes et l'alias `dim`, aucune variable referencee sans definition
8. audit de references : toute `var(--mr-*)` lue dans une recette est definie dans les tokens ou les themes

Regles :
- Aucune etape n'est ajoutee sans accord ecrit.
- Interdits : detecteurs de listes, tests de parite de listes, cliquets, registres, audits de graphe, scripts qui controlent d'autres scripts. Si une porte echoue, on corrige la cause, on ne construit pas une autre porte.
- Un nouveau controle est teste en negatif : une fixture qui prouve qu'il echoue quand la regle est violee.
- Ne pas abaisser un seuil, desactiver une regle ou ajouter une exception pour faire passer un controle sans le justifier dans le rapport.

## O8. Git et travail en sessions

- Ne jamais pousser ni fusionner directement sur `main`. Tout travail passe par une branche et une PR revue. La branche `refactor/css-foundation` n'ouvre aucune PR vers `main` avant la Definition of Done du chantier : `release.yml` publie sur npm via changesets.
- Plusieurs sessions peuvent travailler dans le meme worktree. Stager par liste de chemins, jamais `git add .` ni `git add -A`. Verifier l'index (`git diff --cached --stat`) avant chaque commit.
- Ne jamais modifier, formater ou commiter un fichier qu'on n'a pas soi-meme modifie dans la tache. Fichiers a ne pas toucher sans instruction : `.gitignore`, `prompt.md`, `docs/audit-hardening-prompt.md`.
- Interdits sans instruction explicite : `git reset --hard`, `git clean`, `git push --force`, reecriture d'historique, `git add -f`.
- Un commit par sujet, atomique et reversible seul, message au format `type(portee): description` en francais (`fix`, `feat`, `refactor`, `build`, `ci`, `test`, `docs`, `style`, `lint`). Le message passe par `git commit -F fichier`, jamais par des `\n` litteraux. Pas de commit en rouge. Un commit de formatage ne contient que du formatage.
- Renommer un fichier en changeant seulement la casse (Windows) : `git mv A tmp && git mv tmp a`.
- Fins de ligne LF (`.gitattributes`). Ne pas commiter de BOM. Ne pas ecrire d'octet de controle dans un fichier de decision ou de documentation.
- Etat de session : un seul fichier, la section `## Reprise` de `PLAN.md` (30 lignes maximum), reecrite a chaque fin de commit vert. Pas de `HANDOFF.md`. Contexte presque epuise : finir le commit en cours, mettre `## Reprise` a jour, pousser, le dire.
- N'executer que l'etape demandee. Si une decision marquee `[DECISION]` n'est pas tranchee, s'arreter et demander.

## O9. Methode

- Ne rien inventer : comportement, API, decision produit, resultat de test. Inspecter le depot ; si l'ambiguite persiste, demander.
- Pas de hors-perimetre : une amelioration reperee hors tache est signalee dans le rapport, pas implementee.
- Pas de systeme en double : chercher l'existant avant de creer un composant, hook, utilitaire, token ou test. Un seul moyen evident par responsabilite.
- Avant de supprimer un fichier ou un symbole : `git grep` pour prouver qu'il n'est plus utilise. Pour un diagnostic de lint, lire la ligne et la colonne.
- Aucun changement de rendu non annonce : montrer l'avant et l'apres dans le message de commit, et attendre validation pour les ecarts non triviaux.
- Preuves plutot qu'affirmations : "compile" n'est pas "fonctionne". Un changement visuel se verifie dans le navigateur, une performance se mesure. Aucun chiffre sans mesure : citer la commande. Verifier ses comptes par une commande avant de les ecrire.
- Corriger a la source, mesurer ce que le commit exige et rien de plus : pas de re-scan large pour confirmer un chiffre deja consigne.
- Un seul rapport par phase terminee, pas par sous-etape. S'arreter uniquement sur un echec de `pnpm verify` dont la cause est introuvable, sur un conflit avec ce fichier ou avec une decision figee, ou a la fin d'une phase. Ne pas demander confirmation d'un choix reversible.

## O10. Rapport de fin de tache

Court et factuel. Prose et puces, aucun tableau, meme quand un plan ou un gabarit externe en impose un. Contenu :
- Fait : hashes des commits, plage poussee
- Preuve : commandes et resultats, y compris le nombre reel d'etapes de `pnpm verify`
- Valeurs reconstruites ou construites faute d'historique, ecarts de rendu annonces, decisions prises seul
- Objections et risques
- Ce qui n'a pas ete fait et pourquoi, questions fermees uniquement
- Ameliorations reperees hors perimetre
- Prochaine action

Ne mentionner que les verifications reellement effectuees. Relire le rapport avant envoi : pas de faute de frappe, pas de nombre colle a son unite, pas de commit annonce "de cette session" qui date d'une session precedente.

