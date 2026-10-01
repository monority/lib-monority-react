# Chantier base CSS saine — Monority UI

Ancien systeme JSON + Style Dictionary abandonne, archive par
`archive/tokens-json-d899d22`. Fondation CSS ecrite a la main sous
`packages/styles/src/`, couches `@layer mr.*`. Branche
`refactor/css-foundation`, base `origin/main` a `b7b460a` (fusion PR #7,
le `b9b98d8` attendu etait le parent). Recolte unique hors depot :
`Temp/css-foundation-harvest/synthese.md` (499 lignes, 440 valeurs).
Ne plus relire l'historique : toute valeur vient de cette synthese.

## Phase 0 — arret propre (faite)
Tag archive pose et pousse. Worktree propre
`C:/Dev/Projects/lib-monority-react-css-foundation`. Mesures : 76 recettes
dans `packages/styles/src/recipes/`, build `tsup` dans `packages/ui`,
CSS publie via `dist/index.css` (`src/index.ts` importe
`src/styles/globals.css`), exports `index.css`, `styles.css`,
`reset.css`, `utilities.css`. Lectures par les recettes : `border-` 279,
`text-` 195, `bg-` 153, `accent` 103, `danger` 82, `focus-` 64,
`chart-` 0, `ref-` 0. Poids source `packages/styles/src` : 273010 octets.

## Phase 1 — fondation (un commit vert par sous-etape)
1. `layers.css`, `reset.css`, `base/`, demo qui prouve l'ordre et la specificite.
2. `tokens/ref.css`, `tokens/semantic.css`, clair par defaut, valeurs reconstruites.
3. `themes/` : 7 themes plus alias `dim`.
4. Stylelint 3 regles et test de contraste, chacun prouve en negatif d'abord.
5. Integration build et `pnpm verify` en 8 etapes au plus, l'app s'affiche.
Sortie : app visible avec les semantiques de base sur les 7 themes et `dim`.

## Phase 2 — migration des recettes par famille (un commit vert par lot)
Ordre mesure : `border`, `text`, `bg`, `accent`, `status`, puis dimensions
(`control`, `spacing`, `ease`, `fs`, `duration`, `radius`). Recettes en couche,
lecture via semantiques ou tokens de composant, aucun token sans consommateur
mesure. `chart-*` n'a aucun lecteur : a creer seulement sur besoin prouve.

## Phase 3 — finitions
Dimensions restantes, `reduced-motion` dans la base, baselines e2e regenerees
en une passe, `docs/foundation/` a jour, changeset prepare sans publier,
ancien systeme supprime en un ou quelques commits verts une fois mesure par
`git grep` que plus rien ne le lit. Poids du CSS publie mesure avant et apres.

## Regles
Stager par liste de chemins, jamais `git add .`. Message par `git commit -F`.
`pnpm verify` complet avant chaque commit. Push apres chaque commit vert,
jamais sur `main`, aucune PR avant la Definition of Done (release par
changesets). Un seul rapport en fin de phase, prose et puces, aucun tableau.

## Reprise
Etape 0 et mesures terminees, tag archive pousse, branche creee depuis
`origin/main` a `b7b460a`. Worktree de travail :
`C:/Dev/Projects/lib-monority-react-css-foundation`.
`pnpm install` fait. node_modules absents avant, presents maintenant.
Recolte : `Temp/css-foundation-harvest/` (`harvest.cjs`, `synthese.md`).
Prochain : ecrire `layers.css`, `reset.css`, `base/` avec demo de preuve.
`dist/index.css` n'existe pas encore : le poids avant sera le build initial.
Etat vert : ce commit contient `PLAN.md` et `DECISIONS.md` seuls.
`docs/foundation/` reste a creer en phase 1 ou 3, a trancher en phase 1.5.
Conflit connu : couches actuelles `monority.*`, a renommer `mr.*` en 1.1.
Travail restant : phases 1, 2, 3 dans l'ordre, sans arret entre les etapes.
