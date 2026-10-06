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
- 9 composants finalises et integres au harness : Button, Input, Textarea, Select, Checkbox, Switch, RadioGroup, Slider, Field (recettes dans mr.components)
- Slider : recette dans recipes/slider.css, ton neutre par defaut (ADR-020), accent et danger, progression dynamique --mr-slider-progress, piste 4px sm/md et 6px lg, pouce 14px sm, 16px md, 20px lg, pouce et piste gris visibles au desactive
- Token semantique ajoute : --mr-space-1 (4px = 0.25rem) dans semantic.css
- Tests de dimensions Playwright et test negatif de specificite Stylelint ajoutes
- 7 themes finalises et actifs (light, dark, oled, slate, ocean, night, high-contrast) + alias dim
- Tests rendered automatises et pnpm verify vert (1256 tests unitaires ui + 94 tests web)
- Prochaine etape : composant suivant de la famille formulaire (PasswordInput, NumberInput ou composant complexe)
