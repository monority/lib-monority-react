# Project Technical Context — Monority UI

Memoire technique canonique du projet selon le Verified Technical Memory Framework.
Derniere mise a jour : 2026-10-13.

---

## 1. Stack et Architecture Verifiees

- Runtime et Outillage : Node.js 22 LTS, pnpm 9, Turborepo 2.
- Frameworks : React 19 (ref natif en prop standard, forwardRef interdit dans le nouveau code), Vite 5, Vitest 2, Playwright.
- Formatage et Qualite : Biome 1.9, Stylelint 16, TypeScript 5.6 en mode strict.
- Architecture CSS : Base CSS ecrite a la main sans generateur, organisee en couches specifiques declarees dans packages/styles/src/layers.css :
  - mr.reset : reinitialisation scoped :where(.mr-*, [data-theme])
  - mr.base : fondations de surface, typographie, focus ring et color-scheme
  - mr.tokens : primitives de reference et tokens semantiques
  - mr.themes : 7 themes natifs (light, dark, slate, oled, ocean, night, high-contrast)
  - mr.components : recettes BEM de composants
  - mr.utilities : classes utilitaires de mise en page
- Monorepo Packages :
  - packages/ui (@monority/ui) : catalogue de composants React 19, primitives Radix, hooks et providers. Seul package publie sur npm.
  - packages/styles (@monority/styles) : CSS source, couches @layer, tokens, themes et recettes BEM.
  - apps/web (@monority/web) : documentation, design studio moodboard, tests e2e Playwright.
  - tooling/ : scripts de verification de contraste, generateurs et regles stylelint.

---

## 2. Commandes Canoniques de Validation

- Verification complete unique : pnpm verify (enchaine typecheck, format:check, lint:css, test:rendered contrastes Playwright, build et tests Vitest).
- Tests unitaires et integration : pnpm test
- Typage statique : pnpm typecheck
- Verification formatage : pnpm format:check (correction : pnpm format)
- Lint JS/TS : pnpm lint
- Lint CSS : pnpm lint:css
- Tests de conformite du bundle publie : pnpm --filter @monority/ui test:dist
- Tests E2E Playwright : pnpm --filter @monority/web test:e2e
- Lancement dev : pnpm dev

---

## 3. Invariants et Contrats Non-Negociables

- Zero tableau markdown et zero emoji dans tous les rapports, documents et commits (regle stricte AGENTS.md).
- React 19 natif : passage direct de ref en prop ({ ref, ...props }). Ne jamais utiliser forwardRef.
- Contrat de surcharge CSS : le CSS hote sans couche gagne toujours sur les couches mr.* sans jamais utiliser !important.
- Niveaux de tokens : les recettes ne lisent jamais directement les primitives --mr-ref-*, uniquement les tokens semantiques ou tokens composants.
- Contraste WCAG 2.2 AA : 4.5:1 pour le texte, 3:1 pour les composants interactifs et bordures au repos. Pas d'APCA.
- Pas de logique metier applicative dans packages/ui : la librairie fournit uniquement des primitives de presentation et d'interaction.

---

## 4. Etat Actuel du Projet (Branche feat/stabilize-draft-components)

Branche active : feat/stabilize-draft-components
Statut Git : 4 commits atomiques validant les 4 lots de stabilisation.
Dernier commit : fd9284c feat(components): stabiliser les formulaires et overlays complexes (Lot 4)

Realisations majeures de ce chantier :
- Certification et stabilisation a 100% du catalogue de composants :
  - 83 composants au total dans la bibliotheque, desormais 83 composants au statut stable (0 composant draft restant).
  - Lot 1 (Primitives Fondamentales Layout et Typographie — 12 composants) : Kbd, PreCode, Text, Title, AspectRatio, Container, Divider, Grid, PageHeader, ScrollArea, Stack, Toolbar.
  - Lot 2 (Feedback et Affichage Visuel — 6 composants) : AsyncStateNotice, Banner, EmptyState, InlineAlert, Collapsible, Carousel.
  - Lot 3 (Navigation et Donnees — 11 composants) : Pagination, SidebarLayout, Topbar, FilterBar, NavigationMenu, Menubar, DataList, StatCard, MetricGrid, Table, DataTable.
  - Lot 4 (Formulaires et Overlays Complexes — 12 composants) : Field, FormSection, Calendar, DatePicker, DateRangePicker, Combobox, FileUpload, CommandPalette, ContextMenu, HoverCard, Resizable, InfiniteScroll.
- Harmonisation documentaire et accessibilite :
  - Alignement des imports publics canoniques : import { Component } from '@monority/ui'.
  - Enrichissement systematique des notes d'accessibilite et anatomie (roles ARIA, balisage semantique natif, gestion du focus clavier).
- Validation technique ininterrompue :
  - pnpm verify : 100% succes (108 suites / 1357 tests packages/ui, 15 suites / 86 tests apps/web, Playwright contrastes, Stylelint, Biome format).
  - pnpm --filter @monority/ui test:dist : 100% succes.

---

## 5. Prochaines Etapes pour Reprendre le Travail

- Etape 1 : Ouvrir une Pull Request pour fusionner feat/stabilize-draft-components vers main.
- Etape 2 : Lancer la Wave 2 de nouveaux composants (TreeView, Toaster sonner-style, ColorPicker).
- Etape 3 : Audit global d'accessibilite automatise (axe-core integre aux tests Playwright).

