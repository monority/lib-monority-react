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
- 17 composants finalises et integres au harness : Button, Input, Textarea, Select, Checkbox, Switch, RadioGroup, Slider, NumberInput, DatePicker, DateRangePicker, Spinner, Field, Calendar, Combobox, FileUpload, FormSection (recettes dans mr.components)
- AGENTS.md consolide : integration bicephale du Contrat d'ingenierie (52 regles) et du Contrat operationnel Monority UI (couches CSS, budget verify, Git, React 19)
- Tests unitaires (1 265 UI + 94 Web), Stylelint et verify verts
- Prochaine etape : lot de composants suivant (Actions / Feedback / Layout)
