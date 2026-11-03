# Project Technical Context — Monority UI

Memoire technique canonique du projet selon le Verified Technical Memory Framework.
Derniere mise a jour : 2026-10-21.

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

## 4. Etat Actuel du Projet (Branche main)

Branche active : main
Statut Git : en phase de consolidation avec verification integrale reussie.
Dernier commit d'origine : 9c09346 fix(ui): refonte timeline et contraste des apercus de code

Realisations majeures de ce chantier :
- Harmonisation de l'elevation et des surfaces flottantes (ADR-028) :
  - Standardisation de var(--mr-bg-overlay) avec bordure subtle et ombre overlay sur les 16 composants flottants et superposes (Modal, AlertDialog, Drawer, Sheet, Tooltip, CommandPalette, ContextMenu, DropdownMenu, HoverCard, Popover, DatePicker, Select, Combobox, Toast, Menubar, NavigationMenu).
  - Formalisation de --mr-text-tertiary et du quartet de statuts pleins (--mr-success-solid, --mr-warning-solid, --mr-info-solid, --mr-danger-solid) dans semantic.css et l'ensemble des 7 themes.
  - Allegenement harmonieux des bordures au repos sur les champs de saisie (Input, Textarea, Select, Combobox, DatePicker, NumberInput, etc.).
- Selecteur de themes dans l'en-tete :
  - Remplacement du bouton binaire par un DropdownMenu accessible avec icones et indicateurs actifs pour les 7 themes natifs (Light, Dark, Slate, Ocean, Night, OLED, High Contrast) et le mode Systeme.
- Surfaces de previsualisation unifiees :
  - ComponentPlayground et PreCode harmonises sur fond var(--mr-bg-sunken) avec trame de points radiaux subtile (radial-gradient a var(--mr-space-4)).
- Modernisation de StatCard et MetricGrid :
  - Tendances en pilule avec pastille color-mix et bordure subtile, typographie haute visibilite (var(--mr-font-size-2xl)), conteneurs d'icones carres arrondis, transitions douces.
- Correction geometrique du Carousel :
  - Elimination definitive du chevauchement des fleches de navigation sur le contenu via padding-inline sur le slide, elargissement de la vitrine de documentation a 680-700px.
- Composition professionnelle de FilterBar et SidebarLayout :
  - Exemples d'application concrets composant de vrais elements Monority UI (Avatar, Badge, Button, Input, Select, StatCard, Card) avec filtrage dynamique et structure de console moderne.
  - Ajustement des espacements texte-badges dans la navigation de SidebarLayout et regles de disposition flexibles :where(.mr-btn__label) et fullWidth dans button.css.
- Refonte et fiabilisation du scrollspy DocToc (On this page) :
  - Detection deterministe basee sur l'intersection de la ligne de lecture relative (120px) avec prise en charge propre du haut et du bas de page.
  - Verrouillage temporaire du scrollspy lors des clics programmatiques pour eviter les sauts ou faux etats actifs pendant le defilement fluide.
  - Passes multiples a l'initialisation et observation MutationObserver pour fiabiliser la detection des sections.
  - Mise en valeur visuelle nette du lien actif via var(--mr-accent-subtle).
- Validation technique ininterrompue :
  - pnpm verify : 100% succes (113 suites / 1474 tests packages/ui, 18 suites / 99 tests apps/web, 1573 tests au total, verifications Playwright de rendu et contrastes WCAG AA, Stylelint 100% vert, Biome format 100% vert).
  - pnpm --filter @monority/ui test:dist : 100% succes sur le paquet distribue.

---

## 5. Prochaines Etapes pour Reprendre le Travail

- Etape 1 : Poursuivre le developpement des modules et widgets de la Moodboard Studio (tableaux de bord, vues modulaires metier).
- Etape 2 : Lancer la Wave 2 de nouveaux composants (TreeView, Toaster sonner-style, ColorPicker).
- Etape 3 : Audit global d'accessibilite automatise (axe-core integre aux tests Playwright).

