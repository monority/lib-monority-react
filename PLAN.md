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
- 21 composants finalises et integres au harness : Formulaires (17), Button, IconButton, CopyButton, Toggle, ToggleGroup (recettes dans mr.components)
- Famille Actions finalisee :
  - Toggle : recette CSS toggle.css avec rail signature, React 19 ref, useControllableState sans effet
  - ToggleGroup : composantisation ToggleGroup.Item declaratif + support items, recette toggle-group.css
  - IconButton & CopyButton : modernisation React 19 ref, integration harness dans establishedComponents
- Tests unitaires (1 266 UI + 94 Web), test:dist, Stylelint et verify verts
- Prochaine etape : famille Feedback (Badge, Banner, Callout, InlineAlert, Toast)
