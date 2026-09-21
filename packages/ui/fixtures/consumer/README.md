# `@monority/ui` consumer fixture

External-consumer validation for the **built** `@monority/ui` package.

## Contract

- Resolves exclusively through `packages/ui/package.json` `exports`
  against `packages/ui/dist` — no alias to `packages/ui/src`.
- This directory is **not** part of the pnpm workspace
  (`pnpm-workspace.yaml` only matches `packages/*`), so it installs and
  resolves exactly like an external project.

## Validate

```bash
cd packages/ui/fixtures/consumer
pnpm install --ignore-workspace   # standalone: never the monorepo workspace
pnpm check          # tsc over public imports (root + subpaths + CSS)
pnpm check:runtime  # node resolution + symbols + single React copy
```

## Tarball validation

```bash
pnpm --filter @monority/ui pack        # produces monority-ui-*.tgz
# point the fixture at the tarball temporarily:
pnpm --dir packages/ui/fixtures/consumer add file:../../../../monority-ui-0.1.0.tgz
cd packages/ui/fixtures/consumer && pnpm install && pnpm check && pnpm check:runtime
```

Restore `file:../..` afterwards — the fixture must keep tracking the
live package directory.
