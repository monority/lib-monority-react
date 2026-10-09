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
Commit de session : 8380a87 (plage de2ecc8..8380a87)
Etat :
- Amelioration des composants: Tooltip, Popover, DropdownMenu, ContextMenu, HoverCard, Slider, Calendar, DatePicker, Select, Carousel, PreCode, SidebarLayout
- Overlays enrichis (positionnement fin, keyframes d'entree, shortcuts, fleches), Slider double-range, pickers Calendar/DatePicker, SidebarLayout retractable
- Verifications : pnpm verify vert (typecheck, format, lint:css, test:contrast, build, test, test:dist, test:audit), 1312 tests @monority/ui passants, 94 tests @monority/web passants
- Prochaine etape : Poursuite des optimisations ciblees selon retour utilisateur
