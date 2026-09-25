# Monority React - AI Memory

> `docs/design/` fait foi. Une convention qui le contredit est une erreur.

## Project Structure
- `packages/ui/src/components/` — Composants React (forms, feedback, layout, navigation, overlays, typography, display, actions)
- `packages/ui/src/primitives/` — Primitives (FormControl, InputBase)
- `packages/styles/src/recipes/` — ~54 recipe CSS files (remplace legacy.css)
- `packages/styles/src/components/legacy.css` — SUPPRIMÉ (migré vers recipes)
- `apps/web/src/docs/components/` — Doc pages, exemples
- `packages/ui/src/styles/recipes/` — Recipes UI (non importées, dead code)

## Architecture Décisions

### CSS Strategy
- **@layer recipes** pour tous les styles de composants
- Chaque composant a son propre `.recipe.css` dans `packages/styles/src/recipes/`
- Un seul jeu de sélecteurs : une classe de base par composant (`.mr-component`) + attributs `data-*` pour variantes et états. Plus aucune classe modificatrice BEM (`--modifier`).
- Aucune valeur visuelle en dur : tokens `--mr-*` uniquement (exceptions `0`, `1px`, `2px`, pourcentages de mise en page).
- Import via `packages/styles/src/recipes/index.css`
- `@layer recipes` cascade APRÈS base/tokens mais AVANT utilities/overrides

### Component Patterns
- **Field** : Provider pattern avec subcomponents (FieldLabel, FieldContent, FieldError, etc.)
- **Form primitives** : FormControl (contexte) + InputBase (render input)
- **Switch** : Checkbox pattern (input hidden + control visuel)
- **Drawer / Modal / AlertDialog** : `<dialog>` natif ouvert par `showModal()`, sans portail React ; animations par tokens de durée (`--mr-duration-slow` / `--mr-duration-fast`), jamais de délai fixe JS
- **Tooltip** : couche `popover="manual"` + JS d'ancrage (spec 7.11), ouverture après `--mr-tooltip-delay` au survol et immédiate au focus, `Escape` ferme ; plus de CSS `hover`/`focus-within` seul
- **État désactivé** : couleurs `--mr-text-disabled` / `--mr-bg-hover` / `--mr-border-subtle`, jamais d'opacité
- **`as`** : interdit sur les composants interactifs (P3) ; réservé aux primitives de mise en page et de texte (liste fermée de balises)
- **Overlays** : attribut `popover` natif ou `<dialog>` ; aucun `createPortal`

### Bug Patterns Connus
1. Template strings échappées mal écrites par agents (`\\\n\\` au lieu de template literal)
2. CSS legacy qui override recipes (maintenant fixé)
3. Composants sans gestion d'état interne (Checkbox, Switch)
4. @keyframes : toujours à l'intérieur de leur bloc `@layer` (convention retenue ; ne pas les sortir du layer)
5. Components with `data-*` attributes need CSS selectors for those attributes

### Positionnement overlays (décision phase 1b)
- Utilitaire interne sans dépendance `packages/ui/src/internal/position` : 12 placements, écart par token, retournement et décalage dans la fenêtre, maj au défilement et au redimensionnement tant qu'ouvert (1/frame). Créé en phase 3 avant Select/Combobox. Référence versionnée : `docs/design/reference/`.

## Pipeline Rules
1. reasoner → coder → reviewer → report
2. Toujours lire les fichiers avant de modifier
3. Preserver backward compatibility
4. Vérifier typecheck + tests après chaque changement

## Composants par catégorie (46 + 2 primitives)
- Primitives(2): FormControl, InputBase
- Forms(14): Checkbox,Combobox,DatePicker,DateRangePicker,FileUpload,FormSection,Input,RadioGroup,SearchInput,Select,Slider,Switch,Textarea,Field
- Actions(3): Button,CopyButton,IconButton
- Display(6): Accordion,Avatar,Card,MetricGrid,StatCard,Table
- etc.

## Bug Patterns (MàJ 30 Mai 2026)

### Pattern: Component State (Switch/Checkbox)
- **Problème**: `checked = false` par défaut rend le composant controlled même sans prop checked
- **Solution**: Pas de valeur par défaut sur `checked`, état interne avec `useState(defaultChecked ?? false)`, flag `isControlled = checked !== undefined`, `resolvedChecked`
- **Fichier référence**: `Checkbox.tsx` et `Switch.tsx` — pattern identique

### Pattern: Input styling dans overlays
- **Problème**: `<input className="mr-input">` ne donne AUCUN style (classe vide dans input.recipe.css)
- **Cause**: Les vrais styles sont sur `.mr-input-base` avec data attributes
- **Solution**: Utiliser `InputBase` ou `<input className="mr-input mr-input-base" data-size="md">`
- **Composants affectés**: CommandPalette, Modal examples, Popover examples (tous fixés)

### Pattern: @keyframes visibility
- **Problème**: `@keyframes` dans `@layer` peuvent ne pas fonctionner selon le bundler
- **Solution**: Mettre les keyframes hors du bloc `@layer` (dans le même fichier)
- **Taille par défaut**: Toujours donner `width`/`height` sur la classe de base, pas seulement sur les variantes

### Pattern: `children` non destructured
- **Problème**: `children` va dans `...props` et est perdu (InlineAlert)
- **Solution**: Toujours destructurer `children` explicitement

### Pattern: overflow:hidden sur conteneurs
- **Problème**: Containers avec `overflow:hidden` coupent les tooltips/overlays
- **Solution**: Remplacer par `overflow:visible` ou ne pas définir overflow

## CSS Architecture (MàJ)
- 54 recipe files dans `packages/styles/src/recipes/`
- `@layer recipes` pour tous
- legacy.css SUPPRIMÉ (1900 lignes)
- Ne JAMAIS utiliser `.mr-input` seul — utiliser `.mr-input-base` ou InputBase
- Les @keyframes dans le même fichier que les styles mais HORS du @layer block

### Pattern: `.mr-input` seul ne donne aucun style
- La classe `.mr-input` dans `input.recipe.css` est VIDE — tous les styles sont sur `.mr-input-base`
- Toujours utiliser `<Input>` component ou `<input className="mr-input mr-input-base" data-size="md">`
- Fixé dans: Field.examples, Modal.examples, Popover.examples, CommandPalette

### Pattern: `<label htmlFor>` pour déclencher input caché
- Pour les composants avec hidden file input, utiliser `<label htmlFor={inputId}>` sur les éléments visuels (action buttons) pour que le clic fonctionne
- `pointer-events: auto` sur les overlays casse la remontée des clics

### Pattern: @keyframes dans @layer
- Toujours mettre `@keyframes` à l\'intérieur du bloc `@layer`, pas avant
- Certains navigateurs ne résolvent pas les keyframes entre sous-couches CSS
- Vérifié sur: spinner (3 fixes), progress

### Pattern: Props forwardées aux enfants
- DateRangePicker devait forwarder `error`, `hint`, `disabled` aux DatePickers enfants
- Toujours vérifier que les props documentées sont implémentées dans le composant

### Pattern: Exemples avec `children` ignorés
- `Table`, `DataList`, `MetricGrid` n\'utilisent pas `children` mais des props spécifiques (`columns`/`rows`, `items`, `data`)
- Les exemples `<Component>Example</Component>` ne montrent rien — toujours utiliser l\'API correcte

### Pattern: @layer recipes wrapper redondant
- Ne JAMAIS mettre `@layer recipes { ... }` dans les fichiers `.recipe.css`
- Les fichiers sont déjà importés avec `layer(recipes)` dans index.css
- Le `@layer` interne crée une sous-couche `recipes.recipes` que Lightning CSS/Vite ne gère pas correctement
- Surtout problématique pour `@keyframes` — les keyframes dans une sous-couche ne sont pas trouvées
- Fixé dans: spinner.recipe.css, progress.recipe.css

### Pattern: DataTable checkbox
- DataTable utilisait `<input type="checkbox">` natif → remplacé par `<Checkbox>`
- `indeterminate` géré via prop directe, pas via ref + useEffect

### Pattern: Divider void element
- `<hr>` ne peut pas avoir d'enfants → utiliser `<div role="separator">` à la place
- Prop `label` pour le texte, fallback `children` pour backward compat
- `aria-orientation="horizontal"` pour l\'accessibilité

### Pattern: Doc ToC auto-généré
- Composant `DocToc.tsx` scanne le DOM pour les h2/h3
- IntersectionObserver pour tracking actif
- Zéro configuration par page
