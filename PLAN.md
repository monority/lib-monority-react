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
- Phase 6 terminee : eradication totale de forwardRef sur tout le monorepo
- Modernisation React 19 achevee pour Button, Spinner, et toute la famille forms (Calendar, Checkbox, Combobox, DatePicker, DateRangePicker, Field, DropZone, FileTrigger, FileUpload, FormSection, Input, NumberInput, PasswordInput, RadioGroup, Slider, Switch)
- ref declaree en prop standard directe (Ref<T>) sur chaque interface et composant
- Les 71 recettes CSS de tous les composants sont ecrites, enregistrees dans packages/styles/src/index.css, sous @layer mr.components, 100% tokens sans valeur brute
- Verifications : pnpm verify vert (6 etapes : typecheck, format, lint:css, test:rendered, build, test), 1303 tests unitaires @monority/ui passants, 94 tests @monority/web passants
- Prochaine etape : Phase 7 — Audit final d'optimisation 10/10, bundle/dist verification et rapport de synthese
