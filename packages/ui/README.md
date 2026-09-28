# @monority/ui

A React component library for the Monority design system.

## Installation

```bash
pnpm add @monority/ui
```

## Usage

```tsx
import { Button } from '@monority/ui'
import '@monority/ui/styles.css'

function App() {
  return <Button variant="primary">Click me</Button>
}
```

### Layers et ordre de priorité

La librairie publie ses styles dans des layers préfixées `monority.*`. Tous les
sublayers vivent sous le parent `monority` : il suffit à l'application de
déclarer ce parent à sa place dans son propre ordre (exemple Tailwind) :

```css
/* Entrée de l'application, avant tout import de styles */
@layer theme, base, monority, components, utilities;

@import 'tailwindcss';
@import '@monority/ui/styles.css';
```

Ordre interne (du plus faible au plus fort) : `monority.reset`, `monority.tokens`,
`monority.base`, `monority.recipes`, `monority.components`, `monority.utilities`,
`monority.overrides`. Le CSS de l'hôte garde toujours le dernier mot sur les
classes de la librairie (spécificité nulle sur les règles de portée).

### Reset et utilitaires (opt-in)

`@monority/ui/styles.css` ne contient ni reset global ni utilitaires : les
composants sont autonomes (box-sizing, police des contrôles et marges des
titres sont fournis par une portée `mr-`). Importez ce que vous voulez en plus :

```tsx
import '@monority/ui/reset.css' // préoccupations de page : html/body, images
import '@monority/ui/utilities.css' // helpers mr-surface, mr-cluster, mr-stack-*
import '@monority/ui/styles.css'
```

### Server Components (React Server Components)

Le code serveur de la librairie n'est jamais marqué `"use client"` :

```tsx
// Server Component — injecte le thème avant le premier rendu
import { getThemeScript } from '@monority/ui/get-theme-script'
// ou : import { getThemeScript } from '@monority/ui'

const script = getThemeScript()
```

Les helpers purs (`cn`, `cva`, constantes, design config) sont disponibles via
`@monority/ui/lib`, et les barrels (`./components`, `./hooks`, `./providers`,
`./primitives`) restent hors bannière : seuls les fichiers qui utilisent React
sont marqués `"use client"`.

## Development

In the monorepo, the package resolves from source automatically via `development` export conditions.

```bash
# Build for production
pnpm --filter @monority/ui build

# Type checking
pnpm --filter @monority/ui typecheck
```

## Exports

`.` is the main barrel. Every component also has a subpath export for
tree-shaking (74 total, mirroring `package.json` `exports`):

Barrels et entrées de librairie : `./components`, `./hooks`, `./lib`,
`./primitives`, `./providers`, `./get-theme-script` (server-safe).

| Path | Path |
|---|---|
| `./accordion` | `./alert-dialog` |
| `./aspect-ratio` | `./avatar` |
| `./badge` | `./banner` |
| `./breadcrumb` | `./button` |
| `./calendar` | `./callout` |
| `./card` | `./carousel` |
| `./checkbox` | `./collapsible` |
| `./combobox` | `./command-palette` |
| `./container` | `./context-menu` |
| `./copy-button` | `./data-list` |
| `./data-table` | `./date-picker` |
| `./date-range-picker` | `./divider` |
| `./drawer` | `./dropdown-menu` |
| `./empty-state` | `./field` |
| `./file-upload` | `./filter-bar` |
| `./form-section` | `./grid` |
| `./hover-card` | `./icon-button` |
| `./infinite-scroll` | `./inline-alert` |
| `./input` | `./kbd` |
| `./menubar` | `./metric-grid` |
| `./modal` | `./navigation-menu` |
| `./number-input` | `./page-header` |
| `./pagination` | `./password-input` |
| `./pre-code` | `./progress` |
| `./radio-group` | `./resizable` |
| `./scroll-area` | `./section` |
| `./select` | `./separator` |
| `./sidebar-layout` | `./skeleton` |
| `./slider` | `./spinner` |
| `./stack` | `./stat-card` |
| `./switch` | `./table` |
| `./tabs` | `./text` |
| `./textarea` | `./title` |
| `./toast` | `./toggle` |
| `./toggle-group` | `./toolbar` |
| `./tooltip` | `./topbar` |
| `./async-state-notice` | `./popover` |
| `./styles.css` | `./index.css` |
| `./reset.css` | `./utilities.css` |

```tsx
import { Button } from '@monority/ui/button'
import { Input } from '@monority/ui/input'
import '@monority/ui/styles.css'
```

## Styling Contract

- Import one CSS file once in the app entry (`@monority/ui/styles.css`).
- Declare the `monority` layer at its place in the app order (see Layers above);
  components never impose global element styles.
- The reset is opt-in: import `@monority/ui/reset.css` explicitly (see above).
- The utility classes are opt-in too: import `@monority/ui/utilities.css` and use the `mr-` prefixed classes (`mr-surface`, `mr-cluster`, `mr-between`, `mr-stack-xs|s|m|l|xl`). Nothing generic (`.container`, `.grid`, `.section`, `.stack`) ships in the main bundle.
- Component CSS ships with this package (built from `packages/styles` CSS recipes into `dist/index.css`).
- Public CSS hooks use the `mr-` prefix.
- Prefer stable `data-*` hooks for variants and states.

## Publishing

```bash
pnpm --filter @monority/ui publish
```
