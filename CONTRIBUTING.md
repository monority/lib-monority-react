# Contributing to Monority

## Setup

```bash
git clone <repo>
pnpm install
pnpm dev
```

## Development

- Components live in `packages/ui/src/components/<category>/<name>/`
- CSS recipes live in `packages/styles/src/recipes/`
- Docs live in `apps/web/src/docs/components/<name>/`

## Component Generator

```bash
pnpm generate:component <ComponentName>
```

## Pull Request Process

1. Create a feature branch from `main`
2. Implement your changes
3. Run `pnpm typecheck && pnpm test && pnpm lint`
4. Create a changeset: `pnpm changeset`
5. Open a PR against `main`

## Conventions

See [docs/conventions.md](./docs/conventions.md) for full engineering standards.

## License

MIT
