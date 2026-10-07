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
- 30 composants finalises et integres au harness dans establishedComponents (Formulaires 17, Actions 4, Feedback 9)
- Famille Feedback modernisee et composantisee :
  - Badge (Badge.Dot), Banner (Banner.Title/Description/Eyebrow/Actions/Close), Callout (Callout.Title/Description/Content)
  - InlineAlert (InlineAlert.Title/Description/Action), EmptyState (EmptyState.Icon/Title/Description/Actions)
  - AsyncStateNotice, Progress (Progress.Track/Bar/Meta/Label/Value), Skeleton (Skeleton.Line), Toast (Toast.Title/Description/Close)
  - 9 recettes CSS dans mr.components, 0 valeur brute, specificite max 0,2,0 via :where(), retrocompatibilite 100%
- Verifications : 1 288 tests UI + 94 Web passants, test:dist vert, pnpm verify vert (6 etapes)
- Prochaine etape : famille Overlays ou Navigation
