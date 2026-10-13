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
  - packages/tokens (@monority/tokens) : definitions de tokens (ancien generateur archive).
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

## 4. Etat Actuel du Projet (Branche feat/cleanup-and-redesign-docs-moodboard)

Branche active : feat/cleanup-and-redesign-docs-moodboard
Statut Git : Synchronisee avec origin/feat/cleanup-and-redesign-docs-moodboard.
Dernier commit : 0b4a7d5 refactor(moodboard): componentize modules, harmonize card spacing, sync header theme, and neutralize primary accent

Realisations majeures de ce chantier :
- Restructuration du site de documentation apps/web :
  - Suppression des sections perimees showcase et playground.
  - Refonte de la page d'accueil HomePage en 100% composants Monority UI, suppression de home.css.
  - Generalisation de DocPageWithToc pour l'ensemble des pages de documentation et synchronisation dynamique de la table des matieres DocToc lors des transitions de route.
- Harmonisation globale des bordures de controle (ADR-026) :
  - Ajustement des contrastes de bordures sur input, textarea, select, switch et checkbox pour alleger le rendu visuel sur l'ensemble des 7 themes sans rompre le seuil d'accessibilite 3:1.
- Refonte complete de la page Moodboard Design Studio et Harmonisation Accent (modele shadcn/ui) :
  - Architecture 100% composants utilisant SidebarLayout officiel avec panneau lateral sticky persistant au defilement.
  - Decouplage Theme & Accent : l'axe Theme regroupe l'atmosphere (Light, Dark, Slate, OLED, Ocean, Night) et l'axe Accent definit la teinte d'accent (Neutral, Cyan, Blue, Violet, Indigo, Green, Amber, Orange, Red, Rose) des composants.
  - Neutralisation de l'accent primaire : en mode clair fond noir oklch(0.22 0 0) et texte blanc oklch(0.985 0 0) ; en mode sombre fond blanc oklch(0.955 0 0) et texte sombre oklch(0.17 0 215) ; en mode OLED fond blanc oklch(0.955 0 0) et texte noir absolu oklch(0 0 0).
  - Synchronisation bidirectionnelle du theme entre l'en-tete global ThemeToggle et le studio Moodboard sans desynchronisation.
  - Elimination complete du code mort componentColor et assainissement automatique du stockage local.
  - Grille responsive a 2 colonnes integrant 10 modules operationnels concrets entierement composantises (Services, Deploiement, Pipeline, Activite, Equipe, Tâches, Paiement, Chat, Quotas, Tokens).
  - Espacements et aereation amelioree : introduction des tokens d'espacement semantiques --mr-space-7 (28px) et --mr-space-8 (32px), propriete gap sur Grid, echelle de padding xl sur Card.
- Validation technique :
  - pnpm verify : 100% succes (108 suites / 1357 tests packages/ui, 15 suites / 86 tests apps/web, tests de contrastes Playwright, Biome format, Stylelint).
  - pnpm --filter @monority/ui test:dist : 100% succes.

---

## 5. Prochaines Etapes pour Reprendre le Travail

- Option 1 : Ouvrir une Pull Request pour fusionner feat/cleanup-and-redesign-docs-moodboard vers main.
- Option 2 : Phase 3 de suppression des anciens tokens JSON et du package archive packages/tokens.
- Option 3 : Lancer la Wave 2 de nouveaux composants ou enrichir les composants existants.
