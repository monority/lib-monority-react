# Tableau des échelles de tokens

Statut : **à valider** — aucun token ne sera créé avant cette validation (D15, condition 5).
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

| Famille | Pas autorisés | Plafond | Tokens historiques | Note |
|---|---|---|---|---|
| `icon-size` | `sm`, `md`, `lg` | 3 | `icon-size-sm/md/lg` | 3 valeurs historiques (16/16/20px) |
| `avatar-size` | `sm`, `md`, `lg` | 3 | `avatar-size-sm/md/lg` | aligné sur `icon-size` |
| `dialog-width` | `sm`, `md`, `lg` | 3 | `dialog-width-sm/md/lg` | |
| `checkbox` | `md`, `lg` | 2 | `checkbox-size-md/lg`, `checkbox-glyph-md/lg` | **deux sous-échelles dans une famille** — voir §4.1 |
| `badge` | `sm`, `md` | 2 | `badge-height-sm/md` | |
| `textarea` | `sm`, `md`, `lg` | 3 | `textarea-min-height-sm/(vide)/lg` | **3 variantes, 1 sans suffixe** — voir §4.2 |
| `spinner` | `sm`, `md`, `lg` | 3 | `spinner-size-sm/md/lg` | doublon `spinner-ring-*` — voir §4.3 |
| `shadow` | `xs`, `sm`, `md`, `lg` | 4 | `shadow-xs/sm/md` + `raised`, `surface`, `focus`, `overlay`, `thumb` | **7 suffixes, 4 nommés + 5 rôles** — voir §4.4 |
| `radius` | `xs`, `sm`, `md`, `lg`, `full` | 5 | `radius-xs/sm/md/lg`, `radius-inline/control/card/overlay/full` | **deux conventions** — voir §4.5 |
| `z-index` | `base`, `low`, `mid`, `high`, `top` | 5 | `z-base/elevated/overlay` + `z-sticky/dropdown/popover/modal/toast/tooltip` | **deux systèmes** — voir §4.6 |

### 3.2 Familles à pas **numériques**

| Famille | Pas autorisés | Plafond | Tokens historiques | Note |
|---|---|---|---|---|
| `spacing` | `0`, `0-5`, `1`, `1-5`, `2`, `3`, `4`, `5`, `6`, `8`, `10`, `12`, `16`, `20`, `24` | 15 | 15 tokens | grille 4px + demi-pas. **Aucun pas nommé** : `--mr-spacing-md` serait absurde |
| `opacity` | `0`, `10`, `20`, `30`, `40`, `50`, `60`, `70`, `80`, `90`, `100` | 11 | 12 tokens | 11 paliers + `disabled`. Palier `5` absent historiquement : conservé interdit pour garder la granularité de 10 % |
| `chart` | `1`, `2`, `3`, `4`, `5` | 5 | `chart-1..5` | séries numérotées, pas une échelle visuelle |
| `font-size` | `11`, `12`, `13`, `14`, `16`, `18`, `24`, `32` | 8 | `fs-11..32` | valeurs en px. **Famille à renommer** : `fs` est une abréviation interdite (D8) |
| `line-height` | `11`, `12`, `13`, `14`, `16`, `18`, `24`, `32` | 8 | `lh-11..32` | idem, `lh` interdit |

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
| `duration` | **MIXTE** : `fast`/`slow` (nommés) + `spin`/`pulse` (rôles) + `600` (numérique) + `fast-alt`/`slow-alt`/`quick` (**ad hoc**) | voir §4.9, le cas le plusconflictuel |
| `type` | 14 tokens : styles nommés (`display`, `h1`, `body`, `caption`) | aucune échelle : ce sont des styles, pas des pas |
| `leading` | `normal`, `tight`, `snug`, `relaxed`, `base` + `control`, `heading` | aucun pas : valeurs d'interligne nommées |

## 4. Cas ambigus, un par un

### 4.1 `checkbox` — deux sous-échelles dans une famille

`checkbox-size-md/lg` (côté) et `checkbox-glyph-md/lg` (glyphe) partagent les mêmes pas mais désignent deux mesures distinctes.

**Recommandation** : ce ne sont pas une échelle mais deux rôles suffixes d'un pas. Nommer `--mr-checkbox-size-md` et `--mr-checkbox-glyph-md` est correct si les deux partagent la liste de pas `{md, lg}`. Ne pas créer d'échelle `checkbox` : c'est le rôle qui porte la mesure, le pas ne porte que la taille. Plafond 2.

### 4.2 `textarea-min-height` — variante sans suffixe

`--mr-textarea-min-height` n'a pas de pas, `-lg` et `-sm` en ont un. C'est une famille à trois valeurs dont une non nommée : impossible à lire.

**Recommandation** : nommer explicitement les trois `--mr-textarea-min-height-sm/md/lg` et supprimer la variante sans suffixe. `md` est la valeur par défaut, elle s'écrit. Plafond 3.

### 4.3 `spinner` — deux conventions pour la même chose

`spinner-size-{sm,md,lg}` et `spinner-ring-{sm,md,lg}` coexistent, avec des valeurs qui divergent. Deux mesures, deux noms — mais rien ne dit laquelle fait autorité.

**Recommandation** : ne garder qu'une mesure, `spinner-size`, et supprimer `spinner-ring`. Un anneau et une taille ne sont pas deux échelles du même objet. Plafond 3. **À trancher avec l'équipe design** : c'est une perte d'expression, pas un renommage.

### 4.4 `shadow` — quatre nommés et cinq rôles

`shadow-xs/sm/md` (échelle d'élévation) cohabitent avec `raised`, `surface`, `focus`, `overlay`, `thumb` (rôles d'usage). Deux systèmes dans une famille.

**Recommandation** : scinder en `shadow-{xs,sm,md,lg}` (échelle d'élévation, plafond 4) et garder les rôles sous la même famille sans les compter comme pas. Le rôle se déduit du suffixe, le pas se déduit du nom de l'échelle — un token ne peut pas être les deux, donc `shadow-raised` et `shadow-sm` ne sont pas des frères malgré le préfixe commun.

### 4.5 `radius` — deux conventions

`radius-{xs,sm,md,lg}` est une échelle ordinale ; `radius-{inline,control,card,overlay,full}` est une liste de rôles. `full` n'est pas un pas : c'est une valeur de sens fermé.

**Recommandation** : deux listes, pas une échelle. `--mr-radius-sm/md/lg` pour l'échelle ordinale si elle sert encore, et les rôles nommés conservés tels quels. Retirer `full` de la liste des pas (plafond 4, pas nommés uniquement). **Question ouverte** : l'échelle ordinale `xs..lg` est-elle encore utilisée, ou a-t-elle été remplacée par les seuls rôles ? La mesure montre 4 tokens ordonnés contre 5 rôles : l'échelle est probablement morte.

### 4.6 `z-index` — deux systèmes incompatibles

`z-base`/`z-elevated`/`z-overlay` (3, générique) coexistent avec `z-sticky`/`z-dropdown`/`z-popover`/`z-modal`/`z-toast`/`z-tooltip` (6, sémantique). Aucune valeur ne se recoupe, donc aucun ordre n'est garanti entre les deux systèmes.

**Recommandation** : **un seul système, sémantique**, parce que c'est lui qui est consommé par les composants et que ROADMAP §5.14 le documente. Supprimer `z-base`, `z-elevated`, `z-overlay`. Plafond 6, pas `base`/`low`/`mid`/`high`/`top` : un z-index est une **position**, pas une taille. Corriger §3.1 en conséquence.

### 4.7 `text` — rôles et tailles dans une famille

`text-{primary,secondary,tertiary,disabled}` sont des rôles de couleur ; `text-{2xs,3xl,xl,display}` sont des tailles héritées de l'échelle typographique.

**Recommandation** : les tailles sortent de la famille `text`. Elles appartiennent à la sémantique de style, pas à la couleur. Nom candidat : `--mr-font-size-{2xs,3xl,xl,display}`, ce qui les range dans `font-size` — mais `font-size` est une famille **numérique** en px, donc le mélange reviendrait. Alternative : une famille dédiée `--mr-type-*` (les styles nommés du §3.4). **Je recommande de créer `type-*` et d'y laisser les tailles**, ce qui correspond à l'historique `--mr-type-*` déjà présent. Plafond 12.

### 4.8 `font-weight` — `bold` hors échelle

`regular`, `medium`, `semibold` forment une échelle ordinale de 3. `bold` arrive après `semibold` sans être un pas de la même série.

**Recommandation** : `bold` est supprimé, ou promu en quatrième pas nommé si le langage visuel l'exige. `language.md` §5.9 dit « aucune graisse hors 400/500/600 », donc **`bold` est interdit**. Plafond 3.

### 4.9 `duration` — le cas conflictuel

C'est le seul cas **MIXTE** de tout le système, et il porte le token que tu as signalé.

Tokens historiques : `fast` (120ms), `base` (180ms), `slow` (240ms), `spin` (800ms), `pulse` (1200ms), `600` (600ms), `quick` (?), `fast-alt` (150ms), `slow-alt` (200ms).

Le problème en trois temps :

1. `fast`/`base`/`slow` sont des **nommés**, mais leur ordre sémantique est le_velocity, pas la taille — `fast` < `base` < `slow` est intuitif, mais `quick` et `fast-alt` le cassent.
2. `spin`/`pulse` sont des **rôles** : une boucle nommée, pas un point sur une échelle de transition.
3. `fast-alt`/`slow-alt`/`quick` sont des **échelles parallèles** : ce sont des paliers hérités d'une échelle `dur-*` de la migration 5a, transportés sur `duration-*`. **`-alt` ne veut rien dire** : « alternative de quoi ? » `quick` est le pire, il n'appartient à aucune des deux séries.

**Recommandation, en deux séries distinctes** :

- **Série de transition** — pas nommés, plafond 4 : `--mr-duration-fast` (120), `--mr-duration-base` (180), `--mr-duration-slow` (240). Le nom décrit la **vitesse**, pas la durée : c'est cohérent avec `ease-fast`.
- **Séries de boucle** — rôles nommés, hors échelle : `--mr-duration-spin` (800), `--mr-duration-pulse` (1200). Une boucle n'est pas « plus lente » qu'une transition, elle est d'une autre nature.

Suppression, sans remplacement : `--mr-duration-600`, `--mr-duration-quick`, `--mr-duration-fast-alt`, `--mr-duration-slow-alt`. Si une valeur de 150ms est réellement consommée par une recette, elle rejoint la série de transition sous le nom qui décrit sa vitesse — mais **`-alt` ne doit jamais revenir**.

**Conséquence sur les tests** : `design-token-contract.test.ts` attend `--mr-duration-fast-alt` et `--mr-duration-slow-alt`. Ces deux assertions devront être réécrites vers les noms de la série de transition. Le skip enregistré `blockedBy: [11b2, 11b4]` reste valable : 11b4 est bien la phase qui reconstruit cette famille.

### 4.10 `opacity` — échelle inutile

11 paliers de 0 à 100 en pas de 10, plus `disabled`. `language.md` §5.15 dit « jamais d'opacité, désactivé par couleur ». L'échelle n'a qu'un seul usage réel : `opacity-disabled`.

**Recommandation** : supprimer l'échelle, ne garder que `--mr-opacity-disabled` — un rôle, pas un pas. Plafond 0. C'est la seule famille où le plafond tombe à zéro.

## 5. Récapitulatif des plafonds

| Plafond | Familles |
|---|---|
| 0 (suppression de l'échelle) | `opacity` |
| 2 | `checkbox` |
| 3 | `icon-size`, `avatar-size`, `dialog-width`, `badge`, `textarea`, `spinner`, `font-weight` |
| 4 | `shadow` (ordinale), `radius` (ordonnée) |
| 5 | `spacing`, `chart`, `z-index` |
| 6 | `radius` (rôles + `full`) |
| 8 | `font-size`, `line-height` |
| 11 | `opacity` (échelle historique, à supprimer) |
| 12 | `type` (proposé) |

## 6. Ce que ce tableau ne décide pas

- Les **valeurs** elles-mêmes. Ce tableau fixe les noms de pas autorisés et leur plafond, pas les px ou ms associés.
- Les **familles de rôle**, qui n'ont pas d'échelle et n'en ont pas besoin.
- Le **contenu** des specs de composants, qui dépend de 11b1 et des phases suivantes.