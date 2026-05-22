# Monority Scripts

Scripts utilitaires pour le développement du monorepo.

## Scripts disponibles

### `npm run generate:component <ComponentName>`

Génère un nouveau composant UI avec tous les fichiers associés.

```bash
# Créer un nouveau composant avec tout
npm run generate:component Button

# Créer sans fichier de test
npm run generate:component DatePicker --no-test

# Créer sans section showcase
npm run generate:component InternalHelper --no-showcase
```

**Fichiers créés:**
- `packages/monority-ui/src/components/ui/<ComponentName>.jsx` - Le composant
- `packages/monority-ui/src/components/ui/<ComponentName>.test.jsx` - Les tests (si activé)
- `packages/monority-web/src/features/showcase/sections/Showcase<ComponentName>Section.jsx` - La section showcase (si activé)

**Fichiers mis à jour:**
- `packages/monority-ui/src/components/ui/index.js` - Ajoute l'export
- `packages/monority-web/src/features/showcase/content/showcase-content.js` - Ajoute au catalogue
- `packages/monority-web/src/features/showcase/ShowcasePage.jsx` - Ajoute la section

### `npm run sync:showcase`

Compare les composants UI avec les sections showcase et signale les manquants.

```bash
npm run sync:showcase
```

Utile pour identifier les composants qui n'ont pas encore de section showcase.

### `npm run validate`

Valide la cohérence du monorepo:
- Vérifie que tous les composants sont exportés
- Vérifie que tous les composants ont une section showcase
- Signale les sections showcase orphelines
- Signale les composants sans tests

```bash
npm run validate
```

**Codes de sortie:**
- `0` - Toutes les validations passent
- `1` - Erreurs trouvées

## Intégration CI/CD

Le script `validate.js` peut être utilisé dans vos pipelines CI:

```yaml
# Exemple GitHub Actions
- name: Validate monorepo
  run: npm run validate
```

## Intégration pre-commit (Husky)

```bash
# .husky/pre-commit
npm run validate
```

## Utilisation avec d'autres outils

Ces scripts sont des fichiers Node.js standards qui peuvent être utilisés avec:
- NPM scripts
- Husky (git hooks)
- GitHub Actions / GitLab CI / etc.
- VS Code tasks
- N'importe quel IDE ou outil d'automatisation
