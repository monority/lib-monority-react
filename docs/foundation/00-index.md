# Fondation Monority UI : index

Ce dossier définit le système de référence de Monority UI : principes, architecture, règles CSS, tokens, composants, accessibilité, qualité, publication et gouvernance. Il sert à tout contributeur, humain ou agent IA, qui écrit ou relit du code dans ce dépôt. Lis-le avant ta première modification, puis consulte uniquement le document qui concerne ta tâche.

## Autorité

En cas de conflit entre deux sources, l'ordre est le suivant :

1. `AGENTS.md` (règles opérationnelles, courtes, à la racine)
2. `docs/foundation/` (ce dossier : le système et ses décisions)
3. `docs/design/` (langage visuel et spécifications fonctionnelles par composant)
4. Le code existant

Un conflit entre deux de ces sources est un défaut de documentation : il se corrige dans le document fautif, dans le même commit que le code concerné. Il ne se contourne pas.

## Documents

- `01-principes.md` : principes directeurs, non-objectifs, cadre de décision.
- `02-architecture.md` : packages, sens des dépendances, chaîne de build, frontières.
- `03-fondation-css.md` : couches, reset, base, spécificité, contrat de surcharge.
- `04-tokens-et-themes.md` : trois niveaux de tokens, nommage, thèmes, marque, densité, états.
- `05-composants.md` : anatomie, API, recettes, définition de terminé d'un composant.
- `06-accessibilite.md` : cibles WCAG, contraste, clavier, mouvement, contraste forcé.
- `07-qualite-et-tests.md` : porte `pnpm verify`, pyramide de tests, régression visuelle, budgets.
- `08-publication-et-versions.md` : API publique, semver, dépréciation, exports, navigateurs.
- `09-gouvernance-et-workflow.md` : git, revue, sessions, agents IA, cycle d'un composant.
- `10-decisions.md` : journal des décisions (ADR) et liste des décisions ouvertes.

## Glossaire

- **Primitive** : token de plus bas niveau (`--mr-ref-*`), qui porte une valeur brute. Interne, sauf `--mr-ref-brand-*`.
- **Sémantique** : token qui exprime un rôle (`--mr-bg-raised`, `--mr-text-primary`). Public.
- **Token de composant** : token propre à un composant (`--mr-button-bg`), qui référence un sémantique. Public s'il est documenté.
- **Couche** : `@layer` CSS. Toutes les règles de la bibliothèque appartiennent à une couche préfixée `mr.`.
- **Recette** : fichier CSS d'un composant, dans `packages/styles/src/recipes/`.
- **Thème** : ensemble de valeurs sélectionné par `[data-theme="..."]`.
- **Alias** : nom de sélecteur qui pointe vers un thème existant (`dim` vers `dark`). Jamais un thème.
- **Préférence** : choix utilisateur résolu à l'exécution (`system`). Jamais un thème CSS.
- **Marque** : jeu de teintes du client, appliqué par `[data-brand]`, qui redéfinit `--mr-ref-brand-*`.
- **Densité** : variation d'espacement appliquée par `[data-density]`.
- **Rôle** : nom d'usage d'un token (`state`, `panel`, `raised`), jamais le nom d'un composant consommateur.

## Modifier ces documents

Une règle change par une décision écrite dans `10-decisions.md` (ADR), au plus tard dans le commit qui applique le changement. Un document de ce dossier ne contient ni état de session, ni historique de travail, ni chiffre non mesuré. L'état de session vit dans la section `## Reprise` de `PLAN.md`.

Aucun document de ce dossier ne contient de tableau ni d'emoji.
