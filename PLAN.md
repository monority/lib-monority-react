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
Commit de session : c6ba7c8 (plage 19849ca..c6ba7c8)
Etat :
- Assainissement suite E2E Playwright termine : 512 tests e2e web passants, 1313 tests ui passants
- Controles de qualite : pnpm verify vert (8 portes), test:dist vert, visual & behavioral E2E 100% verts
- Accessibilite et contrastes : conformite WCAG AA sur surface pour tous les themes (axe 0 violations)
- Prochaine etape : Jalons publication & documentation (revue docs/foundation et preparation changeset)
