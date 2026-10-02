# 05 : Composants

Ce document fixe l'anatomie d'un composant, les règles de son API, celles de sa recette CSS, et la définition de « terminé ». Il sert à créer, migrer ou relire un composant.

## Anatomie

Un composant public vit dans `packages/ui/src/components/<catégorie>/<composant>/` :

- `Component.tsx` : l'implémentation.
- `Component.types.ts` : les types publics.
- `Component.test.tsx` : les tests de comportement.
- `index.ts` : l'export.

Sa recette vit dans `packages/styles/src/recipes/<composant>.css`. Un nouveau composant public est aussi ajouté à `tsup.config.ts`, aux `exports` de `packages/ui/package.json` et aux tests d'exports. La spécification fonctionnelle vit dans `docs/design/components/<composant>.md` et fait foi sur le comportement et l'anatomie.

## Règles d'API React

- React 19 uniquement : `ref` est une prop ordinaire, `forwardRef` n'est pas utilisé dans du code nouveau.
- TypeScript strict : pas de `any`, pas d'index signature `[key: string]: any`, pas de cast pour faire taire le compilateur.
- Les props reflètent l'anatomie de la spec : peu de props, noms stables, valeurs par énumération fermée (`variant`, `size`) plutôt que chaînes libres.
- État contrôlé ou non contrôlé : `useControllableState` (`src/internal/`). Aucune réimplémentation locale.
- Les props de variante sont traduites en attributs de données (`data-variant`, `data-size`, `data-state`) sur l'élément racine. C'est le seul canal entre React et le CSS.
- Aucun style en ligne pour porter une variante ou un état. Les valeurs dynamiques passent par une propriété personnalisée (`style={{ '--mr-progress-value': value }}`), jamais par une valeur de design.
- Composition : un composant expose des parties nommées plutôt qu'une prop de configuration complexe. Le mécanisme de polymorphisme (`as`, `asChild` ou équivalent) fait l'objet d'une décision ouverte (voir `10-decisions.md`) ; aucun composant polymorphe n'est écrit avant qu'elle soit tranchée.
- Pas de dépendance d'exécution ajoutée à `@monority/ui` sans accord.

## Règles de recette CSS

- Une classe de base `.mr-<composant>`, les parties en `.mr-<composant>__<partie>` ou en éléments internes sélectionnés par attribut, mais jamais en modificateurs BEM de variante.
- Variantes et états par attributs `data-*` ; états natifs d'abord.
- Tokens de composant en tête de la classe de base, qui référencent des sémantiques.
- États hover, active et disabled dérivés par `color-mix`.
- Propriétés logiques, aucune valeur brute, aucune lecture d'une primitive, spécificité maximale 0,2,0.
- Dans la couche `mr.components`. Aucun style de page ni de mise en page de l'hôte.
- Le focus, le mouvement réduit et le contraste forcé viennent de la base : une recette ne les redéfinit pas, sauf cas documenté dans la recette.

## Accessibilité d'un composant

- Rôle implicite de l'élément natif avant tout `role` explicite.
- Nom accessible fourni (`aria-label`, `aria-labelledby` ou contenu).
- Clavier complet : tous les comportements souris sont atteignables au clavier, l'ordre de tabulation est logique, les raccourcis de la spec sont implémentés.
- Les états exposés à la technologie d'assistance (`aria-expanded`, `aria-pressed`, `aria-invalid`, `aria-busy`) correspondent aux états visuels.
- Les tests vérifient le comportement accessible (`getByRole`, `getByLabelText`), pas les détails d'implémentation (`tagName`, attributs redondants).
- Voir `06-accessibilite.md` pour les seuils.

## Définition de terminé d'un composant

Un composant est terminé quand toutes ces conditions sont vraies :

1. La recette respecte `03-fondation-css.md` et `04-tokens-et-themes.md` : aucune valeur brute, aucune primitive lue, états dérivés, propriétés logiques, couche `mr.components`.
2. Chaque token créé a son consommateur identifié ; les paires de contraste nouvelles sont couvertes.
3. Le rendu est correct dans les sept thèmes et l'alias `dim`, dans les densités prévues, pour toutes les variantes, tailles et états (repos, survol, focus visible, actif, désactivé, invalide si applicable).
4. Le comportement clavier et les attributs ARIA sont conformes à la spec, et vérifiés par les tests.
5. Le contraste forcé (`forced-colors`) et le mouvement réduit donnent un résultat utilisable.
6. `pnpm verify` est vert.
7. L'écart avec l'ancienne recette est listé explicitement, ou la mention « aucun écart » est écrite.
8. Les divergences entre la spec et l'ancien comportement sont signalées dans le rapport, pas tranchées en silence.
9. Le composant a été validé visuellement par un humain avant de passer au suivant.
10. Aucune API publique n'a changé sans accord.

## Cycle de travail

Un composant à la fois, dans l'ordre d'usage mesuré. Le cycle détaillé (annonce, recette, tokens, vérification automatique, vérification visuelle, commit, rapport, arrêt, validation) est décrit dans `09-gouvernance-et-workflow.md`. Aucun composant suivant n'est ouvert avant la validation du précédent.

## Interdits

- Un composant qui modifie la fondation sans le déclarer en tête de son rapport, avec la liste des composants déjà validés touchés.
- Un style spécifique à un composant dans `base/` ou dans un thème.
- Une copie d'un composant existant au lieu de sa réutilisation (chercher l'existant par `git grep` avant de créer).
- Un composant public sans test, sans entrée dans les exports, ou sans spec.
