# Plan de remise en ordre — Monority UI

État au 2026-10-01, mesuré. Section la seule de PLAN.md librement réécritable.
- Branche `refactor/tokens-migration-5a-suite`. `origin/main` figé à `b9b98d8`. Validation à posteriori, un rapport par phase.
- `pnpm verify` : 21 étapes, code 0.
- **Phase B.** `bg`, `text`, `border` faites. Restent `accent`, `status`, `chart`.
- Cliquet : 2241 → 2088 (bg) → 1898 (text) → **1751** (border). Tokens distincts 129 → 123 → **120**.
- X2 : 31 → 26 → 22 → **21**.
- Écart nul à chaque famille. Extraction de l'historique faite en **une seule passe** dans `h1.js` (hors dépôt) : border, accent, status et chart pour les 7 thèmes.
- `status` : **aucune valeur dans les thèmes** à `41aa61d~1`. Les `allowedFixed` de T3 nomment `success-text`, `danger-solid`… donc ces jetons étaient émis par le build ; à localiser avant de les reconstruire.
- `accent` : l'historique utilise `hue 200` (la primitive de marque) partout sauf ocean 195 et night 275. Chroma littéral de 0,025 à 0,12, donc `--mr-ref-brand-chroma` ne peut pas être utilisé tel quel.
- `chart-muted` **existe historiquement** sur les 7 thèmes (0,865 light / 0,45 dark / 0,31 slate / 0,31 oled / 0,39 ocean / 0,37 night / 0,55 high-contrast). Reste à mesurer un consommateur dans le code.
- **Leçon** : `git commit -F <fichier>`. Le message de `1dc6b87` contient des `\n` littéraux, irrattrapable.
- Regenerer `docs/design/reference/monority-ui-tokens.reference.css` après chaque build, sinon T1 échoue en `generé seul`.
- Cliquets : stylelint 2730, test-skips {4, 2}.
- Ne pas toucher sans accord : `.gitignore`, `docs/audit-hardening-prompt.md`, `prompt.md`.
## Règles communes (toutes les étapes)
- Une étape par session. N'exécute que l'étape demandée.
- Un commit par sujet. Après chaque commit : typecheck, tests (ui, web, tokens), build, format:check.
- Stage uniquement par liste de chemins, jamais `git add .` ; vérifie l'index avant chaque commit.
- Avant de supprimer un fichier ou un symbole : `git grep` pour prouver qu'il n'est pas utilisé.
- Aucun changement de rendu non annoncé. Si une étape en provoque un, montre l'avant/après et attends validation.
- Si une décision marquée [DÉCISION] n'est pas tranchée dans ce fichier, arrête-toi et pose la question.
- Contexte presque épuisé : termine sur un commit propre, mets à jour cette section `Reprise` avec les commits faits, ce qui reste et les pièges, puis commite et pousse. L'état vit dans le dépôt, pas dans une session.
- En fin d'étape : coche l'étape ci-dessous, commite PLAN.md, fais un rapport court avec les preuves.
- Voir AGENTS.md pour les règles git (jamais push/merge direct sur main, tout passe par une PR revue).

## Décisions

- D1 Utilitaires : RETENU — supprimé `.stack/.grid/.container/.section` (doublons des composants). Familles sans usage réel supprimées (containers, grid, display, interaction, animation, aspect-ratio, filters, sizing, transforms, typography, accessibility, layout, legacy-layout, visibility). effects, flex, spacing sorties en export optionnel `./utilities.css` avec préfixe `mr-`.
- D2 Reset global : RETENU — `reset.css` et `normalize.css` sortis du bundle principal, export opt-in `"./reset.css"`. Correctif 2c : portée des règles limitée aux éléments `mr-*` (le contenu fourni par l'hôte garde ses propres marges/styles).
- D3 Scripts d'audit ponctuels : RETENU — archivés dans `docs/archive/audit/` (4 scripts de l'étape 5 + `probe-contrast.mjs` et `extract-deprecated.mjs`).
- D4 Pages de faux SaaS dans apps/web : RETENU — option B (supprimées). 9 fichiers retirés, routes `/dashboard` et `/admin` retirées.
- D5 Source de vérité de la doc composant : RETENU — `docs/design/components/*.md` fait foi. Écart constaté non corrigé : `DocPage.tsx` ne lit pas ces fiches, contenu dupliqué depuis apps/web (70 vs 72 composants, listes divergentes). Voir étape 6b.
- D6 Autorité spec/recette (refonte tokens) : RETENU — la recette gouverne jusqu'à réécriture de la spec, composant par composant. Une spec réécrite et marquée "validée" redevient autorité.
- D7 Rétrocompatibilité (refonte tokens) : RETENU — l'appareil déprécié (`deprecated.json`, `deprecated.css`, `migration-table.md`) est jeté en un seul commit à la toute fin du chantier (étape 11z), pas avant.
- D8 Convention de nommage (refonte tokens) : RETENU — `--mr-<catégorie>-<rôle>-<variante>`. Tokens locaux `--mr-<component>-<role>` autorisés uniquement si (a) rôle propre au composant ET (b) vraie surface de personnalisation ; sinon globalisés.
- D9 Doublons internes (refonte tokens) : RETENU — la valeur réellement utilisée par la recette l'emporte d'abord, puis le nom conforme à la convention est gardé.
- D10 Rendu pendant le chantier tokens : RETENU — un changement de rendu est autorisé s'il est annoncé explicitement par token (avant/après). La règle stricte de non-changement reprend une fois l'étape 11 terminée.
- D11 Table rase : RETENU — le système de tokens est reconstruit **depuis zéro**. Toutes les sources DTCG sont vidées (`core`, `components`, `density`, `brand-studio`, les 6 `themes`) et le système se reconstruit famille par famille, puis composant par composant. Seules les **7 primitives** sont conservées : ce sont les entrées du système, pas le système — `packages/ui/src/lib/design-config.ts` et `apps/web/e2e/design-customizer.spec.ts` les lisent pour la personnalisation runtime. Décision utilisateur du 01/10, après que l'inventaire eut montré 3 vocabulaires concurrents et 109 « orphelins » dont 70 définis par `language.md`.
- D12 Verrou de reconstruction : RETENU — pendant l'étape 11, `packages/tokens/rebuild.json` existe et T6, X2, S11 **rapportent** au lieu de bloquer. On n'abaisse aucun seuil : l'état est déclaré dans un fichier unique, lisible, et **sa suppression est le jalon de fin de chantier** (étape 11z). Vérifié dans les deux sens : marqueur présent → code 0 ; marqueur absent → code 1 et le test « dépôt réel » échoue pour de vrai.

## Étapes

Identifiants stables : chaque étape porte un identifiant `phase.sous-phase` (0.1, 0.2, 11b1, 11z…). Ils ne changent plus, même si l'ordre d'exécution bouge. Les rapports citent ces identifiants, pas les intitulés. Le protocole d'exécution et les critères de sortie sont dans `ROADMAP.md` §8, qui prime sur cette liste.

### 0.15c — listes e2e à arbitrer (ouvert 2026-10-01, point 2)
Aucune complétion n'était faisable au moment où le test de parité a été écrit. Trois arbitrages restent ouverts, chacun mesuré.
- `audit-baseline.spec.ts` : ajouter `ocean` et `night` exige des baselines visuelles neuves ; retirer `dim` orpheline ses baselines existantes. `dim` n'y est pas un test d'alias — le script pose `data-theme='dim'` et capture, ce qui produit les pixels de `dark`. Le vrai test d'alias est dans `theme-runtime.spec.ts`. **Decider si `dim` sort de cette spec.** Rien n'a été généré ni supprimé : l'app ne s'affiche pas avant 11b1.
- `geometry.spec.ts` : raison non établie. `git log -S` montre que ses 3 thèmes sont ceux de la création (`88f0b1a`) et qu'elle n'a jamais été réduite — elle n'a jamais été mise à jour. Le test mesure de la géométrie, que le thème ne change pas. **Arbitrage : compléter aux 7, ou assumer la restriction et la documenter.**
- `theme-runtime.spec.ts` : `oled` manque dans la boucle « disponible avant hydratation ». La couverture des 7 thèmes est répartie sur plusieurs tests du fichier, donc c'est une répartition, pas une liste périmée. **Arbitrage : ajouter `oled` à la boucle, ou l'écrire dans le test qui couvre `dark`.**

### Chantier antérieur à la feuille de route (terminé ou repris par 11)

- [ ] 1. Nettoyage : fichiers morts, BOM + `.editorconfig`, `AGENTS.md`, `.npmrc` + `registry-url/NODE_AUTH_TOKEN`, essai à blanc changesets, test NavigationMenu sur `getByRole`.
- [ ] 2. Bugs de consommation : layers `monority.*`, `"use client"`, détection production, types InputBase, D1, D2.
  - [ ] 2b. Correctifs : composants autonomes sans `reset.css`, bannière `"use client"` limitée, preuve visuelle.
  - [ ] 2c. Ajustements : portée de `library-scope.css` limitée au contenu `mr-*`, exports publics réduits, couverture react-dom de la bannière, README Server Components honnête.
  - [ ] 2d. Correctif CI : retirer `version: 9` de `pnpm/action-setup` dans `ci.yml` et `release.yml` (conflit avec `packageManager: pnpm@9.0.0`, cause des échecs immédiats). À faire dès que possible, hors ordre si besoin.
- [ ] 3. Migration BEM → data-* (toutes les familles migrées — Button pilote, Select, doublons, contrôles de form, overlays, layout, finalisation — mais laissée NON cochée : la preuve de non-régression par famille à chaque commit n'a jamais existé pendant l'exécution. Preuve rétroactive produite a posteriori (poids CSS par commit, 2 régressions de poids identifiées et expliquées comme des corrections ultérieures, pas des régressions de rendu). Garde-fou global `bem-modifiers.test.tsx` (46 cas) + matrice Playwright 72 combinaisons en place. État final : 258 069 o, 37 BEM résiduels documentés (alias publics + DropZone hors périmètre).
- [ ] 4. Doublons et rangement : `display/` + `data-display/` fusionnés en `data/`, 8 tests `stepNN` renommés, 3 tests d'exports fusionnés en 2. Divider/Separator vérifié NON doublon (props, DOM, ARIA, CSS distincts) — les deux restent.
- [ ] 5. Migrations et doc : `MIGRATIONS.md` créé (10 sections), historique d'audit archivé, D3 appliquée, `CHANGELOG.md` racine réduit à un pointeur vers `packages/ui/CHANGELOG.md`.
  - [ ] 5a. Alias dépréciés, lots SAFE : lot 1 (327 occ., 72 recettes) + lot 2 (239 occ., 69 fichiers) migrés, preuve par résolution transitive des `var()` + comparaison navigateur.
  - [ ] 5a (reste). 716 occurrences BLOCKED classées en 3 groupes :
    - Groupe 1 (6 tokens, 149 occ., correspondance exacte même famille) : décidé, migration À FAIRE.
    - Groupe 2 sous-groupe Δ=0 (`space-2/5/7/9`, `text-2xl/3xl`) : décidé, migration À FAIRE.
    - Groupe 2 sous-groupe Δ≠0 (`space-1/3/4/6/8`, `text-xl/display`, `elevation-*`) + 11 tokens `leading-*/dur-100-150-200-600` : décision reportée — fusionné dans l'étape 11 (refonte complète), ne pas traiter isolément.
    - Groupe 3 (39 tokens sans famille cible) : option (b) retenue — alias gardé, documenté dans `MIGRATIONS.md` avec date de revue à fixer. Pas de création de token hors étape 11.
- [ ] 6. apps/web : D4 appliqué, réorganisation par fonctionnalité (`features/docs`, `playground`, `showcase`, `moodboard`, `harness` + `shared/`), imports mis à jour, frontière de package gardée par test, harness exclu du build de production (`lazy()`).
  - [ ] 6b. `DocPage.tsx` ne lit pas `docs/design/components/*.md` (D5) : contenu dupliqué depuis apps/web, listes déjà divergentes (3 composants seulement côté web, 5 seulement côté design). Objectif : une seule source, plus de dérive silencieuse, un test qui échoue si les deux listes divergent.
- [ ] 7. État contrôlé : `useControllableState` (updates fonctionnels, tests) adopté par les ~19 composants concernés ; `useFieldIds` adopté ou supprimé. Tests existants inchangés.
- [ ] 8. `forwardRef` → `ref` comme prop (React 19) dans les 76 fichiers, par lots. Supprime le `"ref as any"` d'InputBase si devenu inutile.
- [ ] 9. Build et outillage : import de `@monority/styles` par nom de package (pas chemin relatif), un seul export CSS, `publint` + `arethetypeswrong` + `test:dist` en CI, snapshots Playwright régénérés dans l'image Docker officielle (suppression des `*-win32.png`) + job e2e en CI (y compris `library-scope.spec.ts` et `reset-independence.spec.ts` qui lisent `dist/`), `size-limit` sur `dist/index.css` et `dist/index.js`, fixture Next.js App Router pour prouver la garantie Server Components.
- [ ] 10. Lint : état réel au 28/09 = 144 erreurs + 28 warnings (hors fichiers d'une autre session). Traiter les a11y une par une (vrais problèmes, exemples copiés par les utilisateurs). `noUnusedVariables` : lire ligne ET colonne avant de corriger (des diagnostics ont déjà été mal interprétés). `sync-showcase.js` garde 3 `noForEach` non corrigés. Pour les règles de pur style dans tests/exemples (`noArrayIndexKey` sur listes statiques, `noExplicitAny` dans les tests) : proposer des overrides Biome ciblés plutôt que des corrections en masse. Puis lint bloquant en CI.
### Phase 0 — Outillage d'audit (ROADMAP §10)

- [x] **0.1** État des lieux chiffré + plan de la phase 0. Commits `ab0c838`, `9fe13c3`.
- [x] **0.2** Amendements `ROADMAP.md` §4.3 / §4.4 / §4.6 / §5.2, D14 inscrite. Commit `41beb44`.
- [x] **0.3** Regex de nommage dérivée du vocabulaire cible (`packages/tokens/categories.json`), fixtures cibles de 11b1, test de synchronisation à trois sources. Commit `aee4ded`.
- [x] **0.4** Renommage D11 des 7 primitives sous `--mr-ref-*`. Commit `4d0b1a2`.
- [x] **0.5** Cliquet : baisse seule verrouillée (2744 → 2730). Commit `d70822e`. Idempotence de l'écriture prouvée par commit `6798adc`.
- [x] **0.5b** `pnpm verify` : porte de preuve unique, 16 étapes en ordre fixe (du plus rapide au plus lent), arrêt au premier échec. Toutes les preuves de fin de commit proviennent de ce script.
- [x] **0.6b** Tableau des échelles (`docs/design/tokens-scales.md`) — **validé le 2026-10-01**. D15, D16 et les deux arbitrages qui suivent (plafond `duration` à 3, rôle seul accepté) sont tranchés.
- [x] **0.6** Décision D15 **tranchée** — option C, échelle déclarée par famille et fermée, sous 5 conditions (voir `DECISIONS.md`). Tableau famille → type de pas → pas autorisés à valider **avant 11b1**.
- [ ] **0.7** Registre `local-tokens` : 226 entrées en statut `a-auditer`, comptées au cliquet, passage à `justifie` sur surface de personnalisation prouvée (D8).
- [x] **0.8** Verrou des 4 tests web de contrat tokens. Registre `packages/tokens/test-skips.json` (raison + `blockedBy` ordonné), quatre gardes (`check-test-skips.mjs`), 12 tests de registre, compteur de skips au cliquet. Les skips sont **conditionnels** au verrou : `duringRebuild(it)` dans `apps/web/src/lib/rebuild-lock.ts`, un `it.skip` en dur est refusé.
- [x] **0.9** `audit:tokens` : cycles, violations de niveau, pas hors échelle et plafonds. 12 + 18 tests. Commits `d765729`, `ccf1607`.
- [ ] **0.10** `audit:contrast` : couleurs calculées Playwright, mesure colorjs.io, Chromium épinglé, ratio après gamut mapping. Fixtures 4,6:1 ok et 4,4:1 nok dont une via `color-mix`. Mode R.
- [ ] **0.13b** X2 parcourt tous les thèmes : `check-contrasts.mjs` dérive sa liste de `lib/themes.mjs` au lieu d'une liste en dur, et un test échoue si un thème émis n'est pas parcouru. **Couvre la présence, pas la mesure** : le contraste lui-même est traité en 0.10.
- [x] **0.13** Thèmes dérivés du glob `src/themes/*.json`. Test de parité (fichiers = enregistrés = émis), suppression des trois listes en dur (`tokens-lib.mjs`, `resolve.mjs`, `sd-formats.mjs`, `loadSources`), échec explicite sur un nom de thème non conforme. Corrige aussi T3, qui comparait des noms courts à des noms préfixés (D20, D21).
- [ ] **0.14** Contrat public / interne. Livrables : un fichier de classification par token, une politique de dépréciation écrite (annonce, période, retrait, changeset semver), un test qui échoue si un token n'est pas classé. ADR d'abord, test ensuite.
- [ ] **0.15** Parité thèmes tokens / UI. La liste des thèmes est codée en dur à 5 endroits dans le code UI et dans 3 specs e2e ; un 8ᵉ thème échouerait en silence côté UI même si les tokens l'émettent. Options à trancher : test de parité, ou dérivation de la liste UI d'une sortie du build tokens.
- [ ] **Écart spec / recette : variante bordée du badge.** `badge.md`, `banner.md` et `callout.md` décrivent un état bordé qui n'existe dans aucune recette : les tokens `status-*-border` et `info-subtle` ont été écartés de 11b1 faute de consommateur. À traiter quand la recette l'implémente, pas par anticipation.

### Phase 11 — Refonte du système de tokens
- [ ] **0.11** CI pilotée par `rebuild.json`, même cliquet qu'en local.
- [x] **0.12** Items D11 : mapping des 7 renommages dans `MIGRATIONS.md`, changeset breaking, exclusions d'audit dans un fichier versionné.

### Phase 11 — Refonte du système de tokens

Supersède le reste de 5a (groupe 2 Δ≠0, groupe 3) et toute normalisation `space-*/spacing-*` isolée : tout se fait ici, dans l'ordre de la convention.
  - [x] **11a** Convention + audit de références + table rase. Commits `cf26676`, `da34b7f`, `2396eaa`, `6de955d`, `41aa61d`, `f370ea4`. Reprise en 0.1–0.5 pour l'outillage.
  - [ ] 11b. **Familles de fondation**, dans cet ordre (ordre mesuré sur les 188 tokens consommés par 75 recettes) :
    - [ ] 11b1. Sémantique couleur : `bg-*`, `text-*`, `border-*`, `accent-*`, `status-*`, `scrim`, `chart-muted`. La liste exacte des tokens est à valider avant le premier token créé.
    - [ ] 11b2. Fondations dimensionnelles : `spacing-*`, `radius-*`, `border-width`, `focus-*`. **Porte aussi `--mr-ref-radius-scale`** (D18) : primitif lu par 98 occurrences dans 58 fichiers, dont 52 recettes. Créer le token sémantique intermédiaire ici, pas en 11b1, pour que la phase couleur reste centrée sur la couleur.
    - [ ] 11b3. Typographie : `font-size-*`, `type-*`, `line-height-*`, `letter-spacing-*`, `font-weight-*`. **Suppression de `--mr-font-weight-bold`** (D15 §4.8) : `title`, `banner`, `progress` et `calendar` passent de 700 à 600, impact D10 annoncé et validé.
    - [ ] 11b4. Mouvement et empilement : `duration-*`, `easing-*`, `z-index-*`. **Suppression de `--mr-duration-{fast,slow}-alt`** au profit des rôles `--mr-duration-state` (150 ms) et `--mr-duration-panel` (200 ms) (D17). Corriger dans le même commit le bloc `prefers-reduced-motion`, qui ignore aujourd'hui `fast-alt`, `slow-alt`, `quick` et `600`, et ajouter le test qui échoue si un `duration-*` en est absent.
    - [ ] 11b5. Densité (`data-density`) et marque alternative (`data-brand="studio"`).
  - [ ] 11c+. **Composants**, un par session, même méthode que l'étape 3 (preuve par famille dès le premier commit). Pilote : Switch (7 tokens locaux, états + tailles). Le token local ne survit que s'il passe le test de la section 6 de la convention.
  - [ ] 11d. Réécriture de `docs/design/language.md` §5.x au fur et à mesure que les familles sont reconstruites — c'est ce document qui définit la palette, il ne peut pas rester en avance sur le code.
  - [ ] 11z. Fin de chantier : supprimer `packages/tokens/rebuild.json` (les contrôles redeviennent bloquants), supprimer l'appareil déprécié (`deprecated.json`, `deprecated.css`, `migration-table.md`) en un seul commit, passer le check `var(--mr-*)` en bloquant dans la CI, `language.md` aligné sur le système reconstruit.

## Notes

- **Unité de référence du chantier** (D24) : occurrences de `var(--mr-x)` pendantes dans les recettes. Base : **2241** occurrences / 129 tokens distincts, mesurée au commit `2d3981b`. Script : `packages/tokens/scripts/measure-pending.mjs`, cliquet dans `pending-baseline.json`. « 3291 » appartient à une ancienne unité et est retiré des critères.
- Réserve ouverte : run Release sur main échoue au push de `changeset-release/main` (403, permissions du dépôt GitHub, Settings > Actions > Workflow permissions). Pas de check requis dépendant, ne bloque rien. À corriger seulement quand la publication sera souhaitée.
- `.gitignore` : une ligne `memory-ai/` reste non commitée dans certains worktrees (modification d'une autre session) — vérifier avant tout `git add` massif.
- **Format des sources DTCG** : formatées à la main, objets sur une seule ligne (`"spacing-0": { "$value": "0" }`). Biome ne les reformatte pas. Ne jamais les réécrire avec `JSON.stringify(obj, null, 4)` : `core.json` passe de 251 à 463 lignes et la suppression se noie dans le diff de formatage.
- `docs/design/reference/*.reference.css` sont des **copies octet-pour-octet** du CSS généré (T1 l'exige) : les recopier après chaque build de tokens.
- L'audit des références ne voit pas un token consommé par **construction de nom** (`--mr-${tone}-border` dans X2). C'est la limite connue du scan : toute suppression massive doit être validée par l'exécution des checks, pas par l'audit seul.
