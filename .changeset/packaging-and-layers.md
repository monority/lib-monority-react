---
'@monority/ui': minor
---

Aligne le paquet publié sur une frontière d'API explicite

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
   import '@monority/ui/reset.css'      // si vous voulez le reset
   import '@monority/ui/utilities.css'  // si vous voulez les utilitaires
   ```

   Les familles d'utilitaires qui n'étaient pas utilisées ont été supprimées ;
   les restantes sont préfixées `mr-*` pour ne pas entrer en collision avec
   l'application hôte. La feuille est skippable côté bundle principal.
