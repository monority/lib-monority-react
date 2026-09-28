# Migrations

Ce fichier fait le point sur les migrations du projet : ce qui est **terminé**,
ce qui est **abandonné**, ce qui reste **à faire**. Il est écrit d'après l'état
réel du dépôt, pas d'après un plan.

Version courante de `@monority/ui` : **0.1.0** (aucun changeset en attente dans
`.changeset/`, donc rien n'est préparé pour la prochaine publication).

---

## Terminées

### BEM → attributs `data-*`

- **Statut** : terminé
- **Commits** : `4b7bf65` (Button) · `c92a339` (Select) · `1d7258c` (doublons) ·
  `90043f6` (formulaires) · `c33ef89` (overlays) · `267a972` (layout) ·
  `0f7e664` (finalisation)
- **Contenu** : les classes modificatrices `mr-x--y` ont été remplacées par des
  attributs `data-*`. 79 lignes de recettes traitées, 24 alias publics conservés,
  6 hooks préexistants restaurés après vérification qu'ils étaient réellement
  émis.
- **Parité vérifiée** : matrice navigateur avant/après sur 25 pages × 3 thèmes
  (4 230 éléments), 46 propriétés calculées → 0 différence de structure,
  0 différence ARIA, 8 différences de style toutes prouvées temporelles
  (animation de la barre indeterminate). Les 24 alias ont été validés
  fonctionnellement : 31 PASS / 0 FAIL.

**Ce qui n'a pas été migré, volontairement** :

- **24 alias BEM publics** (`.mr-kbd--sm`, `.mr-separator--vertical`,
  `.mr-progress__bar--indeterminate`, …) : ils sont documentés comme hooks CSS
  publics dans `apps/web`, certains sont encore émis par leur composant, et
  certains n'existaient déjà pas comme règle CSS. Les supprimer serait un
  changement cassant. Inventaire dans `docs/architecture/audit-10-10.md`.
- **DropZone** (`mr-drop-zone--dragover`, `mr-drop-zone--disabled`) : hors
  périmètre C2, documenté, laissé en l'état.
- **9 attributs prévus au plan mais jamais émis** (`data-current`,
  `data-align`, `data-direction` sur Field, `data-tone`/`data-disabled` sur
  Menubar, `data-hidden`/`data-multiple` sur Calendar) : aucun composant ne les
  émettait, les règles correspondantes ont été supprimées comme mortes plutôt que
  d'inventer un attribut. Reste à faire si ces états sont un jour nécessaires.

### Utilitaires : familles supprimées, préfixage `mr-*`

- **Statut** : terminé (avant ce plan, en D1/D2)
- **Commits** : `a1dee86` (opt-in `mr-*`, familles inutilisées supprimées) ·
  `2010ad9` (reset CSS hors bundle, export opt-in `./reset.css`)
- Il ne reste **aucune** classe utilitaire non préfixée. Les 8 classes
  restantes sont préfixées `mr-*` et confinées à `@monority/ui/utilities.css`
  (opt-in, hors bundle). 3 sont utilisées par le seul `AppErrorBoundary`, qui ne
  doit pas dépendre du paquet de composants.

### Réorganisation de `apps/web`

- **Statut** : terminé
- **Commit** : `68d9693`
- Le faux SaaS (auth simulée, « Alice Martin », `AdminPage`, `DashboardPage`,
  `useAuth`, `AuthProvider`, `mockAuthService`, `httpErrorUtils`,
  `useErrorToast` — 9 fichiers) a été supprimé, routes `/dashboard` et `/admin`
  retirées. L'application est réorganisée par fonctionnalité :
  `features/` (docs, playground, showcase, moodboard, harness, home),
  `shared/` (layouts, providers, seo, errors, test), `config/`, `routes/`.

### `data-display/` → `data/`

- **Statut** : terminé
- **Commit** : `61f8908`
- `table`, `metric-grid` et `stat-card` ont rejoint `data-list` et `data-table`
  dans `data/`. `display/` ne contient plus que `accordion`, `avatar`, `card`,
  `carousel`, `collapsible`. Les sous-chemins d'export publics sont inchangés
  (`@monority/ui/table`, etc.) : seuls les chemins internes ont bougé.

### Nettoyage des tests

- **Statut** : terminé
- **Commits** : `e012fdd` (8 fichiers `stepNN*` renommés d'après leur sujet, 0
  ligne de contenu modifiée) · `e7bc3e1` (contrat d'exports unifié)

---

## Sans objet (prémisse du plan invalidée)

### Divider → Separator

`Divider` et `Separator` ne sont pas des doublons. Props distinctes
(`label` vs `decorative`), DOM distinct, CSS distinct. Les fusionner aurait
supprimé deux fonctionnalités et le sous-chemin public `@monority/ui/divider`.
`Separator` est déjà migrated en `data-*`. **Aucune action.**

---

## En cours / à faire

### `space-*` → `spacing-*`

- **Statut** : **non commencé**
- L'échelle `--mr-space-*` est un alias déprécié de l'échelle 4px
  `--mr-spacing-*`. Elle reste la référence de fait : **116 fichiers** l'utilisent.
  11 alias dépréciés en dépendent.
- Point d'entrée : `packages/tokens/src/deprecated.json` (avec
  `node packages/tokens/scripts/check-deprecated.mjs --warn`), tables de
  correspondance dans `docs/design/audit/migration-table.md`.
- **Point d'attention** : 3px, 9px et 14px n'ont pas d'équivalent exact sur la
  grille 4px ; 28px et 56px sont absents de la grille. Une migration
  automatique serait une approximation silencieuse.

### Snapshots E2E périmés

- **Statut** : à rafraîchir
- 66 tests E2E échouent, mais **préexistants** (prouvé par A/B : le même spec
  échoue déjà sur `main` avant toute modification). Le CI n'exécute pas les E2E
  (`ci.yml` ne contient aucun `test:e2e`), donc rien ne garantissait leur vert.
  Les 4 specs concernés sont `moodboard.visual`, `design-customizer`,
  `geometry`, `theme-subtree`. Les captures d'audit correspondantes sont dans
  `docs/archive/audit/captures/`.

---

## Suivi

| Quoi | Où |
| --- | --- |
| Tokens dépréciés et règles de retrait | `packages/tokens/src/deprecated.json`, `pnpm --filter @monority/tokens test` |
| Contrat d'API publique | `packages/ui/src/__tests__/exports.test.ts` (134 tests) |
| Composition et invariants BEM/data | `packages/ui/src/__tests__/bem-modifiers.test.tsx` |
| Contrat docs ↔ API | `apps/web/src/features/docs/*-contract.test.ts` |
| Audit d'architecture | `docs/architecture/audit-10-10.md` |
| Journaux de refonte | `docs/archive/audit/` |
