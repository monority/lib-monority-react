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
- 14 composants finalises et integres au harness : Button, Input, Textarea, Select, Checkbox, Switch, RadioGroup, Slider, NumberInput, DatePicker, Spinner, Field, Calendar, Combobox (recettes dans mr.components)
- Calendar : recette dans recipes/calendar.css, cellules 28px/32px, tabular-nums, etats repos/survol/aujourd'hui/selectionne/desactive/hors-mois, multi-mois et semaines fixes
- Combobox : recette dans recipes/combobox.css, hauteurs 28/32/40px, popover liste avec signature rail neutre 2px par defaut (ADR-020) et accent/danger explicites, heritage dynamique data-theme/brand/density sur portail
- Harness enrichi avec echantillons complets (interactif, validation, tailles, tons) pour Calendar et Combobox
- Tests unitaires (1 265 UI + 94 Web), Stylelint et verify 8 etapes verts
- Prochaine etape : composant suivant (DateRangePicker, FileUpload, FormSection)
