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

Application : phase 0, pour les 4 écarts D8 constatés. `--mr-neutral-hue`, `--mr-neutral-chroma`, `--mr-font-sans` et `--mr-font-mono` ne passent pas la regex §5.2. Les 7 primitives deviennent `--mr-ref-brand-hue`, `--mr-ref-brand-chroma`, `--mr-ref-neutral-hue`, `--mr-ref-neutral-chroma`, `--mr-ref-font-sans`, `--mr-ref-font-mono`, `--mr-ref-radius-scale`.

Impact : `packages/ui/src/lib/design-config.ts` et les specs e2e `design-customizer`, `theme-subtree`, `theme-runtime` lisent ces noms via `getComputedStyle` et doivent suivre dans le même commit.

### D12 — Scoping des composants
VALIDÉE. `data-*`. Les variantes et états passent par `[data-variant]`, `[data-size]`, `[data-state]` ; une classe de base préfixée par composant reste en place.

Constat mesuré : 174 `.tsx`, 254 `className` à préfixe `mr-`, 302 attributs `data-*` sur 90 fichiers. Le mécanisme est déjà en place, aucun travail de migration.

### D13 — Dérivation des états
VALIDÉE. `color-mix(in oklch, …)`. Un token d'état n'est pas écrit : il se dérive du token de repos.

**Condition de validation, à vérifier au commit 3** : `audit:contrast` doit savoir résoudre `color-mix()` pour mesurer une paire texte/fond. colorjs.io ne résout pas `color-mix()` ; si la mesure est impossible, le contraste sera relevé par couleurs calculées dans Playwright (`getComputedStyle` sur les nœuds réels) et c'est cette méthode qui fera foi.

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

## Décision ouverte

### [OUVERT] §4.6 — CSS de composant
La section §4.6 décrit « un fichier par composant, nom en PascalCase, dans `packages/ui/components/<Nom>/<Nom>.css` ». Cette architecture **n'existe pas** dans le dépôt.

État réel mesuré :
- 87 composants, dans `packages/ui/src/components/<catégorie>/<kebab-case>/`, fichiers `X.tsx`, `X.types.ts`, `X.test.tsx`, `index.ts` ;
- 0 fichier CSS dans un dossier de composant ;
- 3 fichiers CSS dans tout `packages/ui` : `src/styles/globals.css`, `src/styles/reset.css`, `src/styles/utilities.css`, 2 lignes chacun, simples relais d'import ;
- tout le style des composants vit dans les 77 recettes de `packages/styles/src/recipes/`.

Options : amender §4.6 pour décrire la réalité (le style est centralisé dans les recettes, ce qui est cohérent avec D12 et avec l'architecture zero-runtime) ; ou ouvrir une migration vers des CSS par composant, qui déplacerait 7 313 lignes et introduirait un périmètre non prévu par le tableau §7. **Décision requise avant la phase 14.**

## Glossaire

- **T6** — références pendantes et tokens dépréciés. Vérifie que toute référence de code désigne un token qui existe, et qu'aucun alias déprécié n'est encore consommé. Implémentation : `packages/tokens/scripts/check-deprecated.mjs`.
- **X2** — contrastes WCAG. Mesure chaque paire texte/fond sur tous les thèmes et toutes les marques, aux seuils AA/HC, plus les minimums du tableau du langage. Implémentation : `packages/tokens/scripts/check-contrasts.mjs`.
- **S11** — spécifications contre tokens résolus. Compare les valeurs annoncées dans les tableaux « Dimensions » des specs aux tokens réellement résolus. Un écart se corrige dans la spec, jamais dans les tokens. Implémentation : `packages/tokens/scripts/check-spec-values.mjs`.
- **`rebuild.json`** — verrou du chantier tokens. Tant qu'il existe, T6/X2/S11 rapportent au lieu de bloquer. Sa suppression, à l'étape 11z, est le jalon de fin.
- **Pendente** — `var(--mr-x)` utilisée alors que `--mr-x` n'est définie nulle part.
- **Orpheline** — token défini et jamais utilisé.