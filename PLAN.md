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
- 11 composants finalises et integres au harness : Button, Input, Textarea, Select, Checkbox, Switch, RadioGroup, Slider, NumberInput, DatePicker, Field (recettes dans mr.components)
- DatePicker : recette dans recipes/date-picker.css, ton neutre par defaut (ADR-020), accent et danger, declencheur 28/32/40px, popover overlay, grille calendrier cellules >= 28px (WCAG 2.5.8), tabular-nums, navigation mois, accessibilite dialog/grid/gridcell
- Tests de dimensions Playwright et test negatif de specificite Stylelint ajoutes (etape 11 et section 23)
- 7 themes finalises et actifs (light, dark, oled, slate, ocean, night, high-contrast) + alias dim
- Tests rendered automatises et pnpm verify vert
- Prochaine etape : composant suivant de la famille formulaire ou date (Calendar, DateRangePicker, Combobox, FileUpload, FormSection)
