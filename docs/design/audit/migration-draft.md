# Brouillon MIGRATION — Phase 2b

Statut : brouillon de travail, non publié. Les valeurs exhaustives seront figées dans `MIGRATION.md` en phase 6 (G1).

## API runtime

| Avant | Après | Cassant | Action consommateur |
|---|---|---|---|
| Thèmes `light \| dark \| oled \| system` | `light \| dark \| oled \| high-contrast \| system` | non | `high-contrast` devient disponible ; conserver la valeur de stockage actuelle `model-theme`. |
| Valeur stockée `dim` | `dark` | oui | Migration automatique au bootstrap et dans `ThemeProvider`; la valeur stockée est réécrite `dark`. |
| `ThemeProvider` lit `localStorage` et `matchMedia` au rendu | Script de tête + `useSyncExternalStore`; snapshot serveur `system` | oui | Insérer `getThemeScript()` avant le script applicatif. Ne plus compter sur une application tardive du thème au premier rendu React. |
| `useTheme().isDark` | `useTheme().resolvedTheme` | oui | `isDark` reste temporairement, calculé depuis `resolvedTheme`, avec un unique avertissement de développement. |
| `useTheme().toggleTheme` | `useTheme().setTheme(theme)` | oui | Remplacer les cycles de bascule par une valeur explicite. |
| `ThemeRoot` + `.monority-theme-root` | `data-theme` sur `<html>` + `ThemeScope` pour les sous-arbres | oui | Retirer `ThemeRoot` de `AppProviders`. La classe legacy n'a plus d'effet CSS. |
| Portée de marque historique | `ThemeScope theme="dark" brand="studio"` | non | Pour les couleurs, poser ensemble thème et marque sur le même élément ou via un ancêtre. |

## Portée de marque

- Les rayons dérivés (`radius-inline/control/card/overlay`) et les 14 styles `type-*` sont redéclarés sur `:root, [data-theme], [data-brand]`.
- `data-brand="studio"` seul applique désormais les rayons à 50 % et les polices Inter / JetBrains Mono à tout niveau.
- Les couleurs sémantiques restent résolues à l'élément qui porte `data-theme`; `ThemeScope` garantit la cohérence et son type impose `theme` quand `brand` est fourni.

## Valeurs de tokens visuellement modifiées

La source exhaustive reste `docs/design/audit/migration-table.md`. Les familles suivantes ont une différence intentionnelle :

| Famille | Avant | Après | Conséquence |
|---|---|---|---|
| Icônes md | `--mr-icon-size-md: 18px` | `16px` | Chevrons et traits plus compacts. |
| Mouvement | fast/base/slow `150/200/300ms` | `120/180/240ms` | Transitions plus rapides. |
| Spinner | boucle `1600ms` | `--mr-duration-spin: 800ms`, `1600ms` en mouvement réduit | Rotation halo, perception préservée. |
| Rayons | échelle 10–16px selon l'ancien rôle | inline/control/card/overlay `4/6/10/12px`, scale studio `0.5` | Géométrie resserrée et déterministe. |
| Typographie | tokens texte historiques et graisse bold | 11/12/13/14/16/18/24/32px, graisses 400/500/600 | Composition homogène, 11px minimum. |
| Thèmes | thèmes clair/sombre/oled/dim partiels | light/dark/oled/high-contrast complets | Couleurs, contrastes et ombres selon la section 5.3-5.5. |
| Overlays | largeurs et offsets historiques | `--mr-dialog-width-*`, `--mr-drawer-width-*`, `--mr-popover-offset`, `--mr-tooltip-offset` | Géométrie centralisée. |
| Delays | durées locales | `--mr-tooltip-delay: 400ms`, `--mr-hover-card-delay: 400ms` | Comportement documenté et tokenisé. |

## Compatibilité transitoire

- `isDark` : conservé un temps, déprécié, avertissement unique en développement.
- `ThemeName.DIM` : conservé pour la migration des sources, mais `setTheme` le résout en `dark`.
- `ThemeRoot` : conservé avec balise de dépréciation, sans effet sur `<html>` et sans classe legacy.
- `toggleTheme` : retiré de `ThemeContext`; les consommateurs doivent passer à `setTheme`.

## Assertions modifiées en phase 2a

| Fichier / assertion | Ancienne valeur ou source | Nouvelle valeur ou source | Token responsable |
|---|---|---|---|
| `step23-tokens-contract.test.ts` — échelle d'espacement | `tokens/core/spacing.css`, `--mr-space-2: 0.375rem` | `tokens/generated/deprecated.css`, valeur identique | `--mr-space-2` |
| `step23-tokens-contract.test.ts` — durées | `tokens/core/durations.css`, `--mr-dur-150: 150ms`, `--mr-dur-200: 200ms` | `tokens/generated/deprecated.css`, valeurs identiques | `--mr-dur-150`, `--mr-dur-200` |
| `step31-geometry-contract.test.ts` — géométrie partagée | `tokens/core/geometry.css` pour `--mr-border-width`, `--mr-focus-width`, `--mr-control-padding-inline-md`, `--mr-icon-size-md`, `--mr-overlay-width-dialog`, `--mr-surface-padding-md`, `--mr-surface-gap-lg` | Les quatre premiers dans `generated/tokens.css`, les trois derniers dans `generated/deprecated.css` | Les sept tokens cités dans la colonne précédente |
| `step31-geometry-contract.test.ts` — import racine | `'./geometry.css'` dans `tokens/core/index.css` | `'./tokens/generated/tokens.css'` dans `packages/styles/src/index.css` | `--mr-border-width`, premier token du groupe géometrie importé |
| `step31-geometry-contract.test.ts` — Spinner | `tokens/component/spinner.css` + index dédié | `tokens/generated/deprecated.css` | `--mr-spinner-size-sm/md/lg`, `--mr-spinner-ring-sm/md/lg` |
| `step31-geometry-contract.test.ts` — ratio | `tokens/core/aspect-ratios.css` | `tokens/generated/deprecated.css` | `--mr-aspect-landscape` |
| `geometry.spec.ts` — chevron Select lg | 18px | 16px | `--mr-icon-size-md` passé de 18px à 16px |
| `geometry.spec.ts` — chevron Select sm/md | 14px / 15px | 14px / 15px, inchangés | `--mr-icon-size-sm: 16px`, puis extrapolation de recette |

Chaque assertion modifiée possède un token responsable identifié ; aucune valeur n'a été rétablie sans justification.

## Preuves

- `packages/tokens/scripts/check-equivalence.mjs` : CSS généré équivalent à la référence corrigée.
- `packages/ui/src/providers/get-theme-script.test.ts` : bootstrap, dim, high-contrast, stockage protégé, taille < 1 Ko.
- `packages/ui/src/providers/theme-provider.test.tsx` : rendu sans lecture du stockage, événements média, migration, hydratation, isDark.
- `apps/web/e2e/theme-runtime.spec.ts` : H2/H3 avant hydratation.
