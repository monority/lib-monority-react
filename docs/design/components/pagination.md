# Pagination
Statut : spec v4 — à valider
Source : prompt maître §7.16

## Rôle
Contrôle de navigation séquentielle et directe entre pages de données dans un tableau ou une liste paginée. Choisir `Tabs` pour basculer de section de contenu, `InfiniteScroll` pour un chargement continu sans segmentation.

## Anatomie
`IconButton ghost sm précédent (chevron gauche) → Liste de numéros de page (Button ghost sm avec chiffres tabulaires) → [Ellipsis pour saut] → IconButton ghost sm suivant (chevron droit)`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | block-size boutons | `--mr-control-size-sm` | 32px | 28px |
| toutes | inline-size boutons flèches | `--mr-control-size-sm` | 32px | 28px |
| toutes | padding-inline numéros | `--mr-control-padding-inline-sm` | 12px | 8px |
| toutes | police numéros | `--mr-control-font-size-sm` | 13px / 20px, 500, sans | 12px / 20px, 500, sans |
| toutes | chiffres tabulaires | `font-variant-numeric: tabular-nums` | tabular-nums | tabular-nums |
| toutes | border-radius boutons | `--mr-radius-control` | 6px | 6px |
| toutes | rail page active | `--mr-rail-width` | 2px | 2px |
| toutes | retrait rail | `--mr-spacing-1` | 4px | 4px |
| toutes | écart entre boutons | `--mr-spacing-1` | 4px | 4px |

## États
| Variante | État | Fond | Texte | Bordure | Autre |
|---|---|---|---|---|---|
| numéro inactif | repos | transparent | `--mr-text-secondary` | transparent | pas de rail |
| numéro inactif | survol | `--mr-bg-hover` | `--mr-text-primary` | transparent | pas de rail |
| numéro actif | repos | transparent | `--mr-text-primary` | transparent | rail inférieur 2px `--mr-accent` avec retrait 4px |
| numéro actif | survol | `--mr-bg-hover` | `--mr-text-primary` | transparent | rail inférieur `--mr-accent` |
| bouton précédent/suivant | repos | transparent | `--mr-text-secondary` | transparent | chevron 16px |
| bouton précédent/suivant | survol | `--mr-bg-hover` | `--mr-text-primary` | transparent | — |
| bouton désactivé (borne) | inactif | transparent | `--mr-text-disabled` | transparent | `cursor: not-allowed`, `disabled` |
| bouton | focus | repos | courant | transparent | `outline: var(--mr-focus-width) solid var(--mr-focus-color)`, offset -2px |

## Comportement et clavier
- Clic sur un numéro de page navigue directement à cette page et émet `onPageChange(page)`.
- Clic sur précédent / suivant navigue à `page - 1` / `page + 1`.
- Précédent désactivé sur la page 1 ; Suivant désactivé sur la dernière page.
- Touches `Enter` ou `Espace` activent le bouton ciblé.
- Rail de la page active déplacé lors de la transition d'état.

## Accessibilité
- Structure : `<nav aria-label="Pagination">`.
- Page courante : `aria-current="page"`.
- Boutons flèches : `aria-label="Page précédente"` et `aria-label="Page suivante"`.
- Boutons numériques : `aria-label="Page N"`.
- Boutons aux bornes : `disabled` natif ou `aria-disabled="true"`.
- Cible interactive de chaque bouton ≥ `--mr-min-target` (hauteur 32px / compact 28px).

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `page` | `number` | `1` | numéro de la page active (1-indexé) |
| `pageCount` | `number` | requis | nombre total de pages |
| `onPageChange` | `(page: number) => void` | requis | futur événement DOM `page-change` (P6) |
| `className` | `string` | — | fusion de classe (P9) |

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| `onPageChange` déjà présent (types / inventory) | conservé (P6) | non | ligne Pagination |
| page active avec fond accent saturé | page courante en fond transparent + texte `--mr-text-primary` + rail inférieur 2px `--mr-accent` (signature, section 4, 7.16) | non (visuel) | section 4 |
| recette pagination : 2 valeurs en dur signalées (inventory §2.1) | tokens `--mr-control-size-sm`, `--mr-spacing-1` (T2) | non | inventory §2.1 |

## Critères de vérification
1. hauteur des boutons de pagination = 32px en comfortable, 28px en compact (`--mr-control-size-sm`).
2. numéros de page : police avec `font-variant-numeric: tabular-nums`.
3. page active : `aria-current="page"`, texte `--mr-text-primary`, pseudo-élément rail inférieur de 2px en `--mr-accent`.
4. survol numéro inactif : fond `--mr-bg-hover` (`#e8eef0` light), texte `--mr-text-primary`.
5. bouton précédent désactivé lorsque `page === 1` (`disabled` natif).
6. bouton suivant désactivé lorsque `page === pageCount`.
7. clic sur un bouton émet `onPageChange` avec le numéro cible.
8. structure : élément `<nav>` avec `aria-label="Pagination"`.
9. `border-radius` de chaque bouton = 6px (`--mr-radius-control`).

## Interdits
- Jamais d'aplat d'accent en fond de numéro de page active (rail d'accent inférieur obligatoire, section 4).
- Jamais de numéros de page sans chiffres tabulaires (alignement obligatoire).
- Jamais de bouton précédent/suivant sans libellé accessible (`aria-label` obligatoire).
- Pas de clic actif sur un bouton de borne désactivé.
