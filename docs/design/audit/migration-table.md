# Audit — table de migration (phase 0 bis)

Cibles lues dans `prompt-refonte-monority-ui.md` v4 (sections 5.15, 5.16, 7.x, 9). État constaté à `31a97c9`. Aucune modification de code : ce document est la cible, `MIGRATION.md` (G1) sera produit en phase 6.

## 1. Composants — props, variantes, callbacks

| Composant | Callbacks actuels | Variantes / size / tone / mode | `as` | Cible | Cassant |
|---|---|---|---|---|---|
| Button | — | `variant`, `size` | oui | `as` retiré → `ButtonLink` (7.19) ; `copyValue` → `CopyButton` ; `iconOnly` → `IconButton` ; variantes `muted|subtle|warning` → `secondary|ghost|secondary` ; défaut `primary` → `secondary` (7.1) | oui |
| CopyButton | — | `size`, `variant` | — | aucun changement de nom (P1–P9 à vérifier en phase famille) | non |
| IconButton | — | `size`, `tone` | — | aucun changement de nom (P1–P9 à vérifier en phase famille) | non |
| Toggle | `onPressedChange` | `variant`, `size` | — | callbacks P6 déjà conformes : onPressedChange | non |
| ToggleGroup | `onValueChange` | `variant`, `size` | — | callbacks P6 déjà conformes : onValueChange | non |
| DataTable | `onSortChange`, `onSelectedRowIdsChange` | — | — | `onSelectedRowIdsChange` → `onSelectionChange` (7.15) ; callbacks P6 déjà conformes : onSortChange | oui |
| Accordion | `onChange` | `size` | — | `onChange` → `onValueChange` (P6) | oui |
| Avatar | — | `size` | — | aucun changement de nom (P1–P9 à vérifier en phase famille) | non |
| Collapsible | `onOpenChange` | `size` | — | callbacks P6 déjà conformes : onOpenChange | non |
| StatCard | — | `trendTone` | — | aucun changement de nom (P1–P9 à vérifier en phase famille) | non |
| InfiniteScroll | `onLoadMore`, `onRetry` | — | — | aucun changement de nom (P1–P9 à vérifier en phase famille) | non |
| AsyncStateNotice | — | — | — | fusion 7.19 → `EmptyState` avec `state` ; alias déprécié + avertissement en dev | oui |
| Badge | — | `variant` | — | aucun changement de nom (P1–P9 à vérifier en phase famille) | non |
| Banner | — | `tone` | — | aucun changement de nom (P1–P9 à vérifier en phase famille) | non |
| Callout | — | `tone` | — | aucun changement de nom (P1–P9 à vérifier en phase famille) | non |
| InlineAlert | `onAction` | `tone` | — | fusion 7.19 → `Callout` avec `size="sm"` ; alias déprécié + avertissement en dev | oui |
| Progress | — | `tone`, `mode` | — | `mode` : vérifier P8 (une composant, une responsabilité) | non |
| Skeleton | — | `size` | — | aucun changement de nom (P1–P9 à vérifier en phase famille) | non |
| Spinner | — | `size`, `tone` | — | aucun changement de nom (P1–P9 à vérifier en phase famille) | non |
| Toast | `onClose` | `tone` | — | aucun changement de nom (P1–P9 à vérifier en phase famille) | non |
| Calendar | `onChange` | — | — | `onChange` → `onValueChange` (P6) | oui |
| Checkbox | — | `tone`, `size` | — | aucun changement de nom (P1–P9 à vérifier en phase famille) | non |
| Combobox | `onChange` | `tone`, `size` | — | `onChange` → `onValueChange` (P6) | oui |
| DatePicker | `onChange` | `size`, `tone` | — | `onChange` → `onValueChange` (P6) | oui |
| DateRangePicker | — | `size` | — | aucun changement de nom (P1–P9 à vérifier en phase famille) | non |
| FileUpload | `onDrop`, `onRemove`, `onSelect`, `onFilesChange` | `size`, `showSize` | — | callbacks P6 déjà conformes : onSelect | non |
| Input | — | `tone`, `size` | — | aucun changement de nom (P1–P9 à vérifier en phase famille) | non |
| NumberInput | `onChange` | `size` | — | `onChange` natif conservé + `onValueChange(value)` ajouté (7.5) | non |
| PasswordInput | — | `size` | — | aucun changement de nom (P1–P9 à vérifier en phase famille) | non |
| RadioGroup | `onChange` | `tone`, `size` | — | `onChange` → `onValueChange` (P6) | oui |
| Select | — | `tone`, `size` | — | aucun changement de nom (P1–P9 à vérifier en phase famille) | non |
| Slider | `onChange`, `onValueChange` | `size` | — | `onValueChange` déjà présent (P6) ; `onChange` réservé au natif ; callbacks P6 déjà conformes : onValueChange | non |
| Switch | — | `tone`, `size` | — | aucun changement de nom (P1–P9 à vérifier en phase famille) | non |
| Textarea | — | `tone`, `size`, `resize` | — | aucun changement de nom (P1–P9 à vérifier en phase famille) | non |
| Resizable | — | `defaultSize`, `minSize`, `maxSize` | — | aucun changement de nom (P1–P9 à vérifier en phase famille) | non |
| Section | — | `variant` | oui | `as` conservé, union fermée (P3 / 7.18) | non |
| Separator | — | — | — | fusion 7.19 → `Divider` ; alias déprécié + avertissement en dev | oui |
| Menubar | `onClick` | `variant` | — | aucun changement de nom (P1–P9 à vérifier en phase famille) | non |
| NavigationMenu | `onValueChange` | — | — | callbacks P6 déjà conformes : onValueChange | non |
| Pagination | `onPageChange` | — | — | callbacks P6 déjà conformes : onPageChange | non |
| Tabs | `onChange` | `tone`, `size` | — | `onChange` → `onValueChange` (P6) ; `tone` retiré (7.9) | oui |
| AlertDialog | `onConfirm`, `onCancel` | `tone` | — | `onClose`/`onCancel` dépréciés → `onOpenChange(false)` (7.12) | oui |
| CommandPalette | `onSelect`, `onClose` | — | — | `onClose`/`onCancel` dépréciés → `onOpenChange(false)` (7.12) ; callbacks P6 déjà conformes : onSelect | oui |
| ContextMenu | `onSelect`, `onOpenChange` | — | — | callbacks P6 déjà conformes : onSelect, onOpenChange | non |
| Drawer | `onClose` | — | — | `onClose`/`onCancel` dépréciés → `onOpenChange(false)` (7.12) | oui |
| DropdownMenu | `onSelect`, `onOpenChange` | — | — | callbacks P6 déjà conformes : onSelect, onOpenChange | non |
| HoverCard | `onOpenChange` | — | — | callbacks P6 déjà conformes : onOpenChange | non |
| Modal | `onClose` | — | — | `onClose`/`onCancel` dépréciés → `onOpenChange(false)` (7.12) | oui |
| Popover | `onOpenChange` | — | — | callbacks P6 déjà conformes : onOpenChange | non |
| Kbd | — | `size` | — | aucun changement de nom (P1–P9 à vérifier en phase famille) | non |
| PreCode | — | `size` | — | aucun changement de nom (P1–P9 à vérifier en phase famille) | non |
| Text | — | `tone`, `size` | oui | `as` conservé, union fermée (P3 / 7.18) | non |
| Title | — | `size` | oui | `as` conservé, union fermée (P3 / 7.18) | non |

Composants sans prop ciblée (aucun changement de nom attendu) : DataList, Card, Carousel, MetricGrid, Table, EmptyState, Field, FormSection, AspectRatio, Container, Divider, Grid, PageHeader, ScrollArea, Stack, Toolbar, Breadcrumb, FilterBar, SidebarLayout, Topbar, Tooltip.

### Fusions et retraits (7.19)

| Ancien | Nouveau |
|---|---|
| InlineAlert | Callout `size="sm"` |
| AsyncStateNotice | EmptyState `state` |
| Separator | Divider |
| Button `copyValue` | CopyButton |
| Button `iconOnly` | IconButton |
| Button `as` | ButtonLink |
| Button variantes `muted`, `subtle`, `warning` | `secondary`, `ghost`, `secondary` |
| Thème `dim` | `dark` |
| .monority-theme-root | `[data-theme]` sur n'importe quel élément |

Alias dépréciés pendant une version majeure + avertissement en développement (G2).

### API thème

| Actuel | Cible | Cassant |
|---|---|---|
| `ThemeProvider` lit `localStorage`/`matchMedia` au rendu | script de tête bloquant `getThemeScript()` + `useSyncExternalStore` (5.2) | oui (comportement, hydration) |
| `isDark`, `toggleTheme` | `theme` / `resolvedTheme` / `setTheme` ; `isDark` déprécié (5.2) | oui |
| `ThemeRoot` + `.monority-theme-root` | `[data-theme]` sur n'importe quel élément ; classe en alias déprécié (5.2) | oui |
| thèmes `light|dark|oled|system` | + `high-contrast` ; `dim` → alias déprécié de `dark` (5.2) | oui |

## 2. Tokens

302 tokens `--mr-*` définis dans `packages/styles/src` ; 66 mappés (5.16), 20 supprimés (5.15), 30 conservés nommés, 7 présents dans la référence, 179 sans équivalent (→ dépréciés, valeur actuelle). Référence v4 définit 198 tokens, dont nouveaux pour le code actuel : 161.

| Token actuel | Utilisé | Classe | Cible |
|---|---|---|---|
| `--mr-accent` | oui | conservé (même nom, même rôle) | `--mr-accent` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-accent-contrast` | oui | mappé (exact) | `--mr-on-accent` |
| `--mr-accent-foreground` | non | mappé (approx) | `--mr-on-accent` |
| `--mr-accent-soft` | oui | mappé (exact) | `--mr-accent-subtle` |
| `--mr-accent-strong` | oui | mappé (exact) | `--mr-accent-hover` |
| `--mr-aspect-landscape` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-aspect-portrait` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-aspect-square` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-aspect-video` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-aspect-wide` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-badge-font-size` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-badge-font-weight` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-badge-height` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-badge-padding-x` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-badge-radius` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-banner-border` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-banner-marker` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-banner-soft` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-banner-tone` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-bg-accent-soft` | oui | mappé (exact) | `--mr-accent-subtle` |
| `--mr-bg-accent-strong` | non | mappé (approx) | `--mr-accent-active` |
| `--mr-bg-canvas` | oui | conservé (même nom, même rôle) | `--mr-bg-canvas` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-bg-canvas-rgb` | oui | supprimé (5.15) | → fichier déprécié, retrait en fin de version majeure |
| `--mr-bg-control` | oui | mappé (approx) | `--mr-bg-sunken` |
| `--mr-bg-inverse` | non | mappé (approx) | `--mr-tooltip-bg` |
| `--mr-bg-subtle` | oui | mappé (exact) | `--mr-bg-sunken` |
| `--mr-bg-surface` | oui | conservé (même nom, même rôle) | `--mr-bg-surface` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-bg-surface-elevated` | oui | mappé (exact) | `--mr-bg-raised` |
| `--mr-bg-surface-strong` | oui | mappé (approx) | `--mr-bg-raised` |
| `--mr-blur-2xl` | non | supprimé (5.15) | → fichier déprécié, retrait en fin de version majeure |
| `--mr-blur-lg` | non | supprimé (5.15) | → fichier déprécié, retrait en fin de version majeure |
| `--mr-blur-md` | non | supprimé (5.15) | → fichier déprécié, retrait en fin de version majeure |
| `--mr-blur-none` | non | supprimé (5.15) | → fichier déprécié, retrait en fin de version majeure |
| `--mr-blur-sm` | non | supprimé (5.15) | → fichier déprécié, retrait en fin de version majeure |
| `--mr-blur-xl` | non | supprimé (5.15) | → fichier déprécié, retrait en fin de version majeure |
| `--mr-border-accent` | oui | mappé (exact) | `--mr-accent-border` |
| `--mr-border-strong` | oui | mappé (exact) | `--mr-border-default` |
| `--mr-border-subtle` | oui | conservé (même nom, même rôle) | `--mr-border-subtle` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-border-width` | oui | conservé (même nom, même rôle) | `--mr-border-width` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-border-width-focus` | non | mappé (exact) | `--mr-focus-width` |
| `--mr-breakpoint-2xl` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-breakpoint-lg` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-breakpoint-md` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-breakpoint-sm` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-breakpoint-xl` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-btn-height-lg` | oui | mappé (exact) | `--mr-control-size-lg` |
| `--mr-btn-height-md` | oui | mappé (exact) | `--mr-control-size-md` |
| `--mr-btn-height-sm` | oui | mappé (exact) | `--mr-control-size-sm` |
| `--mr-btn-padding-x` | non | mappé (exact) | `--mr-control-padding-inline-md` |
| `--mr-btn-radius` | oui | mappé (exact) | `--mr-radius-control` |
| `--mr-callout-accent` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-callout-accent-bg` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-card-current-gap` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-card-gap` | oui | conservé (même nom, même rôle) | `--mr-card-gap` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-card-gap-lg` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-card-gap-md` | oui | mappé (exact) | `--mr-card-gap` |
| `--mr-card-gap-sm` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-card-padding` | oui | conservé (même nom, même rôle) | `--mr-card-padding` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-card-padding-lg` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-card-padding-md` | oui | mappé (exact) | `--mr-card-padding` |
| `--mr-card-padding-sm` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-card-radius` | oui | mappé (exact) | `--mr-radius-card` |
| `--mr-checkbox-size` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-collapsible-content-padding-block` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-collapsible-content-padding-inline` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-collapsible-trigger-padding-block` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-collapsible-trigger-padding-inline` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-color-black` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-color-neutral-100` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-color-neutral-200` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-color-neutral-300` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-color-neutral-400` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-color-neutral-50` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-color-neutral-500` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-color-neutral-600` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-color-neutral-700` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-color-neutral-800` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-color-neutral-900` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-color-neutral-950` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-color-white` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-container-lg` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-container-md` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-container-padding-inline` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-container-sm` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-content-max-width` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-control-icon-size-lg` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-control-icon-size-md` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-control-icon-size-sm` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-control-padding-block-lg` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-control-padding-block-md` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-control-padding-block-sm` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-control-padding-inline-lg` | oui | conservé (même nom, même rôle) | `--mr-control-padding-inline-lg` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-control-padding-inline-md` | oui | conservé (même nom, même rôle) | `--mr-control-padding-inline-md` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-control-padding-inline-sm` | oui | conservé (même nom, même rôle) | `--mr-control-padding-inline-sm` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-control-size-lg` | oui | conservé (même nom, même rôle) | `--mr-control-size-lg` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-control-size-md` | oui | conservé (même nom, même rôle) | `--mr-control-size-md` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-control-size-sm` | oui | conservé (même nom, même rôle) | `--mr-control-size-sm` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-danger` | oui | mappé (exact) | `--mr-danger-solid` |
| `--mr-danger-contrast` | oui | mappé (exact) | `--mr-on-danger-solid` |
| `--mr-danger-soft` | oui | mappé (exact) | `--mr-danger-subtle` |
| `--mr-danger-text` | oui | conservé (même nom, même rôle) | `--mr-danger-text` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-direction` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-divider-color` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-divider-label-bg` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-drop-zone-min-height` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-drop-zone-padding` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-dur-0` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-dur-100` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-dur-1000` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-dur-1200` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-dur-150` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-dur-1500` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-dur-180` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-dur-200` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-dur-300` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-dur-500` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-dur-600` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-dur-700` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-duration-base` | oui | conservé (même nom, même rôle) | `--mr-duration-base` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-duration-enter` | oui | mappé (approx) | `--mr-duration-base` |
| `--mr-duration-exit` | non | mappé (approx) | `--mr-duration-fast` |
| `--mr-duration-fast` | oui | conservé (même nom, même rôle) | `--mr-duration-fast` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-duration-loop` | oui | mappé (approx) | `--mr-duration-spin` |
| `--mr-duration-normal` | oui | mappé (exact) | `--mr-duration-base` |
| `--mr-duration-slow` | non | conservé (même nom, même rôle) | `--mr-duration-slow` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-ease-accelerate` | non | mappé (exact) | `--mr-ease-exit` |
| `--mr-ease-decelerate` | non | mappé (approx) | `--mr-ease-enter` |
| `--mr-ease-in` | oui | mappé (approx) | `--mr-ease-exit` |
| `--mr-ease-in-out` | oui | mappé (approx) | `--mr-ease-standard` |
| `--mr-ease-linear` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-ease-out` | oui | mappé (approx) | `--mr-ease-enter` |
| `--mr-ease-spring` | non | mappé (approx) | `--mr-ease-standard` |
| `--mr-ease-standard` | oui | conservé (même nom, même rôle) | `--mr-ease-standard` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-elevation-overlay` | oui | mappé (exact) | `--mr-shadow-overlay` |
| `--mr-elevation-raised` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-elevation-surface` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-fg-accent` | oui | mappé (exact) | `--mr-accent-text` |
| `--mr-fg-base` | oui | mappé (approx) | `--mr-text-primary` |
| `--mr-fg-inverse` | oui | mappé (approx) | `--mr-tooltip-text` |
| `--mr-fg-muted` | oui | mappé (approx) | `--mr-text-secondary` |
| `--mr-fg-strong` | oui | mappé (exact) | `--mr-text-primary` |
| `--mr-file-list-item-padding-block` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-file-list-item-padding-inline` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-focus-offset` | oui | conservé (même nom, même rôle) | `--mr-focus-offset` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-focus-width` | oui | conservé (même nom, même rôle) | `--mr-focus-width` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-font-body` | non | mappé (exact) | `--mr-font-sans` |
| `--mr-font-display` | non | mappé (exact) | `--mr-font-sans` |
| `--mr-font-mono` | oui | conservé (même nom, même rôle) | `--mr-font-mono` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-font-weight-bold` | oui | supprimé (5.15) | → fichier déprécié, retrait en fin de version majeure |
| `--mr-font-weight-medium` | oui | conservé (même nom, même rôle) | `--mr-font-weight-medium` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-font-weight-regular` | oui | conservé (même nom, même rôle) | `--mr-font-weight-regular` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-font-weight-semibold` | oui | conservé (même nom, même rôle) | `--mr-font-weight-semibold` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-grid-min-column` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-icon-size` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-icon-size-lg` | oui | conservé (même nom, même rôle) | `--mr-icon-size-lg` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-icon-size-md` | oui | conservé (même nom, même rôle) | `--mr-icon-size-md` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-icon-size-sm` | oui | conservé (même nom, même rôle) | `--mr-icon-size-sm` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-info` | oui | mappé (exact) | `--mr-info-text` |
| `--mr-info-contrast` | non | mappé (approx) | `--mr-info-text` |
| `--mr-info-soft` | non | mappé (exact) | `--mr-info-subtle` |
| `--mr-input-height` | oui | mappé (exact) | `--mr-control-size-md` |
| `--mr-input-padding-block` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-input-padding-inline` | oui | mappé (exact) | `--mr-control-padding-inline-md` |
| `--mr-input-padding-inline-end` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-input-radius` | oui | mappé (exact) | `--mr-radius-control` |
| `--mr-input-width` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-leading-base` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-leading-body` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-leading-control` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-leading-heading` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-leading-normal` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-leading-relaxed` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-leading-snug` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-leading-tight` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-metric-grid-gap` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-metric-grid-min` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-modal-padding` | oui | mappé (exact) | `--mr-spacing-6` |
| `--mr-modal-radius` | oui | mappé (exact) | `--mr-radius-overlay` |
| `--mr-modal-width` | oui | mappé (exact) | `--mr-dialog-width-md` |
| `--mr-opacity-0` | non | supprimé (5.15) | → fichier déprécié, retrait en fin de version majeure |
| `--mr-opacity-10` | non | supprimé (5.15) | → fichier déprécié, retrait en fin de version majeure |
| `--mr-opacity-100` | non | supprimé (5.15) | → fichier déprécié, retrait en fin de version majeure |
| `--mr-opacity-20` | non | supprimé (5.15) | → fichier déprécié, retrait en fin de version majeure |
| `--mr-opacity-30` | non | supprimé (5.15) | → fichier déprécié, retrait en fin de version majeure |
| `--mr-opacity-40` | non | supprimé (5.15) | → fichier déprécié, retrait en fin de version majeure |
| `--mr-opacity-50` | non | supprimé (5.15) | → fichier déprécié, retrait en fin de version majeure |
| `--mr-opacity-60` | non | supprimé (5.15) | → fichier déprécié, retrait en fin de version majeure |
| `--mr-opacity-70` | non | supprimé (5.15) | → fichier déprécié, retrait en fin de version majeure |
| `--mr-opacity-80` | non | supprimé (5.15) | → fichier déprécié, retrait en fin de version majeure |
| `--mr-opacity-90` | non | supprimé (5.15) | → fichier déprécié, retrait en fin de version majeure |
| `--mr-opacity-disabled` | oui | supprimé (5.15) | → fichier déprécié, retrait en fin de version majeure |
| `--mr-overlay-gutter` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-overlay-offset` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-overlay-width-alert` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-overlay-width-command` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-overlay-width-dialog` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-overlay-width-drawer` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-overlay-width-menu` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-overlay-width-popover` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-overlay-width-tooltip` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-page-header-padding` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-page-max-width` | non | conservé (même nom, même rôle) | `--mr-page-max-width` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-radio-description-size` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-radio-gap` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-radio-group-gap` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-radio-label-size` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-radio-size` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-radius-full` | oui | conservé (même nom, même rôle) | `--mr-radius-full` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-radius-lg` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-radius-md` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-radius-sm` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-radius-xs` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-section-gap` | oui | présent dans la référence v4 | `--mr-section-gap` (valeur de référence appliquée en phase 2) |
| `--mr-section-padding-x` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-select-chevron-inset` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-select-chevron-size` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-separator-color` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-shadow-focus` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-shadow-md` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-shadow-overlay` | non | conservé (même nom, même rôle) | `--mr-shadow-overlay` (valeur : comparer à la référence, changement éventuel → MIGRATION.md) |
| `--mr-shadow-raised` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-shadow-sm` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-shadow-surface` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-shadow-xs` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-sidebar-layout-gap` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-sidebar-width` | oui | présent dans la référence v4 | `--mr-sidebar-width` (valeur de référence appliquée en phase 2) |
| `--mr-space-0` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-space-1` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-space-2` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-space-3` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-space-4` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-space-5` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-space-6` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-space-7` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-space-8` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-space-9` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-spinner-ring-lg` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-spinner-ring-md` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-spinner-ring-sm` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-spinner-size-lg` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-spinner-size-md` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-spinner-size-sm` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-stat-card-trend-bg` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-stat-card-trend-fg` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-stat-card-trend-marker` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-state-active` | non | mappé (exact) | `--mr-bg-active` |
| `--mr-state-disabled` | non | mappé (approx) | `--mr-text-disabled` |
| `--mr-state-focus-ring` | non | mappé (exact) | `--mr-focus-color` |
| `--mr-state-hover` | non | mappé (exact) | `--mr-bg-hover` |
| `--mr-success` | oui | mappé (exact) | `--mr-success-text` |
| `--mr-success-contrast` | non | mappé (approx) | `--mr-success-text` |
| `--mr-success-soft` | oui | mappé (exact) | `--mr-success-subtle` |
| `--mr-surface-control` | non | mappé (approx) | `--mr-bg-sunken` |
| `--mr-surface-default` | non | mappé (exact) | `--mr-bg-surface` |
| `--mr-surface-gap-lg` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-surface-gap-md` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-surface-gap-sm` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-surface-padding-lg` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-surface-padding-md` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-surface-padding-sm` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-surface-strong` | non | mappé (approx) | `--mr-bg-raised` |
| `--mr-switch-border-width` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-switch-padding` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-switch-scale` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-switch-scale-lg` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-switch-scale-sm` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-switch-thumb-shift` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-switch-thumb-size` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-switch-track-height` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-switch-track-height-md` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-switch-track-width` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-switch-track-width-md` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-text-2xl` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-text-2xs` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-text-3xl` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-text-3xs` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-text-display` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-text-lg` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-text-md` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-text-sm` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-text-xl` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-text-xs` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-textarea-min-height` | oui | présent dans la référence v4 | `--mr-textarea-min-height` (valeur de référence appliquée en phase 2) |
| `--mr-textarea-min-height-lg` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-textarea-min-height-md` | oui | mappé (exact) | `--mr-textarea-min-height` |
| `--mr-textarea-min-height-sm` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-toggle-group-radius` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-toggle-height` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-toggle-padding-x` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-toggle-radius` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-toolbar-padding` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-topbar-padding-inline` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-warning` | oui | mappé (exact) | `--mr-warning-text` |
| `--mr-warning-contrast` | oui | mappé (approx) | `--mr-warning-text` |
| `--mr-warning-soft` | oui | mappé (exact) | `--mr-warning-subtle` |
| `--mr-z-base` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-z-dropdown` | oui | présent dans la référence v4 | `--mr-z-dropdown` (valeur de référence appliquée en phase 2) |
| `--mr-z-elevated` | non | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-z-modal` | oui | présent dans la référence v4 | `--mr-z-modal` (valeur de référence appliquée en phase 2) |
| `--mr-z-overlay` | oui | sans équivalent | → fichier déprécié, valeur actuelle conservée |
| `--mr-z-toast` | oui | présent dans la référence v4 | `--mr-z-toast` (valeur de référence appliquée en phase 2) |
| `--mr-z-tooltip` | non | présent dans la référence v4 | `--mr-z-tooltip` (valeur de référence appliquée en phase 2) |

Tokens utilisés via `var()` mais jamais définis dans `packages/styles/src` : 8 (`--mr-combobox-list-min-width`, `--mr-hovercard-arrow-left`, `--mr-hovercard-arrow-top`, `--mr-code-bg`, `--mr-code-fg`, `--mr-code-scrollbar`, `--mr-code-shadow`, `--mr-code-padding`) — référence rompue préexistante, bruit connu.

Mapping 5.16 appliqué depuis le prompt : 66 paires exact/approx. Fichier déprécié de référence : `docs/roadmap/refonte/monority-ui-tokens.deprecated.reference.css` (71 alias ; les valeurs core `--mr-space-*`, `--mr-radius-xs/sm/md/lg`, `--mr-text-*`, `--mr-dur-*`, `--mr-opacity-*`, `--mr-leading-*`, `--mr-color-neutral-*`, anciennes ombres y seront reportées en phase 2 avec leur valeur actuelle, conformément à 5.16).
