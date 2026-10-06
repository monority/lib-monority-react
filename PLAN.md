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
- 6 composants finalises et integres au harness : Button, Input, Textarea, Select, Checkbox, Field (recettes dans mr.components)
- Checkbox conforme (boite 16px sm/md, 20px lg, radius 4px, row-height >= 24px, gap 8px, glyphe coche et tiret indeterminate)
- Token --mr-radius-sm introduit pour les controles inline (4px base, suit --mr-ref-radius-scale)
- Select conforme (hauteurs 28/32/40px, paddings-inline 12/16/20px et 36/40/48px, chevron CSS, etats invalide/desactive/focus)
- 7 themes finalises et actifs (light, dark, oled, slate, ocean, night, high-contrast) + alias dim
- Tests rendered automatises et pnpm verify 6 etapes vert (1252 tests unitaires ui + 94 tests web)
- Prochaine etape : composant suivant de la famille formulaire (Switch ou RadioGroup)



