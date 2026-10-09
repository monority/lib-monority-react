# @monority/ui

## 0.2.0

### Minor Changes

- 11a4f3c: Remplace les classes modificatrices BEM par des attributs `data-*` sur les composants migrés

  **Cassant** pour qui cible les classes de modification dans son CSS ou ses tests : le DOM n'expose plus `mr-x--y`.

  Avant :

  ```html
  <button class="mr-btn mr-btn--primary mr-btn--sm">Envoyer</button>
  ```

  Après :

  ```html
  <button class="mr-btn" data-variant="primary" data-size="sm">Envoyer</button>
  ```

  Composants migrés : Button, CopyButton, IconButton, Toggle, ToggleGroup, Select, tous les contrôles de formulaire, les overlays, les composants de layout, Kbd, PreCode, Separator, DataList, Combobox, DatePicker, HoverCard, Resizable, Carousel.

  **Ce qui ne change pas** — les 24 hooks BEM documentés restent des alias CSS fonctionnels (`mr-kbd--sm`, `mr-separator--vertical`, `mr-progress__bar--indeterminate`, …). Ils ont été vérifiés un par un : la classe posée manuellement produit le même style que son équivalent `data-*`, sur 46 propriétés calculées. Voir `MIGRATIONS.md`.

  Migration : remplacer les sélecteurs `.mr-x--y` par `[data-*]`, en consultant les `cssHooks` de la page du composant (rendus dans la documentation de `apps/web`).

- bb8c2a8: Refonte complete de l architecture CSS : base CSS Foundation en couches @layer mr.\* et tokens OKLCH

  - **Couches CSS declarees** : `mr.reset`, `mr.base`, `mr.tokens`, `mr.themes`, `mr.components`, `mr.utilities`. Les regles de la bibliotheque ne peuvent plus ecraser involontairement les styles non-couche de l application consommatrice.
  - **Design tokens OKLCH** : primitives `--mr-ref-*`, semantiques `--mr-bg-*`, `--mr-text-*`, `--mr-border-*`, `--mr-accent-*`. Etats derives a l execution avec `color-mix(in oklch, ...)`.
  - **7 themes complets** : `light`, `dark`, `slate`, `oled`, `ocean`, `night`, `high-contrast` (plus l alias historique `dim`).
  - **Support de la marque par cascade** : redefinition propre des primitives `--mr-ref-brand-*` via `[data-brand]`.
  - **Composants React 19** : utilisation exclusive de la ref en prop native (suppression de forwardRef dans le code neuf).
  - **Accessibilite WCAG 2.2 AA** : conformite stricte des ratios de contraste sur tous les themes et surfaces (ratio >= 4.5:1 pour le texte, >= 3:1 pour les composants UI).
  - **75 composants publics** : integrite des 75 composants validee dans le harness, les tests unitaires et les suites e2e Playwright.

- 11a4f3c: Expose `positionOverlay` et verrouille la frontière de package

  Ajoute `positionOverlay` aux exports publics de `@monority/ui`. L'implémentation
  reste dans `internal/position/` : seule la fonction est exposée, pour éviter que
  les applications atteignent `packages/ui/src/internal/*` par chemin relatif.

  ```ts
  import { positionOverlay } from "@monority/ui";

  const stop = positionOverlay(overlayElement, anchorRect, {
    placement: "bottom",
    offset: 8,
  });
  // … plus tard
  stop(); // retire les écouteurs scroll/resize
  ```

  C'était jusqu'ici une impasse : l'application de documentation devait importer un
  fichier `internal/` du paquet (`../../../../packages/ui/src/internal/...`). Elle
  passe désormais par l'API publique, et `apps/web` n'a plus aucun import de
  `packages/ui/src/internal/**` — c'est vérifié, mais pas encore gardé par un test
  (à ajouter).

  Ajoute également la bannière `use client` sur les fichiers JS distribués, pour que
  les composants soient utilisables en Server Components côté consommateur.

- 11a4f3c: Aligne le paquet publié sur une frontière d'API explicite

  Trois changements cassants pour les consommateurs, tous vérifiés par le contrat
  d'exports (`exports.test.ts`, 134 tests) :

  1. **Les barres internes ne sont plus exportées.** `useControllableState`,
     `useFieldIds`, `canUseDOM` et `focusableSelector` ne sont plus accessibles
     depuis `@monority/ui`. Elles restent utilisées en interne. Seuls `useTheme` et
     `useToast` sont exposés en tant que hooks.

  2. **Les layers CSS sont namespacés `mr.*`.** L'ordre de priorité déclaré dans `layers.css` est :

     ```text
     mr.reset → mr.base → mr.tokens → mr.themes → mr.components → mr.utilities
     ```

     Les applications qui surchargent `@layer` doivent cibler les couches préfixées `mr.`. Le CSS non-couche d'une application gagne toujours.

  3. **`reset.css` et `utilities.css` sont devenus opt-in.** L'import par défaut
     (`@monority/ui/index.css`) n'inclut plus le reset de page ni les utilitaires.
     Les composants autonomes (`mr-*`) n'en dépendent plus. Conséquence voulue :
     une application hôte garde la maîtrise de `margin`, `box-sizing` et du reset.

     ```ts
     import "@monority/ui/reset.css"; // si vous voulez le reset
     import "@monority/ui/utilities.css"; // si vous voulez les utilitaires
     ```

     Les familles d'utilitaires qui n'étaient pas utilisées ont été supprimées ;
     les restantes sont préfixées `mr-*` pour ne pas entrer en collision avec
     l'application hôte. La feuille est skippable côté bundle principal.

### Patch Changes

- 11a4f3c: Supprime des règles CSS mortes et réorganise les catégories de composants

  - **5 sélecteurs CSS supprimés**, jamais émis par un composant et jamais
    documentés : `.mr-accordion__heading`, `.mr-page-header__content`,
    `.mr-table__cell--center`, `.mr-toolbar__group`, `.mr-toolbar__center`. Sans
    effet sur le rendu, qui ne pouvait pas les atteindre.
  - **`Separator` est piloté par `data-orientation`** (et non plus par une classe
    modificatrice). Les classes `mr-separator--horizontal/vertical` et
    `mr-table__cell--*` restent des alias CSS fonctionnels, mais ne sont plus
    émis par le composant. `Divider` n'a **pas** été fusionné : ce n'était pas un
    doublon de `Separator` (props `label` et `decorative` distinctes), il est
    toujours publié.
  - Réorganisation interne : `data-display/` devient `data/`, et `table`,
    `metric-grid` et `stat-card` le rejoignent. **Les sous-chemins d'export
    publics sont inchangés** (`@monority/ui/table`, `@monority/ui/metric-grid`,
    `@monority/ui/stat-card`, `@monority/ui/data-table`, `@monority/ui/data-list`) :
    seuls les chemins de sources internes ont bougé.
  - Garde-fou ajouté : un test échoue si un template du générateur réintroduit un
    layer CSS non namespacé (un layer non déclaré est ordonné en dernier par le
    navigateur, ce qui placerait le composant généré au-dessus des couches de la
    bibliothèque).
