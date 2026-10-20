---
'@monority/ui': minor
---

- Ajout du cycle de vie des animations d'entrée et de sortie fluides via le hook interne `usePresence` et les attributs `data-state` / `data-closing`.
- Unification des primitives d'éléments de menu (`MenuItemPrimitive`, `MenuSeparatorPrimitive`, `MenuLabelPrimitive`) composées dans `DropdownMenu`, `ContextMenu` et `Menubar`.
- Ajout de l'utilitaire d'export de thème CSS `designConfigToCSS` et intégration dans le Design Studio.
- Extraction de `Field.types.ts` complétant la parité 100% de typage isolé sur l'ensemble des 83 composants du catalogue.
- Garantie de l'autonomie et de l'indépendance stricte vis-à-vis de `reset.css` (conformité O3.1 / O3.4).
