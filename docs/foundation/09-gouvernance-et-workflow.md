# 09 : Gouvernance et workflow

Ce document décrit comment le travail s'organise : git, revue, sessions de travail, règles pour les agents IA, décisions et cycle de reconstruction d'un composant. Il sert à savoir quoi faire, dans quel ordre, et quand s'arrêter.

## Git

- Jamais de poussée ni de fusion directe sur `main`. Tout passe par une branche et une PR revue. Rien n'est « déjà validé » du seul fait d'être terminé : la revue relit aussi les étapes déjà traitées.
- Une branche de chantier n'ouvre aucune PR vers `main` avant sa définition de terminé : un workflow de publication peut se déclencher.
- Un commit par sujet, atomique, réversible seul (`git revert` reste propre). Pas de commit en rouge. Un commit de formatage ne contient que du formatage.
- Message au format `type(portée): description` en français, avec les types `fix`, `feat`, `refactor`, `build`, `ci`, `test`, `docs`, `style`, `lint`. Le message est passé par `git commit -F fichier`, jamais par des `\n` littéraux. Le corps d'un commit qui change un rendu donne l'avant et l'après.
- Plusieurs sessions peuvent partager un worktree : stager par liste de chemins, jamais `git add .` ni `git add -A`, vérifier `git diff --cached --stat` avant chaque commit. Ne jamais modifier, formater ni commiter un fichier qu'on n'a pas modifié soi-même dans la tâche.
- Interdits sans instruction explicite : `git reset --hard`, `git clean`, `git push --force`, `git add -f`, réécriture d'historique.
- Un second worktree sert à isoler une branche quand le worktree courant contient du travail d'une autre session. On ne contourne jamais par un stash ni un checkout forcé.
- Fins de ligne LF. Pas de BOM. Pas d'octet de contrôle dans un fichier de documentation ou de décision.
- Renommer un fichier en changeant seulement la casse (Windows) : `git mv A tmp && git mv tmp a`.

## Revue de PR

Le relecteur vérifie, dans cet ordre :

1. Le périmètre : le diff ne contient que ce que le titre annonce.
2. Les règles de `03` et `04` : couches, aucune valeur brute, niveaux de tokens, vocabulaire.
3. L'accessibilité (`06`) et la définition de terminé du composant (`05`).
4. Les changements de rendu : annoncés, avec avant et après.
5. Le niveau de version et le changeset (`08`).
6. Les décisions : toute règle modifiée a son ADR.

Un relecteur ne corrige pas silencieusement : il commente, et l'auteur corrige dans un nouveau commit.

## Sessions et état

- Un seul fichier d'état : la section `## Reprise` de `PLAN.md`, 30 lignes au plus, réécrite à chaque fin de commit vert (dernier commit, composant en cours, prochains composants, décisions en attente, fichiers à ne pas toucher). Aucun `HANDOFF.md`.
- Une session lit au démarrage `AGENTS.md`, la section `## Reprise`, `git log --oneline -5`, `git status`, puis seulement les documents que sa tâche exige.
- Contexte presque épuisé : finir le commit en cours, mettre `## Reprise` à jour, pousser ce qui est validé, le dire explicitement.
- Fichiers à ne pas toucher sans instruction : ceux déclarés dans `## Reprise` (par exemple des fichiers d'une autre session).

## Règles pour les agents IA

- Ne rien inventer : comportement, API, décision produit, résultat de test. Inspecter le dépôt, et demander si l'ambiguïté persiste.
- Pas de hors-périmètre : une amélioration repérée est signalée dans le rapport, pas implémentée.
- Pas de système en double : chercher l'existant (`git grep`) avant de créer un composant, un token, un utilitaire, un test.
- Avant de supprimer un fichier ou un symbole, prouver par `git grep` qu'il n'est plus utilisé. Pour un diagnostic de lint, lire la ligne et la colonne.
- Aucun chiffre sans mesure ; citer la commande. Vérifier ses comptes par une commande avant de les écrire.
- Ne mesurer que ce que le commit exige ; pas de relecture large pour confirmer un chiffre déjà consigné.
- Ne pas demander confirmation d'un choix réversible. S'arrêter sur un échec dont la cause est introuvable, sur un conflit avec une règle ou une décision, ou sur une décision marquée `[DÉCISION]` non tranchée.
- Contredire avec une alternative chiffrée quand une consigne nuit à la maintenabilité. Ne pas obéir silencieusement.
- Corriger à la source : ne pas abaisser un seuil, désactiver une règle ou ajouter une exception sans la justifier dans le rapport.
- Relire son rapport avant envoi : phrases complètes, pas de faute de frappe, pas de nombre collé à son unité, pas de commit annoncé « de cette session » qui date d'avant.

## Décisions

- Toute règle qui change, tout choix de fond, a un ADR dans `10-decisions.md`, écrit au plus tard dans le commit qui l'applique. Pas de trou ni de renumérotation.
- Une décision ouverte est marquée `[DÉCISION]` et reste listée jusqu'à ce qu'elle soit tranchée. Un contributeur qui rencontre une décision ouverte s'arrête et demande.

## Cycle d'un composant

Pour chaque composant, dans l'ordre d'usage mesuré, un seul à la fois :

1. **Annonce** en trois lignes : composant, tokens sémantiques lus, tokens à créer.
2. **Lecture limitée** : l'ancienne recette (consultable dans l'archive git), la spec `docs/design/components/<composant>.md`, le code React et le test du composant. Aucun autre fichier.
3. **Recette** dans `packages/styles/src/recipes/<composant>.css`, dans `mr.components`, selon `03` et `04`.
4. **Tokens** : créés seulement avec un consommateur réel ; valeurs dans les thèmes concernés ; paires de contraste ajoutées au test si nouvelles.
5. **Vérification automatique** : `pnpm verify` vert.
6. **Vérification visuelle** : une page ou une section du harness d'`apps/web` montre toutes les variantes, tailles et états pour les thèmes `light`, `dark` et `high-contrast` au minimum, avec un sélecteur pour les autres thèmes. Le rapport donne la commande exacte et l'URL exacte.
7. **Commit local vert**, sans poussée.
8. **Rapport court** : composant et commit ; tokens lus, créés, écarts de valeur ; preuve (`pnpm verify`, commande, URL) ; écarts de rendu avec l'ancienne recette ou « aucun écart » ; ce qui n'a pas pu être vérifié ; composant suivant proposé. Puis **arrêt**.
9. **Validation humaine** : « validé » déclenche la poussée de la branche et le composant suivant ; des corrections s'appliquent dans un nouveau commit (jamais de réécriture), puis nouvelle vérification et nouvel arrêt.

Si un composant doit modifier la fondation (base, token sémantique existant, thème), le rapport l'indique en tête avec la liste des composants validés touchés, et ceux-ci sont revérifiés.

## Format des rapports

Court et factuel, en prose et en puces, sans tableau ni emoji. Ne mentionner que les vérifications réellement effectuées : ce qui a été fait (hashes), les preuves (commandes et résultats, y compris le nombre réel d'étapes de `pnpm verify`), les valeurs reconstruites ou choisies faute d'historique, les écarts de rendu, ce qui n'a pas été fait et pourquoi, les améliorations repérées hors périmètre, la prochaine action.
