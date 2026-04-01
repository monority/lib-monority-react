# Model Starter 2026

Starter React + Vite concu comme une base front-end reutilisable, lisible et evolutive.

## Principes

- architecture simple, sans dossiers decoratifs
- separation nette entre `app`, `features`, `components/ui` et `styles`
- design system CSS natif avec tokens, couches et dark mode
- primitives UI legeres, coherentes et accessibles
- DX propre avec alias d'import `@/*`

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Architecture

```text
src/
  app/
    App.jsx
    layouts/
    providers/
  components/
    ui/
  config/
  features/
    home/
    playground/
  hooks/
  lib/
  styles/
  assets/
```

## Regles de structure

- `app/`: bootstrap, layouts globaux, providers, orchestration de haut niveau
- `features/`: blocs metier ou pages composees par domaine
- `components/ui/`: primitives reutilisables et independantes du metier
- `lib/`: helpers bas niveau sans logique d'interface
- `config/`: constantes et configuration partagee
- `styles/`: couches globales CSS (`tokens`, `base`, `utilities`, `components`, `app`)

## Regles de qualite

- eviter les dossiers vides "pour plus tard"
- ajouter une feature dans `features/` plutot que grossir `App.jsx`
- garder les primitives UI generiques et sans logique metier
- privilegier les tokens semantiques plutot que des valeurs en dur
- faire passer le theming par le provider et les variables CSS

## Template de feature

Structure recommandee :

```text
src/features/ma-feature/
  content/
    ma-feature-content.js
  hooks/
    useMaFeatureUI.js
  sections/
    MaFeatureHeroSection.jsx
    MaFeatureDetailsSection.jsx
  MaFeaturePage.jsx
```

Convention :

- `content/` pour le texte, les donnees de demo et les constantes de composition
- `hooks/` pour l'etat local de la feature
- `services/` pour les appels reseau et la transformation liee a la feature
- `sections/` pour les blocs JSX lisibles et ciblables en test
- `Page` pour l'orchestration
- l'enregistrement de la route se fait dans `src/app/routes/route-config.jsx`

## Pattern data layer

Pattern recommande pour une feature qui charge des donnees :

```text
features/ma-feature/
  content/
  hooks/
    useMaFeatureData.js
  services/
    maFeatureService.js
  sections/
  MaFeaturePage.jsx
```

Regle pratique :

- `services/` encapsule l'acces aux donnees
- `hooks/` gere l'etat async et l'orchestration React
- `sections/` ne recoit que des props prêtes a afficher
- `lib/` contient les helpers generiques reutilisables partout

## Theming

Le theme supporte `light`, `dark` et `system`.

- la preference utilisateur est persistee
- le theme systeme est observe dynamiquement
- les composants ne dupliquent pas leurs styles, ils consomment les tokens

## Etat actuel

- design system de base present
- theme `light | dark | system`
- routing applicatif avec page `NotFound`
- base de tests avec Vitest
- exemple concret de feature reusable avec `home/` et `playground/`
