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
- 12 composants finalises et integres au harness : Button, Input, Textarea, Select, Checkbox, Switch, RadioGroup, Slider, NumberInput, DatePicker, Spinner, Field (recettes dans mr.components)
- Spinner : recette dans recipes/spinner.css, diametres 16/20/24px (sm/md/lg), arc 270 degres 2px, rotation mr-spin, ralenti en mouvement reduit, tons base/muted/inverse/accent
- Select multiple : correction du dimensionnement min-height 80px, chevron masque via data-multiple, espacement des options
- Invalide interactif : echantillons dynamiques pour tous les controles avec disparition automatique de l'erreur des condition valide
- DatePicker : declencheur adapte (280px par defaut), prop fullWidth, fond opaque raised, heritage dynamique de data-theme/brand/density sur le popover porte
- Visibilite des bordures sombres : rehaussement de --mr-border-control (L=0.48 en dark/dim/ocean/slate, L=0.46 en oled, L=0.49 en night)
- Tokens et themes : 7 themes canoniques dans le harness (dim conserve comme alias de dark en CSS), surfaces et bordures harmonisees
- Tests Playwright (dimensions et contrastes) et Stylelint verts sur les 7 themes
- Prochaine etape : composant suivant (Calendar, DateRangePicker, Combobox, FileUpload, FormSection)
