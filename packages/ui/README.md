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

| Path | Description |
|---|---|
| `.` | Component entry point |
| `./button` | Button component |
| `./input` | Input component |
| `./badge` | Badge component |
| `./card` | Card component |
| `./modal` | Modal component |
| `./styles.css` | All styles (tokens + base + components) |
| `./index.css` | Compatibility CSS export |

```tsx
import { Button } from '@monority/ui/button'
import { Input } from '@monority/ui/input'
import '@monority/ui/styles.css'
```

## Styling Contract

- Import one CSS file once in the app entry.
- Component CSS is owned by `@monority/styles` and published through this package.
- Public CSS hooks use the `mr-` prefix.
- Prefer stable `data-*` hooks for variants and states.

## Publishing

```bash
pnpm --filter @monority/ui publish
```
