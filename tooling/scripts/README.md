# Monority Scripts

Scripts utilitaires pour le développement du monorepo.

## Scripts disponibles

### `pnpm validate`

Valide la cohérence du monorepo (`validate.js`, à la racine du dépôt via le script `validate`) :

- vérifie les métadonnées de `@monority/ui` (package.json)
- vérifie l'alignement entre `exports` et `tsup.config.ts`
- vérifie les fichiers de `dist/` (JS, DTS, `index.css`)
- vérifie la porte `files` (pas de `src`, `dist` présent)
- lance les tests de contrat (`exports.contract`, `type-smoke`)

```bash
pnpm validate
```

**Codes de sortie :**

- `0` — toutes les validations passent
- `1` — erreurs trouvées

## Générateur de composant

Les scripts de génération (`generate:component`, `sync:showcase`, `smoke`) vivent dans
`tooling/generators/` :

```bash
pnpm --filter @monority/generators generate:component Button
pnpm --filter @monority/generators sync:showcase
```

## Intégration CI/CD

`validate.js` est un fichier Node.js standard, utilisable directement dans un pipeline :

```yaml
# Exemple GitHub Actions
- name: Validate monorepo
  run: pnpm validate
```
