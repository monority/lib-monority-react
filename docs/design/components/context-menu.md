# ContextMenu
Statut : spec v4 — à valider
Source : prompt maître §7.10

## Rôle
Menu contextuel d'actions ouvert par un clic droit de la souris ou la touche Menu / Shift+F10 sur une zone cible. Choisir `DropdownMenu` pour un menu déclenché par un clic gauche sur un bouton explicite.

## Anatomie
`Zone cible (élément récepteur de l'événement contextmenu) → Panneau popover natif positionné aux coordonnées du pointeur → Éléments de menu avec icône, libellé, raccourci Kbd, coche de sélection`.

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
| toutes | hauteur élément | `--mr-menu-item-height` | 32px | 28px |
| toutes | padding-inline élément | `--mr-spacing-2` | 8px | 8px |
| toutes | rayon élément | `--mr-radius-control` | 6px | 6px |
| comfortable | police élément | `--mr-type-body` | 14px / 20px, 400 | — |
| compact | police élément | `--mr-type-small` | — | 13px / 20px, 400 |
| toutes | icône début élément | `--mr-icon-size-sm` | 16px | 16px |
| toutes | écart icône/texte | `--mr-spacing-2` | 8px | 8px |
| toutes | raccourci clavier | `--mr-type-code-sm` | 12px / 16px, 400, mono | 12px / 16px, 400, mono |
| toutes | hauteur titre groupe | `--mr-menu-group-label-height` | 24px | 24px |
| toutes | police titre groupe | `--mr-type-label` | 11px / 16px, 500, mono | 11px / 16px, 500, mono |
| toutes | séparateur | `--mr-border-subtle` | 1px solid, marge 4px | 1px solid, marge 4px |
| toutes | rail élément sélectionné | `--mr-rail-width` | 2px | 2px |

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| élément standard | repos | transparent | `--mr-text-primary` | transparent | raccourci `--mr-text-tertiary` en Kbd |
| élément standard | survol / actif clavier | `--mr-bg-hover` | `--mr-text-primary` | transparent | raccourci `--mr-text-tertiary` |
| élément standard | sélectionné repos | transparent | `--mr-text-primary` | transparent | rail gauche 2px `--mr-accent` (retrait vertical 4px) + coche fin `--mr-accent-text` |
| élément standard | sélectionné survol | `--mr-bg-hover` | `--mr-text-primary` | transparent | rail gauche 2px `--mr-accent` + coche fin `--mr-accent-text` |
| élément danger | repos | transparent | `--mr-danger-text` | transparent | icône et texte danger |
| élément danger | survol / actif clavier | `--mr-danger-subtle` | `--mr-danger-text` | transparent | survol teinté danger |
| élément désactivé | repos | transparent | `--mr-text-disabled` | transparent | `cursor: not-allowed`, aucun survol |

## Comportement et clavier
- Clic droit (`contextmenu`) sur la zone cible ouvre le menu aux coordonnées (X, Y) du curseur.
- Clavier : `Shift+F10` ou touche `Menu` ouvre le menu ancré au coin supérieur gauche de la cible active.
- `Flèche Bas` / `Flèche Haut` navigue entre éléments ; `Home` / `End` premier / dernier élément.
- `Enter` ou `Espace` exécute l'action de l'élément, referme le menu et émet `onSelect(value)`.
- `Escape` referme immédiatement le menu et restitue le focus à la zone cible.
- Positionnement : utilitaire interne `packages/ui/src/internal/position` (décision phase 1b, `docs/design/language.md`) — 12 placements, écart `--mr-popover-offset` (4px), retournement et décalage dans la fenêtre (remplace le repositionnement précédent), mise à jour au défilement et au redimensionnement tant qu'ouvert, limitée à une fois par image. Pas d'anchor positioning CSS (note X6).

## Accessibilité
- Zone cible : pas de rôle obligatoire, mais réceptive au focus si interactive.
- Panneau : `role="menu"`, éléments `role="menuitem"`.
- Séparateurs : `role="separator"`.
- `Escape` referme et restitue le focus.
- Cible interactive de chaque élément ≥ `--mr-min-target` (hauteurs 32px / compact 28px).

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `items` | `Array<{ value: string, label: ReactNode, icon?: ReactNode, shortcut?: string, tone?: 'danger', disabled?: boolean, type?: 'item' \| 'separator' \| 'group', items?: MenuItem[] }>` | requis | structure de données du menu (P2) |
| `onSelect` | `(value: string) => void` | — | déclenché à la sélection d'un item (P6) |
| `onOpenChange` | `(open: boolean) => void` | — | futur événement DOM `open-change` (P6) |
| `disabled` | `boolean` | `false` | désactive l'ouverture du menu contextuel |
| `children` | `ReactNode` | requis | zone cible réceptrice du clic droit |
| `className` | `string` | — | fusion de classe (P9) |

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| portail JavaScript via `createPortal` | couche `popover` native (décision structurante 3, C6) | non | section 3 |
| élément sélectionné sur fond complet | rail gauche 2px `--mr-accent` + coche en fin (signature, section 4, 7.10) | non (visuel) | section 4 |
| recette context-menu : 2 valeurs en dur signalées (inventory §2.1) | tokens `--mr-menu-item-height`, `--mr-menu-min-width` (T2) | non | inventory §2.1 |
| callback `onSelect` et `onOpenChange` déjà conformes | conservés (P6) | non | ligne ContextMenu |

## Critères de vérification
1. clic droit sur la zone cible ouvre le panneau aux coordonnées du curseur.
2. panneau : fond = `--mr-bg-overlay`, bordure = `--mr-border-default`, rayon = 12px (`--mr-radius-overlay`).
3. élément md : `block-size` = 32px en comfortable, 28px en compact.
4. élément sélectionné : rail gauche pseudo-élément 2px en `--mr-accent` avec retrait vertical 4px.
5. clavier : `Escape` referme le menu et restitue le focus à la zone cible.
6. élément `tone="danger"` : texte `--mr-danger-text`, fond au survol `--mr-danger-subtle`.
7. séparation : bordure 1px solid `--mr-border-subtle`, marges verticales 4px.
8. dimensions : min-width = 180px, max-width = 320px, max-height = 360px.
9. apparition : durée `--mr-duration-base` (180ms), courbe `--mr-ease-enter` ; disparition `--mr-duration-fast` (120ms).

## Interdits
- Jamais d'affichage du menu contextuel natif du navigateur sur la zone cible (`preventDefault` obligatoire).
- Jamais de `createPortal` (couche `popover` native obligatoire).
- Jamais d'opacité au désactivé.
- Pas de positionnement hors de l'écran (contrainte de viewport stricte).
