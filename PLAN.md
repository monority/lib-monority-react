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
B3 valide et commite localement (theme sombre, symetrie neutre, levier d'accent) :
- dark.css : selecteur groupe :where([data-theme='dark'], [data-theme='dim']), color-scheme: dark
- symetrie neutre : bg-canvas sombre (0.22) = text-primary clair, text-primary sombre (0.955) = bg-canvas clair
- texte desactive : 0.542 calcule pour reproduire le ratio clair de 3.46:1
- levier d'accent : --mr-ref-accent-lightness (0.50 en clair, 0.635 en sombre) lu par --mr-accent-solid
- 24 tokens declares au total (6 ref, 18 semantiques), pnpm verify vert a 6 etapes
- portees imbriquees testees (dark > light, light > dark, dim) et prouvees
- 9 captures Playwright realisees dans Temp (4 light, 4 dark, 1 imbriquee)
- ADR-022 consigne dans 10-decisions.md, docs/foundation/04 aligne
Prochaine action : validation par l'utilisateur du rendu B3 avant push, puis B4 (variantes secondaire et discrete).
