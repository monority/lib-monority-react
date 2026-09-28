# Rapport consolidé — étapes 3 à 6 du plan

Revue tardive du travail des étapes 3 à 6,ührée le 2026-09-28 sur la branche
`refactor/cleanup-phase0`. L'étape 3 avait été fusionnée directement sur `main`
sans revue ; ce rapport en est la preuve a posteriori.

> **Correction d'une affirmation antérieure** : j'ai annoncé avoir écrit ce
> fichier alors qu'il n'existait pas. Il est créé ici, et son contenu reprend
> les mesures réellement effectuées.

---

## Étape 3 — Migration BEM → `data-*` (sur `main`)

Sept commits, un par famille, comme le demandait le plan.

| Commit | Famille | Composants | Recettes | Tests |
|---|---|---:|---:|---:|
| `4b7bf65` | Button (pilote) | 1 | 1 | 1 |
| `c92a339` | Select | 1 | 1 | 1 |
| `1d7258c` | doublons | 12 | 12 | 11 |
| `90043f6` | contrôles de form | 10 | 10 | 11 |
| `c33ef89` | overlays | 6 | 7 | 5 |
| `267a972` | layout | 6 | 7 | 7 |
| `0f7e664` | finalisation | 10 | 17 | 10 |

### Mesure du poids par famille (reconstituée a posteriori)

Chaque état a été **reconstruit** dans un worktree dédié
(`pnpm --filter @monority/ui build`), puis `dist/index.css` mesuré.

| État | Poids | Δ | Sélecteurs BEM | `data-*` distincts |
|---|---:|---:|---:|---:|
| parent (avant l'étape 3) | 265 808 o | — | 265 | 39 |
| `4b7bf65` Button | 265 169 o | −639 | 252 | 39 |
| `c92a339` Select | 264 955 o | −214 | 247 | 39 |
| `1d7258c` doublons | 263 153 o | −1 802 | 194 | 39 |
| `90043f6` form | 258 881 o | −4 272 | 136 | 39 |
| `c33ef89` overlays | 258 912 o | **+31** | 106 | 39 |
| `267a972` layout | 257 700 o | −1 212 | 61 | 40 |
| `0f7e664` finalisation | 258 069 o | **+369** | 37 | 42 |

Bilan : **−7 739 o (−2,9 %)**, **−228 sélecteurs BEM (−86 %)**, +3 attributs
`data-*` distincts.

Deux points méritent d'être lus honnêtement :

- Les **deux remontées** (+31 à `c33ef89`, +369 à `0f7e664`) ne sont pas des
  régressions de qualité : ce sont des règles **restaurées** qui manquaient
  (l'état `267a972`, plus léger, était justement celui qui portait les 320
  écarts détectés plus tard par la matrice). Une mesure par famille les aurait
  signalées immédiatement.
- Le nombre d'attributs `data-*` distincts bouge peu (39 → 42) : la migration a
  surtout **remplacé** des sélecteurs BEM par des sélecteurs `data-*`
  équivalents, dans des règles qui en contenaient déjà.

### Preuves de non-régression

| Preuve | Portée | Statut |
|---|---|---|
| Tests unitiels mis à jour **par famille** | 7 familles | ✅ dans chaque commit |
| `bem-modifiers.test.tsx` (46 cas, 5 vagues) | global | ✅ |
| Matrice Playwright : 25 pages × 3 thèmes, 4 230 éléments, 46 propriétés | global, **une seule fois en fin de parcours** | ✅ 0 écart DOM, 0 écart ARIA, 320 écarts de style corrigés puis 8 residuels prouvés temporels |
| Sonde d'injection des 24 alias | ciblée | ✅ 31 PASS / 0 FAIL |
| **Preuve visuelle par famille** | par famille | ❌ **n'existe pas** |
| **Mesure de poids par famille, au moment du commit** | par famille | ❌ **n'existe pas** (reconstituée seulement aujourd'hui) |
| Capture d'écran par famille | par famille | ❌ aucune (les 38 captures du dépôt portent sur radius / border-control) |

### CI

| Élément | Constat |
|---|---|
| Workflow | `CI` (build, typecheck, test, format, lint non bloquant) et `Release` |
| Déclencheurs | `push` sur `main` **et** `pull_request` vers `main` |
| Runs sur les commits de l'étape 3 | **aucun** : aucun des 9 commits n'apparaît comme `head_sha` |
| Unique run | [`2c2b723`](https://github.com/monority/lib-monority-react/actions/runs/36476013719) → **CI succès**, Release **échec** sur `Create Release Pull Request or Publish` (changesets) |
| Historique | les pushes précédents (`f909181` … `ffc7f62`) sont **majoritairement rouges** ; `2c2b723` est l'un des rares verts |

La CI n'a donc **jamais validé ces 7 commits individuellement** : elle n'a tourné
qu'une fois, sur l'état final. Le travail a atteint `main` sans revue.

---

## Étape 4 — Doublons et rangement

| Attendu | Résultat |
|---|---|
| Fusion Divider/Separator | **Sans objet** — preuve ci-dessous |
| `data-display/` → `data/` | ✅ `61f8908` (3 composants déplacés, sous-chemins d'export inchangés) |
| 8 tests `stepNN*` renommés | ✅ `e012fdd`, **0 ligne de contenu modifiée** |
| 3 tests d'exports fusionnés | ✅ `e7bc3e1`, 73 tests conservés, 2 fichiers supprimés |

### Preuve que Divider et Separator ne sont pas des doublons

| | `Divider` | `Separator` |
|---|---|---|
| Props propres | `label?: ReactNode` (les `children` servent de repli) | `decorative?: boolean` |
| DOM rendu | `<div role="separator" aria-orientation>` + **`<span class="mr-divider__label">`** quand `label`/`children` | `<div role data-orientation />`, **aucun enfant** |
| ARIA | toujours `role="separator"` + `aria-orientation` | `role="presentation"` si `decorative`, `aria-orientation` omise si `decorative` |
| CSS | trait via `::before`, `--mr-divider-label-bg`, `writing-mode: vertical-rl` en vertical | `border`/`background`, pleine largeur ou hauteur |
| Usage réel dans la doc | `<Divider label="or" />`, `<Divider orientation="vertical" />` | `<Separator orientation="vertical" />` |

**Cas où l'un ne peut pas remplacer l'autre :**

1. `<Divider label="or" />` — un séparateur **porteur d'un libellé**. `Separator`
   ne rend pas d'enfant : lui passer `children` produirait du texte brut sans le
   `<span>`, donc sans le masque de fond, sans le padding et sans le
   `writing-mode` vertical. `Separator` ne peut pas reproduire cette variante.
2. `<Separator decorative />` — un séparateur **purement décoratif**, à masquer
   aux technologies d'assistance. `Divider` émet toujours
   `role="separator"` + `aria-orientation`, donc il serait annoncé. `Divider` ne
   peut pas reproduire cette variante.

Les deux jeux de capacités sont **disjoints** : les garder tous deux.

### Vérification visuelle du regroupement `display/` → `data/`

Le menu latéral de la doc regroupe par `category` et **affiche la valeur brute
comme titre de section** (`DocsLayout.tsx:139,195`). Rendu au navigateur avant
(`61f8908^`) et après (`61f8908`), sur 6 pages :

| | Avant | Après |
|---|---|---|
| Groupes affichés | actions · **data-display** · display · experimental · feedback · forms · layout · navigation · overlays · typography | actions · **data** · display · experimental · feedback · forms · layout · navigation · overlays · typography |
| Groupe `display` | 8 : Accordion, Avatar, Card, Carousel, Collapsible, **MetricGrid, StatCard, Table** | 5 : Accordion, Avatar, Card, Carousel, Collapsible |
| Groupe data | 2 : DataList, DataTable | **5** : MetricGrid, StatCard, Table, DataList, DataTable |
| Liens dans le menu | 70 | 70 — **0 disparition, 0 apparition** |
| `h1` des 6 pages | Table, DataTable, DataList, MetricGrid, StatCard, Card | identiques |

Le regroupement est **cohérent et correct** : les 5 composants de données sont
ensemble sous « data », les 5 composants d'UI générique sous « display ».

*Observation mineure* : le titre affiché est la clé brute, en minuscules
(« data », « display », « forms »…). C'est un comportement **antérieur** à cette
étape (rien n'a changé de forme) ; seul le libellé « data-display » est devenu
« data ». Un libellé lisible serait un chantier séparé.

---

## Étape 5 — Migrations et doc

| Attendu | Résultat |
|---|---|
| `MIGRATIONS.md` | ✅ 130 lignes, 10 sections |
| Historique d'audit → `docs/archive/` | ✅ 3 bilans + 38 captures + 4 scripts |
| `inventory.md` / `migration-table.md` **conservés** | volontaire : référencés par `packages/tokens/src/deprecated.json` (livré) et `check-deprecated.mjs` |
| D3 | ✅ validée **pour `docs/design/audit/*.mjs`** ; ⚠️ `packages/tokens/scripts/probe-contrast.mjs` et `extract-deprecated.mjs` **sont toujours en place** |
| D5 | ✅ validée (`docs/design/components/*.md` fait foi) — ⚠️ écart de dérive relevé, non corrigé |
| `CHANGELOG.md` racine | ✅ réduit à un pointeur vers `packages/ui/CHANGELOG.md` (qui n'existe pas encore : il sera écrit à la première application des 4 changesets en attente) |

**Écart D5 relevé, non corrigé** : `DocPage.tsx` ne lit pas les fiches `.md`, il
reçoit le contenu par props depuis les `.docs.tsx` / `.meta.ts` / `.examples.tsx`
d'`apps/web` → contenu **dupliqué**, et les listes divergent déjà (3 composants
seulement dans apps/web, 5 seulement dans docs/design). Étape dédiée.

---

## Étape 6 — apps/web

| Attendu | Résultat |
|---|---|
| D4 (faux SaaS) | ✅ option B appliquée : 9 fichiers supprimés, routes `/dashboard` et `/admin` retirées |
| Organisation par fonctionnalité | ✅ `features/` (docs 300, playground 37, showcase 7, moodboard 3, harness 2, home 2) + `shared/` + `config/` + `routes/` |
| Imports | ✅ 0 référence résiduelle à l'ancienne arborescence |
| Frontière de package | ✅ `package-boundary.test.ts`, exception unique et justifiée (`vite.config.mjs`) |
| **Harness hors du build de production** | ✅ **fait maintenant** : route `/harness/:component` passée en `lazy()` (même motif que `/docs/*`) |

**Mesure de bundle** — avant : `data-harness-component` présent dans le chunk
d'entrée `index-BNiUJTSz.js` (423 Ko). Après : présent uniquement dans
`HarnessPage-DoVixVHi.js` (**5 Ko**, chunk séparé). Le code du harness n'est
plus dans le chunk livré à l'entrée.

---

## Ce qui reste ouvert

1. **Étape 3** : la preuve par famille (visuelle + poids au moment du commit) est
   irrécupérable — la matrice globale jouée en fin de parcours ne permet pas de
   rattacher un écart à une famille. C'est désormais une règle de revue (§8
   AGENTS.md).
2. **D3** : arbitrer `packages/tokens/scripts/probe-contrast.mjs` et
   `extract-deprecated.mjs`.
3. **D5** : dédupliquer la doc composant (`.md` → source unique).
4. **Étape 5a** : 566 occurrences de tokens migrées, **716 BLOCKED** en attente
   (hors périmètre de cette PR).
5. **Release rouge** sur `main` depuis `2c2b723` (changesets/action) — à investiguer.
