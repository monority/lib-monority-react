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
Composant 1 (Button) termine : recette button.css dans mr.components, echelles entieres (space, radius, typo, mouvement), tokens semantiques Button (light + dark), test de contraste WCAG AA prouve en negatif, pnpm verify a 6 etapes vert.
Dernier commit : feat(button): recette Button, echelles, tokens semantiques et test de contraste.
Prochaine etape : validation utilisateur avant d'ouvrir le composant suivant.
Verify : 6 etapes (typecheck, format:check, lint:css, test:contrast, build, test) vert.
