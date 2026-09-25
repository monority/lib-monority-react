# Menubar
Statut : spec v4 — à valider
Source : prompt maître §7.10

## Rôle
Barre horizontale de menus déroulants hiérarchisés pour les applications riches à commandes multiples (Fichier, Édition, Affichage...). Choisir `DropdownMenu` pour un menu isolé attaché à un seul bouton.

## Anatomie
`Barre horizontale de déclencheurs (role="menubar") → Menus déroulants en couche popover native (role="menu") → Éléments de menu avec raccourcis et séparateurs`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | hauteur de la barre | `--mr-control-size-md` | 40px | 32px |
| toutes | padding-inline déclencheur | `--mr-spacing-3` | 12px | 8px |
| toutes | rayon déclencheur barre | `--mr-radius-control` | 6px | 6px |
| toutes | police déclencheur barre | `--mr-type-body-strong` | 14px / 20px, 500 | 13px / 20px, 500 |
| toutes | rail déclencheur ouvert | `--mr-rail-width` | 2px | 2px |
| toutes | fond panneau déroulant | `--mr-bg-overlay` | `#ffffff` (light) | `#ffffff` (light) |
| toutes | bordure panneau déroulant | `--mr-border-default` | 1px solid | 1px solid |
| toutes | rayon panneau déroulant | `--mr-radius-overlay` | 12px | 12px |
| toutes | padding panneau déroulant | `--mr-spacing-1` | 4px | 4px |
| toutes | ombre panneau déroulant | `--mr-shadow-overlay` | ombre overlay | ombre overlay |
| toutes | largeur minimale panneau | `--mr-menu-min-width` | 180px | 180px |
| toutes | hauteur élément de menu | `--mr-menu-item-height` | 32px | 28px |

## États
Déclencheurs dans la barre :
| Variante | État | Fond | Texte | Bordure | Autre |
|---|---|---|---|---|---|
| déclencheur barre | repos | transparent | `--mr-text-primary` | transparent | pas de rail |
| déclencheur barre | survol | `--mr-bg-hover` | `--mr-text-primary` | transparent | pas de rail |
| déclencheur barre | ouvert | `--mr-bg-raised` | `--mr-text-primary` | `--mr-border-subtle` | rail inférieur 2px `--mr-accent`, retrait `--mr-spacing-2` |
| déclencheur barre | focus | repos | `--mr-text-primary` | transparent | `outline: var(--mr-focus-width) solid var(--mr-focus-color)`, offset -2px |
| déclencheur barre | désactivé | transparent | `--mr-text-disabled` | transparent | `cursor: not-allowed` |

Éléments de menu déroulé :
- repos : fond transparent, texte `--mr-text-primary`
- survol / actif clavier : fond `--mr-bg-hover`, texte `--mr-text-primary`
- sélectionné : rail gauche 2px `--mr-accent` + coche fin de ligne
- danger : texte `--mr-danger-text`, survol fond `--mr-danger-subtle`
- désactivé : texte `--mr-text-disabled`, `cursor: not-allowed`

## Comportement et clavier
- Clic sur un déclencheur ouvre son menu déroulant. Dès qu'un menu est ouvert, le simple survol d'un autre déclencheur ferme le premier et ouvre le second sans clic supplémentaire.
- Navigation horizontale : `Flèche Droite` / `Flèche Gauche` passe d'un menu parent à l'autre dans la barre.
- Navigation verticale : `Flèche Bas` / `Flèche Haut` parcourt les éléments du menu déroulé.
- `Escape` referme le menu déroulé courant et conserve le focus sur le déclencheur de barre parent.
- `Enter` ou `Espace` active l'élément sélectionné et referme le menu.
- Positionnement : utilitaire interne `packages/ui/src/internal/position` (décision phase 1b, `docs/design/language.md`) — 12 placements, écart `--mr-popover-offset` (4px), retournement et décalage dans la fenêtre, mise à jour au défilement et au redimensionnement tant qu'ouvert, limitée à une fois par image. Pas d'anchor positioning CSS (note X6).

## Accessibilité
- Conteneur barre : `role="menubar"`, `aria-orientation="horizontal"`.
- Déclencheurs : `role="menuitem"`, `aria-haspopup="menu"`, `aria-expanded="true | false"`.
- Menus déroulés : `role="menu"`, éléments `role="menuitem"`.
- Cible interactive de chaque déclencheur ≥ `--mr-min-target` (hauteurs 40px / compact 32px).

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `items` | `Array<{ value: string, label: ReactNode, icon?: ReactNode, shortcut?: string, tone?: 'danger', disabled?: boolean, type?: 'item' \| 'separator' \| 'group', items?: MenuItem[] }>` | requis | structure de données de la barre (P2) |
| `onSelect` | `(value: string) => void` | — | déclenché à la sélection d'un item (P6) |
| `className` | `string` | — | fusion de classe (P9) |

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| `onClick` dans Menubar (types / inventory) | `onSelect(value)` standardisé (P6) | oui | ligne Menubar |
| déclencheur ouvert sans rail inférieur | rail inférieur 2px `--mr-accent` (signature, section 4, 7.10) | non (visuel) | section 4 |
| recette menubar : 4 valeurs en dur signalées (inventory §2.1) | tokens `--mr-menu-item-height`, `--mr-menu-min-width` (T2) | non | inventory §2.1 |
| portail custom pour les sous-menus | attribut `popover` natif (décision structurante 3, C6) | non | section 3 |

## Critères de vérification
1. barre : `block-size` = 40px en comfortable, 32px en compact.
2. déclencheur ouvert : rail inférieur pseudo-élément 2px en `--mr-accent`, fond `--mr-bg-raised`.
3. navigation clavier : `Flèche Droite` dans un menu déroulé passe au menu de barre suivant.
4. panneau déroulant : rayon = 12px (`--mr-radius-overlay`), fond `--mr-bg-overlay`, ombre `--mr-shadow-overlay`.
5. élément de menu : `block-size` = 32px en comfortable, 28px en compact.
6. élément sélectionné : rail gauche 2px en `--mr-accent` avec retrait vertical 4px.
7. `Escape` referme le menu déroulé et replace le focus sur le déclencheur de barre.
8. conteneur `role="menubar"`, menus déroulés `role="menu"`.
9. apparition du sous-menu : durée `--mr-duration-base` (180ms) / `--mr-ease-enter`.

## Interdits
- Jamais d'aplat d'accent en fond d'élément ou de déclencheur ouvert (rail d'accent obligatoire).
- Jamais de `createPortal` pour les panneaux déroulants.
- Jamais d'opacité au désactivé.
- Pas de perte de focus lors du changement de menu horizontal au clavier.
