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
B4 commite localement (variantes secondaire et discrete, border-control) :
- border-control : L=0.61 clair (3.33:1), L=0.53 sombre (3.28:1), WCAG 1.4.11 respecte
- secondaire : fond canevas opaque, bordure border-control, texte text-primary
- discret (ghost) : fond et bordure transparents, texte text-primary
- etats derives par color-mix avec les tokens state-*-mix (12% survol, 24% actif, 84% desactive)
- resolution fond inverse prouvee visuellement : secondaire et discret restent delimitables
- 25 tokens declares au total (6 ref, 19 semantiques), pnpm verify vert a 6 etapes
- captures Temp : b4-light-harness.png, b4-dark-harness.png, b4-inverted-test.png
- ADR-023 consigne dans 10-decisions.md
Prochaine action : validation par l'utilisateur du rendu avant push, puis B5.
