# Plan — Site bilingue anglais / francais

Objectif : anglais maitre, francais complet, changement de langue explicite. Anglais = locale canonique sans prefixe, francais sous `/fr`. Perimetre : `apps/web` (site, docs, moodboard) et defauts de `@monority/ui`. Documents d'ingenierie internes (ce fichier, `AGENTS.md`, `PLAN.md`, `docs/foundation`, `docs/design`) restent en francais.

## Principes

- Anglais maitrise : on stabilise l'anglais, puis on traduit. Pas de redaction bilingue en parallele.
- La librairie reste locale-neutre : textes par props, aucun runtime i18n, aucune dependance ajoutee.
- Une seule source de verite par chaine ; aucun texte visible en dur dans les composants.
- Parite EN/FR du chrome garantie par TypeScript (`satisfies typeof en`), donc aucune porte en plus dans `pnpm verify`.
- Le chemin est la source de verite de la locale. `monority-locale` en `localStorage` ne sert qu'a la premiere visite sur `/`.
- Francais accentue et typographie correcte (espaces insecables, guillemets). Pas de francais sans accents.
- Extraits de code et donnees de demo metier restent en anglais dans les deux locales.

## Architecture

`apps/web/src/shared/i18n/` :
- `locales.ts` : `Locale = 'en' | 'fr'`, `DEFAULT_LOCALE`, `SUPPORTED_LOCALES`, `isLocale`, `getLocaleFromPath`, `stripLocaleFromPath`, `localizePath`, `getPreferredLocale`.
- `messages/en/{common,nav,home,docs,guides,moodboard,errors}.ts` et l'equivalent `fr`, FR annote `satisfies typeof en`.
- `messages/index.ts` : catalogue par locale ; les chaines dynamiques sont des fonctions typees (pluriels via `Intl.PluralRules`, nombres via `Intl.NumberFormat`).
- `LocaleProvider.tsx` : locale derivee du chemin, `<html lang>`, `<html data-locale>`, contexte `{ locale, setLocale }`.
- `useMessages.ts` : catalogue type de la locale courante. Pas de lookup par chaine, pas de cle construite.
- `locale-path.ts` : helpers de chemin (preserve query et hash).
- `LocaleSwitcher.tsx` : `DropdownMenu` accessible, noms dans leur langue, `aria-current`.
- `index.ts`.

Contexte docs : `DocsMessages` (contrat de surcharges) et `localizeDoc(doc, messages, locale)` dans `apps/web/src/shared/i18n/docs-messages.ts`. Chaque fiche co-localise `<Pascal>.messages.ts` (`en`, `fr`) importe par son `.docs.tsx`, sans registre central. Les listes positionnelles (a11y, clavier) retombent sur l'anglais si plus courtes.

## Routage

- Arbres de routes generes une fois, instancies deux fois : EN sans prefixe, FR avec `/fr`.
- `/` redirige vers `/fr` si `navigator.language` commence par `fr` et qu'aucune preference n'est stockee. Aucune redirection automatique sur un lien profond.
- `setLocale` conserve chemin, query et hash.
- `index.html` : `lang="en"`, metadonnees anglaises par defaut. `usePageSeo` met `lang`, canonical, `hreflang` (`en`, `fr`, `x-default`), `og:locale`, metadonnees traduites.
- `site-config.ts` : branding Monority, locale dynamique, descriptions anglaises canoniques.

## Phases

1. Socle i18n, catalogues du chrome, provider, switcher, tests unitaires.
2. Routes localisees, SEO, `index.html`, redirection initiale.
3. Chrome applicatif : AppHeader, command palette, ThemeToggle, MotionToggle, AppShell, 404, ErrorBoundary, footer, Home. Compteurs de composants derives du registre.
4. Docs : DocsLayout, DocPage, tables, playground, PreCode/CodeViewer, Intro, Installation.
5. Reference composants : surcharges FR par fiche, par lots. Le contrat `DocsMessages` garantit l'absence de fuite anglaise sur les champs fournis.
6. Moodboard : chrome bilingue, donnees metier en anglais.
7. Librairie : defauts anglais surchargeables, props additives, tests, changeset majeur, `MIGRATIONS.md`, `CHANGELOG.md`.
8. Preuves : typecheck, lint, tests, e2e EN/FR (switcher, `lang`, chemin, theme, axe), verification navigateur, `test:dist`. `pnpm verify` sans etape ajoutee.

## Preuves par phase

- Typecheck : parite des catalogues et validite des surcharges docs.
- Unitaire : resolution de locale, chemins, pluriels, rendu du switcher.
- E2E : `i18n.spec.ts` (bascule, URL, `lang`, persistance, theme conserve) + audit axe sur une page FR.
- Navigateur : switcher au clavier, focus, retour arriere, deux fiches representatives.

## Risques

- Volume de traduction des 83 fiches : execution par lots, revue page par page, pas de traduction automatique non relue.
- Changement cassant des labels ARIA par defaut de la librairie : assume, changeset majeur, migration documentee.
- Pas d'i18n dans `packages/ui` : evite une dependance imposee aux consommateurs.
- `pnpm verify` inchange ; parite par typage, pas par test de liste.
