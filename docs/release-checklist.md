# Release Checklist

## Pre-release

- [ ] `pnpm build` — UI and web builds pass
- [ ] `pnpm test` — All tests green (UI: 1063+, Web: 59+)
- [ ] `pnpm typecheck` — Zero TypeScript errors
- [ ] `pnpm lint` — No lint errors
- [ ] `pnpm --filter @monority/ui pack --dry-run` — Verify tarball contents
- [ ] Export contract green (`pnpm --filter @monority/ui test` includes dynamic export test)
- [ ] Dist health green (`pnpm --filter @monority/web test` includes build-contract test)
- [ ] Consumer fixture passes: `cd packages/ui/fixtures/consumer && pnpm check && pnpm check:runtime`
- [ ] Documentation updated (registry, meta, import paths)

## Versioning

- [ ] Create changeset: `pnpm changeset`
- [ ] Select version bump per SemVer policy:
  - **patch** — bug fixes, doc updates, no API change
  - **minor** — new components, new props, new exports, backward-compatible behaviour changes
  - **major** — removed/broken exports, renamed props, breaking ARIA or runtime changes
- [ ] Review generated changelog entries
- [ ] Run `pnpm version` to apply version bumps
- [ ] Commit version changes

## Package validation (local)

```bash
# Build from clean state
pnpm --filter @monority/ui clean && pnpm --filter @monority/ui build

# Generate tarball
pnpm --filter @monority/ui pack

# Inspect contents (should contain dist/ + package.json + README, no src/tests)
tar -tzf monority-ui-*.tgz | head -20

# Install into external consumer
mkdir /tmp/test-consumer && cd /tmp/test-consumer
cat > package.json <<'EOF'
{"name":"test","private":true,"dependencies":{"@monority/ui":"file:PATH/TO/tarball","react":"19","react-dom":"19"},"devDependencies":{"typescript":"5","@types/react":"19","@types/react-dom":"19"}}
EOF
pnpm install && npx tsc --noEmit && echo "Consumer typecheck: PASS"
```

## Publishing

```bash
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

## SemVer Policy

| Change type | Bump |
|-------------|------|
| Bug fix, doc update, test addition | patch |
| New component, new prop, new export, new hook | minor |
| Removed/renamed export, breaking prop change, ARIA contract change | major |
| Dependency version bump (peerDeps) | patch (if compatible) / major (if breaking) |

The package is pre-1.0 (`0.1.0`). During `0.x`, minor bumps may introduce breaking changes;
communicate this in CHANGELOG. Target `1.0.0` when the public API is considered stable.
