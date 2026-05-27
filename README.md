# Monority

[![npm version](https://img.shields.io/npm/v/@monority/ui)](https://www.npmjs.com/package/@monority/ui)
[![CI](https://github.com/monority/ui/actions/workflows/ci.yml/badge.svg)](https://github.com/monority/ui/actions)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

A premium React component library with design system, dark mode, and 48 beautifully crafted UI components.

## Installation

```bash
pnpm add @monority/ui
```

### Import components

```tsx
import { Button, Modal, Tabs } from '@monority/ui'
```

### Import styles

```tsx
import '@monority/ui/styles.css'
```

### Tree-shaking

```tsx
import { Button } from '@monority/ui/button'
```

## Components

### Actions (3)
`Button` `CopyButton` `IconButton`

### Forms (16)
`Checkbox` `Combobox` `DatePicker` `DateRangePicker` `Field` `FileUpload` `FormSection` `Input` `NumberInput` `PasswordInput` `RadioGroup` `SearchInput` `Select` `Slider` `Switch` `Textarea`

### Typography (2)
`Text` `Title`

### Display (6)
`Accordion` `Avatar` `Card` `MetricGrid` `StatCard` `Table`

### Data Display (2)
`DataList` `DataTable`

### Feedback (10)
`AsyncStateNotice` `Badge` `Banner` `Callout` `EmptyState` `InlineAlert` `Progress` `Skeleton` `Spinner` `Toast`

### Layout (7)
`Container` `Divider` `Grid` `PageHeader` `Section` `Stack` `Toolbar`

### Navigation (6)
`Breadcrumb` `FilterBar` `Pagination` `SidebarLayout` `Tabs` `Topbar`

### Overlays (7)
`AlertDialog` `CommandPalette` `Drawer` `DropdownMenu` `Modal` `Popover` `Tooltip`

### Experimental (1)
`InfiniteScroll`

## Design Philosophy

Monority follows a **utility-first design token system** — every visual property is defined by a token, not a hardcoded value. Components are built with `cva` (class-variance-authority) for variants, `data-*` attributes for CSS targeting, and `forwardRef` for form library compatibility. Dark mode is supported out of the box via CSS custom properties.

## Quick Start

```bash
pnpm install
pnpm dev          # Start documentation site
pnpm build        # Build all packages
pnpm test         # Run all tests
pnpm lint         # Lint all packages
```

## Project Structure

```
monority/
├── apps/
│   ├── web/          # Documentation & showcase site
│   └── docs/         # Documentation (Next.js)
├── packages/
│   ├── ui/           # Core component library
│   ├── tokens/       # Design tokens
│   ├── styles/       # CSS source (recipes, base, themes)
│   ├── eslint-config/
│   └── typescript-config/
├── tooling/
│   ├── generators/   # Component generator
│   └── scripts/      # Utility scripts
└── docs/             # Conventions & release guide
```

## Documentation

- [Component docs](https://monority.dev) (local: `pnpm dev`)
- [Conventions](./docs/conventions.md) — engineering standards
- [Release checklist](./docs/release-checklist.md) — pre-release process

## Requirements

- Node.js >= 20
- pnpm >= 9.0.0
- React >= 19
