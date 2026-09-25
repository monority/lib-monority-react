# NavigationMenu
Statut : spec v4 — à valider
Source : prompt maître §7.10 et §7.16

## Rôle
Menu de navigation horizontal enrichi avec panneaux déroulants détaillés pour les sites d'envergure. Choisir `Topbar` pour une barre simple de liens plats, `Menubar` pour les commandes d'application de bureau.

## Anatomie
`Barre de navigation principale (liste horizontale) → Déclencheurs avec rail inférieur → Panneaux popover natifs en sous-menu avec colonnes et cartes`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | hauteur de barre | `--mr-control-size-md` | 40px | 32px |
| toutes | padding-inline déclencheur | `--mr-spacing-3` | 12px | 8px |
| toutes | rayon déclencheur | `--mr-radius-control` | 6px | 6px |
| toutes | police déclencheur | `--mr-type-small-strong` | 13px / 20px, 500, sans | 13px / 20px, 500, sans |
| toutes | rail élément ouvert/actif | `--mr-rail-width` | 2px | 2px |
| toutes | fond panneau déroulant | `--mr-bg-overlay` | `#ffffff` (light) | `#ffffff` (light) |
| toutes | bordure panneau déroulant | `--mr-border-default` | 1px solid | 1px solid |
| toutes | rayon panneau déroulant | `--mr-radius-overlay` | 12px | 12px |
| toutes | padding panneau déroulant | `--mr-spacing-4` | 16px | 12px |
| toutes | ombre panneau déroulant | `--mr-shadow-overlay` | ombre overlay | ombre overlay |

## États
Déclencheur de barre :
| Variante | État | Fond | Texte | Bordure | Autre |
|---|---|---|---|---|---|
| déclencheur | repos | transparent | `--mr-text-secondary` | transparent | pas de rail |
| déclencheur | survol | `--mr-bg-hover` | `--mr-text-primary` | transparent | rayon 6px |
| déclencheur | actif / ouvert | transparent | `--mr-text-primary` | transparent | rail inférieur 2px `--mr-accent` |
| déclencheur | focus | repos | `--mr-text-primary` | transparent | `outline: var(--mr-focus-width) solid var(--mr-focus-color)`, offset -2px |

Panneau de sous-menu :
- repos : fond `--mr-bg-overlay`, bordure `--mr-border-default`, ombre `--mr-shadow-overlay`
- liens de sous-menu : survol fond `--mr-bg-hover`, rayon 6px

## Comportement et clavier
- Clic ou survol avec délai d'intention ouvre le sous-menu déroulant.
- Dès qu'un panneau est ouvert, le passage sur un autre déclencheur bascule immédiatement l'affichage sans délai.
- Clavier :
  - `Flèche Droite` / `Flèche Gauche` : parcourt les déclencheurs principaux de la barre.
  - `Flèche Bas` : entre dans le panneau déroulant ouvert.
  - `Escape` : referme le panneau déroulant et replace le focus sur le déclencheur de barre.
- Apparition : transition d'opacité et d'échelle sur `--mr-duration-base` (180ms) avec `--mr-ease-enter`.

## Accessibilité
- Structure : `<nav aria-label="Navigation du site">`, `<ul role="menubar">` ou liste standard avec boutons `aria-expanded`.
- Déclencheurs : `aria-haspopup="true"`, `aria-expanded="true | false"`, `aria-controls="panel-id"`.
- Panneaux déroulants : couche native `popover` sans `createPortal`.
- Cible interactive ≥ `--mr-min-target` (24px).

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `items` | `Array<{ label: ReactNode, href?: string, content?: ReactNode }>` | requis | structure des menus et sous-panneaux (P2) |
| `value` | `string` | — | élément actif contrôlé (P5) |
| `defaultValue` | `string` | — | élément actif initial (P5) |
| `onValueChange` | `(value: string) => void` | — | futur événement DOM `value-change` (P6) |
| `className` | `string` | — | fusion de classe (P9) |

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| `onValueChange` déjà présent (types) | conservé (P6) | non | ligne NavigationMenu |
| déclencheur ouvert sans rail inférieur | rail inférieur 2px `--mr-accent` (signature, section 4, 7.16) | non (visuel) | section 4 |
| portail custom pour les sous-panneaux | attribut `popover` natif (décision structurante 3, C6) | non | section 3 |
| recette navigation-menu : 5 valeurs en dur signalées (inventory §2.1) | tokens `--mr-radius-overlay`, `--mr-border-default` (T2) | non | inventory §2.1 |

## Critères de vérification
1. déclencheur ouvert : rail inférieur pseudo-élément de 2px en `--mr-accent`.
2. déclencheur survolé : fond `--mr-bg-hover` (`#e8eef0` light), couleur `--mr-text-primary`, rayon 6px.
3. panneau déroulant : fond = `--mr-bg-overlay` (`#ffffff` light), bordure = `--mr-border-default` (`#ccd4d7` light), rayon = 12px.
4. ombre du panneau = `--mr-shadow-overlay`.
5. navigation clavier : `Flèche Droite` déplace le focus vers le déclencheur suivant.
6. `Escape` referme le panneau et restitue le focus au déclencheur de barre.
7. apparition : durée `--mr-duration-base` (180ms), courbe `--mr-ease-enter`.
8. sous-menu ouvert avec attribut `aria-expanded="true"`.

## Interdits
- Jamais de `createPortal` pour les panneaux de sous-menu.
- Jamais d'aplat d'accent en fond de déclencheur actif.
- Pas de masquage sans restitution immédiate du focus clavier.
