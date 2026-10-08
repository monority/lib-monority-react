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
Commit de session : 2ededa7 (plage 2bc6079..2ededa7)
Etat :
- Rattachement de l'integralite des 75 composants au harness visuel (/harness)
- 8 modules de harness crees dans apps/web/src/features/harness/modules/ (overlays, navigation, data, display, layout, typography, forms-extra, experimental)
- Composant Sample extrait dans apps/web/src/features/harness/Sample.tsx
- Barre de controle amelioree : selecteur direct avec optgroups pour les 75 composants et filtres par famille
- Maintien des parametres d'URL (?theme, ?density, ?brand) au travers de toute navigation
- Verifications : pnpm verify vert (6 etapes : typecheck, format, lint:css, test:rendered, build, test), 1303 tests unitaires @monority/ui passants, 94 tests @monority/web passants
- Prochaine etape : Phase 7 — Audit final d'optimisation 10/10, bundle/dist verification et rapport de synthese
