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
B5 commite localement (variante danger pleine, tokens danger-solid et on-solid) :
- danger-solid : L=0.52 clair (5.37:1), L=0.65 sombre (4.87:1), C=0.20 (sRGB marge >= 0.05)
- danger-on-solid : var(--mr-bg-canvas), regle unique conservant le double contraste texte/UI
- etats derives par color-mix vers text-primary (ADR-023 : survol 12%, actif 24%, desactive 84%)
- 27 tokens declares au total, ADR-001 a ADR-023 sans trou, pnpm verify vert a 6 etapes
- action avant PR : brancher pnpm verify en CI, avec installation de Chromium, avant toute PR
- prochaine action : validation par l'utilisateur du rendu avant push, puis cadrage B6.
