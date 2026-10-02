# 07 : Qualité et tests

Ce document décrit la porte de preuve du dépôt, la pyramide de tests, la régression visuelle et les budgets. Il sert à décider quoi tester, où, et ce qui peut ou non devenir un contrôle automatique.

## Principe

Un contrôle automatique existe pour prévenir une régression réelle. Il est peu nombreux, rapide, et chacun a été prouvé en négatif. Ce dépôt a déjà payé le prix d'une couche de contrôles qui dépassait le travail qu'elle protégeait : le budget ci-dessous est un plafond, pas un objectif.

## Porte unique : `pnpm verify`

Huit étapes au plus, dans un ordre fixe, arrêt au premier échec :

1. typecheck
2. lint JS/TS
3. Stylelint : pas de valeur brute hors `tokens/ref.css` et `themes/` ; nommage `--mr-*` dérivé du fichier de vocabulaire ; aucune règle hors couche, aucun sélecteur global hors reset et base
4. test de contraste : lit les thèmes CSS, calcule les paires de `06-accessibilite.md` pour chaque thème, échoue sous les seuils
5. build du CSS
6. tests unitaires
7. tests du build : le CSS publié contient les sept thèmes et l'alias `dim`, aucune variable référencée sans définition
8. audit de références : toute `var(--mr-*)` lue dans une recette est définie dans les tokens ou les thèmes

Règles de la porte :

- Aucune étape n'est ajoutée sans accord écrit et ADR.
- Le nombre d'étapes rapporté est le nombre réel affiché par la commande.
- Si une étape échoue, on corrige la cause. On ne construit pas un autre contrôle et on n'abaisse pas un seuil pour passer.
- Interdits : détecteurs de listes, tests de parité de listes, cliquets (baselines à la baisse seule), registres de skips, audits de graphe, scripts qui contrôlent d'autres scripts. Une liste qui doit rester synchrone se lit du disque, elle ne se surveille pas.
- Un nouveau contrôle est livré avec une fixture qui prouve qu'il échoue quand la règle est violée, et il est vérifié en le faisant échouer avant le commit.

## Pyramide de tests

- **Unitaires** (dans `packages/ui`, par composant) : comportement et accessibilité via `getByRole` ; états contrôlé et non contrôlé ; clavier. Ils ne testent pas les détails d'implémentation (nom de balise, attributs redondants, classes).
- **Build** (étape 7) : le CSS publié est complet et cohérent.
- **Package construit** (`pnpm --filter @monority/ui test:dist`) : le contenu de `dist/` fonctionne sans le monorepo.
- **E2E** (`apps/web`, Playwright) : parcours utilisateur et régression visuelle. Plus coûteux, lancés en CI et avant livraison, hors `pnpm verify`.

Règle de placement : un test va au niveau le plus bas qui peut détecter la régression.

## Régression visuelle

- Les captures de référence se régénèrent en une seule passe, après la reconstruction complète d'un lot de composants, jamais pendant la reconstruction d'un composant.
- Une capture mise à jour est relue par un humain. Un changement de rendu non annoncé est un défaut.
- Chaque composant validé est capturé dans les thèmes `light`, `dark` et `high-contrast` au minimum ; les autres thèmes se vérifient dans la page de vérification.
- Les captures ne dépendent d'aucune donnée variable (dates, identifiants aléatoires). Les animations sont figées.
- Un test visuel qui oublie un thème du dépôt est un défaut de test : la liste des thèmes se lit du dossier `themes/`, pas d'une copie. Un sous-ensemble volontaire est documenté dans le test, avec sa raison.

## Budgets

Les budgets sont mesurés et rapportés, ils ne sont pas des portes bloquantes, sauf décision contraire écrite.

- Poids du CSS publié : brut et gzip, mesuré avant et après chaque lot de composants, rapporté dans le rapport du lot.
- Temps de build du CSS : mesuré, rapporté.
- Nombre de tokens publics : le nombre de sémantiques et de tokens de composant est rapporté ; un token sans consommateur est un défaut.
- Poids de `@monority/ui` : la taille du `dist/` et le poids par point d'entrée sont rapportés avant chaque publication.

Un dépassement notable (par exemple une hausse de poids sans nouveau composant) s'explique dans le rapport avant d'être accepté.

## Intégration continue

À ce stade du chantier, la CI exécute `build`, `typecheck`, `test`, `format:check` et `lint`. Le branchement de la porte unique `pnpm verify` en CI (avec installation de Chromium pour le test de contraste) interviendra avant l'ouverture de toute PR vers `main`. Aucun workflow de publication ne se déclenche depuis une branche de chantier : la publication passe par le processus de `08-publication-et-versions.md`.

## Preuve

- « Ça compile » n'est pas « ça fonctionne ». Un changement visuel se vérifie dans le navigateur, avec `getComputedStyle` quand c'est utile.
- Une affirmation de performance se mesure, avec la commande citée.
- Aucun chiffre n'est écrit dans un rapport sans mesure. Les comptes (fichiers, tokens, composants) se vérifient par une commande avant d'être cités.
