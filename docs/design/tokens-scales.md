# Tableau des échelles de tokens

Statut : **validé le 2026-10-01**.
Décision : D15, option C — échelle déclarée par famille et fermée.
Source des mesures : `git show da57c3e:packages/styles/src/tokens/generated/tokens.css`, 279 tokens de la table rase.

## 1. Ce que le tableau tranche

Chaque famille d'échelle a **un seul type de pas**, une liste fermée de pas autorisés, et un **plafond** de pas. Ce qui n'entre pas dans une échelle n'est pas un pas : c'est un rôle. Trois mots, trois effets :

- **pas** — une valeur sur une échelle continue ou ordinale, `--mr-spacing-4` est le pas 4.
- **rôle** — ce que la valeur désigne, `--mr-bg-canvas` est le fond canvas. Un rôle ne se range pas dans un ordre, donc il ne porte pas de pas.
- **état** — la condition d'un jeton de repos, `--mr-accent-hover`. D13 impose de le **dériver** par `color-mix`, pas de le déclarer.

La confusion des trois est la cause historique du désordre : `control` portait 17 tokens mêlant un pas nommé (`size-sm`), un rôle (`gap`, `accent`) et un état (`accent-hover`) sous un même préfixe.

## 2. Vocabulaire de pas

Deux vocabulaires seulement. Aucun troisième.

**Pas nommés**, pour ce qui est exposé en prop `size` ou traduit par `data-size` :

```
xs  sm  md  lg  xl  2xl  3xl  4xl  full
```

`full` n'est un pas que pour `radius` : c'est une valeur de sens fermé (cercle complet), pas une taille relative. Il est isolé pour cette raison.

**Pas numériques**, pour les échelles continues sans sens public : la valeur EST l'unité.

Un pas nommé ne s'ajoute pas à une échelle numérique, et réciproquement. C'est la règle qui interdit le mélange.

## 3. Tableau famille par famille

`Plafond` = nombre maximum de pas. Au-delà, la famille doit être scindée ou le pas supprimé.

### 3.1 Familles à pas **nommés**

| Famille | Pas autorisés | Plafond | Tokens historiques | Impact rendu | Note |
|---|---|---|---|---|---|
| `icon-size` | `sm`, `md`, `lg` | 3 | `icon-size-sm/md/lg` | aucun | 3 valeurs historiques (16/16/20px) |
| `avatar-size` | `sm`, `md`, `lg` | 3 | `avatar-size-sm/md/lg` | aucun | aligné sur `icon-size` |
| `dialog-width` | `sm`, `md`, `lg` | 3 | `dialog-width-sm/md/lg` | aucun | |
| `checkbox` | `md`, `lg` | 2 | `checkbox-size-md/lg`, `checkbox-glyph-md/lg` | aucun | **deux sous-échelles** — voir §4.1 |
| `badge` | `sm`, `md` | 2 | `badge-height-sm/md` | aucun | |
| `textarea` | `sm`, `md`, `lg` | 3 | `textarea-min-height-sm/(vide)/lg` | aucun | **3 variantes, 1 sans suffixe** — voir §4.2 |
| `spinner` | `sm`, `md`, `lg` | 3 × 2 séries | `spinner-size-*`, `spinner-ring-*` | à arbitrer | **D16**, voir §4.3 |
| `shadow` | `xs`, `sm`, `md`, `lg` | 4 | `shadow-xs/sm/md` + `raised`, `surface`, `focus`, `overlay`, `thumb` | aucun | voir §4.4 |
| `radius` | `xs`, `sm`, `md`, `lg`, `full` | 5 | `radius-xs/sm/md/lg`, `radius-inline/control/card/overlay/full` | aucun | voir §4.5 |
| `z-index` | aucun pas — voir §4.6 | 6 | `z-base/elevated/overlay` + `z-sticky/dropdown/popover/modal/toast/tooltip` | **annoncé** | voir §4.6 |

### 3.2 Familles à pas **numériques**

| Famille | Pas autorisés | Plafond | Tokens historiques | Impact rendu | Note |
|---|---|---|---|---|---|
| `spacing` | `0`, `0-5`, `1`, `1-5`, `2`, `3`, `4`, `5`, `6`, `8`, `10`, `12`, `16`, `20`, `24` | 15 | 15 tokens | aucun | grille 4px + demi-pas. **Aucun pas nommé** : `--mr-spacing-md` serait absurde |
| `opacity` | aucun — échelle supprimée | 0 | 11 paliers + `disabled` | **annoncé** | voir §4.10, `opacity-disabled` survit |
| `chart` | `1`, `2`, `3`, `4`, `5` | 5 | `chart-1..5` | aucun | séries numérotées |
| `font-size` | `11`, `12`, `13`, `14`, `16`, `18`, `24`, `32` | 8 | `fs-11..32` | aucun | **famille à renommer** : `fs` est une abréviation interdite (D8) |
| `line-height` | `11`, `12`, `13`, `14`, `16`, `18`, `24`, `32` | 8 | `lh-11..32` | aucun | idem, `lh` interdit |

### 3.3 Familles de **rôles** — pas d'échelle

Aucune échelle : les suffixes sont des rôles ou des états, et se combinent librement.

| Famille | Suffixes observés | Règle |
|---|---|---|
| `bg` | `canvas`, `surface`, `raised`, `overlay`, `sunken`, `hover`, `active` | états dérivés (D13) |
| `text` | `primary`, `secondary`, `tertiary`, `disabled` + `2xs/3xl/xl/display` | **mélange rôles et tailles** — voir §4.7 |
| `border` | `subtle`, `default`, `control`, `control-hover`, `width` | `width` est une dimension, pas une couleur |
| `accent` | aucun, `text`, `subtle`, `border`, `hover`, `active` | `accent` seul est la couleur de repos ; les autres en sont les dérivés |
| `status` | `success-text`, `warning-text`, `danger-text`, `info-text`, + `subtle`/`border`/`solid` par ton | structure : `status-<ton>-<rôle>` |
| `font-weight` | `regular`, `medium`, `semibold` + `bold` | `bold` hors échelle — voir §4.8 |
| `easing` | `standard`, `enter`, `exit`, `linear` | aucune échelle, courbes nommées |
| `icon-stroke`, `focus-width`, `focus-offset`, `focus-color` | — | scalaires uniques |
| `overlay` | `width-{alert,command,dialog,drawer,menu,popover,tooltip}` | largeurs par type d'overlay, pas une échelle |
| `menu`, `table`, `tooltip`, `track` | `min-width`, `max-width`, `head-height`, `row-height`, … | rôles de mesure, aucun pas |

### 3.4 Familles mixtes à trancher

| Famille | Constat | Décision proposée |
|---|---|---|
| `control` | 17 tokens : pas nommés **et** rôles **et** états sous un même préfixe | scinder : `control-height-*`, `control-padding-inline-*`, `control-font-size-*` (nommés), et `control-gap`, `control-accent` (rôles) |
| `duration` | **MIXTE** : `fast`/`slow` (nommés) + `spin`/`pulse` (rôles) + `600` (numérique) + `fast-alt`/`slow-alt`/`quick` (**ad hoc**) | voir §4.9 et §4.11 |
| `type` | 14 tokens : styles nommés (`display`, `h1`, `body`, `caption`) | aucune échelle : ce sont des styles, pas des pas |
| `leading` | `normal`, `tight`, `snug`, `relaxed`, `base` + `control`, `heading` | aucun pas : valeurs d'interligne nommées |

## 4. Cas ambigus, un par un

### 4.1 `checkbox` — deux sous-échelles dans une famille

`checkbox-size-md/lg` (côté) et `checkbox-glyph-md/lg` (glyphe) partagent les mêmes pas mais désignent deux mesures distinctes.

**Recommandation** : ce ne sont pas une échelle mais deux rôles suffixes d'un pas. Nommer `--mr-checkbox-size-md` et `--mr-checkbox-glyph-md` est correct si les deux partagent la liste de pas `{md, lg}`. Ne pas créer d'échelle `checkbox` : c'est le rôle qui porte la mesure, le pas ne porte que la taille. Plafond 2.

### 4.2 `textarea-min-height` — variante sans suffixe

`--mr-textarea-min-height` n'a pas de pas, `-lg` et `-sm` en ont un. C'est une famille à trois valeurs dont une non nommée : impossible à lire.

**Recommandation** : nommer explicitement les trois `--mr-textarea-min-height-sm/md/lg` et supprimer la variante sans suffixe. `md` est la valeur par défaut, elle s'écrit. Plafond 3.

### 4.3 `spinner` — deux séries, deux mesures — [DÉCISION D16]

**Je me suis trompé dans la première version de ce tableau** : j'y lisais deux conventions concurrentes et recommandais de supprimer `spinner-ring`. La recette montre l'inverse.

Valeurs résolues (commit `da57c3e`) et consommateurs (grep sur `packages/styles`) :

| Token | Valeur | Usages | Emplacement |
|---|---|---|---|
| `--mr-spinner-size-sm` | `1rem` | 2 | `spinner.recipe.css:32-33` (`.mr-spinner[data-size='sm']`) |
| `--mr-spinner-size-md` | `1.5rem` | 2 | `spinner.recipe.css:42-43` |
| `--mr-spinner-size-lg` | `2rem` | 2 | `spinner.recipe.css:52-53` |
| `--mr-spinner-ring-sm` | `0.75rem` | 2 | `spinner.recipe.css:37-38` (`.mr-spinner[data-size='sm'] .mr-spinner__ring`) |
| `--mr-spinner-ring-md` | `1.25rem` | 4 | `spinner.recipe.css:20-21` (défaut) et `:47-48` |
| `--mr-spinner-ring-lg` | `1.75rem` | 2 | `spinner.recipe.css:57-58` |

Les deux séries sont **décalées d'un pas constant de 0.25rem** : `1 / 0.75`, `1.5 / 1.25`, `2 / 1.75`. Ce n'est pas une redondance, c'est une mesure et son épaisseur — la différence correspond à la bordure (`--mr-border-width`) plus la marge intérieure.

**Les deux séries sont donc justifiées et doivent être conservées.** Ce ne sont pas deux conventions mais deux rôles suffixés d'un même pas, exactement comme `checkbox` en §4.1 : le pas dit la taille, le rôle dit la mesure.

**[DÉCISION D16] — TRANCHÉE le 2026-10-01.** Spinner = **une échelle de pas + deux rôles** : un seul jeu de pas `{sm, md, lg}`, et deux rôles qui l'alimentent — `size` (mesure du conteneur) et `ring` (épaisseur de l'anneau). Ce ne sont pas deux échelles parallèles : deux échelles s'écarteraient un jour et casseraient la géométrie du composant. Plafond 3, commun aux deux rôles.

### 4.4 `shadow` — quatre nommés et cinq rôles

`shadow-xs/sm/md` (échelle d'élévation) cohabitent avec `raised`, `surface`, `focus`, `overlay`, `thumb` (rôles d'usage). Deux systèmes dans une famille.

**Recommandation** : scinder en `shadow-{xs,sm,md,lg}` (échelle d'élévation, plafond 4) et garder les rôles sous la même famille sans les compter comme pas. Le rôle se déduit du suffixe, le pas se déduit du nom de l'échelle — un token ne peut pas être les deux, donc `shadow-raised` et `shadow-sm` ne sont pas des frères malgré le préfixe commun.

### 4.5 `radius` — deux conventions

`radius-{xs,sm,md,lg}` est une échelle ordinale ; `radius-{inline,control,card,overlay,full}` est une liste de rôles. `full` n'est pas un pas : c'est une valeur de sens fermé.

**Recommandation** : deux listes, pas une échelle. `--mr-radius-sm/md/lg` pour l'échelle ordinale si elle sert encore, et les rôles nommés conservés tels quels. Retirer `full` de la liste des pas (plafond 4, pas nommés uniquement). **Question ouverte** : l'échelle ordinale `xs..lg` est-elle encore utilisée, ou a-t-elle été remplacée par les seuls rôles ? La mesure montre 4 tokens ordonnés contre 5 rôles : l'échelle est probablement morte.

### 4.6 `z-index` — deux systèmes incompatibles

`z-base`/`z-elevated`/`z-overlay` (3, générique) coexistent avec `z-sticky`/`z-dropdown`/`z-popover`/`z-modal`/`z-toast`/`z-tooltip` (6, sémantique). Aucune valeur ne se recoupe, donc aucun ordre n'est garanti entre les deux systèmes.

**Recommandation** : **un seul système, sémantique**, parce que c'est lui qui est consommé par les composants et que ROADMAP §5.14 le documente. Supprimer `z-base`, `z-elevated`, `z-overlay`. **Impact rendu : annoncé** — `z-base`, `z-elevated` et `z-overlay` ont 0 consommateur en recette (`git grep` sur `packages/styles`), donc la suppression est sans effet visuel, mais les valeurs de pile doivent être redéfinies pour garder l'ordre `sticky < dropdown < popover < modal < toast < tooltip`.

Un z-index est une **position**, pas une taille : pas de pas nommé, plafond 6 (nombre de couches), pas d'échelle.

### 4.7 `text` — rôles et tailles dans une famille

`text-{primary,secondary,tertiary,disabled}` sont des rôles de couleur ; `text-{2xs,3xl,xl,display}` sont des tailles héritées de l'échelle typographique.

**Recommandation** : les tailles sortent de la famille `text`. Elles appartiennent à la sémantique de style, pas à la couleur. Nom candidat : `--mr-font-size-{2xs,3xl,xl,display}`, ce qui les range dans `font-size` — mais `font-size` est une famille **numérique** en px, donc le mélange reviendrait. Alternative : une famille dédiée `--mr-type-*` (les styles nommés du §3.4). **Je recommande de créer `type-*` et d'y laisser les tailles**, ce qui correspond à l'historique `--mr-type-*` déjà présent. Plafond 12.

### 4.8 `font-weight` — `bold` hors échelle

`regular`, `medium`, `semibold` forment une échelle ordinale de 3. `bold` arrive après `semibold` sans être un pas de la même série.

**Recommandation** : **`bold` est supprimé**, `language.md` §5.9 dit « aucune graisse hors 400/500/600 ». Plafond 3.

**Impact rendu : annoncé, à valider par toi (D10).** Valeurs résolues : `regular` 400, `medium` 500, `semibold` 600, `bold` 700. Les 4 usages visibles, avec la graisse cible :

| Fichier | Usage | Actuel | Cible | Impact |
|---|---|---|---|---|
| `title.recipe.css:5` | titre, tous styles | `bold` 700 | `semibold` 600 | **−100**. `title.md` demande explicitement **600** pour display, h1, h2 et h3 : la recette est aujourd'hui en contradiction avec sa propre spec |
| `banner.recipe.css:42` | `.mr-banner__eyebrow`, liseré | `bold` 700 | `medium` 500 | **−200**. L'œil n'est plus attiré par le liseré ; `letter-spacing: 0.02em` reste |
| `progress.recipe.css:34` | `.mr-progress__value`, valeur chiffrée | `bold` 700 | `semibold` 600 | −100. La valeur reste lisible, `tabular-nums` inchangé |
| `calendar.recipe.css:126` | `[data-today='true']`, jour courant | `bold` 700 | `semibold` 600 | −100. Le jour courant reste distingué par la couleur `--mr-accent` |

Aucun des 4 composants ne mentionne `bold` ou `700` dans sa spec. Pour `banner`, `calendar` et `progress` la spec est **muette** sur la graisse — le choix est donc libre, et je propose `medium` pour le liseré et `semibold` pour les trois autres. Pour `title`, la spec **demande** 600.

Les 14 occurrences totales comprennent 8 dans `apps/web/src/features/docs/{code-theme,index}.css`, qui relèvent du site de documentation et non de la librairie.

### 4.9 `duration` — le cas conflictuel

C'est le seul cas **MIXTE** de tout le système, et il porte le token que tu as signalé.

Tokens historiques, valeurs au repos : `fast` 120 ms, `base` 180 ms, `slow` 240 ms, `spin` 800 ms, `pulse` 1200 ms, `600` 600 ms, `quick` 100 ms, `fast-alt` 150 ms, `slow-alt` 200 ms.

Le problème en trois temps :

1. `fast`/`base`/`slow` sont des **nommés**, et leur ordre décrit la **vitesse**, pas la taille — ce qui est cohérent. Mais `quick` et `fast-alt` s'y intercalent sans appartenir à la série.
2. `spin`/`pulse` sont des **rôles** : une boucle nommée, pas un point sur une échelle de transition.
3. `fast-alt`/`slow-alt`/`quick`/`600` sont des **paliers hérités** de l'échelle `dur-*` de la migration 5a, transportés sur `duration-*`. **`-alt` ne veut rien dire** : « alternative de quoi ? » `quick` est le pire, il n'appartient à aucune des deux séries.

**Recommandation, en deux séries distinctes** :

- **Série de transition** — plafond **3** : `--mr-duration-fast` (120 ms), `--mr-duration-base` (180 ms), `--mr-duration-slow` (240 ms). Le nom décrit la **vitesse**, pas la durée : c'est cohérent avec `ease-standard` / `ease-enter`.
- **Séries de boucle** — rôles nommés, hors échelle : `--mr-duration-spin` (800 ms), `--mr-duration-pulse` (1200 ms). Une boucle n'est pas « plus lente » qu'une transition, elle est d'une autre nature.

Suppression, sans remplacement : `--mr-duration-600`, `--mr-duration-quick`. **`-alt` fait l'objet de §4.11** : 25 occurrences réelles, valeurs distinctes des pas nommés, à trancher avant 11b4.

**Impact rendu : annoncé.** Consommateurs — `git grep` sur `packages apps` :

```
--mr-duration-600       packages/styles/src/recipes/infinite-scroll.recipe.css:33   (1)
--mr-duration-quick     packages/styles/src/recipes/checkbox.recipe.css:55           (1)
```

### 4.10 `opacity` — échelle inutile

11 paliers de 0 à 100 en pas de 10, plus `disabled`. `language.md` §5.15 dit « jamais d'opacité, désactivé par couleur ». L'échelle n'a qu'un seul usage réel : `opacity-disabled`.

**Recommandation** : supprimer l'échelle, ne garder que `--mr-opacity-disabled` — un rôle, pas un pas. Plafond 0. C'est la seule famille où le plafond tombe à zéro.

**Impact rendu : annoncé.** Consommateurs, `git grep` par suffixe sur `packages apps` :

```
--mr-opacity-0 … --mr-opacity-100   AUCUNE occurrence (10 paliers sur 11, hors 50)
--mr-opacity-50                      3 occurrences, toutes dans
                                     packages/tokens/scripts/check-token-refs.test.mjs
                                     (fixture de test, pas un consommateur)
--mr-opacity-disabled                27 occurrences dans 22 recettes :
                                     accordion, button, carousel, checkbox, combobox,
                                     context-menu, date-picker, drop-zone, dropdown-menu,
                                     file-trigger, input-base, input, menubar,
                                     navigation-menu, number-input, password-input,
                                     radio-group, select, slider, switch, tabs, toggle
```

Dix des onze paliers sont donc **déjà morts** : la suppression de l'échelle ne retire aucun consommateur réel. Seul `opacity-disabled` est vivant, et il survit à la suppression. Le `50` restant n'est consommé que par une fixture de test.

### 4.11 `--mr-duration-*-alt` — à trancher avant 11b4

**NON TRANCHÉ.** Les deux suffixes ne sont pas supprimés sans remplacement : 25 occurrences réelles, et leurs valeurs ne coïncident avec aucun pas nommé.

Valeurs résolues au repos (commit `da57c3e`) :

| Token | Valeur | Pas nommé le plus proche | Écart |
|---|---|---|---|
| `--mr-duration-fast-alt` | 150 ms | `fast` = 120 ms | +30 ms |
| `--mr-duration-slow-alt` | 200 ms | `base` = 180 ms | +20 ms |
| `--mr-duration-quick` | 100 ms | `fast` = 120 ms | −20 ms |
| `--mr-duration-600` | 600 ms | aucun | hors série |

Aucun n'est « proche » d'un pas nommé au sens d'une migration sans impact : l'écart minimal est de 20 ms, soit 11 % de `base` et 17 % de `fast`. Ce sont des **valeurs distinctes**, pas des doublons.

Consommateurs (hors archives, `git grep`) :

| Fichier | `fast-alt` | `slow-alt` |
|---|---|---|
| `button.recipe.css` | 3 (L15-17) | — |
| `checkbox.recipe.css` | 3 (L40-42) | — |
| `file-trigger.recipe.css` | 3 (L26-28) | — |
| `infinite-scroll.recipe.css` | 1 (L74) | — |
| `drawer.recipe.css` | — | 8 (L50-93) |
| `design-token-contract.test.ts` | 2 | 3 |
| `test-skips.json` | — | 2 |

**Défaut d'accessibilité à corriger au passage** : le bloc `prefers-reduced-motion` met `fast`, `base`, `slow`, `spin` et `pulse` à 0, mais **ne couvre ni `fast-alt`, ni `slow-alt`, ni `quick`, ni `600`**. Ces quatre tokens ignorent la préférence système.

Deux voies, à valider :

- **Voie A — migration vers le pas nommé.** `fast-alt` (150) → `base` (180), `slow-alt` (200) → `base` (180). Impact : 150 → 180 ms (+20 %) et 200 → 180 ms (−10 %) sur 25 transitions. Le gain est la couverture `reduced-motion`. Le coût est un changement de timing perceptible sur le drawer, qui est le composant le plus lent.
- **Voie B — nom de rôle explicite.** Créer `--mr-duration-entree` (150 ms) et `--mr-duration-sortie` (200 ms), hors échelle, et les ajouter au bloc `reduced-motion`. Aucun impact de timing, l'accessibilité est corrigée, mais la série compte deux rôles de plus.

Je ne tranche pas : le choix dépend de l'intention produit sur la fluidité du drawer.

## 5. Récapitulatif des plafonds

| Plafond | Familles |
|---|---|
| 0 (suppression de l'échelle) | `opacity` |
| 2 | `checkbox` |
| 3 | `icon-size`, `avatar-size`, `dialog-width`, `badge`, `textarea`, `font-weight`, `spinner` (par série) |
| 4 | `shadow` (ordinale), `radius` (ordonnée), `duration` (transition) |
| 5 | `spacing`, `chart`, `radius` (rôles + `full`) |
| 6 | `z-index` (couches, pas une échelle) |
| 8 | `font-size`, `line-height` |
| 12 | `type` (proposé) |

## 6. Questions ouvertes pour la validation

1. **Le quatrième pas de la série de transition `duration` — TRANCHÉ le 2026-10-01.** Plafond fixé à **3** (`fast`, `base`, `slow`). Un plafond vide est une promesse que rien ne tient.

2. **Un token à rôle seul avec un plafond de 0 — TRANCHÉ le 2026-10-01.** Le registre `local-tokens` décrit des **tokens**, pas des échelles. Une famille sans échelle est une famille valide : `--mr-opacity-disabled` (plafond 0, 27 recettes) y entre sans réserve.

## 7. Ce que ce tableau ne décide pas

- Les **valeurs** elles-mêmes. Ce tableau fixe les noms de pas autorisés et leur plafond, pas les px ou ms associés.
- Les **familles de rôle**, qui n'ont pas d'échelle et n'en ont pas besoin.
- Le **contenu** des specs de composants, qui dépend de 11b1 et des phases suivantes.