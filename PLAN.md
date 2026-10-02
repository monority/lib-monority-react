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
B1 valide et portee des declarations corrigee (branche refactor/css-foundation) :
- semantic.css scinde : neutres/echelles (:where(:root, [data-theme])), marque/focus (:where(:root, [data-theme], [data-brand]))
- typography.css aligne sur :where(:root, [data-theme]), heritage police prouve
- Test Playwright valide (canvas sombre preserve sous [data-brand], accent adapte)
- 18 tokens declares au total (5 primitives dans ref.css, 13 semantiques dans semantic.css)
- ADR-018, 019, 020 a jour, docs 03 et 04 alignes
- pnpm verify vert a 6 etapes
Prochaine action : push des 3 commits puis validation proposition B2 (survol, actif, desactive).
