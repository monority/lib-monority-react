# Status de la Réorganisation Monority

## Date: 20/05/2026

## Structure Cible

```
monority/
├── .github/workflows/     # CI/CD
├── .changeset/            # Versioning
├── apps/
│   ├── web/               # Site vitrine (Vite + React)
│   └── docs/              # Documentation (à créer)
├── packages/
│   ├── ui/                # Librairie de composants
│   ├── tokens/            # Design tokens
│   ├── icons/             # Icônes
│   ├── eslint-config/
│   ├── typescript-config/
│   └── tailwind-config/
├── tooling/
│   ├── scripts/           # Scripts utilitaires
│   ├── generators/        # Générateurs de composants
│   └── codemods/
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── biome.json
└── README.md
```

## ✅ Actions Complétées

### Structure de base
- [x] Création de la structure de dossiers `apps/`, `packages/`, `tooling/`
- [x] Création des sous-dossiers dans `packages/ui/src/` (components, core, design-system, etc.)
- [x] Création des catégories de composants (actions, forms, overlays, navigation, feedback, display, layout)

### Configurations
- [x] `package.json` racine avec workspaces pnpm
- [x] `pnpm-workspace.yaml`
- [x] `turbo.json`
- [x] `biome.json` (linter/formatter)
- [x] `.gitignore` mis à jour
- [x] `.changeset/config.json`
- [x] `.github/workflows/ci.yml`
- [x] `packages/ui/package.json`
- [x] `packages/ui/tsconfig.json`
- [x] `packages/ui/tsup.config.ts`
- [x] `packages/ui/vitest.config.ts`
- [x] `apps/web/package.json`
- [x] `apps/web/tsconfig.json`
- [x] `apps/web/vite.config.ts`

### Fichiers Index
- [x] `packages/ui/src/index.ts`
- [x] `packages/ui/src/components/index.ts`
- [x] Index pour chaque catégorie (actions, forms, overlays, etc.)
- [x] `packages/ui/src/core/hooks/index.ts`
- [x] `packages/ui/src/core/providers/index.ts`
- [x] `packages/ui/src/core/config/index.ts`

### README
- [x] `README.md` racine
- [x] `packages/ui/README.md`

## ⚠️ En Cours / À Finaliser

### Déplacement des composants
Les composants n'ont pas été entièrement déplacés dans les sous-dossiers de catégorie.
Fichiers restants à la racine de `packages/ui/src/components/`:
- `AlertDialog.test.jsx`
- `Banner.jsx`
- `CommandPalette.test.jsx`
- `CopyButton.jsx`
- `DateRangePicker.jsx` + test
- `Drawer.test.jsx`
- `Field.tsx`
- `InlineAlert.jsx`
- `Input.tsx`
- `MetricGrid.jsx`
- `Modal.test.jsx`
- `NumberInput.test.jsx`
- `PasswordInput.jsx` + test
- `SearchInput.jsx` + test
- `Title.jsx`
- `Toast.test.jsx`

### Actions Requises
1. Déplacer chaque fichier vers son dossier de catégorie approprié
2. Renommer les fichiers `.jsx` en `.tsx` pour TypeScript
3. Mettre à jour les imports dans chaque composant
4. Créer les fichiers `index.ts` dans chaque sous-dossier de composant
5. Supprimer l'ancien dossier `packages/monority-ui` s'il existe encore
6. Supprimer l'ancien dossier `packages/monority-web` s'il existe encore

## 📝 Mapping des Composants vers Catégories

| Composant | Catégorie | Dossier cible |
|-----------|-----------|---------------|
| Button, IconButton, CopyButton | actions | `actions/button/`, `actions/icon-button/` |
| Input, Textarea, Checkbox, Switch, Select | forms | `forms/input/`, `forms/checkbox/`, etc. |
| Modal, Drawer, Popover, Tooltip | overlays | `overlays/modal/`, `overlays/drawer/`, etc. |
| Tabs, Breadcrumb, Pagination | navigation | `navigation/tabs/`, etc. |
| Toast, Progress, Spinner, Skeleton | feedback | `feedback/toast/`, etc. |
| Avatar, Badge, Card, Table, Accordion | display | `display/avatar/`, etc. |
| Stack, Grid, Container, Section | layout | `layout/stack/`, etc. |

## 🚀 Prochaines Étapes

1. Finaliser le déplacement des composants
2. Installer les dépendances: `pnpm install`
3. Vérifier le build: `pnpm build`
4. Vérifier les tests: `pnpm test`
5. Configurer apps/docs (Next.js)

## Commandes Utiles

```bash
# Installation
pnpm install

# Développement
pnpm dev

# Build
pnpm build

# Tests
pnpm test

# Lint
pnpm lint

# Générer un composant
pnpm generate:component ComponentName
```

## Notes

- Le projet utilise maintenant **pnpm** comme gestionnaire de paquets
- **Turbo** pour le monorepo
- **Biome** pour le linting/formatting
- **Changesets** pour le versioning
- **TypeScript** pour le typage
