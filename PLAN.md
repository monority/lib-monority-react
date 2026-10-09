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
Commit de session : de2ecc8 (plage 2bc6079..de2ecc8)
Etat :
- Rattachement de l'integralite des 75 composants au harness visuel (/harness) avec filtres par famille et selecteur
- Correction Accordion : repliement par defaut (collapsible=true) et suppression du fond/cercle de fleche
- Alignement Collapsible : suppression du fond/cercle de fleche
- Verifications : pnpm verify vert (6 etapes : typecheck, format, lint:css, test:rendered, build, test), 1305 tests unitaires @monority/ui passants, 94 tests @monority/web passants
- Prochaine etape : Plan d'amelioration cible composant par composant suite aux notes d'audit
