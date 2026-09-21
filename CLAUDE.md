# Monority React — Session Memory

## Dernières sessions

### 2026-06-04 — Textarea placeholder padding fix ✅
- Fix padding-block manquant sur le variant `md` (placeholder colle en haut)
- 2 fichiers CSS modifies, 22/22 tests, build OK
- [Note vault](https://obsidian://open?vault=Obsidian%20Vault&file=dev-actual%2F2026-06-04%20Session%20Monority%20-%20Textarea%20Harmonization)

### 2026-06-04 — Step 14: Visual Polish ✅
- Tighten space scale 25% (more compact rhythm)
- Refine semantic colors: danger/warning more readable, softer soft variants
- Field gap + input font-size + card padding tightened
- Switch/Toggle: add prefers-reduced-motion guard
- 7 fichiers CSS, 1063 UI + 59 web tests pass, consumer PASS
- Commit: 00b37f6

### 2026-06-03 — Textarea Harmonization ✅
- Harmonisation complète avec les patterns Callout/Section/Button
- 4 fichiers modifiés, 22/22 tests, build OK
- **Leçons** : `children` ≠ defaultValue dans Textarea (rendu via Field)
- [Note vault](https://obsidian://open?vault=Obsidian%20Vault&file=dev-actual%2F2026-06-03%20Session%20Monority%20-%20Textarea%20Harmonization)

### 2026-06-03 — Section Rework ✅
- Rework complet : 13 problèmes adressés, 11 fichiers modifiés
- `as: ElementType`, `titleAs`, `data-*` selectors dans CSS
- Status `draft` → `stable`
- [Note vault](https://obsidian://open?vault=Obsidian%20Vault&file=dev-actual%2F2026-06-03%20Session%20Monority%20-%20Callout%20%26%20Section%20Rework)

### 2026-06-03 — Callout Rework + Recommendations ✅
- Rework complet Callout + token `--mr-font-weight-semibold` (30 fichiers mis à jour)
- Status `draft` → `stable`
- [Note vault](https://obsidian://open?vault=Obsidian%20Vault&file=dev-actual%2F2026-06-03%20Session%20Monority%20-%20Callout%20%26%20Section%20Rework)

## Conventions du projet (apprises pendant les reworks)
- `cva()` ne filtre pas `undefined` → garder les defaults dans la destructuration
- `title != null` plutôt que `title &&` pour les `ReactNode`
- `as: ElementType` pour le polymorphisme (pas de union fermée)
- Tout `data-*` dans le JSX doit avoir son sélecteur `[data-*]` dans le CSS
- Doc import path : toujours `@monority/ui/nom-composant`
- cssHooks et tokens dans la doc : toujours vérifiés contre le CSS réel
- `children` d'un Field n'est pas la valeur d'un textarea/input — utiliser defaultValue/value
- Toujours verifier le `padding-block` sur les `<textarea>` (pas de padding vertical natif)

## Prochains composants à harmoniser (potentiels)
- [ ] Input (même pattern que Textarea)
- [ ] FormSection
- [ ] Tous les composants encore en `draft`

## Release Workflow

```bash
# 1. Validate package health
node tooling/scripts/validate.js

# 2. Build + test + typecheck
pnpm build && pnpm test && pnpm typecheck

# 3. Create changeset (before PR merge)
pnpm changeset

# 4. On merge, release.yml publishes automatically via changesets/action
# Or manually: pnpm release
```

**SemVer policy**: patch = bug fixes; minor = new components/props/exports; major = breaking changes.

**Release readiness checklist**: see `docs/release-checklist.md`.

**Changelog**: `CHANGELOG.md` at repo root. Updates via `pnpm changeset`.

---

## Test Taxonomy

Tests are organised by responsibility. Future contributors should place new tests in the matching category:

| Layer | Location | Purpose |
|-------|----------|--------|
| **Unit** | `packages/ui/src/components/<comp>/<Comp>.test.tsx` | Implementation behaviour, edge cases, internal state |
| **Contract** | `packages/ui/src/__tests__/public-api.contract.test.tsx` | Public API invariants (void-element safety, form-family parity, data-size, a11y names) |
| **Type smoke** | `packages/ui/src/__tests__/type-smoke.test.tsx` | Compile-time type shape guard (types must stay importable) |
| **Export contract** | `packages/ui/src/__tests__/exports.contract.test.tsx` | Dynamic: every package.json export resolves at runtime |
| **Adoption** | `packages/ui/src/__tests__/step11-adoption.test.tsx` | End-to-end consumer journey (render, interact, ref, controlled/uncontrolled) |
| **Docs contract** | `apps/web/src/docs/step09-import-contract.test.ts` | Docs↔registry↔exports alignment |
| **Docs contract** | `apps/web/src/docs/step10-docs-contract.test.ts` | Doc props match types, importCode subpaths valid |
| **Build contract** | `apps/web/src/docs/step12-build-contract.test.ts` | Dist files exist, tsup↔package.json aligned |

**Rule**: if a change touches a public prop, add or update a test in *Contract* or *Adoption*. If it changes types, add a *Type smoke* assertion. If it changes exports, the *Export contract* test will catch it automatically.
