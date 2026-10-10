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

## Chantier en cours — Refonte et Composantisation de apps/web

Branche `feat/web-redesign-and-componentization`.
Plan d'action : `plan-web-redesign-and-componentization.md`.

### Objectif
Eliminer toute duplication et balise HTML brute au profit de composants dedies, dogfooder a 100% `@monority/ui`, et restructurer le site (Docs, Showcase, Playground, Moodboard, Home) avec une architecture DRY, typée et maintenable (note cible 10/10).

### Sequence d'execution
- Phase 1 : Fondation et composants partages (HeroHeader, PreviewCanvas, CodeViewer, typage AppPage, AppHeader avec Topbar)
- Phase 2 : Refonte et composantisation de Docs (DocPropTable, DocTagList, DocExampleCard, modularisation DocPage et DocsLayout)
- Phase 3 : Refonte et composantisation du Playground (PlaygroundToolbar, PlaygroundControlField, migration CodeViewer/PreviewCanvas)
- Phase 4 : Refonte et composantisation du Showcase (HeroHeader, PreviewCanvas, migration des 4 compositions vers les primitives @monority/ui)
- Phase 5 : Modularisation du Moodboard (eclatement du fichier de 677 lignes) et nouvelle vitrine Home (composants interactifs 100% @monority/ui)

