---
'@monority/ui': minor
---

Remplace les classes modificatrices BEM par des attributs `data-*` sur les composants migrés

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
