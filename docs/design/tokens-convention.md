# Convention de nommage des tokens

Statut : convention de référence v1 — opposable
Portée : `packages/tokens/src/` (sources), `packages/styles/src/recipes/` (consommation), `docs/design/components/` (spécifications)
Décisions d'origine : D6, D7, D8, D9, D10 de `PLAN.md`

Ce document est la règle qui tranche. Quand un nom, une valeur ou un découpage est ambigu, c'est ce document qui répond, pas l'usage existant.

## 1. Objet

Le système de tokens a été construit par vagues successives. Il en reste trois vocabulaires concurrents : les tokens globaux, des variables déclarées localement dans les recettes, et des noms cités dans les spécifications qui n'existent nulle part. Ces trois-là ne partagent ni le même découpage, ni les mêmes conventions de suffixe.

On ne répare pas cela en renommant au fil de l'eau. On fixe une grammaire, puis on migre famille par famille en appliquant cette grammaire.

## 2. Grammaire du nom

```
--mr-<catégorie>-<rôle>[-<variante>]
```

- **catégorie** : un mot d'un vocabulaire fermé (section 4). Jamais le nom d'un composant si la valeur est partageable.
- **rôle** : ce que la valeur porte, au singulier, en kebab-case. `--mr-bg-canvas`, pas `--mr-background-canvas-color`.
- **variante** : suffixe d'échelle ou d'état, tiré d'une liste fermée par catégorie (section 5).

Contraintes de forme, non négociables :

- minuscules ASCII, séparateur `-`, jamais `_`, jamais `__`, jamais de majuscule ;
- au moins deux segments après `--mr-` : une catégorie seule est invalide ;
- une valeur par token : si un nom contient une notion de « et », ce sont deux tokens ;
- aucun nombre libre dans le nom, sauf les échelles qui le justifient (section 5) ;
- le nom dit le rôle, jamais la valeur : `--mr-border-width` et non `--mr-border-width-1px` ;
- le nom est stable : le renommer est un changement de rupture, pas un ajustement de style.

## 3. Les trois couches

Un token appartient à **une seule** couche. Le passage d'une couche à l'autre est un acte explicite, tracé dans la spécification du composant.

**Primitives.** Sept tokens, tous désignés par `docs/design/language.md` §5.1. Ce sont les seules valeurs qu'une marque peut remplacer. Elles ne portent jamais de sémantique : `--mr-ref-brand-hue`, pas `--mr-accent-hue`.

**Sémantique.** Les valeurs dont le sens vient du thème, résolues par `[data-theme]` : fonds, textes, bordures, tons, ombres de superposition. Un token sémantique ne se définit qu'en référençant une primitive ou une autre sémantique de rang supérieur — jamais une teinte écrite en dur (contrôle T3).

**Fondations.** Les valeurs indépendantes du thème : espacements, rayons, bordures, mouvement, icônes, z-index. Elles ne varient pas d'un thème à l'autre.

**Composant.** Les valeurs propres à un composant : tailles de contrôle, hauteurs de piste, largeurs de dialog. Elles vivent dans `components.json`. Elles ne dépendent pas de la densité (`language.md` §5.13).

## 4. Vocabulaire fermé des catégories

Une catégorie nouvelle ne s'ajoute que si aucune catégorie existante ne convient. La liste complète est **machine-lisible** : `packages/tokens/categories.json`. Cette section en est la transcription ; `tooling/tokens/token-pattern.test.mjs` échoue si les deux divergent, et la regex `custom-property-pattern` de Stylelint est dérivée du JSON, jamais recopiée.

**28 catégories globales**, par famille (ROADMAP §4.2) :

- Couleur : `bg`, `text`, `border`, `accent`, `tonal`, `status`, `scrim`, `chart`.
- Dimension : `spacing`, `radius`, `border-width`, `focus`, `control-height`, `icon-size`.
- Typographie : `font-family`, `font-size`, `line-height`, `font-weight`, `letter-spacing`.
- Mouvement : `duration`, `easing`.
- Profondeur : `shadow`, `z-index`, `opacity`.
- Layout : `container`, `breakpoint`.
- Variation : `density`, `brand`.

Trois usages de la catégorie :

1. **Catégorie seule**, quand la catégorie est déjà le rôle entier : `--mr-accent`, `--mr-border`, `--mr-scrim`, `--mr-border-width`, `--mr-z-index`, `--mr-line-height`.
2. **Catégorie + rôle** : `--mr-bg-canvas`, `--mr-text-primary`, `--mr-status-danger-border`, `--mr-font-weight-medium`.
3. **Primitif**, catégorie à part : `--mr-ref-<rôle>`, préfixe `--mr-ref-*` (D11). Les sept primitifs sont `brand-hue`, `brand-chroma`, `neutral-hue`, `neutral-chroma`, `font-sans`, `font-mono`, `radius-scale`.

Les tokens de **composant** ne sont pas dans cette liste : `switch`, `badge`, `dialog`, `drawer`… relèvent du registre `local-tokens` avec justification (D8). La regex globale les refuse ; c'est `audit:tokens` qui vérifie qu'un token local est bien enregistré et utilisé.

Abréviations héritées interdites, que D8 remplace : `fs-*` → `font-size`, `lh-*` → `line-height`, `dur-*` → `duration`, `ease-*` → `easing`, `space-*` → `spacing`.

## 5. Échelles et variantes

Une échelle s'écrit `<catégorie>-<rôle>-<taille>`. Les tailles d'une même échelle sont un ensemble fermé et exhaustif : pas de `-4xl` ajouté après coup.

- Tailles de composant : `sm`, `md`, `lg`. Jamais `xs` ni `xl` sauf composition avec `full` (`--mr-radius-full`).
- États : uniquement les états qui existent dans la spécification du composant. `--mr-accent-hover` existe parce que Button a un état survol ; `--mr-accent-hover` n'existe pas pour un composant sans survol.
- Espacements : `--mr-spacing-<n>` sur grille 4px, plus les demi-pas `0-5` et `1-5`. Les nombres sont des valeurs de grille, pas des pixels arbitraires.
- Graisses : `regular`, `medium`, `semibold`. Une graisse nommée `bold` à côté de `semibold` est une échelle incohérente.
- Mouvement : `--mr-duration-fast|base|slow` pour les transitions, plus `--mr-duration-spin|pulse` pour les boucles nommées. Aucune durée en millisecondes dans un nom.

## 6. Test du token local (D8)

Un `--mr-<composant>-<rôle>` déclaré **dans une recette** plutôt que dans `components.json` est autorisé seulement si les six réponses sont oui.

1. Le rôle est propre à ce composant et n'a aucun sens hors de lui.
2. C'est une vraie surface de personnalisation : un consommateur a une raison documentée de le surcharger.
3. Le composant seul le consomme, ou le surcharger n'a de sens que dans ce composant.
4. Il ne duplique aucun token global sous un autre nom.
5. Il a une valeur par défaut résolue : `var(--mr-x, <défaut>)` ou une déclaration locale, jamais rien.
6. Il est listé dans la spécification du composant, avec son rôle et sa valeur par défaut.

À l'inverse, un token local qui n'est qu'un simple alias d'un token global est supprimé, pas conservé. C'est le cas typique : `--mr-card-current-gap` n'est qu'un intermédiaire vers `--mr-card-gap`, et `--mr-banner-tone` duplique la notion de ton qui existe déjà au niveau sémantique.

Un token local ne devient jamais global par accumulation d'usage. Il devient global si la section 4 le réclame : quand un second composant a le même besoin, on remonte la valeur en `components.json` sous le nom de catégorie, et les deux composants consomment le token global.

## 7. Critère de doublon (D9)

Quand deux tokens portent la même valeur, l'arbitrage se fait dans cet ordre, et l'ordre ne s'inverse pas.

1. **La valeur réellement utilisée l'emporte.** On mesure ce que les recettes consomment aujourd'hui. Le nom qui n'est référencé nulle part ne gagne rien.
2. **Le nom conforme à la convention est gardé.** Parmi les survivants, celui qui respecte la section 2. Si aucun ne la respecte, le nom est réécrit et l'ancien nom disparaît — il n'est pas conservé en alias.
3. **Les variantes de suffixe contradictoires sont unificiées.** `--mr-switch-track-w-md` et `--mr-switch-track-width-md` ne peuvent pas coexister : une seule forme, celle de la section 5.

Puisque le paquet n'a jamais été publié, un perdant est **supprimé**, pas déprécié. Il n'y a ni alias, ni fichier de compatibilité, ni date de retrait. La dépréciation ne sert qu'aux consumers d'un paquet déjà livré.

Trois de ces doublons sont déjà identifiés et seront traités au fil des familles : l'échelle z (`z-sticky`/`z-dropdown`/… face à `z-base`/`z-elevated`/`z-overlay`), l'échelle de durée (`duration-fast`/`base`/`slow` face à `duration-quick`/`600`/`fast-alt`/`slow-alt`), et la taille de police (`fs-*` face à `text-*`).

## 8. Transition spec ↔ code (D6)

La règle, sans exception :

- **La recette gouverne** tant que la spécification du composant n'a pas été réécrite.
- Une spécification réécrite et marquée « validée » **devient autorité**, et la recette doit alors s'y conformer.
- La réécriture de la spécification et la modification de la recette ont lieu dans **le même commit**. Une spec réécrite seule crée de la dérive silencieuse, qui est exactement le problème que ce chantier répare.

Une spécification qui cite un token inexistant est un défaut de la spécification, pas une invitation à créer le token. Le cycle correct est : la recette montre ce dont elle a besoin, la spécification est réécrite pour le décrire, le token est créé si le besoin est réel et conforme à la section 6.

Les spécifications portent un tableau « Écarts avec l'existant ». Ce tableau est l'outil de transition : il se vide au fil du chantier, et il est vide quand le composant est fait.

## 9. Interdits

- Un `var(--mr-*)` qui ne désigne aucun token, sans valeur de repli. Le repli masque le défaut ; l'audit des références le signale.
- Une valeur visuelle écrite en dur dans une recette : couleur, dimension supérieure à 2px, durée, graisse ou z-index.
- Un token qui n'a qu'un seul usage : il appartient à la recette, pas au système.
- Un token créé « au cas où ». Un token non consommé est une promesse que le projet n'a pas encore tenue.
- Un deuxième vocabulaire dans le même nom : `--mr-text-primary` est sémantique, `--mr-text-sm` est une taille. Les deux ne peuvent pas coexister dans une catégorie `text` dont le rôle est « couleur du texte ».

## 10. Travail à faire

Cette convention est appliquée famille par famille dans l'étape 11 du plan. L'inventaire initial, mesuré sur la base au démarrage du chantier :

- 280 tokens émis, dont 93 jamais référencés par une recette, une base ou l'application ;
- 60 tokens locaux déclarés dans les recettes, dont une trentaine sont de simples alias de tokens globaux ;
- 61 noms cités dans 31 spécifications qui ne correspondent à aucun token ;
- sept familles de doublons internes (z, durée, taille de police, ombre, radius, switch, spinner, textarea).

L'ordre d'attaque est fixé par le plan : un composant pilote (Switch), puis une famille de composants par session, chacun avec sa preuve.