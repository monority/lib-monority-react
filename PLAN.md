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

## Chantier terminé — Nouveaux Composants Wave 1

Branche `feat/new-components-wave-1`. PR fusionnee dans `main`.
Plan d'action : `plan-nouveaux-composants.md`.
- Phase 1 a 5 terminees avec succes.

## Chantier terminé — Restructuration Documentation, Harmonisation Bordures et Moodboard Studio

Branche `feat/cleanup-and-redesign-docs-moodboard`.
Plan d'action et memoire : `PROJECT_CONTEXT.md` et artéfact `plan-refactor-moodboard-tokens-grid.md`.

### Objectif
Restructurer apps/web (suppression des sections perimees, 100% composants sur Home, synchronisation dynamique DocToc), adoucir les bordures de controle (ADR-026), et refondre integralement le Design Studio Moodboard en un dashboard operationnel 100% composants, reactif en temps reel sur les 8 axes de tokens et structure en grille de modules applicatifs concrets.

### Sequence d'execution
- Phase 1 : Suppression de showcase et playground, refonte de Home en 100% composants Monority UI — Termine
- Phase 2 : Generalisation de DocPageWithToc et synchronisation automatique de la table des matieres DocToc — Termine
- Phase 3 : Harmonisation globale des bordures de formulaires sur les 7 themes CSS (ADR-026) — Termine
- Phase 4 : Refonte du Moodboard en architecture 100% composants avec SidebarLayout sticky — Termine
- Phase 5 : Moteur de tokens dynamique live (Corner Radius, Spacing Scale, Layout Density, Accent, Theme) — Termine
- Phase 6 : Harmonisation et animation du graphique de telemetrie SVG avec scrubber interactif — Termine
- Phase 7 : Integration de 10 modules applicatifs concrets en grille 2 colonnes optimisee — Termine
- Phase 8 : Qualification globale pnpm verify et validation du bundle pnpm --filter @monority/ui test:dist — 100% au vert

