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
B3 commite localement (01425a7), correctif harness applique :
- dark.css : :where([data-theme='dark'], [data-theme='dim']), color-scheme: dark
- symetrie neutre : canevas sombre (0.22) / texte sombre (0.955), ratio 15.19:1
- texte desactive L=0.542 (ratio 3.46:1), levier --mr-ref-accent-lightness (0.50 / 0.635)
- 24 tokens declares au total, pnpm verify vert a 6 etapes
- correctif web harness : data-theme applique sur .harness-page et replis de surface
- captures Temp : harness-light-fixed-nav.png et harness-dark-fixed-nav.png
- ADR-022 consigne dans 10-decisions.md, docs/foundation/04 aligne
Prochaine action : validation par l'utilisateur du rendu avant push, puis B4.
