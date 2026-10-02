# AGENTS.md — Monority UI

Instructions pour tout agent (IA ou humain) qui modifie ce dépôt. En cas de conflit : ce fichier fait foi, puis `docs/foundation/`, puis `docs/design/`, puis le code existant. Aucun tableau, aucun emoji, dans les rapports comme dans les documents.

## 1. Le projet

Monority UI est une librairie de composants React 19 pilotée par des design tokens CSS : changement de thème au runtime, rebranding par client, densités adaptables. Seul `@monority/ui` est publié sur npm. Tout le reste sert à le produire, le tester ou le documenter.

Le dossier `docs/foundation/` est la source du système de référence (principes, architecture, fondation CSS, tokens, accessibilité, gouvernance).

Chantier en cours : base CSS écrite à la main, organisée en couches (`@layer`), sur la branche `refactor/css-foundation`. L'ancien système (tokens en JSON, générateur Style Dictionary) est abandonné et archivé par un tag `archive/tokens-json-*`. Il est supprimé en phase 3 du chantier. N'y ajoute rien.

Emplacements :
- `packages/styles/` : tout le CSS source. La fondation (couches, reset, base, tokens, thèmes), les recettes (une par composant), les utilitaires.
- `packages/ui/` : composants React (`src/components/<catégorie>/<composant>/`), primitives, providers, hooks internes.
- `apps/web/` : site de documentation, playground, moodboard, tests e2e (Playwright).
- `tooling/generators/` : générateur de composant et validation.
- `docs/foundation/` : architecture des couches, contrat de surcharge, guides "ajouter un token" et "ajouter un thème", glossaire.
- `docs/design/` : langage visuel (`language.md`) et specs par composant.

## 2. Commandes

- Tout construire (ordre géré par turbo) : `pnpm build`
- Porte unique de preuve : `pnpm verify` (8 étapes au plus, voir section 7)
- Tests : `pnpm test`
- Types : `pnpm typecheck`
- Format (bloquant en CI) : `pnpm format:check` puis `pnpm format`
- Lint JS/TS : `pnpm lint` ; lint CSS : `pnpm lint:css`
- Tests du package construit : `pnpm --filter @monority/ui test:dist`
- E2E : `pnpm --filter @monority/web test:e2e`

## 3. Architecture CSS

### 3.1 Couches
L'ordre des couches est déclaré une seule fois, dans `packages/styles/src/layers.css` : reset, base, tokens, thèmes, composants, utilitaires. Toute règle de la bibliothèque est dans une couche. Les noms de couches sont préfixés `mr.` (par exemple `mr.reset`, `mr.components`) pour ne pas entrer en collision avec ceux de l'application hôte.

Contrat de surcharge : le CSS d'un consommateur qui n'est pas dans une couche gagne toujours sur les couches de la bibliothèque. Ne jamais contourner cet ordre avec `!important` ni avec des sélecteurs plus spécifiques pour "gagner".

### 3.2 Structure de `packages/styles/src/`
- `layers.css` : déclaration de l'ordre.
- `reset.css` : reset minimal, tout via `:where()` (spécificité nulle), scopé à la portée `mr-*`. Jamais de reset global qui écrase le CSS d'un consommateur.
- `base/` : fond et texte hérités des tokens, typographie de base, `focus-visible`, `color-scheme` par thème, `prefers-reduced-motion`, `prefers-contrast`, `forced-colors`, gérés une seule fois ici et non par recette.
- `tokens/ref.css` : primitives `--mr-ref-*` (teintes, échelles d'espacement, radius, typographie, durées, ombres, z-index).
- `tokens/semantic.css` : sémantiques (`--mr-bg-*`, `--mr-text-*`, `--mr-border-*`, `--mr-accent-*`, `--mr-status-*`, `--mr-chart-*`, `--mr-focus-*`) avec leurs valeurs par défaut (thème clair) dans `:root`.
- `themes/<nom>.css` : un fichier par thème, `[data-theme="<nom>"]`, qui redéfinit uniquement ce qui diffère.
- `recipes/` : une recette par composant, dans la couche des composants.
- `utilities/` : utilitaires, dans la couche des utilitaires.

### 3.3 Règles
- Trois niveaux : primitives (`--mr-ref-*`), sémantiques (`--mr-bg-*`...), composants (`--mr-<composant>-*`). Une recette ne lit jamais une primitive directement. Un token de composant n'existe que si au moins deux recettes ou deux variantes le lisent.
- Aucune valeur visuelle brute dans les recettes et les composants : uniquement des tokens `--mr-*` (exceptions : `0`, `1px`, `2px`, pourcentages de mise en page). Les valeurs brutes ne vivent que dans `tokens/ref.css` et `themes/`.
- Couleurs en OKLCH. Les thèmes neutres ne redéfinissent pas les teintes. Les thèmes teintés (slate, ocean, night) redéfinissent localement leurs primitives de teinte dans leur propre fichier. Ne jamais coder une chroma ou une hue en dur dans une recette.
- Teintes fixes de statut (succès 155, avertissement 80, danger 25, info 255) : pas de primitive dédiée.
- Les états hover, active, focus et disabled se dérivent avec `color-mix(in oklch, ...)`, jamais déclarés comme tokens.
- Tout token dépendant de la marque se réévalue sur `[data-brand]`, qui redéfinit les primitives `--mr-ref-brand-*`.
- Propriétés logiques (`inline-start`, `block-size`) dans tout nouveau code. Densité par attribut `data-density`, pas de classes parallèles.
- Pas de `!important`, pas de sélecteur d'identifiant, spécificité maximale 0,2,0 dans les recettes.
- Identifiants de token, de catégorie et de rôle en anglais, dans un vocabulaire fermé. Durées nommées par rôle (`state`, `panel`), pas par composant.
- Thèmes : light, dark, slate, oled, ocean, night, high-contrast. `dim` est un alias de `dark`. `system` est une préférence résolue à l'exécution dans `packages/ui`, jamais un thème CSS. La liste des thèmes se lit du dossier `themes/` par un glob, jamais d'une liste recopiée.
- Tokens dépréciés et alias existants : ne jamais les utiliser dans du code nouveau, ne jamais changer la cible d'un alias. On migre les usages. Ils disparaissent avec l'ancien système en phase 3.

### 3.4 Contraste
WCAG 2.2 AA : 4,5:1 pour le texte, 3:1 pour les composants UI, pas d'APCA. Une valeur ne descend jamais sous son seuil ; le thème high-contrast a des seuils propres qui interdisent toute régression. Viser une marge (environ 3,3 pour un seuil de 3), pas le minimum. Les bordures de contrôle au repos atteignent 3:1 (WCAG 1.4.11) et un contrôle à bordure a toujours un fond opaque.

## 4. Composants React

- Une classe de base préfixée par composant (`.mr-button`, `.mr-input`...). Variantes et états via attributs `data-*` (`[data-variant]`, `[data-size]`, `[data-state]`).
- Les modificateurs BEM (`.mr-btn--primary`) sont en cours de suppression : ne pas en ajouter.
- Anatomie : `Component.tsx`, `Component.types.ts`, `Component.test.tsx`, `index.ts`. Un nouveau composant public est aussi ajouté à `tsup.config.ts`, aux `exports` de `packages/ui/package.json` et aux tests d'exports.
- État contrôlé ou non contrôlé : `useControllableState` (`src/internal/`), pas de réimplémentation locale.
- React 19 uniquement : `ref` est une prop, `forwardRef` n'est pas utilisé dans du code nouveau.
- TypeScript strict. Pas de `any`, pas d'index signature `[key: string]: any`, pas de cast pour faire taire le compilateur.
- Accessibilité : rôles implicites plutôt qu'explicites redondants ; les tests vérifient le comportement accessible (`getByRole`), pas les détails d'implémentation.

## 5. Règles du package publié

Tout ce qui part sur npm doit fonctionner chez un consommateur qui n'a pas ce monorepo.

- Aucun fichier de `dist/` ne référence un chemin hors du package.
- Pas de condition d'export pointant vers `./src` en dehors de `monority-source`, réservée au monorepo.
- Code partagé entre points d'entrée : jamais dupliqué (`splitting: true`). Un contexte React n'est défini qu'une fois dans tout le `dist/`.
- Détection de la production : uniquement la forme littérale `process.env.NODE_ENV`, jamais via `globalThis`.
- Ne pas imposer de styles globaux ni de noms génériques (couches, classes) qui entrent en collision avec l'application hôte.

## 6. Fichiers générés et build

- Ordre : `styles → ui → web`, déclaré par les dépendances workspace ; turbo l'applique.
- `apps/web` consomme le CSS construit de `@monority/ui`. Avant de conclure qu'un changement visuel fonctionne, le vérifier par `getComputedStyle` dans le navigateur, pas seulement dans le code.
- Si du code TypeScript consomme les noms de tokens, un `tokens.d.ts` est généré depuis le CSS par un script de 30 lignes maximum. Sinon, il n'existe pas. Ne jamais modifier un fichier généré : modifier sa source.

## 7. Contrôles : budget strict

`pnpm verify` contient 8 étapes au plus, dans cet ordre fixe, arrêt au premier échec :
1. typecheck
2. lint JS/TS
3. Stylelint : pas de valeur brute hors `tokens/ref.css` et `themes/`, nommage `--mr-*` dérivé d'un seul fichier de vocabulaire, interdiction de règle hors couche et de sélecteur global hors reset et base
4. test de contraste : lit les thèmes CSS, calcule les paires text/bg, text/border, danger et accent pour chaque thème, échoue sous WCAG AA
5. build du CSS
6. tests unitaires
7. tests du build : le CSS publié contient les 7 thèmes et l'alias `dim`, aucune variable référencée sans définition
8. audit de références : toute `var(--mr-*)` lue dans une recette est définie dans les tokens ou les thèmes

Règles :
- Aucune étape n'est ajoutée sans accord écrit.
- Interdits : détecteurs de listes, tests de parité de listes, cliquets, registres, audits de graphe, scripts qui contrôlent d'autres scripts. Si une porte échoue, on corrige la cause, on ne construit pas une autre porte.
- Un nouveau contrôle est testé en négatif : une fixture qui prouve qu'il échoue quand la règle est violée.
- Ne pas abaisser un seuil, désactiver une règle ou ajouter une exception pour faire passer un contrôle sans le justifier dans le rapport.

## 8. Git et travail en sessions

- Ne jamais pousser ni fusionner directement sur `main`. Tout travail passe par une branche et une PR revue. La branche `refactor/css-foundation` n'ouvre aucune PR vers `main` avant la Definition of Done du chantier : `release.yml` publie sur npm via changesets.
- Plusieurs sessions peuvent travailler dans le même worktree. Stager par liste de chemins, jamais `git add .` ni `git add -A`. Vérifier l'index (`git diff --cached --stat`) avant chaque commit.
- Ne jamais modifier, formater ou commiter un fichier qu'on n'a pas soi-même modifié dans la tâche. Fichiers à ne pas toucher sans instruction : `.gitignore`, `prompt.md`, `docs/audit-hardening-prompt.md`.
- Interdits sans instruction explicite : `git reset --hard`, `git clean`, `git push --force`, réécriture d'historique, `git add -f`.
- Un commit par sujet, atomique et réversible seul, message au format `type(portée): description` en français (`fix`, `feat`, `refactor`, `build`, `ci`, `test`, `docs`, `style`, `lint`). Le message passe par `git commit -F fichier`, jamais par des `\n` littéraux. Pas de commit en rouge. Un commit de formatage ne contient que du formatage.
- Renommer un fichier en changeant seulement la casse (Windows) : `git mv A tmp && git mv tmp a`.
- Fins de ligne LF (`.gitattributes`). Ne pas commiter de BOM. Ne pas écrire d'octet de contrôle dans un fichier de décision ou de documentation.
- État de session : un seul fichier, la section `## Reprise` de `PLAN.md` (30 lignes maximum), réécrite à chaque fin de commit vert. Pas de `HANDOFF.md`. Contexte presque épuisé : finir le commit en cours, mettre `## Reprise` à jour, pousser, le dire.
- N'exécuter que l'étape demandée. Si une décision marquée `[DÉCISION]` n'est pas tranchée, s'arrêter et demander.

## 9. Méthode

- Ne rien inventer : comportement, API, décision produit, résultat de test. Inspecter le dépôt ; si l'ambiguïté persiste, demander.
- Pas de hors-périmètre : une amélioration repérée hors tâche est signalée dans le rapport, pas implémentée.
- Pas de système en double : chercher l'existant avant de créer un composant, hook, utilitaire, token ou test. Un seul moyen évident par responsabilité.
- Avant de supprimer un fichier ou un symbole : `git grep` pour prouver qu'il n'est plus utilisé. Pour un diagnostic de lint, lire la ligne et la colonne.
- Aucun changement de rendu non annoncé : montrer l'avant et l'après dans le message de commit, et attendre validation pour les écarts non triviaux.
- Preuves plutôt qu'affirmations : "compile" n'est pas "fonctionne". Un changement visuel se vérifie dans le navigateur, une performance se mesure. Aucun chiffre sans mesure : citer la commande. Vérifier ses comptes par une commande avant de les écrire.
- Corriger à la source, mesurer ce que le commit exige et rien de plus : pas de re-scan large pour confirmer un chiffre déjà consigné.
- Un seul rapport par phase terminée, pas par sous-étape. S'arrêter uniquement sur un échec de `pnpm verify` dont la cause est introuvable, sur un conflit avec ce fichier ou avec une décision figée, ou à la fin d'une phase. Ne pas demander confirmation d'un choix réversible.

## 10. Rapport de fin de tâche

Court et factuel. Prose et puces, aucun tableau, même quand un plan ou un gabarit externe en impose un. Contenu :
- Fait : hashes des commits, plage poussée
- Preuve : commandes et résultats, y compris le nombre réel d'étapes de `pnpm verify`
- Valeurs reconstruites ou construites faute d'historique, écarts de rendu annoncés, décisions prises seul
- Objections et risques
- Ce qui n'a pas été fait et pourquoi, questions fermées uniquement
- Améliorations repérées hors périmètre
- Prochaine action

Ne mentionner que les vérifications réellement effectuées. Relire le rapport avant envoi : pas de faute de frappe, pas de nombre collé à son unité, pas de commit annoncé "de cette session" qui date d'une session précédente.
