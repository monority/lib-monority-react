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
Etape 0 terminee : squelette minimal pret, Stylelint prouve en negatif, verify a 5 etapes vert, harness minimal fonctionnel avec selecteur de theme.
Dernier commit : feat(web): harness minimal avec selecteur de theme.
Prochaine etape : Composant 1 (Button) — annonce en trois lignes, recolte et recette.
Verify a 5 etapes (typecheck, format:check, lint:css, build, test) vert.
