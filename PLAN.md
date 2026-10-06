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
- 10 composants finalises et integres au harness : Button, Input, Textarea, Select, Checkbox, Switch, RadioGroup, Slider, NumberInput, Field (recettes dans mr.components)
- NumberInput : recette dans recipes/number-input.css, ton neutre par defaut (ADR-020), accent et danger, hauteurs 28/32/40px, paddings 12/16/20px, tabular-nums, boutons pas integres fantomes 20/24/28px, role spinbutton, aria-valuenow/min/max, onValueChange, touches fleches et PageUp/Down
- Tests de dimensions Playwright et test negatif de specificite Stylelint ajoutes
- 7 themes finalises et actifs (light, dark, oled, slate, ocean, night, high-contrast) + alias dim
- Tests rendered automatises et pnpm verify vert (1263 tests unitaires ui + 94 tests web)
- Prochaine etape : composant suivant de la famille formulaire (PasswordInput deja integre dans Input, ou FormSection, FileUpload, Combobox, DatePicker)
