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
Commit de session : 2e3d17e (plage 19849ca..2e3d17e)
Etat :
- Pull Request ouverte : #8 (refactor/css-foundation -> main), CI GitHub Actions verte
- Controles de qualite : pnpm verify vert (8 portes), test:dist vert, visual & behavioral E2E 100% verts
- Changesets et documentation : pret pour publication npm via release.yml lors du merge
- Prochaine etape : Revue et fusion de la PR #8 sur main
