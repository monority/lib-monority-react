---
'@monority/ui': patch
---

Supprime des règles CSS mortes et réorganise les catégories de composants

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
  navigateur, ce qui placerait le composant généré au-dessus de
  `monority.overrides`).
