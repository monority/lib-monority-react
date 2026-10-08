# Chantier base CSS saine — Monority UI

Branche `refactor/css-foundation`, worktree `lib-monority-react-css-foundation`.
Source du systeme : `docs/foundation/`. Valeurs neuves definies par etapes.
Inventaire et recoltes : `C:/Users/monority/AppData/Local/Temp/`.

## Etape 0 — Squelette minimal
Reset (:where() scope mr-*), base minimale (canvas, typography, focus, color-scheme),
vocabulaire unique, tokens/ref.css et semantic.css prets a recevoir,
Stylelint avec regles prouvees en negatif, pnpm verify vert, harness dans apps/web.

## Tranches verticales — Composant par composant
Croissance stricte : proposition sans ecriture, regle derriere chaque valeur neuve,
contraste calcule, validation humaine, tokens et recette dans mr.components.
Button en premier (B1 a B6).

## Reprise
Sauvegarde : git push origin refactor/css-foundation:backup/css-foundation-wip
Etat :
- Phase 3 terminee : migration de la famille Overlays (9 composants : Modal, AlertDialog, Drawer, Popover, Tooltip, HoverCard, DropdownMenu, ContextMenu, CommandPalette)
- 9 recettes CSS creees dans packages/styles/src/recipes/ sous @layer mr.components, 100% tokens, zero valeur brute, specificite <= 0,2,0
- Enregistrement dans packages/styles/src/index.css
- Modernisation Overlays complete : 9 composants migres vers React 19 (ref en prop directe, zero forwardRef dans overlays)
- Verifications : pnpm verify vert (6 etapes : typecheck, format, lint:css, test:rendered, build, test), 1303 tests unitaires @monority/ui (9 fichiers et 98 tests Overlays passants), 94 tests @monority/web
- Prochaine etape : Phase 4 — migration de la famille Data (5 composants : DataList, StatCard, DataTable, Table, MetricGrid) ou Navigation (5 composants)
