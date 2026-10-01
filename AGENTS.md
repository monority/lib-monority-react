# AGENTS.md — Monority UI

Instructions pour tout agent (IA ou humain) qui modifie ce dépôt. Ce fichier décrit l'état actuel du projet et ses règles. En cas de conflit : ce fichier et `docs/design/` font foi, puis le code existant.

## 1. Le projet

Monority UI est une librairie de composants React 19 pilotée par des design tokens : changement de thème au runtime, rebranding par client via les tokens, densités adaptables. Seul `@monority/ui` est destiné à être publié sur npm. Tout le reste sert à le produire, le tester ou le documenter.

| Chemin | Rôle |
| --- | --- |
| `packages/tokens/` | Source des tokens (JSON DTCG dans `src/`), générateur, checks de conformité (`scripts/`) |
| `packages/styles/` | CSS source : `recipes/` (une recette par composant), `base/`, `utilities/`, `tokens/generated/` (**généré**) |
| `packages/ui/` | Composants React (`src/components/<catégorie>/<composant>/`), primitives, providers, hooks internes |
| `apps/web/` | Site de documentation, playground, moodboard, tests e2e (Playwright) |
| `tooling/generators/` | Générateur de composant, validation |
| `docs/design/` | Langage visuel (`language.md`), specs par composant (`components/`), références |

## 2. Commandes

| Besoin | Commande |
| --- | --- |
| Tout construire (ordre géré par turbo) | `pnpm build` |
| Tous les tests (inclut les checks de tokens) | `pnpm test` |
| Types | `pnpm typecheck` |
| Format (bloquant en CI) | `pnpm format:check` / `pnpm format` |
| Lint | `pnpm lint` |
| Reconstruire après un changement de token | `pnpm --filter @monority/tokens build:downstream` (`:web` pour inclure l'app) |
| Tests du package construit | `pnpm --filter @monority/ui test:dist` |
| E2E | `pnpm --filter @monority/web test:e2e` |

## 3. Chaîne de build et fichiers générés

Ordre : `tokens → styles → ui → web`. Il est déclaré par les dépendances workspace ; turbo l'applique.

- **Ne jamais modifier** `packages/styles/src/tokens/generated/*`. Modifier les JSON de `packages/tokens/src/` ou le générateur (`scripts/sd-formats.mjs`), puis reconstruire.
- `apps/web` consomme le CSS **construit** de `@monority/ui`. Reconstruire les tokens seuls ne change pas le rendu de l'app : utiliser `build:downstream`. Avant de conclure qu'un changement visuel fonctionne, le vérifier par `getComputedStyle` dans le navigateur, pas seulement dans le code.
- Les fichiers générés et `docs/design/reference/` sont exclus de Biome : leur format est imposé et vérifié par T1.

## 4. Tokens et couleurs

- Aucune valeur visuelle en dur dans les recettes et les composants : uniquement des tokens `--mr-*` (exceptions : `0`, `1px`, `2px`, pourcentages de mise en page). Vérifié par T3.
- Couleurs en OKLCH. Les neutres passent par `--mr-ref-neutral-chroma` et `--mr-ref-neutral-hue`, la marque par `--mr-ref-brand-*`. Ne jamais coder une chroma ou une hue en dur dans un thème neutre.
- Tout token dépendant de la marque doit rester réévalué sur `[data-brand]` (le générateur s'en charge : ne pas contourner).
- Contrastes : chaque paire est vérifiée par X2. Une valeur ne descend jamais sous son seuil ; le thème high-contrast a des seuils propres qui interdisent toute régression. Viser une marge (≈ 3.3 pour un seuil de 3), pas le minimum.
- Tokens dépréciés (`deprecated.json`, `--mr-space-*`, alias de `deprecated.css`) : ne jamais les utiliser dans du code nouveau. Ne jamais changer la cible d'un alias déprécié : il existe pour la rétrocompatibilité, donc on migre les usages, pas l'alias.

## 5. CSS et composants

- Une classe de base préfixée par composant (`.mr-button`, `.mr-input`…). Variantes et états via attributs `data-*` (`[data-variant]`, `[data-size]`, `[data-state]`).
- Les modificateurs BEM (`.mr-btn--primary`) sont **en cours de suppression** : ne pas en ajouter.
- Une recette par composant dans `packages/styles/src/recipes/`, dans la layer des recettes.
- Anatomie d'un composant : `Component.tsx`, `Component.types.ts`, `Component.test.tsx`, `index.ts`. Un nouveau composant public doit aussi être ajouté à `tsup.config.ts`, aux `exports` de `packages/ui/package.json` et aux tests d'exports.
- État contrôlé / non contrôlé : utiliser `useControllableState` (`src/internal/`), pas une réimplémentation locale.
- React 19 uniquement : `ref` est une prop. `forwardRef` est en cours de retrait ; ne pas l'utiliser dans du code nouveau.
- TypeScript strict. Pas de `any`, pas d'index signature `[key: string]: any`, pas de cast pour faire taire le compilateur.
- Accessibilité : rôles implicites plutôt qu'explicites redondants ; les tests vérifient le comportement accessible (`getByRole`), pas les détails d'implémentation (`tagName`, attributs redondants). Les bordures de contrôle au repos atteignent 3:1 (WCAG 1.4.11), et un contrôle à bordure a toujours un fond opaque (T8).

## 6. Règles du package publié

Tout ce qui part sur npm doit fonctionner chez un consommateur qui n'a pas ce monorepo.

- Aucun fichier de `dist/` ne référence un chemin hors du package.
- Pas de condition d'export pointant vers `./src` en dehors de `monority-source`, réservée au monorepo.
- Code partagé entre points d'entrée : jamais dupliqué (`splitting: true`). Un contexte React n'est défini qu'une fois dans tout le `dist/`.
- Détection de la production : uniquement la forme littérale `process.env.NODE_ENV`, jamais via `globalThis`.
- Ne pas imposer de styles globaux ni de noms génériques (layers, classes) qui entrent en collision avec l'application hôte.

## 7. Checks de conformité

Tous lancés par `pnpm test` (package tokens) :

| Check | Vérifie |
| --- | --- |
| T1 | Équivalence entre sources JSON et CSS généré |
| T3 | Aucune valeur en dur |
| T6 | Tokens dépréciés et références manquantes |
| T7 | Fraîcheur du CSS construit (`dist/`) |
| T8 | Fond opaque des contrôles à bordure |
| X2 | Contrastes, tous thèmes, toutes paires |
| S11 | Valeurs conformes aux specs |

Un nouveau check doit être testé en négatif : prouver qu'il échoue quand la règle est violée.

## 8. Git et travail en sessions

- **Ne jamais pousser ni fusionner directement sur `main`. Tout travail passe par une branche et une PR revue.** Une étape déjà traitée reste à relire par la revue : rien n'est « déjà validé » du seul fait d'être terminé.
- Plusieurs sessions peuvent travailler dans le même worktree. Stager **par liste de chemins**, jamais `git add .` ni `git add -A`. Vérifier l'index (`git diff --cached --stat`) avant chaque commit.
- Ne jamais modifier, formater ou commiter un fichier qu'on n'a pas soi-même modifié dans la tâche.
- Interdits sans instruction explicite : `git reset --hard`, `git clean`, `git push --force`, réécriture d'historique.
- Un commit par sujet, message court au format `type(portée): description` en français (`fix`, `feat`, `refactor`, `build`, `ci`, `test`, `docs`, `style`, `lint`). Un commit de formatage ne contient que du formatage.
- Renommer un fichier en changeant seulement la casse (Windows) : `git mv A tmp && git mv tmp a`.
- Fins de ligne LF (`.gitattributes`). Ne pas commiter de BOM.
- N'exécuter que l'étape demandée ; si une décision marquée `[DÉCISION]` n'est pas tranchée, s'arrêter et demander.
- Contexte presque épuisé : s'arrêter sur un commit propre et écrire `HANDOFF.md` (non commité) : commits faits, travail restant, pièges rencontrés. En début de session, lire `HANDOFF.md` s'il existe.

## 9. Méthode

- **Ne rien inventer** : comportement, API, décision produit, résultat de test. Inspecter le dépôt ; si l'ambiguïté persiste, demander.
- **Pas de hors-périmètre** : une amélioration repérée en dehors de la tâche est signalée dans le rapport, pas implémentée.
- **Pas de système en double** : chercher l'existant avant de créer un composant, hook, utilitaire, token ou test. Un seul moyen évident par responsabilité.
- **Avant de supprimer** un fichier ou un symbole : `git grep` pour prouver qu'il n'est plus utilisé. Pour un diagnostic de lint, lire la ligne **et la colonne** : le symbole visé n'est pas forcément celui qu'on croit.
- **Aucun changement de rendu non annoncé** : si une modification change l'apparence, montrer l'avant/après et attendre validation.
- **Preuves plutôt qu'affirmations** : « compile » n'est pas « fonctionne ». Un changement visuel se vérifie dans le navigateur ; une affirmation de performance se mesure.
- **Corriger à la source** : ne pas abaisser un seuil, désactiver une règle ou ajouter une exception pour faire passer un check sans le justifier dans le rapport.

## 10. Rapport de fin de tâche

Court et factuel : ce qui a été fait (hash des commits), preuves (commandes et résultats), ce qui n'a pas été fait et pourquoi, décisions en attente, améliorations repérées hors périmètre. Ne mentionner que les vérifications réellement effectuées.

**Format des rapports : aucun tableau, en prose.** Les rapports d'audit, bilans et rapports de fin de tâche s'écrivent en texte suivi et puces. Les données chiffrées restent explicites et complètes, mais ne sont jamais présentées sous forme de tableau, même quand un plan ou un gabarit externe en impose un. Utiliser des listes à puces ou des paragraphes, une entrée par fait mesuré.
