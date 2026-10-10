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

## Chantier terminé — Refonte et Composantisation de apps/web (PR #14 fusionnée)

Branche `feat/web-redesign-and-componentization`. PR #14 mergee dans `main`.
Plan d'action : `plan-web-redesign-and-componentization.md`.
- Phase 1 a 5 terminees avec succes. Note finale atteinte : 10/10.

## Chantier en cours — Nouveaux Composants Wave 1

Branche `feat/new-components-wave-1`.
Plan d'action : `plan-nouveaux-composants.md`.

### Objectif
Enrichir le catalogue de `@monority/ui` avec 5 nouveaux composants indispensables, modernes et hautement demandés, en respectant à 100% l'architecture des couches CSS `@layer mr.components`, React 19 native ref, accessibilité WAI-ARIA et couverture de tests.

### Sequence d'execution
- Phase 1 : Sheet (Overlays — volet lateral coulissant 4 cotes)
- Phase 2 : InputOTP (Forms — saisie segmente de code 2FA/OTP avec collage fluide)
- Phase 3 : Timeline (Data — fil chronologique semantique d'etapes et evenements)
- Phase 4 : BadgeDelta (Feedback) et Rating (Forms — notation par etoiles)
- Phase 5 : Integration complete dans la documentation, le playground et verification pnpm verify

