# DropdownMenu
Statut : spec v4 — à valider
Source : prompt maître §7.10

## Rôle
Menu contextuel d'actions déclenché au clic sur un bouton d'en-tête ou de ligne. Choisir `Select` pour choisir une valeur de formulaire, `ContextMenu` pour un menu au clic droit.

## Anatomie
`Déclencheur (Button ou IconButton) → Panneau popover natif → [Titres de groupes] → Éléments de menu avec icône, libellé, raccourci Kbd, coche de sélection → [Séparateurs]`.

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
- Clic sur le déclencheur ouvre le menu et place le focus sur le premier élément actif.
- Clavier :
  - `Flèche Bas` / `Flèche Haut` : parcourt les éléments du menu (boucle du dernier au premier).
  - `Home` / `End` : premier / dernier élément.
  - Saisie d'un caractère : saute au prochain élément commençant par ce caractère.
  - `Enter` ou `Espace` : exécute l'action de l'élément, referme le menu et émet `onSelect(value)`.
  - `Escape` : referme immédiatement le menu et restitue le focus au déclencheur.
- Clic extérieur referme le menu.
- Positionnement : utilitaire interne `packages/ui/src/internal/position` (décision phase 1b, `docs/design/language.md`) — 12 placements, écart `--mr-popover-offset` (4px), retournement et décalage dans la fenêtre, mise à jour au défilement et au redimensionnement tant qu'ouvert, limitée à une fois par image. Pas d'anchor positioning CSS (note X6).
- Apparition : `opacity` + `scale(0.98 -> 1)` en `--mr-duration-base` (180ms) / `--mr-ease-enter` ; disparition en `--mr-duration-fast` (120ms) / `--mr-ease-exit`.

## Accessibilité
- Déclencheur : `aria-haspopup="menu"`, `aria-expanded="true | false"`, `aria-controls="menu-id"`.
- Panneau menu : `role="menu"`, `aria-orientation="vertical"`.
- Éléments : `role="menuitem"` (ou `menuitemcheckbox` / `menuitemradio`).
- Séparateurs : `role="separator"`.
- Raccourcis clavier : exposés dans la structure via `<kbd>` avec `aria-hidden="true"` si déjà annoncés par l'action.
- Cible interactive de chaque élément ≥ `--mr-min-target` (hauteurs 32px / compact 28px).

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `items` | `Array<{ value: string, label: ReactNode, icon?: ReactNode, shortcut?: string, tone?: 'danger', disabled?: boolean, type?: 'item' \| 'separator' \| 'group', items?: MenuItem[] }>` | requis | structure de données du menu (P2) |
| `open` | `boolean` | — | état d'ouverture contrôlé (P5) |
| `defaultOpen` | `boolean` | `false` | état initial non contrôlé (P5) |
| `onOpenChange` | `(open: boolean) => void` | — | futur événement DOM `open-change` (P6) |
| `onSelect` | `(value: string) => void` | — | déclenché à la sélection d'un item (P6) |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end'` | `'bottom-start'` | position relative |
| `children` | `ReactNode` | requis | déclencheur |
| `className` | `string` | — | fusion de classe (P9) |

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| portail JavaScript via `createPortal` | attribut `popover` natif (décision structurante 3, C6) | non | section 3 |
| élément sélectionné sur fond complet | rail gauche 2px `--mr-accent` + coche en fin (signature, section 4, 7.10) | non (visuel) | section 4 |
| recette dropdown-menu : 2 valeurs en dur signalées (inventory §2.1) | tokens `--mr-menu-item-height`, `--mr-menu-group-label-height` (T2) | non | inventory §2.1 |
| callback `onSelect` et `onOpenChange` déjà conformes | conservés (P6) | non | ligne DropdownMenu |

## Critères de vérification
1. panneau : fond = `--mr-bg-overlay` (`#ffffff` light), bordure = `--mr-border-default` (`#ccd4d7` light), rayon = 12px (`--mr-radius-overlay`).
2. élément md : `block-size` = 32px en comfortable, 28px en compact (`--mr-menu-item-height`).
3. élément survolé / actif au clavier : fond = `--mr-bg-hover` (`#e8eef0` light), `border-radius` = 6px (`--mr-radius-control`).
4. élément sélectionné : rail gauche pseudo-élément `width` = 2px, fond `--mr-accent`, retrait vertical = 4px.
5. élément `tone="danger"` : texte `--mr-danger-text` (`#ba2b2e` light) ; au survol fond `--mr-danger-subtle`.
6. titre de groupe : police `--mr-type-label` (11px mono 500 majuscules), `color` = `--mr-text-tertiary`, hauteur 24px.
7. séparateur : épaisseur 1px solid `--mr-border-subtle`, marges verticales 4px (`--mr-spacing-1`).
8. clavier : `Flèche Bas` navigue, `Enter` sélectionne et referme, `Escape` referme et redonne le focus au déclencheur.
9. apparition : durée `--mr-duration-base` (180ms), courbe `--mr-ease-enter` ; disparition `--mr-duration-fast` (120ms), courbe `--mr-ease-exit`.
10. dimensions du panneau : largeur min 180px, largeur max 320px, hauteur max 360px.

## Interdits
- Jamais de `createPortal` pour le conteneur du menu (couche `popover` native obligatoire).
- Jamais d'aplat d'accent en fond d'élément sélectionné (rail gauche uniquement).
- Jamais d'opacité sur un élément désactivé.
- Pas de perte de focus à la fermeture : restitution obligatoire au déclencheur.
