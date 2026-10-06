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
- 7 composants finalises et integres au harness : Button, Input, Textarea, Select, Checkbox, Switch, Field (recettes dans mr.components)
- Switch conforme : piste 36x20 sm, 44x24 md, 52x28 lg, pouce 16/20/24px, translation 100%, ton neutre par defaut (ADR-020), variantes accent et danger
- Tokens introduits : --mr-space-6 (24px = 1.5rem), --mr-radius-full (9999px), --mr-switch-thumb-off (blanc pur)
- 7 themes finalises et actifs (light, dark, oled, slate, ocean, night, high-contrast) + alias dim
- Tests rendered automatises et pnpm verify vert (1254 tests unitaires ui + 94 tests web)
- Prochaine etape : composant suivant de la famille formulaire (RadioGroup)
