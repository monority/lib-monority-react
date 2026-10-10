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
Sauvegarde : git push -u origin feat/polish-select-combobox
Commit de session : 84ed715 (plage 0414722..84ed715)
Etat :
- Environnement local nettoye (workspace unique C:/Dev/Projects/lib-monority-react sur main)
- Lot 1 termine : polissage visuel et ergonomique de Select et Combobox
- Controles de qualite : pnpm verify vert (8 portes, 1313 tests UI, 94 tests web)
- Prochaine etape : Pousser la branche et enchainer sur le Lot 2 (DatePicker et DateRangePicker)
