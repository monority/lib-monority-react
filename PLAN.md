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
Commit de session : 243b6bd (plage 19849ca..243b6bd)
Etat :
- Assainissement suite E2E Playwright termine : 512 tests e2e web passants, 1313 tests ui passants
- Changesets et documentation a jour : layers mr.* harmonises, changeset css foundation pret, ADR-027 consigne
- Controles de qualite : pnpm verify vert (8 portes), test:dist vert, visual & behavioral E2E 100% verts
- Prochaine etape : Validation et cloture du chantier refactor/css-foundation
