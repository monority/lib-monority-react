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
Etat :
- Toggle : remplacement du rail souligne par une inversion de couleur nette au repos et actif (commit 1d1a0bc)
- Callout et InlineAlert : alignement sur Toast (surface neutre, icones de statut colorees uniques, commit 623ec91)
- Animations : normalisation de Spinner, AsyncStateNotice, Progress et Skeleton sur tokens semantiques dedies (commit 2fb450a)
- Banner : harmonisation avec Toast, Callout et InlineAlert (surface neutre, bordure standard, icones SVG par tone)
- Verifications : pnpm verify vert (6 etapes : typecheck, format, lint:css, test:rendered, build, test), 1301 tests unitaires @monority/ui et 94 tests @monority/web
- Prochaine etape : migration de la famille suivante et poursuite de la feuille de route


