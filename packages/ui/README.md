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
| `./styles.css` | All styles (tokens + base + components) |
| `./index.css` | Bundled styles from component imports |

## Publishing

```bash
pnpm --filter @monority/ui publish
```
