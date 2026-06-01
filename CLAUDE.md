# Vault Session Monority React
## Derniere session : 31 Mai 2026
Etat: Phase 7 extension terminee. 12 nouveaux composants: Separator, Kbd, AspectRatio, Toggle, ToggleGroup, ScrollArea, Carousel, HoverCard, Calendar, NavigationMenu, Menubar, Resizable. Aussi: Collapsible + ContextMenu, code-theme TSX, Badge restyle, Text/Title docs revamp, registry fix.
Tests: 861/861 passed (80 fichiers) | Typecheck: 0 erreurs (1 pre-existing HoverCard docs)
## Composants (63) + Primitives (2)
Primitives(2): FormControl,InputBase
Forms(15): Checkbox,Calendar,Combobox,DatePicker,DateRangePicker,FileUpload (DropZone+FileTrigger+FileList),FormSection,Input,RadioGroup,SearchInput,Select,Slider,Switch,Textarea,Field
Actions(7): Button,CopyButton,IconButton,Toggle,ToggleGroup
Typography(3): Kbd,Text,Title
Display(8): Accordion,Avatar,Card,Carousel,Collapsible,MetricGrid,StatCard,Table
Data-display(2): DataList,DataTable
Feedback(10): Badge,Banner,Callout,InlineAlert,Progress,Skeleton,Spinner,Toast,AsyncStateNotice,EmptyState
Layout(12): AspectRatio,Container,Divider,Grid,PageHeader,Resizable,ScrollArea,Section,Separator,Stack,Toolbar
Navigation(9): Breadcrumb,FilterBar,Menubar,NavigationMenu,Pagination,SidebarLayout,Tabs,Topbar
Overlays(9): AlertDialog,CommandPalette,ContextMenu,Drawer,DropdownMenu,HoverCard,Modal,Popover,Tooltip
Experimental(1): InfiniteScroll
## Next
- Refacto recipe CSS: harmoniser @layer recipes (spinner vs progress)
- Phase 3: FileUpload refactored: DropZone + FileTrigger + FileList
## Session Log
- 31 Mai 2026: Refacto recipe CSS: ajout @layer recipes dans progress.recipe.css (harmonisation avec les 67 autres fichiers). Phase 3: FileUpload repense en 3 sous-composants modulaires: FileTrigger (input cache + declencheur), DropZone (glisser-deposer avec feedback visuel), FileList (liste fichiers avec taille/suppression). FileUpload existant refactore pour les composer. +69 tests (FileTrigger 17, DropZone 24, FileList 20, FileUpload refactor fix 8). Tests 861/861 (80 fichiers).
- 31 Mai 2026: Recipe CSS sync: copie 72 fichiers styles/ ? ui/ (36 manquants + 36 ecrasements), 3 fichiers ui-only (container/grid/section) ? styles/. Index rebuild (75 imports, 0 doublons). Tests 861/861 (80 fichiers). Typecheck: 0 new errors.
- 31 Mai 2026: Bugfix: Toggle styles (cva undefined ?? 'default'), Spinner animation (missing spinner.recipe.css dans packages/ui). +3 fichiers. Tests 861/861 (80 fichiers). Typecheck: 0 new errors (1 pre-existing HoverCard).
- 31 Mai 2026: Phase 7 extension terminee. 12 nouveaux composants: Separator (layout, 10 tests), Kbd (typography, 10 tests), AspectRatio (layout, 6 tests), Toggle (actions, 15 tests), ToggleGroup (actions, 22 tests), ScrollArea (layout, 7 tests), Carousel (display, 18 tests), HoverCard (overlays, 12 tests), Calendar (forms, 17 tests), NavigationMenu (navigation, 17 tests), Menubar (navigation, 20 tests), Resizable (layout, 18 tests). +120 tests, +12 composants (63 total). Code theme TSX custom (hljs-name amber). Badge restyle (padding 0.75->0.5rem, radius sm->md). Collapsible + ContextMenu (sessions precedentes). Text/Title docs revamp + registry fix. Tests 792/792 (80 fichiers).
- 30 Mai 2026: NavigationMenu cree (navigation). 15 fichiers nouveaux/modifies. Multi-level nav with dropdown submenus, viewport indicator animation. Props: items (NavigationItem[]), value/defaultValue/onValueChange. forwardRef HTMLElement. onMouseOver for hover activation, 150ms debounce on leave. ARIA: role="navigation", menuitem/menu roles, aria-haspopup/aria-expanded. 17 tests + 2 export tests. Recipe CSS @layer (trigger/link/content/sub-item/indicator). Docs (4 fichiers) + registry. Tests 754/754 (75 fichiers).
- 30 Mai 2026: ToggleGroup cree (actions). 14 fichiers nouveaux/modifies. Uses Toggle internally (relative import). Props: type (single/multiple), value/defaultValue/onValueChange, disabled, orientation, variant/size. role="group" (single) ou "toolbar" (multiple). 20 tests + 2 export tests. Recipe CSS @layer (border-radius segmente). Docs (4 fichiers) + registry. Tests 677/677 (70 fichiers).
- 30 Mai 2026: AspectRatio cree (layout). 14 fichiers nouveaux/modifies. Wrapper position:relative + padding-bottom trick. Props: ratio (default 16/9), children, HTMLDivElement. forwardRef + cn. 6 tests + 2 export tests. Recipe CSS @layer. Docs (4 fichiers) + registry. Tests 640/640 (68 fichiers).
- 30 Mai 2026: Collapsible + ContextMenu crees (21 fichiers, +30 tests). Code theme custom pour TSX (code-theme.css, hljs-name en ambre). Badge padding reduit (0.75->0.5rem), plus arrondi (sm->md). Text/Title docs revamp avec article Wikipedia-like. Registry fix ordre alphabetique. Tests 612/612 (65 fichiers).
- 27 Mai 2026: Phase 1 primitives (FormControl + InputBase). Boilerplate supprime de Input/Textarea/Select (~80 lignes). Field lit le contexte avec fallback. 10 nouveaux fichiers, 18 modifies. 571/571 tests (64 fichiers). InputBase partage les styles via mr-input-base. Projet pret pour Phase 2 (autres form controls) et Phase 3 (FileUpload).
- 27 Mai 2026: Bugfix round 2. RadioGroup/Checkbox legacy CSS supprime (sizes fonctionnent). Select font-size aligne sur Input (16px), line-height harmonise. Switch exemples reduits (normal + disabled). AsyncStateNotice exemples ajoutes (loading/error/interactive). DocPage previewLabel auto-derive du titre. 47/55 docs enrichis (cssHooks/tokens/a11y) sur le modele Button. Tests 530/530.
- 27 Mai 2026: Bugfix session. Registry cleanup (NumberInput/PasswordInput retires du registry). Select/RadioGroup/Switch CSS harmonise. Switch refactored (hint/error/Field support). Textarea rework (auto-resize, char counter, resize prop, custom scrollbar). +4 docs bugfix round (RadioGroup items, Select options, Switch label duplique, FormSection actions dans header). Tests 530/530 (62 fichiers). NumberInput,PasswordInput retires de la liste des composants exports.
- 27 Mai 2026: Phase 2 (ui- -> mr-) terminee. ~272 fichiers, ~3850 remplacements. Tests 323/323, typecheck 0.
- 27 Mai 2026: Phase 5 generator templates MAJ. Smoke test OK.
- 27 Mai 2026: InfiniteScroll implemente + docs. 15 tests. 338/338 total.
- 27 Mai 2026: Phase 3 (Package Exports) terminee. 7 exports ajoutes, 4 entr?es tsup, 120 tests d\'export. 460/460 total.
- 27 Mai 2026: Permissions opencode.json -> allow pour tous les agents.
- 27 Mai 2026: Phase 4 (Docs Restructure) terminee. 59 dossiers structures, componentDocs.tsx supprime, DocsPage en lazy import.
- 27 Mai 2026: Phase 5 (Quality) terminee. Input forwardRef, +24 tests nets (473 total), docs completees.
- 27 Mai 2026: Phase 7 (Release) terminee. npmrc, LICENSE, changeset, CI+release workflows, README enrichi, InfiniteScroll fix (485/485). Projet release-ready.


## Pipeline
- AVANT TOUT: lancer pipeline force : reasoner ? coder ? reviewer ? rapport
- Si user donne tache direct: quand meme lancer pipeline via subagents
- Ne jamais implementer sois-meme. Toujours deleguer aux agents

## Communication
- Caveman mode permanent (default full)
- Fragmentes OK. Pas de remplissage. Technique exact.
- Code/commits/PRs: langage normal
- Niveaux: /caveman lite|full|ultra
- Desactiver: 'normal mode'

## Skills
- **frontend-design**: Create distinctive, production-grade frontend interfaces. No emoji, no AI-generic aesthetics (Inter/Roboto/purple gradients). Uses intentional typography, color, layout, and motion. Self-critiques against WCAG 2.2 AA before returning.




## Skill: frontend-design

### Design Thinking
- **Purpose**: What problem? Who uses?
- **Tone**: Pick extreme. Not generic.
- **Differentiation**: ONE thing unforgettable.

### Concrete moves (counter defaults)
- **Typography**: Commit to distinctive family, extreme weight pairs (200 vs 800), 3x+ size jumps. Avoid Space Grotesk (convergence trap).
- **Layout**: Name archetype first. Bento grid, split-screen, asymmetric. Not default centered column.
- **Color**: Dominant color + ONE sharp accent. Anchor to concrete reference (IDE theme, era). Never generic brand-blue.
- **Tokens/Theme**: Route every value through CSS variables. No magic numbers. Dark mode via variable redefinition.
- **Inspiration**: Anchor to specific source (material, era, software). Not "modern and clean".

### Prohibited
- No emoji as icons
- No inline styles for layout/structure
- No generic AI aesthetics: Inter/Roboto/Arial, purple gradients on white, lone centered cards
- No sameness across outputs — each generation must diverge

### Self-critique (before return)
- Contrast >= 4.5:1 body, >= 3:1 large text/controls. Meaning not by color alone.
- Native semantics: <button>, <a href>, <label>, <h1>–<h6> order, landmarks.
- <img> always has alt.
- Keyboard-operable with visible focus indicator.
- Type scale deliberate, line-height >= 1.5, line length 45–75 chars, sizes rem/em.
- Spacing on consistent scale (4/8px steps or tokens).
- @media (prefers-reduced-motion: reduce).
- No generic-default tells survive.

### WCAG 2.2 AA thresholds
- Contrast: 4.5:1 body, 3:1 large text/UI controls/borders/meaningful icons
- Reflow: single column at 320px, no horizontal scroll
- Text spacing: line-height 1.5, letter-spacing 0.12em, word-spacing 0.16em
- Focus visible: 2px outline, 2px offset minimum

