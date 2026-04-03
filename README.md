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
    config/
    layouts/
    providers/
  components/
    ui/
  config/
  features/
    home/
    playground/
    dashboard/
    admin/
  hooks/
  lib/
  styles/
  assets/
  services/
```

## Regles de structure

- `app/`: bootstrap, layouts globaux, providers, orchestration de haut niveau
- `app/config/app-routes.jsx`: source de verite pour les routes applicatives et la navigation principale
- les pages sont chargees a la demande via le router pour garder un bootstrap leger
- `features/`: blocs metier ou pages composees par domaine
- `components/ui/`: primitives reutilisables et independantes du metier
- `lib/`: helpers bas niveau sans logique d'interface
- `config/`: constantes et configuration partagee
- `styles/`: couches globales CSS (`tokens`, `base`, `utilities`, `components`, `app`)
- `services/`: infrastructure partagee pour HTTP, auth et normalisation des erreurs

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

- `content/` pour le texte, les constantes editoriales et la composition statique
- `hooks/` pour l'etat local de la feature
- `services/` pour les appels reseau et la transformation liee a la feature
- `sections/` pour les blocs JSX lisibles et ciblables en test
- `Page` pour l'orchestration
- l'enregistrement de la route se fait dans `src/app/config/app-routes.jsx`

Pour les pages classiques qui utilisent le shell global, preferer `src/app/layouts/AppPage.jsx`
afin de mutualiser le theme, le header et le container principal.

## Pattern data layer

Pattern recommande pour une feature qui charge des donnees :

```text
features/ma-feature/
  hooks/
    useMaFeatureData.js
  services/
    maFeatureApi.js
    maFeatureData.js
    maFeatureMappers.js
    maFeatureService.js
  sections/
  MaFeaturePage.jsx
```

Regle pratique :

- `services/*Api.js` decrit le contrat de requete et les messages d'erreur
- `services/*Data.js` contient les payloads mock ou fixtures de demonstration
- `services/*Mappers.js` adapte le format transport au format UI
- `services/*Service.js` compose `apiClient`, les fixtures et les mappers
- `hooks/` gere l'etat async et l'orchestration React
- `sections/` ne recoit que des props pretes a afficher
- `lib/` contient les helpers generiques reutilisables partout

Quand plusieurs features partagent le meme cycle de chargement, preferer un hook partage
dans `src/hooks/` plutot que de dupliquer `useEffect` et `useReducer`.

## Services partages

Les briques communes de la couche data vivent dans `src/services/`.

- `services/http/` contient le client HTTP, les erreurs et les helpers de normalisation
- `services/auth/` contient les contrats et mappers lies a l'authentification
- `hooks/useAsyncResource.js` mutualise le chargement async simple pour les features
- `components/ui/AsyncStateNotice.jsx` mutualise le rendu `loading/error`

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
- exemples data-driven avec `playground/`, `dashboard/` et `admin/`
- couche service mock structuree autour de `api`, `data`, `mappers` et `service`
