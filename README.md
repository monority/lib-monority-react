# Monority

A premium React component library with design system, dark mode, and beautiful UI components.

## Structure

```
monority/
├── apps/
│   ├── web/          # Documentation & showcase site
│   └── docs/         # Documentation (Next.js)
├── packages/
│   ├── ui/           # Core component library
│   ├── tokens/       # Design tokens
│   ├── icons/        # Icon library
│   ├── eslint-config/
│   ├── typescript-config/
│   └── tailwind-config/
└── tooling/
    ├── scripts/      # Utility scripts
    ├── generators/   # Component generators
    └── codemods/     # Code transformations
```

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test
```

## Packages

### @monority/ui

The core component library.

```bash
pnpm add @monority/ui
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build all packages
- `pnpm test` - Run all tests
- `pnpm lint` - Lint all packages
- `pnpm generate:component <Name>` - Generate a new component

## Requirements

- Node.js >= 20
- pnpm >= 9.0.0
