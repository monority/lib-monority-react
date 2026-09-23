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

```tsx
import { Button } from '@monority/ui/button'
import { Input } from '@monority/ui/input'
import '@monority/ui/styles.css'
```

## Styling Contract

- Import one CSS file once in the app entry (`@monority/ui/styles.css`).
- Component CSS ships with this package (built from `packages/styles` CSS recipes into `dist/index.css`).
- Public CSS hooks use the `mr-` prefix.
- Prefer stable `data-*` hooks for variants and states.

## Publishing

```bash
pnpm --filter @monority/ui publish
```
