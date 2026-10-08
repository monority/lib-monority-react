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
- Display complet : Card, Avatar, Collapsible, Accordion, Carousel (100% de la famille migree)
- Recettes CSS : card.css, avatar.css, collapsible.css, accordion.css, carousel.css sous @layer mr.components
- Modernisation React 19 et hooks internes : ref en prop directe (sans forwardRef), utilisation de useControllableState
- Verifications : pnpm verify vert (6 etapes : typecheck, format, lint:css, test:rendered, build, test), 1303 tests unitaires @monority/ui et 94 tests @monority/web
- Prochaine etape : migration de la famille Typography (Title, Text, Kbd, PreCode)




