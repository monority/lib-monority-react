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
- Banner : harmonisation carte neutre et icones par ton (commit 49eb679)
- Display : creation des recettes card.css et avatar.css sous @layer mr.components
- Card : modernisation React 19, sous-composants composes (Header, Title, Description, Content, Footer), accessibilite interactive (role button, tabindex)
- Avatar : modernisation React 19, support statut en ligne/absent (dot 8px), tailles sm (24px), md (32px), lg (40px)
- Verifications : pnpm verify vert (6 etapes : typecheck, format, lint:css, test:rendered, build, test), 1303 tests unitaires @monority/ui et 94 tests @monority/web
- Prochaine etape : migration de la tranche suivante (Typography ou suite de Display)



