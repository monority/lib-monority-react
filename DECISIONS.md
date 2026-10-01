# Décisions du chantier tokens

Source de vérité : `ROADMAP.md`. Ce fichier fige les décisions prises en phase 0 et trace les amendements apportés à la feuille de route.

Convention de nommage des tokens : `docs/design/tokens-convention.md`.
État transitoire du système : `packages/tokens/rebuild.json`.

## Décisions figées

Ces décisions ne sont pas rouvertes sans demande explicite.

### D2 — Portée des styles globaux
VALIDÉE. La library n'impose aucun style global à l'hôte. Le reset et les styles de base sont scopés aux éléments `mr-*` ; le contenu fourni par l'hôte garde ses propres styles. `normalize.css` est unifié ou supprimé, la suppression devant être prouvée par `git grep`.

Implémentation existante : `packages/styles/src/base/library-scope.css`, export opt-in `./reset.css`. Le périmètre des règles est limité aux éléments `mr-*`.

### D6 — Autorité spec / recette
La recette gouverne jusqu'à réécriture de la spécification. Une spec réécrite et marquée « validée » redevient autorité. Réécrire la spec et modifier la recette a lieu dans le même commit, sinon la dérive est silencieuse — c'est précisément le défaut que ce chantier répare.

### D7 — Appareil déprécié
`deprecated.json`, `deprecated.css` et `migration-table.md` sont supprimés en UN seul commit, à l'étape 11z. Pas avant.

### D8 — Nommage des tokens
Token global : `--mr-<catégorie>-<rôle>[-<variante>]`.
Token local : `--mr-<composant>-<propriété>[-<état>]`, autorisé seulement si le rôle est propre au composant ET constitue une vraie surface de personnalisation. Sinon il est globalisé ou supprimé.

Un token = un rôle. Pas de doublon, pas d'orphelin.

### D9 — Arbitrage d'un doublon
1. La valeur réellement utilisée par la recette l'emporte. Un nom jamais référencé ne gagne rien.
2. Le nom conforme à D8 est gardé. Si aucun ne l'est, le nom est réécrit et l'ancien disparaît — il n'est pas conservé en alias.
3. Les variantes de suffixe contradictoires sont unificiées.

Le paquet n'ayant jamais été publié, un perdant est supprimé, pas déprécié.

### D10 — Rendu pendant le chantier
Un changement de rendu est autorisé s'il est annoncé explicitement token par token, avant → après, et validé. Après l'étape 11, la règle stricte de non-régression reprend.

### D11 — Préfixe des primitifs
VALIDÉE. Les primitives portent le préfixe `--mr-ref-*`. Cela sépare sans ambiguïté les trois niveaux du système (ROADMAP §4.1) et rend lisible une recette qui violerait la règle « jamais de primitif dans une recette ».

Application : phase 0, appliquée dans le commit `refactor(tokens): renommer les primitives sous le prefixe ref`. Le constat qui l'a motivée : 4 des 7 primitives échouaient à la regex du §5.2 — `neutral-hue` et `neutral-chroma` parce que `neutral` n'était pas dans la liste fermée, `font-sans` et `font-mono` parce que `font-[a-z]+` exigeait un troisième segment. Les 7 primitives sont désormais `--mr-ref-brand-hue`, `--mr-ref-brand-chroma`, `--mr-ref-neutral-hue`, `--mr-ref-neutral-chroma`, `--mr-ref-font-sans`, `--mr-ref-font-mono`, `--mr-ref-radius-scale`.

Portée du renommage : **154 occurrences dans 78 fichiers**. Deux documents d'archives ont été volontairement laissés intacts, les renommer aurait falsifié un état historique : `docs/design/audit/migration-table.md` et `docs/design/reference/prompt-maitre-v4.md`.

Impact : `packages/ui/src/lib/design-config.ts`, `packages/ui/src/providers/get-theme-script.ts` et les specs e2e `design-customizer`, `theme-subtree` lisent ces noms via `getComputedStyle` et suivent dans le même commit. Le rebranding par client repose sur ces noms.

### D12 — Scoping des composants
VALIDÉE. `data-*`. Les variantes et états passent par `[data-variant]`, `[data-size]`, `[data-state]` ; une classe de base préfixée par composant reste en place.

Constat mesuré : 174 `.tsx`, 254 `className` à préfixe `mr-`, 302 attributs `data-*` sur 90 fichiers. Le mécanisme est déjà en place, aucun travail de migration.

### D13 — Dérivation des états
VALIDÉE. `color-mix(in oklch, …)`. Un token d'état n'est pas écrit : il se dérive du token de repos.

**Condition de validation, à vérifier au commit 3** : `audit:contrast` doit savoir résoudre `color-mix()` pour mesurer une paire texte/fond. colorjs.io ne résout pas `color-mix()` ; si la mesure est impossible, le contraste sera relevé par couleurs calculées dans Playwright (`getComputedStyle` sur les nœuds réels) et c'est cette méthode qui fera foi.

### D14 — Liste fermée des catégories globales
VALIDÉE le 2026-10-01. La liste des catégories de tokens globaux est celle de `docs/design/tokens-convention.md` §4, et la regex du ROADMAP §5.2 en est **dérivée**, pas recopiée. Un test échoue si les deux divergent.

Trois points :
- Les catégories composées sont des noms complets et se tiennent seules : `--mr-border-width`, `--mr-z-index`, `--mr-line-height`, `--mr-control-height`, `--mr-icon-size`, `--mr-letter-spacing`.
- Un nom à deux segments est valide quand la catégorie est déjà le rôle entier : `--mr-accent`, `--mr-border`, `--mr-scrim`.
- La liste **exclut les composants** : `switch`, `badge`, `dialog`, `drawer`… relèvent du registre `local-tokens` avec justification (D8), pas de la regex globale.

Interdits explicites : les abréviations héritées `--mr-fs-*`, `--mr-lh-*`, `--mr-dur-*`, `--mr-ease-*`. D8 les remplace par `font-size`, `line-height`, `duration`, `easing`.

Motivation, mesurée : la regex initiale du §5.2 rejetait **179 des 279** tokens existants, soit 64 %. Trois défauts distincts — catégories absentes de la liste (`ease` et non `easing`, et toutes les familles de composants), catégories composées traitées comme des préfixes alors qu'elles sont des noms complets, et noms à deux segments refusés alors que `--mr-accent` est un nom nécessaire.

## Amendements à la feuille de route

### §4.3 — Cascade (amendé)
Les noms `mr.*` de la feuille de route ne sont pas retenus. L'espace de noms réel est `monority.*`, et il comporte un layer `recipes` que la feuille de route ne mentionne pas.

Ordre effectif, déclaré dans `packages/styles/src/layers/index.css` et vérifié dans les sept `*.layer.css` :

```
monority.reset → monority.tokens → monority.base → monority.recipes
  → monority.components → monority.utilities → monority.overrides
```

Le reset et le scope passent par `:where()`, spécificité nulle. Aucun `!important` hors `forced-colors` et `prefers-reduced-motion`, qui doivent rester documentés.

### §4.4 — Recettes (amendé)
Les recettes restent en CSS. `packages/styles/src/recipes/<composant>.recipe.css`, une par composant, 77 fichiers. Zéro migration vers `.recipe.ts` : il n'y a ni objet déclaratif ni runtime à maintenir. Les variantes passent par `data-*` (D12).

Changement de conception à retenir : la recette est du CSS statique, donc « zero-runtime » et « compatible Server Components » ne sont pas des contraintes à satisfaire mais des propriétés acquises.

### §4.6 — CSS de composant (amendé le 2026-10-01)
La description d'origine — « un fichier par composant dans `packages/ui/components/<Nom>/<Nom>.css` » — décrit une architecture qui **n'existe pas** et ne sera pas créée. Décision : amender pour décrire la réalité, **aucune migration**.

État mesuré au 2026-10-01 :
- **74 composants** dans `packages/ui/src/components/<catégorie>/<kebab-case>/`, 11 catégories, **315 fichiers** (`.ts` 161, `.tsx` 154), 19 795 lignes ;
- anatomie constante : `X.tsx`, `X.types.ts`, `X.test.tsx`, `index.ts` ;
- **0 fichier CSS** dans un dossier de composant ;
- 3 fichiers CSS dans toute la librairie : `packages/ui/src/styles/{globals,reset,utilities}.css`, 2 lignes chacun, simples relais d'import ;
- tout le style des composants vit dans les 77 recettes (7 313 lignes).

Le style est centralisé dans les recettes. La phase 14 audite les 315 fichiers sans en créer : propriétés logiques dans les styles inline, absence de valeur en dur, attributs `data-*` conformes, aucune classe modificatrice BEM. Les recettes sont auditées en phase 12, avant.

### §4.5 — Reset / base / scope
Le reset et les styles de base sont scopés aux éléments `mr-*` (D2). `normalize.css` est à fusionner ou supprimer, la suppression prouvée par `git grep`.

### Baseline visuelle (décision du 2026-10-01)
Prise **à la fin de 11b5**, pas en phase 0 : le système de tokens a été razé, une baseline capturée maintenant gellerait un rendu vide. Les snapshots d'avant le raz sont conservés, taggués « cible visuelle », et servent à mesurer les diffs annoncés pendant 11b1–11b5.

## Glossaire

- **T6** — références pendantes et tokens dépréciés. Vérifie que toute référence de code désigne un token qui existe, et qu'aucun alias déprécié n'est encore consommé. Implémentation : `packages/tokens/scripts/check-deprecated.mjs`.
- **X2** — contrastes WCAG. Mesure chaque paire texte/fond sur tous les thèmes et toutes les marques, aux seuils AA/HC, plus les minimums du tableau du langage. Implémentation : `packages/tokens/scripts/check-contrasts.mjs`.
- **S11** — spécifications contre tokens résolus. Compare les valeurs annoncées dans les tableaux « Dimensions » des specs aux tokens réellement résolus. Un écart se corrige dans la spec, jamais dans les tokens. Implémentation : `packages/tokens/scripts/check-spec-values.mjs`.
- **`rebuild.json`** — verrou du chantier tokens. Tant qu'il existe, T6/X2/S11 rapportent au lieu de bloquer. Sa suppression, à l'étape 11z, est le jalon de fin.
- **Pendente** — `var(--mr-x)` utilisée alors que `--mr-x` n'est définie nulle part.
- **Orpheline** — token défini et jamais utilisé.