# Audit — inventaire (phase 0 bis)

Réf. : `docs/roadmap/refonte/prompt-refonte-monority-ui.md` v4 — phase 0 bis, aucune modification de code source.
HEAD : `31a97c9` — worktree propre avant exécution (`git status --porcelain` → 0 ligne).

## Méthodes et commandes

| Livrable | Commande |
|---|---|
| Inventaire composants / exports / imports | parcours récursif des `index.ts` de `packages/ui/src/components/<catégorie>/<composant>/` + regex `import { … } from '@monority/ui…'` sur `apps/web/src/**/*.{ts,tsx}` |
| Valeurs en dur (CSS) | décompte par fichier : hex, rgb()/hsla()/oklch(), px hors {0,1,2}px, ms, font-weight/z-index/letter-spacing hors `var()` sur `packages/styles/src/recipes/*.css` |
| Valeurs en dur (TSX) | même décompte sur `packages/ui/src/components/**/*.tsx` hors tests |
| Poids des points d'entrée | `pnpm build && node docs/design/audit/measure-size.mjs` (esbuild minify + gzip -9) |
| Captures de référence | `AUDIT_BASELINE=1 pnpm exec playwright test audit-baseline --project=desktop --update-snapshots` (dans `apps/web`) → `e2e/audit-baseline.spec.ts-snapshots/` |
| Accès JS au thème | regex `data-theme|useTheme|ThemeProvider|ThemeRoot|localStorage|matchMedia|isDark|toggleTheme` sur `packages/ui/src` + `apps/web/src` |

## 1. Familles, exports, classification

74 répertoires composants, 242 identifiants publics exportés par `@monority/ui` (composants + types + hooks/providers/lib), 262 exports via les index de composants.

| Composant | Dossier | Catégorie | Spec | Exports | Imports apps/web (fichiers) | Recette CSS | En dur recette | En dur TSX |
|---|---|---|---|---|---|---|---|---|
| Button | `components/actions/button` | actions | 7.1 | 4 | 35 | `button.recipe.css` | 1 | 0 |
| CopyButton | `components/actions/copy-button` | actions | 7.1 | 4 | 0 | `—` | 0 | 0 |
| IconButton | `components/actions/icon-button` | actions | 7.1 | 4 | 0 | `—` | 0 | 0 |
| Toggle | `components/actions/toggle` | actions | 7.2 | 4 | 5 | `toggle.recipe.css` | 1 | 0 |
| ToggleGroup | `components/actions/toggle-group` | actions | 7.2 | 7 | 3 | `toggle-group.recipe.css` | 2 | 0 |
| DataList | `components/data-display/data-list` | data-display | 7.15 | 4 | 3 | `data-list.recipe.css` | 3 | 0 |
| DataTable | `components/data-display/data-table` | data-display | 7.15 | 6 | 4 | `data-table.recipe.css` | 5 | 0 |
| Accordion | `components/display/accordion` | display | 7.18 | 4 | 4 | `accordion.recipe.css` | 4 | 0 |
| Avatar | `components/display/avatar` | display | 7.18 | 3 | 5 | `avatar.recipe.css` | 2 | 0 |
| Card | `components/display/card` | display | 7.13 | 3 | 9 | `card.recipe.css` | 1 | 0 |
| Carousel | `components/display/carousel` | display | 7.18 | 2 | 3 | `carousel.recipe.css` | 1 | 0 |
| Collapsible | `components/display/collapsible` | display | 7.18 | 2 | 3 | `collapsible.recipe.css` | 5 | 0 |
| MetricGrid | `components/display/metric-grid` | display | 7.14 | 3 | 3 | `metric-grid.recipe.css` | 2 | 0 |
| StatCard | `components/display/stat-card` | display | 7.14 | 3 | 3 | `stat-card.recipe.css` | 2 | 0 |
| Table | `components/display/table` | display | 7.15 | 3 | 4 | `table.recipe.css` | 2 | 0 |
| InfiniteScroll | `components/experimental/infinite-scroll` | experimental | 7.18 | 2 | 3 | `infinite-scroll.recipe.css` | 0 | 0 |
| AsyncStateNotice | `components/feedback/async-state-notice` | feedback | 7.19 | 2 | 3 | `async-state-notice.recipe.css` | 0 | 0 |
| Badge | `components/feedback/badge` | feedback | 7.3 | 3 | 13 | `badge.recipe.css` | 2 | 0 |
| Banner | `components/feedback/banner` | feedback | 7.18 | 3 | 3 | `banner.recipe.css` | 4 | 0 |
| Callout | `components/feedback/callout` | feedback | 7.18 | 3 | 6 | `callout.recipe.css` | 2 | 0 |
| EmptyState | `components/feedback/empty-state` | feedback | 7.18 | 2 | 3 | `empty-state.recipe.css` | 1 | 0 |
| InlineAlert | `components/feedback/inline-alert` | feedback | 7.19 | 3 | 3 | `inline-alert.recipe.css` | 3 | 0 |
| Progress | `components/feedback/progress` | feedback | 7.17 | 3 | 5 | `progress.recipe.css` | 3 | 0 |
| Skeleton | `components/feedback/skeleton` | feedback | 7.17 | 3 | 5 | `skeleton.recipe.css` | 0 | 0 |
| Spinner | `components/feedback/spinner` | feedback | 7.17 | 4 | 5 | `spinner.recipe.css` | 0 | 0 |
| Toast | `components/feedback/toast` | feedback | 7.18 | 3 | 2 | `toast.recipe.css` | 4 | 0 |
| Calendar | `components/forms/calendar` | forms | 7.18 | 2 | 3 | `calendar.recipe.css` | 4 | 0 |
| Checkbox | `components/forms/checkbox` | forms | 7.7 | 4 | 7 | `checkbox.recipe.css` | 3 | 0 |
| Combobox | `components/forms/combobox` | forms | 7.6 | 5 | 3 | `combobox.recipe.css` | 3 | 0 |
| DatePicker | `components/forms/date-picker` | forms | 7.18 | 4 | 3 | `date-picker.recipe.css` | 5 | 0 |
| DateRangePicker | `components/forms/date-range-picker` | forms | 7.18 | 3 | 3 | `date-range-picker.recipe.css` | 1 | 0 |
| Field | `components/forms/field` | forms | 7.4 | 20 | 3 | `field.recipe.css` | 4 | 0 |
| FileUpload | `components/forms/file-upload` | forms | 7.18 | 10 | 3 | `file-upload.recipe.css` | 1 | 0 |
| FormSection | `components/forms/form-section` | forms | 7.4 | 2 | 3 | `form-section.recipe.css` | 2 | 0 |
| Input | `components/forms/input` | forms | 7.5 | 2 | 15 | `input.recipe.css` | 0 | 0 |
| NumberInput | `components/forms/number-input` | forms | 7.5 | 3 | 1 | `number-input.recipe.css` | 1 | 0 |
| PasswordInput | `components/forms/password-input` | forms | 7.5 | 3 | 1 | `password-input.recipe.css` | 0 | 0 |
| RadioGroup | `components/forms/radio-group` | forms | 7.7 | 5 | 4 | `radio-group.recipe.css` | 1 | 0 |
| Select | `components/forms/select` | forms | 7.6 | 4 | 8 | `select.recipe.css` | 0 | 0 |
| Slider | `components/forms/slider` | forms | 7.8 | 3 | 5 | `slider.recipe.css` | 1 | 0 |
| Switch | `components/forms/switch` | forms | 7.8 | 4 | 5 | `switch.recipe.css` | 1 | 0 |
| Textarea | `components/forms/textarea` | forms | 7.5 | 4 | 6 | `textarea.recipe.css` | 0 | 0 |
| AspectRatio | `components/layout/aspect-ratio` | layout | 7.18 | 2 | 3 | `aspect-ratio.recipe.css` | 0 | 0 |
| Container | `components/layout/container` | layout | 7.18 | 3 | 6 | `container.recipe.css` | 1 | 0 |
| Divider | `components/layout/divider` | layout | 7.17 | 2 | 3 | `divider.recipe.css` | 1 | 0 |
| Grid | `components/layout/grid` | layout | 7.18 | 3 | 3 | `grid.recipe.css` | 1 | 0 |
| PageHeader | `components/layout/page-header` | layout | 7.18 | 2 | 3 | `page-header.recipe.css` | 4 | 0 |
| Resizable | `components/layout/resizable` | layout | 7.18 | 6 | 3 | `resizable.recipe.css` | 3 | 0 |
| ScrollArea | `components/layout/scroll-area` | layout | 7.18 | 2 | 3 | `scroll-area.recipe.css` | 0 | 0 |
| Section | `components/layout/section` | layout | 7.18 | 4 | 7 | `section.recipe.css` | 3 | 0 |
| Separator | `components/layout/separator` | layout | 7.19 | 2 | 4 | `separator.recipe.css` | 0 | 0 |
| Stack | `components/layout/stack` | layout | 7.18 | 3 | 5 | `stack.recipe.css` | 0 | 0 |
| Toolbar | `components/layout/toolbar` | layout | 7.18 | 2 | 3 | `toolbar.recipe.css` | 1 | 0 |
| Breadcrumb | `components/navigation/breadcrumb` | navigation | 7.16 | 3 | 4 | `breadcrumb.recipe.css` | 2 | 0 |
| FilterBar | `components/navigation/filter-bar` | navigation | 7.18 | 2 | 3 | `filter-bar.recipe.css` | 3 | 0 |
| Menubar | `components/navigation/menubar` | navigation | 7.10 | 4 | 3 | `menubar.recipe.css` | 4 | 0 |
| NavigationMenu | `components/navigation/navigation-menu` | navigation | 7.10 / 7.16 | 4 | 3 | `navigation-menu.recipe.css` | 5 | 0 |
| Pagination | `components/navigation/pagination` | navigation | 7.16 | 2 | 3 | `pagination.recipe.css` | 3 | 0 |
| SidebarLayout | `components/navigation/sidebar-layout` | navigation | 7.16 | 3 | 3 | `sidebar-layout.recipe.css` | 1 | 0 |
| Tabs | `components/navigation/tabs` | navigation | 7.9 | 5 | 5 | `tabs.recipe.css` | 1 | 0 |
| Topbar | `components/navigation/topbar` | navigation | 7.16 | 2 | 4 | `topbar.recipe.css` | 4 | 0 |
| AlertDialog | `components/overlays/alert-dialog` | overlays | 7.12 | 3 | 4 | `alert-dialog.recipe.css` | 4 | 0 |
| CommandPalette | `components/overlays/command-palette` | overlays | 7.12 | 3 | 3 | `command-palette.recipe.css` | 3 | 0 |
| ContextMenu | `components/overlays/context-menu` | overlays | 7.10 | 3 | 3 | `context-menu.recipe.css` | 2 | 0 |
| Drawer | `components/overlays/drawer` | overlays | 7.12 | 3 | 4 | `drawer.recipe.css` | 4 | 0 |
| DropdownMenu | `components/overlays/dropdown-menu` | overlays | 7.10 | 5 | 3 | `dropdown-menu.recipe.css` | 2 | 0 |
| HoverCard | `components/overlays/hover-card` | overlays | 7.10 | 4 | 3 | `hover-card.recipe.css` | 1 | 0 |
| Modal | `components/overlays/modal` | overlays | 7.12 | 2 | 6 | `modal.recipe.css` | 4 | 0 |
| Popover | `components/overlays/popover` | overlays | 7.10 | 4 | 3 | `popover.recipe.css` | 2 | 0 |
| Tooltip | `components/overlays/tooltip` | overlays | 7.11 | 2 | 7 | `tooltip.recipe.css` | 1 | 0 |
| Kbd | `components/typography/kbd` | typography | 7.18 | 2 | 3 | `kbd.recipe.css` | 2 | 0 |
| PreCode | `components/typography/pre-code` | typography | 7.18 | 3 | 4 | `pre-code.recipe.css` | 0 | 0 |
| Text | `components/typography/text` | typography | 7.18 | 4 | 5 | `text.recipe.css` | 0 | 0 |
| Title | `components/typography/title` | typography | 7.18 | 3 | 4 | `title.recipe.css` | 2 | 0 |

Répartition : 7.1 = 3 · 7.10 / 7.16 = 1 · 7.10 = 5 · 7.11 = 1 · 7.12 = 4 · 7.13 = 1 · 7.14 = 2 · 7.15 = 3 · 7.16 = 4 · 7.17 = 4 · 7.18 = 27 · 7.19 = 3 · 7.2 = 2 · 7.3 = 1 · 7.4 = 2 · 7.5 = 4 · 7.6 = 2 · 7.7 = 2 · 7.8 = 2 · 7.9 = 1.

Couverture docs : 70 pages `/docs/<slug>` dans `apps/web/src/docs/components/registry.ts` ; 4 répertoires sans page dédiée : `copy-button`, `icon-button`, `number-input`, `password-input` (décrits via Button / Input).

Imports `apps/web` : 93 identifiants publics importés nommément, répartis dans 254 fichiers sur 375 fichiers scannés.

## 2. Valeurs en dur par fichier

### 2.1 Recettes CSS (`packages/styles/src/recipes`)

77 fichiers, 61 avec au moins une valeur en dur, 16 vierges. Exceptions autorisées par la spec : `0`, `1px`, `2px` (bordure/rail/focus), pourcentages de mise en page.

| Fichier | hex | rgb/hsl/oklch | px hors exceptions | ms | num. hors tokens | Total |
|---|---|---|---|---|---|---|
| `collapsible.recipe.css` | 0 | 0 | 1 | 3 | 1 | 5 |
| `data-table.recipe.css` | 0 | 0 | 0 | 0 | 5 | 5 |
| `date-picker.recipe.css` | 0 | 0 | 0 | 0 | 5 | 5 |
| `navigation-menu.recipe.css` | 0 | 0 | 0 | 0 | 5 | 5 |
| `accordion.recipe.css` | 0 | 0 | 1 | 0 | 3 | 4 |
| `alert-dialog.recipe.css` | 0 | 0 | 1 | 0 | 3 | 4 |
| `banner.recipe.css` | 0 | 0 | 1 | 0 | 3 | 4 |
| `calendar.recipe.css` | 0 | 0 | 0 | 0 | 4 | 4 |
| `drawer.recipe.css` | 0 | 0 | 1 | 0 | 3 | 4 |
| `field.recipe.css` | 0 | 0 | 0 | 0 | 4 | 4 |
| `menubar.recipe.css` | 0 | 0 | 0 | 0 | 4 | 4 |
| `modal.recipe.css` | 0 | 0 | 1 | 0 | 3 | 4 |
| `page-header.recipe.css` | 0 | 0 | 1 | 0 | 3 | 4 |
| `toast.recipe.css` | 0 | 0 | 1 | 0 | 3 | 4 |
| `topbar.recipe.css` | 0 | 0 | 1 | 0 | 3 | 4 |
| `checkbox.recipe.css` | 0 | 0 | 3 | 0 | 0 | 3 |
| `combobox.recipe.css` | 0 | 0 | 0 | 1 | 2 | 3 |
| `command-palette.recipe.css` | 0 | 0 | 0 | 0 | 3 | 3 |
| `data-list.recipe.css` | 0 | 0 | 1 | 0 | 2 | 3 |
| `filter-bar.recipe.css` | 0 | 0 | 1 | 0 | 2 | 3 |
| `inline-alert.recipe.css` | 0 | 0 | 1 | 0 | 2 | 3 |
| `pagination.recipe.css` | 0 | 0 | 1 | 0 | 2 | 3 |
| `progress.recipe.css` | 0 | 0 | 0 | 0 | 3 | 3 |
| `resizable.recipe.css` | 0 | 0 | 0 | 1 | 2 | 3 |
| `section.recipe.css` | 0 | 0 | 1 | 0 | 2 | 3 |
| `avatar.recipe.css` | 0 | 1 | 0 | 0 | 1 | 2 |
| `badge.recipe.css` | 0 | 0 | 0 | 0 | 2 | 2 |
| `breadcrumb.recipe.css` | 0 | 0 | 0 | 0 | 2 | 2 |
| `callout.recipe.css` | 0 | 0 | 0 | 0 | 2 | 2 |
| `context-menu.recipe.css` | 0 | 0 | 0 | 0 | 2 | 2 |
| `dropdown-menu.recipe.css` | 0 | 0 | 0 | 0 | 2 | 2 |
| `file-trigger.recipe.css` | 0 | 0 | 1 | 0 | 1 | 2 |
| `form-section.recipe.css` | 0 | 0 | 1 | 0 | 1 | 2 |
| `kbd.recipe.css` | 0 | 1 | 0 | 0 | 1 | 2 |
| `metric-grid.recipe.css` | 0 | 0 | 2 | 0 | 0 | 2 |
| `popover.recipe.css` | 0 | 0 | 1 | 0 | 1 | 2 |
| `stat-card.recipe.css` | 0 | 0 | 0 | 0 | 2 | 2 |
| `table.recipe.css` | 0 | 0 | 0 | 0 | 2 | 2 |
| `title.recipe.css` | 0 | 0 | 0 | 0 | 2 | 2 |
| `toggle-group.recipe.css` | 0 | 0 | 0 | 0 | 2 | 2 |
| `button.recipe.css` | 0 | 0 | 0 | 0 | 1 | 1 |
| `card.recipe.css` | 0 | 0 | 0 | 0 | 1 | 1 |
| `carousel.recipe.css` | 0 | 0 | 0 | 0 | 1 | 1 |
| `container.recipe.css` | 0 | 0 | 1 | 0 | 0 | 1 |
| `date-range-picker.recipe.css` | 0 | 0 | 1 | 0 | 0 | 1 |
| `divider.recipe.css` | 0 | 0 | 0 | 0 | 1 | 1 |
| `empty-state.recipe.css` | 0 | 0 | 1 | 0 | 0 | 1 |
| `file-list.recipe.css` | 0 | 0 | 0 | 0 | 1 | 1 |
| `file-upload.recipe.css` | 0 | 0 | 0 | 0 | 1 | 1 |
| `grid.recipe.css` | 0 | 0 | 1 | 0 | 0 | 1 |
| `hover-card.recipe.css` | 0 | 0 | 0 | 0 | 1 | 1 |
| `input-base.recipe.css` | 0 | 0 | 0 | 0 | 1 | 1 |
| `number-input.recipe.css` | 0 | 0 | 0 | 0 | 1 | 1 |
| `radio-group.recipe.css` | 0 | 0 | 1 | 0 | 0 | 1 |
| `sidebar-layout.recipe.css` | 0 | 0 | 1 | 0 | 0 | 1 |
| `slider.recipe.css` | 0 | 0 | 0 | 0 | 1 | 1 |
| `switch.recipe.css` | 0 | 0 | 1 | 0 | 0 | 1 |
| `tabs.recipe.css` | 0 | 0 | 0 | 0 | 1 | 1 |
| `toggle.recipe.css` | 0 | 0 | 0 | 0 | 1 | 1 |
| `toolbar.recipe.css` | 0 | 0 | 1 | 0 | 0 | 1 |
| `tooltip.recipe.css` | 0 | 0 | 0 | 0 | 1 | 1 |

Recettes vierges : `aspect-ratio.recipe.css`, `async-state-notice.recipe.css`, `drop-zone.recipe.css`, `index.css`, `infinite-scroll.recipe.css`, `input.recipe.css`, `password-input.recipe.css`, `pre-code.recipe.css`, `scroll-area.recipe.css`, `select.recipe.css`, `separator.recipe.css`, `skeleton.recipe.css`, `spinner.recipe.css`, `stack.recipe.css`, `text.recipe.css`, `textarea.recipe.css`.

### 2.2 Composants TSX

0 composant avec valeur en dur en TSX (74 scannés : hex, px hors {0,1,2}px, ms, box-shadow).

### 2.3 Hors recettes (contexte)

Les fichiers de thèmes et de tokens portent des couleurs en dur par construction (`packages/styles/src/themes/modes/*.css`, `packages/styles/src/tokens/**`, `packages/tokens/src/tokens.json`) : 575 occurrences de hex sur `packages/styles/src` + `packages/tokens` (commande : `Select-String -Pattern '#[0-9a-fA-F]{3,8}' -Include *.css,*.json,*.js,*.ts` → 575). Ces fichiers sont remplacés en phase 2 par la génération DTCG : hors critère T2 (composants et utilitaires uniquement).

## 3. Poids des points d'entrée (min + gzip)

Commande : `pnpm build && node docs/design/audit/measure-size.mjs` (75 entrées `packages/ui/dist/*.js`, esbuild minify es2020 + gzip niveau 9).

| Entrée | min (B) | gzip (B) |
|---|---|---|
| `accordion.js` | 2467 | 1217 |
| `alertDialog.js` | 5623 | 2321 |
| `aspectRatio.js` | 475 | 319 |
| `asyncStateNotice.js` | 1900 | 830 |
| `avatar.js` | 1241 | 688 |
| `badge.js` | 932 | 498 |
| `banner.js` | 1441 | 673 |
| `breadcrumb.js` | 773 | 408 |
| `button.js` | 2895 | 1327 |
| `calendar.js` | 4595 | 1785 |
| `callout.js` | 1252 | 614 |
| `card.js` | 443 | 300 |
| `carousel.js` | 1937 | 931 |
| `checkbox.js` | 4612 | 1700 |
| `collapsible.js` | 1568 | 759 |
| `combobox.js` | 7257 | 2741 |
| `commandPalette.js` | 5063 | 2133 |
| `container.js` | 892 | 488 |
| `contextMenu.js` | 2806 | 1313 |
| `copyButton.js` | 3189 | 1423 |
| `dataList.js` | 1203 | 610 |
| `dataTable.js` | 8872 | 3138 |
| `datePicker.js` | 11564 | 4073 |
| `dateRangePicker.js` | 13247 | 4616 |
| `divider.js` | 507 | 327 |
| `drawer.js` | 5615 | 2361 |
| `dropdownMenu.js` | 4516 | 1859 |
| `emptyState.js` | 1884 | 820 |
| `field.js` | 2411 | 859 |
| `fileUpload.js` | 7968 | 2885 |
| `filterBar.js` | 390 | 278 |
| `formSection.js` | 2354 | 929 |
| `grid.js` | 927 | 501 |
| `hoverCard.js` | 3812 | 1675 |
| `iconButton.js` | 3163 | 1421 |
| `index.js` | 106033 | 29397 |
| `infiniteScroll.js` | 1867 | 927 |
| `inlineAlert.js` | 3809 | 1607 |
| `input.js` | 4171 | 1529 |
| `kbd.js` | 1044 | 543 |
| `menubar.js` | 1894 | 828 |
| `metricGrid.js` | 2639 | 1037 |
| `modal.js` | 5050 | 2154 |
| `navigationMenu.js` | 2888 | 1253 |
| `numberInput.js` | 5564 | 2084 |
| `pageHeader.js` | 359 | 256 |
| `pagination.js` | 1656 | 700 |
| `passwordInput.js` | 4984 | 1787 |
| `popover.js` | 3295 | 1448 |
| `preCode.js` | 1071 | 568 |
| `progress.js` | 1806 | 812 |
| `radio-group.js` | 5064 | 1776 |
| `resizable.js` | 5268 | 2128 |
| `scrollArea.js` | 465 | 309 |
| `section.js` | 1167 | 586 |
| `select.js` | 4320 | 1560 |
| `separator.js` | 995 | 519 |
| `sidebarLayout.js` | 683 | 359 |
| `skeleton.js` | 969 | 531 |
| `slider.js` | 3974 | 1465 |
| `spinner.js` | 1060 | 556 |
| `stack.js` | 1420 | 641 |
| `statCard.js` | 2482 | 979 |
| `switch.js` | 4270 | 1557 |
| `table.js` | 2672 | 1076 |
| `tabs.js` | 2392 | 1181 |
| `text.js` | 943 | 512 |
| `textarea.js` | 4664 | 1736 |
| `title.js` | 854 | 486 |
| `toast.js` | 3752 | 1610 |
| `toggle.js` | 1330 | 694 |
| `toggleGroup.js` | 2242 | 1078 |
| `toolbar.js` | 364 | 260 |
| `tooltip.js` | 709 | 470 |
| `topbar.js` | 350 | 253 |

Somme gzip des 75 entrées : NaN B. `index.js` : 106033 B min / 29397 B gzip. Référence phase 0 pour le critère X3 (régression > 5 % interdite).

## 4. Accès JavaScript au thème

- **Infrastructure de thème (packages/ui providers/hooks/contexts)** : 20 occurrences — `ThemeProvider` (lecture `localStorage` + `matchMedia` au rendu, exports `isDark`, `toggleTheme`), `ThemeRoot` (pose `data-theme` sur `.monority-theme-root`), `useTheme`, `ThemeContext`. Cible phase 2 : `getThemeScript()` + `useSyncExternalStore`, `isDark` déprécié (section 5.2).
- **Intérieur de composant (packages/ui/src/components)** : 0 occurrence(s) — aucun composant ne lit le thème, P7 respecté aujourd'hui.
- **Utilitaire applicatif (apps/web)** : 19 occurrences — `apps/web/src/docs/components/progress/Progress.examples.tsx`, `apps/web/src/home/PremiumIcosahedron.tsx`, `apps/web/src/layouts/AppPage.tsx`, `apps/web/src/layouts/AppShell.test.tsx`, `apps/web/src/layouts/AppShell.tsx`, `apps/web/src/providers/AppProviders.tsx`, `apps/web/src/test/setup.ts`. Dont `matchMedia('prefers-reduced-motion')` dans `Progress.examples.tsx` et `PremiumIcosahedron.tsx` (mouvement réduit, pas le thème) ; `AppPage`/`AppShell` lisent `isDark`, `theme`, `toggleTheme` pour les libellés ; `AppProviders` monte `ThemeProvider` + `ThemeRoot` ; `test/setup.ts` polyfille `matchMedia`.

Détail (fichier:ligne) :

- `packages/ui/src/contexts/theme-context.ts:7` — isDark: boolean
- `packages/ui/src/contexts/theme-context.ts:9` — toggleTheme: () => void
- `packages/ui/src/hooks/index.ts:1` — export { useTheme } from './use-theme'
- `packages/ui/src/hooks/use-theme.ts:4` — export function useTheme() {
- `packages/ui/src/hooks/use-theme.ts:8` — throw new Error('useTheme must be used inside ThemeProvider')
- `packages/ui/src/providers/index.ts:1` — export { ThemeProvider } from './theme-provider'
- `packages/ui/src/providers/index.ts:2` — export { ThemeRoot } from './theme-root'
- `packages/ui/src/providers/theme-provider.tsx:16` — if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
- `packages/ui/src/providers/theme-provider.tsx:28` — const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
- `packages/ui/src/providers/theme-provider.tsx:42` — interface ThemeProviderProps {
- `packages/ui/src/providers/theme-provider.tsx:46` — export function ThemeProvider({ children }: ThemeProviderProps) {
- `packages/ui/src/providers/theme-provider.tsx:59` — const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
- `packages/ui/src/providers/theme-provider.tsx:72` — window.localStorage.setItem(THEME_STORAGE_KEY, theme)
- `packages/ui/src/providers/theme-provider.tsx:79` — isDark: resolvedTheme === ThemeName.DARK || resolvedTheme === ThemeName.OLED,
- `packages/ui/src/providers/theme-provider.tsx:81` — toggleTheme: () => {
- `packages/ui/src/providers/theme-root.tsx:2` — import { useTheme } from '../hooks/use-theme'
- `packages/ui/src/providers/theme-root.tsx:4` — interface ThemeRootProps {
- `packages/ui/src/providers/theme-root.tsx:8` — export function ThemeRoot({ children }: ThemeRootProps) {
- `packages/ui/src/providers/theme-root.tsx:9` — const { resolvedTheme } = useTheme()
- `packages/ui/src/providers/theme-root.tsx:26` — <div className="monority-theme-root" data-theme={resolvedTheme} style={{ colorScheme: resolvedTheme }}>
- `apps/web/src/docs/components/progress/Progress.examples.tsx:43` — if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
- `apps/web/src/home/PremiumIcosahedron.tsx:87` — const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
- `apps/web/src/layouts/AppPage.tsx:4` — import { useTheme } from '@monority/ui'
- `apps/web/src/layouts/AppPage.tsx:21` — const { isDark, theme, toggleTheme } = useTheme()
- `apps/web/src/layouts/AppPage.tsx:26` — isDark={isDark}
- `apps/web/src/layouts/AppPage.tsx:28` — onToggleTheme={toggleTheme}
- `apps/web/src/layouts/AppShell.test.tsx:57` — isDark={false}
- `apps/web/src/layouts/AppShell.tsx:18` — isDark: boolean
- `apps/web/src/layouts/AppShell.tsx:78` — export function AppShell({ isDark, theme, onToggleTheme, navigationItems = [], children }: AppShellProps) {
- `apps/web/src/layouts/AppShell.tsx:94` — if (theme === 'system') return isDark ? 'oled' : 'sombre'
- `apps/web/src/layouts/AppShell.tsx:95` — if (isDark) return 'oled'
- `apps/web/src/layouts/AppShell.tsx:99` — const themeDisplay = theme === 'system' ? 'Systeme' : theme === 'oled' ? 'OLED' : isDark ? 'Sombre' : 'Clair'
- `apps/web/src/layouts/AppShell.tsx:314` — aria-pressed={isDark}
- `apps/web/src/layouts/AppShell.tsx:426` — aria-pressed={isDark}
- `apps/web/src/providers/AppProviders.tsx:1` — import { ThemeProvider, ThemeRoot, ToastProvider } from '@monority/ui'
- `apps/web/src/providers/AppProviders.tsx:10` — <ThemeProvider>
- `apps/web/src/providers/AppProviders.tsx:13` — <ThemeRoot>{children}</ThemeRoot>
- `apps/web/src/providers/AppProviders.tsx:16` — </ThemeProvider>
- `apps/web/src/test/setup.ts:4` — Object.defineProperty(window, 'matchMedia', {

## 5. Captures de référence

Spécification : `apps/web/e2e/audit-baseline.spec.ts` (opt-in `AUDIT_BASELINE=1`, saut sinon pour ne pas charger `test:e2e`).

- Périmètre : 70 pages de composants du registre × 5 thèmes existants (`light`, `dim`, `dark`, `oled`, `high-contrast`) = 350 captures.
- Élément capturé : `.docs-content` ; thème forcé sur `document.documentElement` + `.monority-theme-root` (pattern de `geometry.spec.ts`) ; boucles JS (rAF/interval) figées à l'init pour stabilité.
- Options : `animations: 'disabled'`, `caret: 'hide'`, `maxDiffPixels: 64`, `maxDiffPixelRatio: 0.0005` (bruit d'antialiasing sous-pixel observé à la répétition : jusqu'à ~2 pixels par capture).
- Stockage local : `apps/web/e2e/audit-baseline.spec.ts-snapshots/*-desktop-win32.png`, 350 fichiers, 81 Mo. **Non versionnés** (ignorés par `.gitignore`, bloc Playwright) : ils servent aux comparaisons avant / après de la phase 3 et restent sur la machine de travail.
- Preuve de stabilité : deux exécutions consécutives sans `--update-snapshots` → `350 passed` / `350 passed`.

### Procédure de régénération (depuis le tag uniquement)

Les captures sont reproductibles depuis le tag `refonte-baseline` (`31a97c9`). **Ne jamais lancer `--update-snapshots` sur `audit-baseline` depuis la branche de travail** : cela écraserait les baselines avec l'état post-refonte.

```bash
git worktree add ../monority-baseline refonte-baseline
cd ../monority-baseline/apps/web
pnpm install && pnpm build
AUDIT_BASELINE=1 pnpm exec playwright test audit-baseline --project=desktop --update-snapshots
# captures régénérées dans ../monority-baseline/apps/web/e2e/audit-baseline.spec.ts-snapshots/
```

Comparaison avant / après (phase 3) : copier les captures du worktree baseline à côté des captures de la branche, ou passer par `toHaveScreenshot` avec `snapshotPathTemplate` pointant vers le worktree baseline.
