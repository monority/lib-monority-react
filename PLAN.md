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
Elagage strict de la fondation CSS termine (ADR-014, tranches verticales).
Fondation ramenee au squelette minimal consomme par la base :
- 11 fichiers CSS (153 lignes au total contre 563 avant)
- 16 tokens declares : 8 primitives dans ref.css, 8 semantiques dans semantic.css
- Theme clair par defaut dans :root, aucun theme additionnel (dark reviendra avec Button)
- Couche mr.utilities vide dans utilities.css
- Verify ramene a 5 etapes (typecheck, format:check, lint:css, build, test) vert
Prochaine action : validation utilisateur avant de demarrer Button par tranche verticale.
