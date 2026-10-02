# Chantier base CSS saine — Monority UI

Branche `refactor/css-foundation`, worktree `lib-monority-react-css-foundation`.
Source du systeme : `docs/foundation/`. Archive : `archive/tokens-json-d899d22`.
Inventaire et recoltes : `C:/Users/monority/AppData/Local/Temp/`.

## Etape 0 — Squelette minimal
Reset (:where() scope mr-*), base minimale (canvas, typography, focus, color-scheme),
vocabulaire unique, tokens/ref.css et semantic.css prets a recevoir,
Stylelint avec regle no-raw-values prouvee en negatif, pnpm verify a 5 etapes,
harness minimal dans apps/web.

## Tranches verticales — Composant par composant
Croissance stricte avec le composant en cours : annonce en 3 lignes,
recolte ciblee depuis l'archive, echelles entieres au premier usage,
tokens semantiques au fil de l'eau, theme dark au composant 1,
recette dans mr.components, pnpm verify vert, arret et validation humaine.
Button en premier.

## Reprise
Etape 0.6 terminee : regle Stylelint no-raw-values avec fixture prouvee en negatif et branchee.
Dernier commit : feat(tooling): regle Stylelint interdisant les valeurs brutes et test negatif.
Prochaine etape : Etape 0.8 — harness minimal dans apps/web.
Verify a 5 etapes (typecheck, format:check, lint:css, build, test) vert.
