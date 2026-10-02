# 03 : Fondation CSS

Ce document fixe les règles d'écriture du CSS de la bibliothèque : couches, reset, base, sélecteurs, spécificité et contrat de surcharge pour le consommateur. Il sert à écrire ou relire n'importe quel fichier de `packages/styles`.

## Couches

L'ordre est déclaré une seule fois, dans `packages/styles/src/layers.css` :

```css
@layer mr.reset, mr.base, mr.tokens, mr.themes, mr.components, mr.utilities;
```

- `mr.reset` : remise à zéro minimale, spécificité nulle.
- `mr.base` : styles de base hérités des tokens (fond, texte, typographie, focus, préférences utilisateur).
- `mr.tokens` : primitives dans `:root`, sémantiques neutres et échelles via `:where(:root, [data-theme])`, et sémantiques dépendant de la marque via `:where(:root, [data-theme], [data-brand])` pour assurer la réévaluation par cascade sous conteneur sans surcharger la spécificité ni écraser le thème actif.
- `mr.themes` : surcharges par thème, par marque et par densité.
- `mr.components` : recettes des composants.
- `mr.utilities` : utilitaires, rares, chacun justifié par un usage mesuré.

Toute règle de la bibliothèque est dans une couche. Aucune règle hors couche, sauf la déclaration d'ordre elle-même. Les noms sont préfixés `mr.` pour ne pas entrer en collision avec les couches de l'application hôte.

## Contrat de surcharge

Le CSS d'un consommateur qui n'est pas dans une couche l'emporte sur toutes les couches de la bibliothèque, quelle que soit sa spécificité. C'est la raison d'être des couches pour une bibliothèque, et c'est un engagement public.

```css
/* Chez le consommateur : suffit, sans !important ni sélecteur renforcé */
.mr-button {
  border-radius: 999px;
}
```

Conséquences pour les contributeurs :

- Ne jamais compenser un problème d'ordre par `!important` ni par un sélecteur plus spécifique.
- Si un consommateur place ses propres règles dans une couche, c'est à lui de déclarer l'ordre relatif ; la documentation publique le rappelle.
- Les surcharges recommandées passent par les tokens (`--mr-button-bg`, tokens sémantiques), pas par la réécriture des recettes.

## Reset

- Entièrement dans `mr.reset`, tout en `:where()` pour une spécificité nulle.
- Scopé à la portée `mr-*` (racine de la bibliothèque), jamais un reset global qui modifierait la page hôte.
- Contenu minimal : `box-sizing`, marges, médias bloc, héritage des polices des contrôles de formulaire, comportement de `[hidden]`.
- Aucune valeur de design (couleur, taille) dans le reset.

## Base

Dans `mr.base`, un fichier par sujet :

- fond et couleur de texte hérités des tokens sémantiques ;
- typographie de base (famille, taille, interligne) ;
- `:focus-visible` : un seul style de focus pour toute la bibliothèque, par token ;
- `color-scheme` défini par thème ;
- `prefers-reduced-motion`, `prefers-contrast: more` et `forced-colors` : traités une seule fois ici, par les tokens (durées, bordures), jamais par recette ;
- taille minimale des cibles tactiles.

## Sélecteurs et nommage

- Classe de base préfixée par composant : `.mr-button`, `.mr-input`. Aucun sélecteur sur un élément nu en dehors du reset et de la base.
- Variantes et états par attributs de données : `[data-variant]`, `[data-size]`, `[data-state]`, `[data-density]`. Pas de modificateurs BEM (`.mr-btn--primary` est interdit dans tout nouveau code).
- États natifs avant états portés : `:disabled`, `:checked`, `:invalid`, `:focus-visible` ; les états portés par `data-state` ou `aria-*` ne servent que lorsqu'aucun état natif n'existe.
- Aucun sélecteur d'identifiant. Aucun `!important`.
- Spécificité maximale 0,2,0 dans les recettes. Les règles de reset et de base utilisent `:where()`.
- Pas d'imbrication au-delà de deux niveaux. Si une recette en a besoin, elle est mal découpée.

## Propriétés et valeurs

- Propriétés logiques dans tout nouveau code : `inline-size`, `block-size`, `margin-inline`, `padding-block`, `inset-inline-start`.
- Aucune valeur brute (couleur, longueur, durée) dans une recette. Exceptions : `0`, `1px`, `2px`, pourcentages de mise en page.
- Couleurs en `oklch()`. Les états dérivés par `color-mix(in oklch, ...)` (voir `04-tokens-et-themes.md`).
- Unités relatives (`rem`, `em`) pour les tailles de texte et d'espacement. `px` seulement pour les bordures fines et les cibles fixes justifiées.
- `@property` n'est déclaré que pour un token qui doit s'animer ou être typé. Sinon, on n'en ajoute pas.
- Les requêtes de conteneur ne sont utilisées que si une recette en a un besoin avéré. Les requêtes de média ne servent qu'aux préférences utilisateur, centralisées dans la base.

## Ordre des déclarations dans une recette

1. Tokens de composant (propriétés personnalisées sur la classe de base).
2. Disposition (`display`, `position`, grille, flex).
3. Boîte (dimensions, espacement, bordure).
4. Typographie.
5. Couleurs et effets.
6. Transitions.
7. Variantes, puis tailles, puis états, dans cet ordre.

Cet ordre n'est pas contrôlé par un outil : il facilite la relecture.

## Interdits

- Règle hors couche, sélecteur global hors reset et base, `!important`, sélecteur d'identifiant.
- Valeur brute de couleur ou de dimension hors `tokens/` et `themes/` (ADR-018).
- Lecture directe d'une primitive (`--mr-ref-*`) dans une recette.
- Nom de classe ou de token générique (`.button`, `--color-primary`) susceptible d'entrer en collision avec l'hôte.
- Style global imposé à l'application hôte (`html`, `body`, `*`) hors portée `mr-*`.
