# Popover
Statut : spec v4 — à valider
Source : prompt maître §7.10

## Rôle
Panneau flottant superposé contenant du contenu interactif arbitraire ou un mini-formulaire, déclenché par un élément d'interface. Choisir `Tooltip` pour un court texte d'aide non interactif, `DropdownMenu` pour une liste d'actions d'un menu.

## Anatomie
`Déclencheur → Panneau flottant natif (popover) avec fond d'overlay, bordure et ombre`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | fond panneau | `--mr-bg-overlay` | `#ffffff` (light) | `#ffffff` (light) |
| toutes | bordure panneau | `--mr-border-default` | 1px solid | 1px solid |
| toutes | rayon panneau | `--mr-radius-overlay` | 12px | 12px |
| toutes | padding panneau | `--mr-spacing-1` | 4px | 4px |
| toutes | ombre panneau | `--mr-shadow-overlay` | ombre overlay | ombre overlay |
| toutes | largeur minimale | `--mr-menu-min-width` | 180px | 180px |
| toutes | largeur maximale | `--mr-menu-max-width` | 320px | 320px |
| toutes | hauteur maximale | `--mr-menu-max-height` | 360px | 360px |
| toutes | écart déclencheur/panneau | `--mr-popover-offset` | 6px | 6px |

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| panneau | ouvert | `--mr-bg-overlay` | `--mr-text-primary` | `--mr-border-default` | ombre `--mr-shadow-overlay`, couche `popover` |
| panneau | fermeture | `--mr-bg-overlay` | `--mr-text-primary` | `--mr-border-default` | disparition en `--mr-duration-fast` |

## Comportement et clavier
- Déclencheur : clic ou frappe clavier bascule l'ouverture du popover.
- Apparition : transition d'opacité et d'échelle `opacity: 0 -> 1` et `transform: scale(0.98) -> scale(1)` sur `--mr-duration-base` (180ms) avec la courbe `--mr-ease-enter`.
- Disparition : `opacity: 1 -> 0` sur `--mr-duration-fast` (120ms) avec `--mr-ease-exit`.
- Clic extérieur ou touche `Escape` : referme le panneau et restitue le focus au déclencheur.
- Piège de focus optionnel selon que le contenu est un formulaire ou consultatif.
- Positionnement : utilitaire interne `packages/ui/src/internal/position` (décision phase 1b, `docs/design/language.md`) — 12 placements, écart `--mr-popover-offset` (4px), retournement et décalage dans la fenêtre, mise à jour au défilement et au redimensionnement tant qu'ouvert, limitée à une fois par image. Pas d'anchor positioning CSS (note X6).

## Accessibilité
- Utilise l'attribut `popover` natif du navigateur (`popover="auto"`).
- Déclencheur : relié par `aria-expanded="true | false"`, `aria-haspopup="dialog"` ou `aria-controls`.
- Touche `Escape` gérée nativement par le mécanisme `popover`.
- Zéro `createPortal` : positionné dans la couche supérieure (`top layer`) native.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `open` | `boolean` | — | ouverture contrôlée (P5) |
| `defaultOpen` | `boolean` | `false` | ouverture initiale non contrôlée (P5) |
| `onOpenChange` | `(open: boolean) => void` | — | futur événement DOM `open-change` (P6) |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end'` | `'bottom-start'` | position relative |
| `children` | `ReactNode` | requis | déclencheur |
| `content` | `ReactNode` | requis | contenu du panneau |
| `className` | `string` | — | fusion de classe (P9) |

Callbacks : `onOpenChange` (P6).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| portail JavaScript via `createPortal` | attribut `popover` natif (décision structurante 3, C6) | non | section 3 |
| recette popover : 1 valeur en dur signalée (inventory §2.1) | tokens `--mr-radius-overlay`, `--mr-popover-offset` (T2) | non | inventory §2.1 |
| animations ad hoc | `--mr-duration-base` / `--mr-ease-enter` et `--mr-duration-fast` / `--mr-ease-exit` (5.11, 7.10) | non (visuel) | migration-table §2 |

## Critères de vérification
1. panneau : fond = `--mr-bg-overlay` (`#ffffff` light), bordure = `--mr-border-default` (`#ccd4d7` light).
2. `border-radius` du panneau = 12px (`--mr-radius-overlay`).
3. ombre = `--mr-shadow-overlay`.
4. padding du conteneur = 4px (`--mr-spacing-1`).
5. décalage par rapport au déclencheur = 6px (`--mr-popover-offset`).
6. largeur minimale = 180px (`--mr-menu-min-width`), largeur maximale = 320px (`--mr-menu-max-width`).
7. hauteur maximale = 360px (`--mr-menu-max-height`).
8. apparition : durée `--mr-duration-base` (180ms), courbe `--mr-ease-enter`.
9. disparition : durée `--mr-duration-fast` (120ms), courbe `--mr-ease-exit`.
10. `Escape` ferme le popover et restitue le focus au déclencheur.

## Interdits
- Jamais de `createPortal` (couche `popover` native obligatoire, C6).
- Jamais de transition de dimension ou de position (seules `opacity` et `scale` sont animées).
- Pas d'absence de restitution du focus après fermeture au clavier.
- Pas de débordement de fenêtre (flip automatique géré par l'ancrage).
