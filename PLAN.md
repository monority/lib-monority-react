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
- Typography complet : Title, Text, Kbd, PreCode (100% de la famille migree)
- Recettes CSS : title.css, text.css, kbd.css, pre-code.css sous @layer mr.components
- Tokens semantiques : font-size (xs a 2xl), font-family (mono), graisses, hauteurs de ligne et tracking ajoutes
- Modernisation React 19 : ref en prop directe (sans forwardRef), types stricts, enrichissement des tons de Text
- Verifications : pnpm verify vert (6 etapes : typecheck, format, lint:css, test:rendered, build, test), 1303 tests unitaires @monority/ui et 94 tests @monority/web
- Prochaine etape : migration de la famille Layout ou Overlays
