# Monority

[![npm version](https://img.shields.io/npm/v/@monority/ui)](https://www.npmjs.com/package/@monority/ui)
[![CI](https://github.com/monority/lib-monority-react/actions/workflows/ci.yml/badge.svg)](https://github.com/monority/lib-monority-react/actions)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

A premium React component library with design system, dark mode, and 74 component subpath exports (plus the main barrel and CSS).

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
`Button` `Toggle` `ToggleGroup`

`CopyButton` and `IconButton` are exported too and redirect to the Button page.

### Forms (14)
`Calendar` `Checkbox` `Combobox` `DatePicker` `DateRangePicker` `Field` `FileUpload` `FormSection` `Input` `RadioGroup` `Select` `Slider` `Switch` `Textarea`

`NumberInput` and `PasswordInput` are exported too and redirect to the Input page.

### Typography (4)
`Kbd` `PreCode` `Text` `Title`

### Display (8)
`Accordion` `Avatar` `Card` `Carousel` `Collapsible` `MetricGrid` `StatCard` `Table`

### Data Display (2)
`DataList` `DataTable`

### Feedback (10)
`AsyncStateNotice` `Badge` `Banner` `Callout` `EmptyState` `InlineAlert` `Progress` `Skeleton` `Spinner` `Toast`

### Layout (11)
`AspectRatio` `Container` `Divider` `Grid` `PageHeader` `Resizable` `ScrollArea` `Section` `Separator` `Stack` `Toolbar`

### Navigation (8)
`Breadcrumb` `FilterBar` `Menubar` `NavigationMenu` `Pagination` `SidebarLayout` `Tabs` `Topbar`

### Overlays (9)
`AlertDialog` `CommandPalette` `ContextMenu` `Drawer` `DropdownMenu` `HoverCard` `Modal` `Popover` `Tooltip`

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
│   └── web/          # Documentation & showcase site
├── packages/
│   ├── ui/           # Core component library
│   ├── tokens/       # Design tokens
│   └── styles/       # CSS source (recipes, base, themes)
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
