# Release Checklist

## Pre-release

- [ ] `pnpm build` — Build all packages
- [ ] `pnpm test` — All tests pass (485/485)
- [ ] `pnpm typecheck` — Zero type errors
- [ ] `pnpm lint` — No lint errors
- [ ] `pnpm pack --dry-run` — Verify package contents
- [ ] Check exports map completeness (48 components)
- [ ] Check CSS bundle (`dist/index.css`) includes all layers
- [ ] Verify sub-path imports work: `import { X } from '@monority/ui/x'`

## Versioning

- [ ] Create changeset: `pnpm changeset`
- [ ] Select version bump (major/minor/patch per semver)
- [ ] Review generated changelog entries
- [ ] Run `pnpm version` to apply version bumps
- [ ] Commit version changes

## Publishing

```bash
pnpm build
pnpm release  # runs: build → changeset publish
```

- [ ] Verify npm package: `npm view @monority/ui`
- [ ] Verify GitHub Release created
- [ ] Verify git tags pushed

## Post-release

- [ ] Update documentation site with new version
- [ ] Verify CSS imports work in consuming project
- [ ] Verify tree-shaking works in consuming project
- [ ] Announce release

## CI Pipeline

- `ci.yml` — Runs on push/PR: build → typecheck → test → lint
- `release.yml` — Runs on push to main: creates PR or publishes via changesets/action
