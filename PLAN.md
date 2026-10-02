# Chantier base CSS saine — Monority UI

Branche `refactor/css-foundation`, worktree `lib-monority-react-css-foundation`.
Source du systeme : `docs/foundation/`. Valeurs neuves definies par etapes.
Inventaire et recoltes : `C:/Users/monority/AppData/Local/Temp/`.

## Etape 0 — Squelette minimal
Reset (:where() scope mr-*), base minimale (canvas, typography, focus, color-scheme),
vocabulaire unique, tokens/ref.css et semantic.css prets a recevoir,
Stylelint avec regle no-raw-values prouvee en negatif, pnpm verify a 5 etapes,
harness minimal dans apps/web.

## Tranches verticales — Composant par composant
Croissance stricte avec le composant en cours : proposition sans ecriture,
regle derriere chaque valeur neuve, contraste calcule, validation humaine,
tokens et recette dans mr.components, pnpm verify vert, arret.
Button en premier (B1 a B6).

## Reprise
B2 valide et commite (etats survol, actif, desactive, transition et motion) :
- button.css : selecteur unique :where(.mr-btn), @media (hover: hover), actif, desactive, transition
- semantic.css : 5 nouveaux tokens (--mr-state-hover-mix: 12%, active: 24%, disabled: 84%, --mr-text-disabled, --mr-duration-state: 150ms)
- prefers-reduced-motion: reduce gere dans mr.tokens a 0ms (prouve par test de couche)
- check-contrast.js etendu avec Playwright mesurant les etats reels du bouton (repos 15.19:1, survol 11.62:1, actif 8.20:1)
- 23 tokens declares au total (5 ref, 18 semantiques), vocabulary.json a jour
- ADR-021 consigne dans 10-decisions.md, docs 03, 04, 06 alignes
- pnpm verify vert a 6 etapes
Prochaine action : B3 (theme sombre).
