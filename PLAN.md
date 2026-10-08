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
- ToggleGroup : suppression de l'effet souligne (rail ::after retire, segmented control sur surface active, commit c18a8b9)
- Themes : accent adapte sur slate, ocean, night ; neutral accent sur light/dark/oled ; tokens status (danger/warning/success/info) completes par theme et 100% WCAG AA (commit 008e420)
- Toast : croix de fermeture repositionnee et agrandie, icones d'etat colorees uniques par ton, carte neutre (commit c685a51)
- ButtonLink : composant ancre native `<a>` avec rendu et variantes Button, etats disabled/loading neutralises, tests unitaires et banc harness
- Verifications : pnpm verify vert (6 etapes : typecheck, format, lint:css, test:rendered, build, test), 1298 tests unitaires @monority/ui et 94 tests @monority/web
- Prochaine etape : validation utilisateur et poursuite des demandes d'alignement design system

