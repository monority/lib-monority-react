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

Branche `feat/cleanup-and-redesign-docs-moodboard`. PR #18 fusionnee dans `main` (commit c2accd8).
Plan d'action et memoire : `PROJECT_CONTEXT.md` et artéfact `plan-refactor-moodboard-tokens-grid.md`.
- Phase 1 a 8 terminees avec succes.

## Chantier terminé — Stabilisation et Certification des 41 Composants Draft vers Stable

Branche `feat/stabilize-draft-components`.
Plan d'action : artéfact `plan-stabilisation-composants-draft.md`.

### Objectif
Auditer et certifier l'ensemble des 41 composants au statut draft dans registry.ts et .meta.ts, harmoniser leurs imports canoniques (@monority/ui), enrichir leurs contrats d'accessibilite et porter le catalogue a 100% stable (83 composants stables sur 83).

### Sequence d'execution
- Lot 1 : Primitives Layout et Typographie (12 composants) — Valide et commite (4865dc3)
- Lot 2 : Feedback et Affichage Visuel (6 composants) — Valide et commite (5b24ab2)
- Lot 3 : Navigation et Presentation de Donnees (11 composants) — Valide et commite (151b75f)
- Lot 4 : Formulaires et Overlays Complexes (12 composants) — Valide et commite (fd9284c)

## Chantier terminé — Micro-animations, Vitrine Moodboard et Nettoyage

Branche `feat/showcase-enrichment-and-animations`.
- Pack 1 : Overlays et Accordion (Toast entrée/sortie, backdrops Modal, AlertDialog, Drawer, Sheet, dépliage fluide CSS Grid Accordion).
- Pack 2 : Menus flottants (DropdownMenu, ContextMenu, Popover, HoverCard, Tooltip, Menubar, NavigationMenu harmonisés avec translation et micro-échelle).
- Pack 3 : Indicateurs et Retours tactiles (Switch, Checkbox, RadioGroup, Tabs, SegmentedControl, coches et rails animés).
- Enrichissement Moodboard Studio (MoodboardCatalogView.tsx et MoodboardDeploymentModule.tsx) avec contrôles de simulation asynchrone, états loading sur Select et Combobox, boutons clearable, badges et déclenchement Toast.
- Nettoyage et vérification de la fondation CSS : pnpm verify (typecheck, format, lint:css, test:rendered, build, test) et test:dist 100% verts.

## Chantier terminé — Système d'Animations Globales et Micro-Interactions (Cycle de Vie et usePresence)

Plan d'action et référence : artéfact `plan-animations-globales-actions.md`.
- Phase 1 (Socle Motion & usePresence) : hook interne usePresence (isMounted, isClosing, presenceProps) avec démontage asynchrone sur [data-closing] et ouverture synchrone (150ms / 0ms sous reduced-motion). Keyframes mr-shake et mr-pop-check.
- Phase 2 (Overlays Majeurs) : animations d'entrée et de sortie sur Modal, AlertDialog, CommandPalette avec tests de cycle de vie complets.
- Phase 3 (Menus Flottants et Popovers) : intégration de usePresence dans DropdownMenu, ContextMenu, Popover, HoverCard avec maintien de l'état de positionnement pendant la fermeture.
- Phase 4 (Micro-Interactions Tactiles et Retours Visuels) : micro-presse active (scale 0.98 et 0.94 icon-only), animation pop-check sur data-copied dans Button/CopyButton, rebond Rating (hover 1.18, active 0.92), secousse InputOTP (mr-shake), fondu sortie Banner.
- Phase 5 (Porte de preuve et validation) : 100% vert sous pnpm verify (typecheck, format, lint, lint:css, test:rendered, build, test). 109 suites / 1422 tests dans @monority/ui, 17 suites / 94 tests dans @monority/web.

## Chantier terminé — Exporteur de Thème CSS & Snippets dans le Studio Moodboard

- Fonction `designConfigToCSS(config, options)` dans `packages/ui/src/lib/design-config.ts` produisant un bloc CSS complet `@layer mr.themes` avec variables `--mr-*` ordonnées et en-tête de métadonnées.
- Export public depuis `@monority/ui` avec options configurables (`selector`, `layer`).
- Intégration dans le Design Studio (`apps/web/src/features/moodboard/`) :
  * Bouton "Copy CSS" en parallèle de "Copy JSON" avec notification de copie.
  * Sélecteur de format `SegmentedControl` (JSON / CSS) dans l'inspecteur "Token Details".
- Tests unitaires et d'intégration validés (109 suites / 1424 tests `@monority/ui`, 17 suites / 95 tests `@monority/web`, 1519 tests au total).

## Chantier terminé — Primitives Internes, Parité Typage, Reset-Independence et Durcissement Playground

- Parité 100% typage dédié : extraction de `Field.types.ts` couvrant l'ensemble des 10 sous-composants Field. Les 83 composants du catalogue disposent désormais d'un fichier `.types.ts` dédié.
- Mutualisation des primitives de menu : création de `MenuItemPrimitive`, `MenuSeparatorPrimitive` et `MenuLabelPrimitive` dans `packages/ui/src/internal/menu/` et composition dans `DropdownMenu`, `ContextMenu` et `Menubar`.
- Indépendance stricte vis-à-vis de `reset.css` : audit et correction des styles autonomes (`topbar.css`, etc.) avec validation Playwright de non-régression sur les 83 composants (83/83 au vert).
- Durcissement du `ComponentPlayground` : capture des valeurs initiales par référence, réinitialisation dynamique des formulaires contrôlés (`notifyControlResets`), support du callback `onReset`, déverrouillage `overflow: visible` pour les menus et listes déroulantes.

## Reprise

Dernier commit vert : fd088e4 (sur main).
Chantier : stabilisation, animations complètes, navigation clavier, accessibilité et automatisation CI/CD.
Contrats et vérifications :
- GitHub Actions CI (run 39426043471) : 100% vert (9 étapes validées).
- GitHub Actions Release CD (run 39426043388) : 100% vert.
- pnpm verify local : 100% vert (exit code 0).
- Biome lint & format : 0 erreur, 1022 fichiers conformes.
- Stylelint : 0 violation sur les recettes CSS et tokens.
- Rendu et contrastes : 100% conformes WCAG AA sur les 7 thèmes actifs.
- Tests unitaires : 112 suites / 1463 tests dans @monority/ui, 17 suites / 96 tests dans @monority/web (1559 tests au total).
- Calendar : sélecteurs compacts, sous-composants composés, 100 ans d'historique scrollable, chevron animé.
- Select & Switch : micro-interactions haptiques, retour tactile, rotation ressort et halos de focus.
- Menubar & NavigationMenu : navigation clavier WAI-ARIA complète et z-index corrigés.

Prochaine action disponible : suivi des étapes de release (changeset version, tarball dry-run) ou audit ciblé supplémentaire.
