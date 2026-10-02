# 02 : Architecture

Ce document décrit où vit chaque chose, qui dépend de qui, et comment le CSS arrive chez le consommateur. Il sert à décider dans quel package placer un fichier, et à comprendre pourquoi un import est interdit.

## Packages

- `packages/styles` : tout le CSS source. Fondation (couches, reset, base), tokens, thèmes, recettes de composants, utilitaires. Ne dépend d'aucun autre package du dépôt.
- `packages/ui` : composants React 19, primitives, providers, hooks internes. Dépend de `packages/styles` pour le CSS publié. C'est le seul package publié sur npm (`@monority/ui`).
- `apps/web` : site de documentation, playground, harness de vérification visuelle, tests e2e. Consomme le CSS construit de `@monority/ui`, jamais les sources de `packages/styles` directement.
- `tooling/generators` : générateur de composant et sa validation.
- `docs/foundation` : ce dossier. `docs/design` : langage visuel et spécifications par composant.

## Sens des dépendances

`styles` ne connaît ni `ui` ni `web`. `ui` connaît `styles`. `web` connaît `ui`. Aucune dépendance en sens inverse, aucune dépendance circulaire. Un fichier de test e2e ne peut donc pas importer `@monority/ui`, qui dépend de la direction inverse, d'où la lecture de listes (par exemple de thèmes) depuis le disque et non par import.

## Chaîne de build

Ordre : `styles` puis `ui` puis `web`, déclaré par les dépendances de workspace, appliqué par turbo.

- Le CSS publié est le CSS source assemblé dans l'ordre des couches, par l'outil de build existant de `packages/ui`. On n'introduit pas de second outil de build.
- `apps/web` consomme le CSS construit : reconstruire `styles` seul ne change pas le rendu de l'application. Avant de conclure qu'un changement visuel fonctionne, il se vérifie par `getComputedStyle` dans le navigateur.
- Aucun fichier du dépôt n'est généré par défaut. Exception : un `tokens.d.ts` si, et seulement si, du code TypeScript consomme les noms de tokens ; il est alors produit par un script de 30 lignes au plus, depuis le CSS, et il est documenté avec son consommateur.

## Où va quoi

- Un nouveau composant React : `packages/ui/src/components/<catégorie>/<composant>/`.
- Sa recette CSS : `packages/styles/src/recipes/<composant>.css`.
- Un token partagé par plusieurs composants : `packages/styles/src/tokens/semantic.css`, avec ses variantes de thème dans `themes/`.
- Un token propre à un composant : en tête de sa recette, sur sa classe de base.
- Une règle valable pour tous (focus visible, mouvement réduit) : `packages/styles/src/base/`.
- Du code qui s'exécute dans le navigateur avant le premier rendu (résolution du thème `system`) : `packages/ui`, jamais dans le CSS.

## Multi-framework

La cible de consommation inclut d'autres frameworks que React, éventuellement via des Web Components. Contraintes que cette cible impose dès maintenant :

- Les tokens sont des propriétés CSS personnalisées : elles traversent le shadow DOM par héritage, donc la couche tokens et thèmes reste utilisable telle quelle.
- Les couches (`@layer`) ne traversent pas un shadow root : un composant rendu dans un shadow root doit adopter ses propres feuilles de style, avec leurs propres déclarations de couches.
- Le CSS de la bibliothèque ne doit contenir aucune hypothèse sur React (pas de sélecteur lié à un nom de composant React, pas de classe générée par un runtime).

Le mécanisme de packaging pour les Web Components n'est pas décidé : c'est une décision ouverte (voir `10-decisions.md`). Tant qu'elle n'est pas tranchée, aucune recette ne dépend du mode de rendu.

## Fichiers à ne jamais modifier à la main

Tout fichier marqué généré en tête. Si un fichier généré existe, sa source est modifiée, puis le build régénère. Un fichier de `dist/` n'est jamais édité ni commité.
