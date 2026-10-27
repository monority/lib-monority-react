# Plan d'Ingenierie — Bascule Anglais Canonique & Localisation Bilingue EN/FR

## 1. Vision et Objectifs d'Ingenierie

### 1.1 Objectif Central
Etablir l'anglais comme langue canonique unique et maitresse de la bibliotheque et du site de documentation Monority UI, tout en offrant une version francaise complete, soignee et sans compromis accessible sous `/fr`.

### 1.2 Principes Fondamentaux
- Anglais maitre : les fichiers sources `<Pascal>.docs.tsx` sont rediges a 100% en anglais technique sobre et precis. Aucun texte francais ne subsiste sur la version anglaise (`/` et `/docs/*`).
- Surcharges francaises co-localisees : chaque fiche de composant declare sa surcouche dans `<Pascal>.messages.ts` a cote de son composant, sans registre monolithique ni couplage transverse.
- Neutralite stricte de la librairie `@monority/ui` : zero dependance a un runtime i18n, zero surcout bundle pour les consommateurs npm. Les libelles d'accessibilite par defaut sont en anglais et restent parametrables via les props publiques.
- URLs canoniques deterministes : la version anglaise est servie sans prefixe (`/docs/button`), la version francaise sous `/fr` (`/fr/docs/button`).
- Bascule sans rechargement : le composant `LocaleSwitcher` permet une bascule instantanee entre EN et FR en conservant le chemin exact, les parametres d'URL et les ancres de navigation (`#api`, `#examples`, etc.).
- Typographie francaise de haute tenue : respect des apostrophes typographiques, des accents complets, des espaces insecables devant les ponctuations doubles, et interdiction de traduire les identifiants techniques (`aria-label`, `className`, noms de props).

---

## 2. Architecture Technique et Contrats Formels

### 2.1 Contrat de Localisation des Fiches (DocMessagesOverlay)
Le contrat defini dans `apps/web/src/features/docs/components/doc-messages.ts` garantit l'alignement et la robustesse du rendu bilingue :
- `description` : synthese en une phrase de la responsabilite du composant.
- `previewLabel` : libelle de la zone d'apercu.
- `playgroundLabels` : dictionnaire de surcharges indexe par le nom du controle (`name`) ou son indice.
- `examples` : tableau d'objets `{ title }` aligne par position sur le tableau `examples` anglais.
- `propDescriptions` : dictionnaire de descriptions de props indexe par le nom exact de la prop (`name`).
- `keyboardNavigation` : tableau d'objets `{ key, action, context }` aligne par position.
- `a11y` : tableau de recommandations d'accessibilite en francais aligne par position.

### 2.2 Repli Deterministe (Fallback Strategy)
Si une cle ou un indice n'est pas fourni dans la surcouche francaise :
- Le moteur `localizeDoc` conserve la valeur anglaise d'origine sans lever d'exception.
- Le code genere par le playground (`getCode`) reste toujours du code React/TSX standard en anglais dans les deux langues.
- Les extraits de code et snippets d'installation restent en anglais dans les deux langues.

### 2.3 Contrat du Studio Moodboard
- Creation des catalogues dedies `apps/web/src/shared/i18n/messages/en/moodboard.ts` et `fr/moodboard.ts`.
- Localisation du panneau de configuration (titres, boutons Reset/Copy, labels d'inspecteur de tokens).
- Conservation des donnees metier de telemetrie, logs et graphiques en anglais pour maintenir un realisme d'entreprise.

---

## 3. Protocole Unitaire par Fiche de Composant (Checklist en 7 Etapes)

Pour chacun des 59 composants a migrer, la procedure est strictement uniforme :
1. Audit du fichier source `apps/web/src/features/docs/components/<kebab>/<Pascal>.docs.tsx`.
2. Anglicisation integrale du fichier `.docs.tsx` :
   - Titre et description.
   - Controles du playground (attributs `label`, `defaultValue` textuels).
   - Intitules du tableau `examples`.
   - Descriptions du tableau `props`.
   - Actions et contextes du tableau `keyboardNavigation`.
   - Regles du tableau `a11y`.
3. Creation du fichier co-localise `apps/web/src/features/docs/components/<kebab>/<Pascal>.messages.ts` :
   - Importation du type `DocI18n`.
   - Exportation de la constante `<camel>I18n: DocI18n = { fr: { ... } }`.
   - Traduction fidele, professionnelle et soignee en francais.
4. Raccordement dans `<Pascal>.docs.tsx` :
   - Importation de `<camel>I18n`.
   - Ajout de la propriete `i18n: <camel>I18n` dans l'objet `docData`.
5. Verification des identifiants et des cles :
   - Concordance exacte entre les cles de `playgroundLabels` et les `name` des controles.
   - Concordance exacte entre les cles de `propDescriptions` et les `name` des props.
6. Validation du code genere :
   - Verifier que `getCode` produit un extrait TSX valide en anglais sans placeholder francais.
7. Validation TypeScript ciblee :
   - Verification sans erreur de compilation.

---

## 4. Sequence d'Execution Detaillee par Lots

### 4.1 Lot 1 — Primitives d'Affichage Visuel et Typographie (15 composants)
- Accordion (`accordion`)
- AspectRatio (`aspect-ratio`)
- Avatar (`avatar`)
- Badge (`badge`)
- BadgeDelta (`badge-delta`)
- Card (`card`)
- Carousel (`carousel`)
- Collapsible (`collapsible`)
- ColorSwatch (`color-swatch`)
- Divider (`divider`)
- MetricGrid (`metric-grid`)
- PreCode (`pre-code`)
- StatCard (`stat-card`)
- Text (`text`)
- Title (`title`)

### 4.2 Lot 2 — Layout, Navigation et Primitives d'Action (14 composants)
- Breadcrumb (`breadcrumb`)
- ButtonLink (`button-link`)
- Container (`container`)
- FilterBar (`filter-bar`)
- Grid (`grid`)
- IconButton (`icon-button`)
- Menubar (`menubar`)
- NavigationMenu (`navigation-menu`)
- PageHeader (`page-header`)
- Pagination (`pagination`)
- Resizable (`resizable`)
- ScrollArea (`scroll-area`)
- Section (`section`)
- Separator (`separator`)

### 4.3 Lot 3 — Feedback, Donnees et Utilitaires (15 composants)
- AsyncStateNotice (`async-state-notice`)
- Banner (`banner`)
- Callout (`callout`)
- CopyButton (`copy-button`)
- DataList (`data-list`)
- DataTable (`data-table`)
- EmptyState (`empty-state`)
- InfiniteScroll (`infinite-scroll`)
- InlineAlert (`inline-alert`)
- Kbd (`kbd`)
- Progress (`progress`)
- Skeleton (`skeleton`)
- Spinner (`spinner`)
- Table (`table`)
- Timeline (`timeline`)

### 4.4 Lot 4 — Formulaires Complexes et Composants d'Action Restants (15 composants)
- Calendar (`calendar`)
- DatePicker (`date-picker`)
- DateRangePicker (`date-range-picker`)
- FormSection (`form-section`)
- Rating (`rating`)
- Slider (`slider`)
- Stepper (`stepper`)
- Toast (`toast`)
- Toggle (`toggle`)
- ToggleGroup (`toggle-group`)
- Toolbar (`toolbar`)
- Topbar (`topbar`)
- SidebarLayout (`sidebar-layout`)
- SlidePanel (`slide-panel`)
- Stack (`stack`)

### 4.5 Lot 5 — Localisation du Studio Moodboard
- Creation de `apps/web/src/shared/i18n/messages/en/moodboard.ts` et `fr/moodboard.ts`.
- Branchement des composants `MoodboardSidebar`, `MoodboardCatalogView`, `MoodboardDeploymentModule` et `MoodboardTelemetryChart` sur `useMessages().moodboard`.
- Maintien des donnees de simulation metier en anglais dans les deux langues.

### 4.6 Lot 6 — Verification Finale et Certification Qualite
- Typecheck complet sans erreur.
- Tests unitaires au vert : 113 suites `@monority/ui` et 20 suites `@monority/web`.
- Build complet du package et test:dist.
- Tests e2e bilingues Playwright.
- Verification de non-regression visuelle et comportementale.
