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
Statut Git : 14 commits en avance sur origin/feat/cleanup-and-redesign-docs-moodboard.
Dernier commit : 0a5f13b refactor(moodboard): activate radius and spacing tokens, make sidebar sticky, harmonize chart aesthetics, and add concrete web app modules

Realisations majeures de ce chantier :
- Restructuration du site de documentation apps/web :
  - Suppression des sections perimees showcase et playground.
  - Refonte de la page d'accueil HomePage en 100% composants Monority UI, suppression de home.css.
  - Generalisation de DocPageWithToc pour l'ensemble des pages de documentation et synchronisation dynamique de la table des matieres DocToc lors des transitions de route.
- Harmonisation globale des bordures de controle (ADR-026) :
  - Ajustement des contrastes de bordures sur input, textarea, select, switch et checkbox pour alleger le rendu visuel sur l'ensemble des 7 themes sans rompre le seuil d'accessibilite 3:1.
- Refonte complete de la page Moodboard Design Studio :
  - Architecture 100% composants utilisant SidebarLayout officiel avec panneau lateral sticky persistant au defilement.
  - Moteur de configuration de design live reactif sur 8 axes : Theme, Mode sombre/clair, Contraste, Accent, Couleur composant, Rayon de courbure (Corner Radius), Echelle d'espacement (Spacing Scale), Densite de layout et Palette de graphiques.
  - Graphique de telemetrie SVG anime avec courbes lissees, scrubber interactif et lignes de grille x/y adoucies.
  - Organisation en grille responsive homogene a 2 colonnes integrant 10 modules concrets de web apps :
    - Services edge (monitoring, badge de statut, metriques)
    - Formulaire de deploiement (champs texte, selecteur d'environnement, switch)
    - Pipeline canary (stepper d'etapes de livraison)
    - Showcase tokens et boutons (variantes, etats, delta badges)
    - Facturation et paiement (carte bancaire Visa, switch auto-renouvellement, boutons de plan)
    - Centre de notifications et activite recente (pastilles non lues, liste horodatee)
    - Gestionnaire de tâches de sprint (checklist interactive avec cases a cocher et priorites)
    - Discussion d'equipe et support instantane (avatars, statuts en ligne, bulles et saisie)
    - Quotas et ressources cloud (jauges de progression, slider CPU)
    - Acces d'equipe et permissions RBAC (table de membres, roles et badges)
- Validation technique :
  - pnpm verify : 100% succes (108 suites / 1359 tests packages/ui, 15 suites / 85 tests apps/web, Playwright tests de contraste OLED/Light/Slate/Ocean, Biome format, Stylelint).
  - pnpm --filter @monority/ui test:dist : 100% succes.

---

## 5. Prochaines Etapes pour Reprendre le Travail

- Option 1 : Pousser la branche de travail vers le depot distant via git push origin feat/cleanup-and-redesign-docs-moodboard et ouvrir une pull request vers main.
- Option 2 : Inspecter le fichier docs/audit-hardening-prompt.md si un cycle d'audit et de consolidation approfondi est souhaite.
- Option 3 : Lancer la Wave 2 de nouveaux composants ou enrichir les recettes de composants existants.
