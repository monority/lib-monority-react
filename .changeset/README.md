# Changesets

Seul `@monority/ui` est publie sur npm. Les autres packages du monorepo
sont prives et listes dans `ignore` (voir `config.json`).

Workflow :

```bash
pnpm changeset        # decrire une modification de @monority/ui
pnpm version          # applique les versions + met a jour le CHANGELOG
pnpm release          # publie
```

Le workflow `.github/workflows/release.yml` tourne `changesets/action` a chaque
push sur `main` : sans changeset en attente, aucune PR de version n'est
ouverte. Le workflow degrade proprement tant que la premiere publication
n'a pas eu lieu.
