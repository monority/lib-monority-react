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
Micro-etape B1 terminee (Button principal md, repos et focus-visible) :
- Recette button.css dans couche mr.components (min-block-size responsive, centrage flex)
- 17 tokens declares au total : 5 primitives leviers dans ref.css, 12 semantiques dans semantic.css
- ADR-018 (echelles sans jumeaux, valeurs brutes dans tokens/themes) et ADR-019 (size, on-solid, vocabulary.json)
- Stylelint prouve en negatif (recette) et positif (tokens/themes)
- Test de contraste integre dans verify (6 etapes) : 12 teintes balayees (0-330 deg), WCAG AA respecte
- Harness verifie sans interface sur /harness/button?theme=light sans erreur
Prochaine action : attente de validation sur le rendu B1 avant push et ouverture de B2.
